import { useContext } from 'react';
import { LanguageContext } from './context';

/** Active language, its copy (`t`) and a setter. */
export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used inside LanguageProvider');
  return value;
}
