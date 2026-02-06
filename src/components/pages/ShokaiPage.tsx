import { useTranslations } from "next-intl";
import Card from '../ui/Card';
import { TimelineSection, TimelineItem } from '../Timeline';

type EmploymentEntry = {
  company: string;
  role?: string;
  period: string;
  duration?: string;
  location?: string;
  description?: string;
};

type EducationEntry = {
  institution: string;
  degree?: string;
  period: string;
  location?: string;
  grade?: string;
  description?: string;
};

export default function ShokaiPage() {
  const t = useTranslations('ShokaiPage');

  // Helper to safely get translation value
  const safeTranslation = (key: string): string | undefined => {
    const value = t(key);
    // Return undefined if empty string
    return value === '' ? undefined : value;
  };

  // Get employment entries
  const rawEmployment = t.raw('employment.entries') as EmploymentEntry[];
  const employmentEntries: EmploymentEntry[] = [];
  for (let i = 0; i < rawEmployment.length; i++) {
    try {
      const company = safeTranslation(`employment.entries.${i}.company`);
      const period = safeTranslation(`employment.entries.${i}.period`);

      if (!company || !period) continue;

      employmentEntries.push({
        company,
        period,
        role: safeTranslation(`employment.entries.${i}.role`),
        duration: safeTranslation(`employment.entries.${i}.duration`),
        location: safeTranslation(`employment.entries.${i}.location`),
        description: safeTranslation(`employment.entries.${i}.description`),
      });
    } catch {
      continue;
    }
  }

  // Get education entries
  const rawEducation = t.raw('education.entries') as EducationEntry[];
  const educationEntries: EducationEntry[] = [];
  for (let i = 0; i < rawEducation.length; i++) {
    try {
      const institution = safeTranslation(`education.entries.${i}.institution`);
      const period = safeTranslation(`education.entries.${i}.period`);

      if (!institution || !period) continue;

      educationEntries.push({
        institution,
        period,
        degree: safeTranslation(`education.entries.${i}.degree`),
        location: safeTranslation(`education.entries.${i}.location`),
        grade: safeTranslation(`education.entries.${i}.grade`),
        description: safeTranslation(`education.entries.${i}.description`),
      });
    } catch {
      continue;
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-12">
        {t('title')}
      </h1>

      <div className="space-y-12">
        {/* Intro */}
        <Card className="p-6 md:p-8">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            {t('intro')}
          </p>
        </Card>

        {/* Languages */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            {t('languages.title')}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {t('languages.english')}
                  </h3>
                  <span className="text-sm font-medium text-blue-500 dark:text-blue-400">
                    {t('languages.englishLevel')}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('languages.englishDescription')}
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {t('languages.japanese')}
                  </h3>
                  <span className="text-sm font-medium text-blue-500 dark:text-blue-400">
                    {t('languages.japaneseLevel')}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('languages.japaneseDescription')}
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Employment History */}
        <TimelineSection title={t('employment.title')}>
          {employmentEntries.map((entry, index) => (
            <TimelineItem
              key={index}
              title={entry.company}
              subtitle={entry.role}
              period={entry.period}
              duration={entry.duration}
              location={entry.location}
              description={entry.description}
              isLast={index === employmentEntries.length - 1}
            />
          ))}
        </TimelineSection>

        {/* Education */}
        <TimelineSection title={t('education.title')}>
          {educationEntries.map((entry, index) => (
            <TimelineItem
              key={index}
              title={entry.institution}
              subtitle={entry.degree}
              period={entry.period}
              location={entry.location}
              grade={entry.grade}
              description={entry.description}
              isLast={index === educationEntries.length - 1}
            />
          ))}
        </TimelineSection>
      </div>
    </div>
  );
}
