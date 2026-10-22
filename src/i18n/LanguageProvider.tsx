import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { LanguageContext, type LanguageValue } from './context';
import { content, type Lang } from './content';

const STORAGE_KEY = 'kg-lang';


// Stored choice first, then the browser's language; English otherwise.
const initialLang = (): Lang => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'fr') return stored;
  } catch {
    // Storage can be unavailable (private mode); fall through.
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = content[lang].htmlLang;
  }, [lang]);

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      t: content[lang],
      setLang: next => {
        setLangState(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // Not persisted; the choice still applies for this visit.
        }
      },
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
