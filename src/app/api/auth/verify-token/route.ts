import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from('registration_tokens')
    .select('id, email, used, expires_at, order_id')
    .eq('id', token)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 404 });
  }

  if (data.used) {
    return NextResponse.json({ error: 'token_used' }, { status: 410 });
  }

  if (new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: 'token_expired' }, { status: 410 });
  }

  return NextResponse.json({ email: data.email, orderId: data.order_id });
}
