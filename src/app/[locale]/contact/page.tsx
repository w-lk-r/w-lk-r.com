import { use } from 'react';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import ContactPage from '@/components/pages/ContactPage';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Contact({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return <ContactPage />;
}
