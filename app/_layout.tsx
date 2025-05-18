import React, { useState } from 'react';
import { Stack, ScreenProps } from 'expo-router';
import { Text, Platform, Button } from 'react-native';
import { I18nextProvider, useTranslation } from 'react-i18next';
import * as Localization from 'expo-localization';
import i18n from '@/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageSelector from '@/components/LanguageSelector';
import { SpeechProvider } from '@/contexts/SpeechContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import NavigationBar from '@/components/NavigationBar';
import { useColorScheme } from 'react-native';
import CustomNav from '@/components/NavigationBar';
// Import lessons data and type
import lessonsData from '@/i18n/locales/en-us/lessons.json';

// Type for a single lesson entry in lessons.json
type LessonEntry = {
  [lessonName: string]: {
    name?: string;
    __tags?: string[];
    __type: string;
    __order?: number;
    intro?: string;
  };
};

export default function RootLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [isReadAloudEnabled, setIsReadAloudEnabled] = useState(false);

  const headerHeight = 40; // Define a constant header height

  return (
    <>
      <I18nextProvider i18n={i18n}>
        <SpeechProvider>
          <ThemeProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  header: () => (
                    <CustomNav
                      headerHeight={headerHeight}
                      title="Home"
                      canGoBack={false}
                    />
                  ),
                }}
              />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="[lesson]"
                options={({
                  route,
                }: {
                  route: { params?: { lesson?: string } };
                }) => {
                  const lessonParam = route.params?.lesson as
                    | string
                    | undefined;
                  const lessonKey = lessonParam
                    ? lessonParam.replace(/-/g, ' ')
                    : undefined;
                  const lessonEntry = (
                    lessonsData as unknown as LessonEntry[]
                  ).find((entry) => lessonKey && entry[lessonKey]);
                  const lessonData =
                    lessonEntry && lessonKey ? lessonEntry[lessonKey] : null;
                  return {
                    header: () => (
                      <CustomNav
                        headerHeight={headerHeight}
                        title={lessonData?.name || lessonKey || 'Lesson'}
                      />
                    ),
                    gestureEnabled: true, // Enable swipe back gesture
                  };
                }}
              />
              <Stack.Screen
                name="voiceList"
                options={{
                  header: () => (
                    <CustomNav headerHeight={headerHeight} title="Voices" />
                  ),
                }}
              />
            </Stack>
          </ThemeProvider>
        </SpeechProvider>
      </I18nextProvider>
    </>
  );
}
