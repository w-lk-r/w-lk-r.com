'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useActionState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import Card from '../ui/Card';
import { submitContactForm } from '@/app/actions/contact';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const locale = useLocale();
  const [wantsConfirmation, setWantsConfirmation] = useState(false);
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-8">
        {t('title')}
      </h1>

      <Card className="p-6 md:p-8">
        {state.success ? (
          <div className="text-center py-8">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {t('successTitle')}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t('successMessage')}
            </p>
          </div>
        ) : (
          <form action={formAction} className="space-y-6">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {t('description')}
            </p>

            {state.error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                {state.error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                {t('nameLabel')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={t('namePlaceholder')}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                {t('emailLabel')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder={t('emailPlaceholder')}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                {t('messageLabel')}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                placeholder={t('messagePlaceholder')}
              />
            </div>

            {/* Confirmation email opt-in */}
            <div>
              <input type="hidden" name="locale" value={locale} />
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="sendConfirmation"
                  value="true"
                  checked={wantsConfirmation}
                  onChange={(e) => setWantsConfirmation(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {t('confirmationLabel')}
                </span>
              </label>
            </div>

            {/* Honeypot field - hidden from users, visible to bots */}
            <div className="absolute left-[-9999px]" aria-hidden="true">
              <label htmlFor="website">
                Website
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            {/* Cloudflare Turnstile */}
            <div className="flex justify-center">
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                options={{
                  theme: 'auto',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            >
              {isPending ? t('sending') : t('submit')}
            </button>
          </form>
        )}
      </Card>
    </div>
  );
}
