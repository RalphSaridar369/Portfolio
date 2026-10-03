import { validate, type Form } from '@/lib/contact';

const TO = process.env.CONTACT_TO_EMAIL || 'ralphsaridar@hotmail.com';
const FROM = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: 'Email is not configured.' }, { status: 500 });

  let body: Partial<Form>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }
  const form: Form = { name: String(body.name ?? '').trim(), email: String(body.email ?? '').trim(), message: String(body.message ?? '').trim() };
  const errors = validate(form);
  if (Object.keys(errors).length) return Response.json({ error: 'Invalid form.', errors }, { status: 400 });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: form.email,
      subject: 'New inquiry from ' + form.name,
      text: `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
      html: `<p><strong>Name:</strong> ${escape(form.name)}<br><strong>Email:</strong> ${escape(form.email)}</p><p style="white-space:pre-wrap">${escape(form.message)}</p>`,
    }),
  });
  if (!res.ok) {
    console.error('Resend error', res.status, await res.text());
    return Response.json({ error: 'Could not send the message.' }, { status: 502 });
  }
  return Response.json({ ok: true });
}
