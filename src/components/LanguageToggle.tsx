import { useLanguage } from '../i18n/useLanguage';
import type { Lang } from '../i18n/content';

const options: { lang: Lang; short: string; name: string }[] = [
  { lang: 'en', short: 'EN', name: 'English' },
  { lang: 'fr', short: 'FR', name: 'Français' },
];

/** Two-state EN / FR switch. Real buttons with aria-pressed, so it works by touch, mouse and keyboard. */
export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="lang-toggle" role="group" aria-label={t.langToggle.label}>
      {options.map(option => (
        <button
          key={option.lang}
          type="button"
          lang={option.lang}
          aria-pressed={lang === option.lang}
          aria-label={option.name}
          onClick={() => setLang(option.lang)}
        >
          {option.short}
        </button>
      ))}
    </div>
  );
}
