import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: NextRequest) {
  const { email, userId } = await request.json();

  if (!email || !userId) {
    return NextResponse.json({ error: 'Missing email or userId' }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  // Verify the user exists
  const { data: authUser } = await supabase.auth.admin.getUserById(userId);
  if (!authUser.user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Check if there's already a valid code (rate limiting — max 1 per 60s)
  const { data: existing } = await supabase
    .from('verification_codes')
    .select('created_at')
    .eq('email', email)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (existing) {
    const created = new Date(existing.created_at);
    const secondsAgo = (Date.now() - created.getTime()) / 1000;
    if (secondsAgo < 60) {
      return NextResponse.json(
        { error: 'rate_limited', retryAfter: Math.ceil(60 - secondsAgo) },
        { status: 429 }
      );
    }
  }

  const code = generateCode();

  await supabase.from('verification_codes').insert({
    email,
    code,
    user_id: userId,
  });

  // Send email via Resend
  try {
    await resend.emails.send({
      from: 'Głodny Niedźwiedź <biuro@glodnyniedzwiedz.pl>',
      to: email,
      subject: `Kod weryfikacyjny: ${code}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #1C3D1C;">Kod weryfikacyjny</h2>
          <p>Użyj poniższego kodu, aby powiązać swoje konto Google z zamówieniami złożonymi na adres <strong>${email}</strong>.</p>
          <div style="background: #FDF6EC; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
            <span style="font-size: 40px; font-weight: bold; letter-spacing: 12px; color: #1C3D1C;">${code}</span>
          </div>
          <p style="color: #666; font-size: 14px;">Kod wygasa za 15 minut. Jeśli nie próbowałeś się zalogować, zignoruj tę wiadomość.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error('Failed to send verification email:', err);
    return NextResponse.json({ error: 'email_failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
