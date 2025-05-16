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
            <Stack
              screenOptions={{
                headerRight: () => (
                  <NavigationBar headerHeight={headerHeight} />
                ),
              }}
            >
              <Stack.Screen name="index" options={{ title: 'Home' }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="[lesson]"
                options={({
                  route,
                }: {
                  route: { params?: { lesson?: string } };
                }) => {
                  // Get the lesson param from the route
                  const lessonParam = route.params?.lesson as
                    | string
                    | undefined;
                  const lessonKey = lessonParam
                    ? lessonParam.replace(/-/g, ' ')
                    : undefined;
                  // Find the lesson entry
                  const lessonEntry = (
                    lessonsData as unknown as LessonEntry[]
                  ).find((entry) => lessonParam && entry[lessonParam]);
                  const lessonData =
                    lessonEntry && lessonParam
                      ? lessonEntry[lessonParam]
                      : null;
                  // Use the lesson's name or fallback to the param
                  return {
                    title: lessonData?.name || lessonParam || 'Lesson',
                  };
                }}
              />
            </Stack>
          </ThemeProvider>
        </SpeechProvider>
      </I18nextProvider>
    </>
  );
}
