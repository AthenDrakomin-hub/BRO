import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export type Language = 'en' | 'fr' | 'es' | 'ar' | 'zh' | 'zh-TW' | 'ru' | 'pt' | 'de' | 'it';

// Define more specific types for translations
type TranslationFile = { [key: string]: string };

type Translations = {
  [key in Language]: TranslationFile;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const supportedLanguages: Language[] = ['en', 'fr', 'es', 'ar', 'zh', 'zh-TW', 'ru', 'pt', 'de', 'it'];

const getInitialLanguage = (): Language => {
  if (typeof navigator === 'undefined') {
    return 'en';
  }
  
  const browserLanguages = navigator.languages || [navigator.language];

  for (const lang of browserLanguages) {
    const langCode = lang.split('-')[0];
    // Check for exact match first (e.g., 'zh-TW')
    if (supportedLanguages.includes(lang as Language)) {
      return lang as Language;
    }
    // Check for primary language match (e.g., 'en' from 'en-US')
    if (supportedLanguages.includes(langCode as Language)) {
      return langCode as Language;
    }
  }

  return 'en'; // Default language
};


export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [translations, setTranslations] = useState<Translations | null>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const responses = await Promise.all(
          supportedLanguages.map(lang => fetch(`./locales/${lang}.json`))
        );

        for (const res of responses) {
            if (!res.ok) {
                throw new Error(`Failed to fetch a translation file: ${res.statusText}`);
            }
        }
        
        const jsonPromises = responses.map(res => res.json());
        const data = await Promise.all(jsonPromises);

        const newTranslations = supportedLanguages.reduce((acc, lang, index) => {
            acc[lang] = data[index];
            return acc;
        }, {} as Translations);
        
        setTranslations(newTranslations);

      } catch (error) {
        console.error("Could not load translations:", error);
        // Fallback to empty translations to prevent app crash
        const fallbackTranslations = supportedLanguages.reduce((acc, lang) => {
            acc[lang] = {};
            return acc;
        }, {} as Translations);
        setTranslations(fallbackTranslations);
      }
    };

    loadTranslations();
  }, []);

  useEffect(() => {
    // Set the document direction based on the selected language
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);


  const t = (key: string): string => {
    if (!translations) {
      return key; // Return key as fallback during loading
    }
    const langFile = translations[language];
    const englishFile = translations['en'];

    // Prioritize current language, fallback to English, then to the key itself.
    return langFile?.[key] || englishFile?.[key] || key;
  };

  // Render nothing until translations are loaded to prevent FOUC (Flash of Untranslated Content)
  if (!translations) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
