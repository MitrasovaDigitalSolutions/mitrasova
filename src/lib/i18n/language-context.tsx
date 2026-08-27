'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { I18nextProvider, useTranslation as useReactI18nextTranslation } from 'react-i18next';
import i18n from './config';
import { dictionaries, Locale, TranslationSchema } from '@/locales';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dict: TranslationSchema;
  t: (keyPath: string, optionsOrFallback?: string | Record<string, unknown>) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState<Locale>('id');

  useEffect(() => {
    // Read saved locale on client mount
    try {
      const savedLocale = localStorage.getItem('mitrasova_locale');
      if (savedLocale === 'en' || savedLocale === 'id') {
        if (savedLocale !== i18n.language) {
          i18n.changeLanguage(savedLocale);
          setCurrentLocale(savedLocale);
        }
      }
    } catch {
      // ignore localStorage errors
    }

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
    try {
      localStorage.setItem('mitrasova_locale', newLocale);
      document.cookie = `mitrasova_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }
    i18n.changeLanguage(newLocale);
    setCurrentLocale(newLocale);
  }, []);

  const dict = useMemo(() => {
    return dictionaries[currentLocale] || dictionaries.id;
  }, [currentLocale]);

  const { t: i18nT } = useReactI18nextTranslation();

  const t = useCallback(
    (keyPath: string, optionsOrFallback?: string | Record<string, unknown>): string => {
      if (typeof optionsOrFallback === 'object') {
        const res = i18nT(keyPath, optionsOrFallback);
        return typeof res === 'string' ? res : keyPath;
      }
      const translated = i18nT(keyPath);
      if (typeof translated === 'string' && translated !== keyPath) {
        return translated;
      }
      return typeof optionsOrFallback === 'string' ? optionsOrFallback : keyPath;
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
      t: (keyPath: string, optionsOrFallback?: string | Record<string, unknown>): string => {
        if (typeof optionsOrFallback === 'object') {
          const res = i18n.t(keyPath, optionsOrFallback);
          return typeof res === 'string' ? res : keyPath;
        }
        const res = i18n.t(keyPath);
        return typeof res === 'string' && res ? res : (typeof optionsOrFallback === 'string' ? optionsOrFallback : keyPath);
      },
    };
  }
  return context;
};

export const useLanguage = () => useTranslation();
export { i18n };
