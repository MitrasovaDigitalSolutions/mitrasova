'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { I18nextProvider, useTranslation as useReactI18nextTranslation } from 'react-i18next';
import i18n from './config';
import { dictionaries, Locale, TranslationSchema } from '@/locales';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: TranslationSchema;
  t: (keyPath: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    const lang = i18n.language?.substring(0, 2);
    return lang === 'en' ? 'en' : 'id';
  });

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const normalized = lng?.substring(0, 2) === 'en' ? 'en' : 'id';
      setCurrentLocale(normalized);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    i18n.changeLanguage(newLocale);
    setCurrentLocale(newLocale);
  }, []);

  const dict = useMemo(() => {
    return dictionaries[currentLocale] || dictionaries.id;
  }, [currentLocale]);

  const { t: i18nT } = useReactI18nextTranslation();

  const t = useCallback(
    (keyPath: string, fallback?: string): string => {
      const translated = i18nT(keyPath);
      if (translated && translated !== keyPath) {
        return translated;
      }
      return fallback || keyPath;
    },
    [i18nT]
  );

  const contextValue = useMemo(
    () => ({
      locale: currentLocale,
      setLocale,
      dict,
      t,
    }),
    [currentLocale, setLocale, dict, t]
  );

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={contextValue}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: 'id' as Locale,
      setLocale: (locale: Locale) => i18n.changeLanguage(locale),
      dict: dictionaries.id,
      t: (keyPath: string, fallback?: string) => i18n.t(keyPath) || fallback || keyPath,
    };
  }
  return context;
};

export const useLanguage = () => useTranslation();
export { i18n };
