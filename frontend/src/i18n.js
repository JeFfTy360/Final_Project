import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import htTranslation from './locales/ht.json';

const resources = {
  en: enTranslation,
  fr: frTranslation,
  ht: htTranslation
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'fr', // default language
    fallbackLng: 'en', // fallback language
    debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    ns: ['translation'], // default namespace
    defaultNS: 'translation',
  });

export default i18n;
