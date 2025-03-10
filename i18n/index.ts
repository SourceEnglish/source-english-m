import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translation_en_us from './locales/en-us/translation.json';
import translation_es_mx from './locales/es-mx/translation.json';

// const resources = {
//   'en-US': { translation: translation_en_us },
//   'es-MX': { translation: translation_es_mx },
// };

i18n.use(initReactI18next).init({
  // lng: Localization.getLocales()[0].languageTag, // Default language
  fallbackLng: 'en-US', // Default language when translation is not available
  resources: {
    'en-US': { translation: translation_en_us },
    'es-MX': { translation: translation_es_mx },
  },
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

// const initI18n = async () => {
//   let savedLanguage = await AsyncStorage.getItem('language');

//   if (!savedLanguage) {
//     savedLanguage = Localization.getLocales()[0].languageTag;
//   }

//   i18n.use(initReactI18next).init({
//     compatibilityJSON: 'v4',
//     resources,
//     lng: savedLanguage,
//     fallbackLng: 'en-US',
//     interpolation: {
//       escapeValue: false,
//     },
//   });
// };

// initI18n();

export default i18n;
