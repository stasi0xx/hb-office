-- Menu weeks: each uploaded PDF = one week
CREATE TABLE menu_weeks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start  DATE NOT NULL,
  week_end    DATE NOT NULL,
  status      TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only one published week at a time (enforced in app logic)
CREATE INDEX idx_menu_weeks_status ON menu_weeks(status);

-- Individual menu items
CREATE TABLE menu_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  week_id     UUID NOT NULL REFERENCES menu_weeks(id) ON DELETE CASCADE,
  date        TEXT NOT NULL,       -- 'DD.MM.YYYY' - matches existing menu.json format
  day_name    TEXT NOT NULL,       -- 'Poniedziałek', 'Wtorek', etc.
  category    TEXT NOT NULL,       -- 'Kanapki i wrapy', 'Obiady', etc.
  name        TEXT NOT NULL,
  price       NUMERIC(10,2) NOT NULL,
  is_vege     BOOLEAN NOT NULL DEFAULT FALSE,
  is_spicy    BOOLEAN NOT NULL DEFAULT FALSE,
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_menu_items_week_id ON menu_items(week_id);
CREATE INDEX idx_menu_items_date    ON menu_items(date);

-- RLS: public can only read published weeks
ALTER TABLE menu_weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published_weeks"
  ON menu_weeks FOR SELECT
  USING (status = 'published');

CREATE POLICY "public_read_published_items"
  ON menu_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM menu_weeks w
      WHERE w.id = menu_items.week_id AND w.status = 'published'
    )
  );

-- Service role bypasses RLS (used by admin API routes)
