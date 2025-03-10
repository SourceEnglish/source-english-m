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

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>

        <LanguageSelector />
      </I18nextProvider>
    </>
  );
}
