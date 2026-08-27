'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import idTranslation from '@/locales/id.json';
import enTranslation from '@/locales/en.json';

const resources = {
  id: {
    translation: idTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'id',
      supportedLngs: ['id', 'en'],
      interpolation: {
        escapeValue: false, // React already protects from XSS
      },
      detection: {
        order: ['localStorage', 'cookie', 'navigator'],
        lookupLocalStorage: 'mitrasova_locale',
        lookupCookie: 'mitrasova_locale',
        caches: ['localStorage', 'cookie'],
      },
    });
}

export default i18n;
