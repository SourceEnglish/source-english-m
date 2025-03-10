import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Text } from 'react-native';
import * as Localization from 'expo-localization';

export default function RootLayout() {
  let [locale, setLocale] = useState(Localization.getLocales()[0].languageTag);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Text>Current Locale: {locale}</Text>
    </>
  );
}
