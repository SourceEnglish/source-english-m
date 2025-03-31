import { Stack } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, Platform, Button } from 'react-native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import i18n from '@/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelector from '@/components/LanguageSelector';
import { SpeechProvider, useSpeech } from '@/contexts/SpeechContext';

import { ThemeProvider } from '@/contexts/ThemeContext';
import ReadAloudToggle from '@/components/ReadAloudToggle';
import { ThemeContext } from '@react-navigation/native';
import NavigationBar from '@/components/NavigationBar';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [isReadAloudEnabled, setIsReadAloudEnabled] = useState(false);

  const handleToggle = () => {
    setIsReadAloudEnabled((prev) => !prev);
  };

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <SpeechProvider>
          <ThemeProvider>
            <NavigationBar />
            {/* <ReadAloudToggle /> */}
            <Stack>
              {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
              <Stack.Screen name="index" options={{}} />
              <Stack.Screen name="+not-found" />
              {/* <Stack.Screen key={ClipboardItem.id} name={`Page${item.id}` component={DynamicScreen}
              initialParams={{items}}
            
            } /> */}
            </Stack>
          </ThemeProvider>
        </SpeechProvider>
      </I18nextProvider>
    </>
  );
}
