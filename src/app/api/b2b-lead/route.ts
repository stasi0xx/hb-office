import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createServerSupabaseClient } from '@/lib/supabase';

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || 're_placeholder');
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { company, contactPerson, email, phone, employees } = body;

  if (!company || !contactPerson || !email || !phone || !employees) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Zapis do nowej tabeli Supabase
  try {
    const supabase = createServerSupabaseClient();
    const { error: dbError } = await supabase
      .from('b2b_leads')
      .insert([{
        company: company,
        contact_person: contactPerson,
        email: email,
        phone: phone,
        employees: employees
      }]);

    if (dbError) {
      console.error('Supabase b2b_leads insert error:', dbError);
    }
  } catch (err) {
    console.error('Supabase connection error:', err);
  }

  const restaurantEmail = process.env.RESTAURANT_EMAIL || 'biuro@glodnyniedzwiedz.pl';

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Nowy lead B2B – Głodny Niedźwiedź</title></head>
<body style="margin:0;padding:0;background:#FDF6EC;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px 16px;">
    <div style="background:#1B4332;border-radius:16px 16px 0 0;padding:28px 32px;">
      <div style="font-size:28px;font-weight:900;color:#FDF6EC;letter-spacing:4px;">GN</div>
      <div style="font-size:11px;font-weight:700;color:#ed8788;letter-spacing:3px;margin-top:4px;text-transform:uppercase;">Nowy lead · Benefit dla firm</div>
    </div>
    <div style="background:#fff;padding:28px 32px;border-radius:0 0 16px 16px;box-shadow:0 4px 20px rgba(27,67,50,0.10);">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;font-size:13px;color:#888;width:150px;">Firma</td>
          <td style="padding:8px 0;font-size:14px;color:#1B4332;font-weight:700;">${company}</td>
        </tr>
        <tr style="border-top:1px solid #f0e8da;">
          <td style="padding:8px 0;font-size:13px;color:#888;">Osoba kontaktowa</td>
          <td style="padding:8px 0;font-size:14px;color:#1B4332;">${contactPerson}</td>
        </tr>
        <tr style="border-top:1px solid #f0e8da;">
          <td style="padding:8px 0;font-size:13px;color:#888;">Email</td>
          <td style="padding:8px 0;font-size:14px;color:#1B4332;"><a href="mailto:${email}" style="color:#ed8788;">${email}</a></td>
        </tr>
        <tr style="border-top:1px solid #f0e8da;">
          <td style="padding:8px 0;font-size:13px;color:#888;">Telefon</td>
          <td style="padding:8px 0;font-size:14px;color:#1B4332;font-weight:700;"><a href="tel:${phone}" style="color:#ed8788;">${phone}</a></td>
        </tr>
        <tr style="border-top:1px solid #f0e8da;">
          <td style="padding:8px 0;font-size:13px;color:#888;">Liczba pracowników</td>
          <td style="padding:8px 0;font-size:14px;color:#1B4332;">${employees}</td>
        </tr>
      </table>
      <div style="margin-top:24px;padding:16px;background:#FDF6EC;border-radius:10px;text-align:center;">
        <a href="tel:${phone}" style="display:inline-block;background:#ed8788;color:#fff;font-weight:900;font-size:15px;padding:12px 28px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;">Zadzwoń teraz: ${phone}</a>
      </div>
    </div>
    <p style="text-align:center;font-size:11px;color:#bbb;margin-top:16px;">© Głodny Niedźwiedź · System leadów B2B</p>
  </div>
</body>
</html>`;

  try {
    await getResend().emails.send({
      from: 'System leadów B2B <noreply@szkolaonline.com>',
      to: restaurantEmail,
      subject: `Nowy lead B2B: ${company} (${employees})`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('B2B lead email error:', err);
    return NextResponse.json({ error: 'Send failed' }, { status: 500 });
  }
}
