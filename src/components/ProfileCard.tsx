import Image from 'next/image';
import Card from './ui/Card';
import { ReactNode } from 'react';

type SocialLink = {
  name: string;
  url: string;
  icon: ReactNode;
};

type ProfileCardProps = {
  name: string;
  title: string;
  location?: string;
  avatarUrl?: string;
  socialLinks?: SocialLink[];
};

export default function ProfileCard({
  name,
  title,
  location,
  avatarUrl,
  socialLinks = []
}: ProfileCardProps) {
  return (
    <Card className="p-5 md:p-8 max-w-md mx-auto">
      <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
        {/* Avatar */}
        {avatarUrl && (
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-400/30 shadow-lg">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Name & Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            {name}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {title}
          </p>
        </div>

        {/* Location */}
        <a
          href="https://www.google.com/maps/place/Fujimi,+Suwa+District,+Nagano,+Japan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-sm">{location}</span>
        </a>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-600 dark:text-slate-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
