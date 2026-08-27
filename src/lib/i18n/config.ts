'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
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
    .use(initReactI18next)
    .init({
      resources,
      lng: 'id',
      fallbackLng: 'id',
      supportedLngs: ['id', 'en'],
      interpolation: {
        escapeValue: false, // React already protects from XSS
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
