import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const { email, code, userId, registrationToken } = await request.json();

  if (!email || !code || !userId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  const { data: record } = await supabase
    .from('verification_codes')
    .select('id, used, expires_at')
    .eq('email', email)
    .eq('code', code)
    .eq('user_id', userId)
    .eq('used', false)
    .single();

  if (!record) {
    return NextResponse.json({ error: 'invalid_code' }, { status: 400 });
  }

  if (new Date(record.expires_at) < new Date()) {
    return NextResponse.json({ error: 'code_expired' }, { status: 410 });
  }

  // Mark code as used
  await supabase
    .from('verification_codes')
    .update({ used: true })
    .eq('id', record.id);

  // Link orders to user
  await supabase.rpc('link_orders_to_user', {
    p_user_id: userId,
    p_email: email,
  });

  // Mark registration token as used (if provided)
  if (registrationToken) {
    await supabase
      .from('registration_tokens')
      .update({ used: true })
      .eq('id', registrationToken);
  }

  return NextResponse.json({ success: true });
}
