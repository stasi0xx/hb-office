-- ============================================================
-- Głodny Niedźwiedź — Auth Schema Migration
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Add user_id to existing orders table
alter table orders
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists orders_user_id_idx on orders(user_id);
create index if not exists orders_customer_email_idx on orders(customer_email);

-- ============================================================
-- 2. Profiles (1:1 with auth.users)
-- ============================================================
create table if not exists profiles (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  phone         text,
  avatar_url    text,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  created_at    timestamptz default now()
);

-- RLS
alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = user_id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = user_id);

-- ============================================================
-- 3. Addresses (many per user)
-- ============================================================
create table if not exists addresses (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(user_id) on delete cascade,
  label      text not null,         -- "Biuro główne", "Oddział Mokotów"
  street     text not null,
  city       text not null,
  zip        text not null,
  floor_room text,                  -- "3 piętro, recepcja"
  is_default boolean default false,
  created_at timestamptz default now()
);

create index if not exists addresses_user_id_idx on addresses(user_id);

-- RLS
alter table addresses enable row level security;

create policy "Users can manage own addresses"
  on addresses for all
  using (auth.uid() = user_id);

-- Ensure only one default address per user
create unique index if not exists one_default_address_per_user
  on addresses(user_id)
  where is_default = true;

-- ============================================================
-- 4. Notification preferences (1:1 with profile)
-- ============================================================
create table if not exists notification_preferences (
  user_id               uuid primary key references profiles(user_id) on delete cascade,
  order_confirmation    boolean default true,
  delivery_reminder_2h  boolean default true,
  delivery_reminder_day boolean default false,
  weekly_menu           boolean default false,
  promotions            boolean default false
);

alter table notification_preferences enable row level security;

create policy "Users can manage own notification preferences"
  on notification_preferences for all
  using (auth.uid() = user_id);

-- ============================================================
-- 5. User analytics (updated by service role, read by user)
-- ============================================================
create table if not exists user_analytics (
  user_id               uuid primary key references profiles(user_id) on delete cascade,
  total_orders          int default 0,
  total_spent           numeric(10,2) default 0,
  avg_order_value       numeric(10,2),
  first_order_date      date,
  last_order_date       date,
  preferred_categories  text[],     -- top 3 categories by order count
  preferred_days        int[],      -- [1,3,5] = mon/wed/fri (ISO weekday)
  order_frequency_days  int,        -- avg days between orders
  updated_at            timestamptz default now()
);

alter table user_analytics enable row level security;

create policy "Users can view own analytics"
  on user_analytics for select
  using (auth.uid() = user_id);

-- ============================================================
-- 6. User persona (admin only, no user RLS)
-- ============================================================
create table if not exists user_persona (
  user_id       uuid primary key references profiles(user_id) on delete cascade,
  segment       text check (segment in ('budget', 'regular', 'premium')),
  tags          text[],             -- ['mięsożerca', 'zamawia-grupowo', 'wierny']
  churn_risk    text check (churn_risk in ('low', 'medium', 'high')),
  ltv_estimate  numeric(10,2),
  admin_notes   text,
  last_reviewed date,
  updated_at    timestamptz default now()
);

alter table user_persona enable row level security;
-- No user policies — accessible only via service_role key (admin panel)

-- ============================================================
-- 7. Registration tokens (post-order account creation)
-- ============================================================
create table if not exists registration_tokens (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references orders(id) on delete cascade,
  email      text not null,
  used       boolean default false,
  expires_at timestamptz not null default (now() + interval '7 days'),
  created_at timestamptz default now()
);

create index if not exists registration_tokens_email_idx on registration_tokens(email);
-- No RLS — accessed only via service_role key

-- ============================================================
-- 8. Verification codes (email conflict resolution)
-- ============================================================
create table if not exists verification_codes (
  id         uuid primary key default gen_random_uuid(),
  email      text not null,
  code       text not null,
  user_id    uuid references auth.users(id) on delete cascade,
  used       boolean default false,
  expires_at timestamptz not null default (now() + interval '15 minutes'),
  created_at timestamptz default now()
);

create index if not exists verification_codes_email_idx on verification_codes(email);
-- No RLS — accessed only via service_role key

-- ============================================================
-- 9. Function: link orders to user after account creation
-- ============================================================
create or replace function link_orders_to_user(p_user_id uuid, p_email text)
returns void
language plpgsql
security definer
as $$
begin
  update orders
  set user_id = p_user_id
  where customer_email = p_email
    and user_id is null;
end;
$$;

-- ============================================================
-- 10. Function: init user data after registration
-- ============================================================
create or replace function init_user_data(p_user_id uuid, p_email text, p_full_name text default null)
returns void
language plpgsql
security definer
as $$
begin
  -- Create profile
  insert into profiles (user_id, full_name)
  values (p_user_id, p_full_name)
  on conflict (user_id) do nothing;

  -- Create notification preferences with defaults
  insert into notification_preferences (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  -- Create analytics row
  insert into user_analytics (user_id)
  values (p_user_id)
  on conflict (user_id) do nothing;

  -- Link existing orders
  perform link_orders_to_user(p_user_id, p_email);
end;
$$;
