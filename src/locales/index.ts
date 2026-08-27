import id from './id.json';
import en from './en.json';
import { Locale, TranslationSchema } from './types';

export const dictionaries: Record<Locale, TranslationSchema> = {
  id,
  en,
};

export * from './types';
