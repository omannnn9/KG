import { createContext } from 'react';
import type { Copy, Lang } from './content';

export type LanguageValue = { lang: Lang; setLang: (lang: Lang) => void; t: Copy };

export const LanguageContext = createContext<LanguageValue | null>(null);
