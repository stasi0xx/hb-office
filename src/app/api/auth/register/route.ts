import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { token, password } = await request.json();

  if (!token || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'password_too_short' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  // 1. Verify registration token
  const { data: tokenRow, error: tokenError } = await supabase
    .from('registration_tokens')
    .select('id, email, used, expires_at, order_id')
    .eq('id', token)
    .single();

  if (tokenError || !tokenRow) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 404 });
  }
  if (tokenRow.used) {
    return NextResponse.json({ error: 'token_used' }, { status: 410 });
  }
  if (new Date(tokenRow.expires_at) < new Date()) {
    return NextResponse.json({ error: 'token_expired' }, { status: 410 });
  }

  // 2. Check if user already exists
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existing = existingUsers?.users?.find((u) => u.email === tokenRow.email);

  if (existing) {
    return NextResponse.json({ error: 'already_registered' }, { status: 409 });
  }

  // 3. Create user with email pre-confirmed (no OTP email needed)
  const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
    email: tokenRow.email,
    password,
    email_confirm: true,
  });

  if (createError || !newUser.user) {
    console.error('Create user error:', createError);
    return NextResponse.json({ error: 'create_failed' }, { status: 500 });
  }

  // 4. Init profile + preferences + analytics + link orders
  const { error: initError } = await supabase.rpc('init_user_data', {
    p_user_id: newUser.user.id,
    p_email: tokenRow.email,
    p_full_name: null,
  });

  if (initError) {
    console.error('init_user_data error:', initError);
    // Don't fail the registration — profile can be created later
  }

  // 5. Mark token as used
  await supabase
    .from('registration_tokens')
    .update({ used: true })
    .eq('id', token);

  return NextResponse.json({ success: true, email: tokenRow.email });
}
