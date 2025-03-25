import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, Platform } from 'react-native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import i18n from '@/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelector from '@/components/LanguageSelector';
import { SpeechProvider } from '@/contexts/SpeechContext';
import { Provider } from 'react-native-paper';
import LanguagePackToast from '@/components/LanguagePackToast';

export default function RootLayout() {
  const { t } = useTranslation();
  let [locale, setLocale] = useState(Localization.getLocales()[0].languageTag);

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <SpeechProvider>
          <Provider>
            <LanguagePackToast />
            <Stack>
              <Text>{t('home.welcome')}</Text>
              <Text>{t('home.description')}</Text>
              {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
              <Stack.Screen name="index" options={{ headerTitle: 'Home' }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </Provider>
        </SpeechProvider>
      </I18nextProvider>
    </>
  );
}
