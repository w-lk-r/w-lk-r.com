// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!

const templates = {
  en: {
    subject: 'Thanks for reaching out!',
    body: (name: string) =>
      `Hi ${name},\n\nThanks for getting in touch! I've received your message and will get back to you as soon as possible.\n\nBest regards,\nJonathan Walker`,
  },
  jp: {
    subject: 'お問い合わせありがとうございます',
    body: (name: string) =>
      `${name}様\n\nお問い合わせいただきありがとうございます。メッセージを受け取りました。できるだけ早くご返信いたします。\n\nよろしくお願いいたします。\nジョナサン・ウォーカー`,
  },
}

Deno.serve(async (req) => {
  try {
    const { record } = await req.json()

    // Only send if the user opted in
    if (!record.send_confirmation) {
      return new Response(JSON.stringify({ message: 'Confirmation not requested' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const lang = record.confirmation_language === 'jp' ? 'jp' : 'en'
    const template = templates[lang]

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Jonathan Walker <noreply@w-lk-r.com>',
        to: [record.email],
        subject: template.subject,
        text: template.body(record.name),
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
