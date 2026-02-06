'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import {Link} from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Lock body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-2">
            <NavigationLink href="/">{t('home')}</NavigationLink>
            <NavigationLink href="/shokai">{t('shokai')}</NavigationLink>
            <NavigationLink href="/links">{t('links')}</NavigationLink>
            <NavigationLink href="/contact">{t('contact')}</NavigationLink>
          </div>

          {/* Mobile Logo/Title Area */}
          <Link href="/" className="md:hidden py-4 text-slate-100 font-semibold">
            {t('home')}
          </Link>

          {/* Desktop Locale Switcher */}
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-100 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-slate-900 shadow-xl z-50 md:hidden animate-slide-in">
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md text-slate-100 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col px-4 space-y-2">
                <NavigationLink href="/" onClick={() => setMobileMenuOpen(false)}>
                  {t('home')}
                </NavigationLink>
                <NavigationLink href="/shokai" onClick={() => setMobileMenuOpen(false)}>
                  {t('shokai')}
                </NavigationLink>
                <NavigationLink href="/links" onClick={() => setMobileMenuOpen(false)}>
                  {t('links')}
                </NavigationLink>
                <NavigationLink href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  {t('contact')}
                </NavigationLink>
              </div>

              {/* Mobile Locale Switcher */}
              <div className="mt-auto p-4 border-t border-slate-700">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}