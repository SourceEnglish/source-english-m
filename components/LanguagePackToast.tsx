import React, { useState, useEffect, useContext } from 'react';
import { Platform, Linking } from 'react-native';

import { Button, Portal, Snackbar } from 'react-native-paper';
import * as Speech from 'expo-speech';
import { useSpeech } from '@/contexts/SpeechContext';
import languageRedirects from '@/languageRedirect.json';

function selectLanguageRedirect(): string {
  if (Platform.OS === 'ios') {
    return languageRedirects.iOS;
  } else if (languageRedirects.Android) {
    return languageRedirects.Android;
  }

  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.indexOf('windows') !== -1) {
      return languageRedirects.Windows;
    } else if (userAgent.indexOf('mac') !== -1) {
      return languageRedirects.macOS;
    } else if (userAgent.indexOf('linux') !== -1) {
      return languageRedirects.Linux;
    } else if (
      userAgent.indexOf('iphone') !== -1 ||
      userAgent.indexOf('ipad') !== -1
    ) {
      return languageRedirects.iOS;
    } else if (userAgent.indexOf('android') !== -1) {
      return languageRedirects.Android;
    }
  }
  return '';
}

export default function LanguagePackToast() {
  const { speakText, readAloudMode, setReadAloudMode, requestedLanguage } =
    useSpeech();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        onPress={async () => {
          setReadAloudMode(true);
          const voices = await Speech.getAvailableVoicesAsync();
          let hasEnglishUS = false;
          voices.forEach((voice) => {
            if (voice.language === 'en-US') {
              hasEnglishUS = true;
            }
          });
          if (!hasEnglishUS) {
            setVisible(true);
          }
        }}
        style={{ backgroundColor: 'black' }}
      >
        Set Read Aloud
      </Button>
      <Portal>
        <Snackbar
          icon={'alert-circle'}
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={5000}
          action={{
            label: 'See Instructions',
            onPress: () => Linking.openURL(selectLanguageRedirect()),
          }}
        >
          To use text-to-speech, please add English (United States) / en-US as a
          language to your device.
        </Snackbar>
      </Portal>
    </>
  );
}
