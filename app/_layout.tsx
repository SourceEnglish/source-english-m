import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, Platform } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import * as Localization from 'expo-localization';
import i18n from '@/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelector from '@/components/LanguageSelector';

export default function RootLayout() {
  let [locale, setLocale] = useState(Localization.getLocales()[0].languageTag);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        let savedLanguage;
        if (Platform.OS === 'web') {
          savedLanguage = localStorage.getItem('language');
        } else {
          savedLanguage = await AsyncStorage.getItem('language');
        }

        if (savedLanguage) {
          setLocale(savedLanguage);
          await i18n.changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language', error);
      }
    };

    loadLanguage();
  }, []);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setLocale(lng);
      if (Platform.OS === 'web') {
        localStorage.setItem('language', lng);
      } else {
        await AsyncStorage.setItem('language', lng);
      }
    } catch (error) {
      console.error('Failed to change language', error);
    }
  };

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Text>Current Locale: {locale}</Text>
        <LanguageSelector changeLanguage={changeLanguage} />{' '}
      </I18nextProvider>
    </>
  );
}
