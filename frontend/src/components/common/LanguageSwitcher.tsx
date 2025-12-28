import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    
    // Update document direction for RTL support
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                 bg-bg-secondary hover:bg-bg-tertiary border border-border
                 text-secondary hover:text-primary transition-colors"
      title={currentLang === 'en' ? 'Switch to Arabic' : 'التبديل للإنجليزية'}
    >
      <Languages size={16} />
      <span className="uppercase">{currentLang}</span>
    </button>
  );
}
