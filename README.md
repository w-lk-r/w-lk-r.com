# w-lk-r.com

Personal website for Jonathan Walker — software engineer based in Fujimi, Nagano, Japan.

## Tech Stack

- [Next.js](https://nextjs.org) 16 with App Router
- [React](https://react.dev) 19
- [Tailwind CSS](https://tailwindcss.com) 4
- [next-intl](https://next-intl.dev) for i18n (English & Japanese)
- [Supabase](https://supabase.com) for the contact form backend
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) for spam protection

## Pages

- **Home** — introduction
- **Links** — external profiles (GitHub, LinkedIn, etc.)
- **About (紹介)** — background, languages, employment history, education
- **Contact** — contact form with Turnstile verification

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## i18n

Translations live in `messages/en.json` and `messages/jp.json`. The site uses `next-intl` with locale-based routing (`/en/...`, `/jp/...`).
