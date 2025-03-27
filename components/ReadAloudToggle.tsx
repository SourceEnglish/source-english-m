import React, { useState, useEffect, useContext } from 'react';
import { Platform, Linking } from 'react-native';

import { TouchableOpacity, Text } from 'react-native';
import Toast from 'react-native-toast-message';
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

export default function ReadAloudToggle() {
  const {
    speakText,
    readAloudMode,
    setReadAloudMode,
    // requestedLanguage,
    setVoiceIndex,
  } = useSpeech();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={async () => {
          if (readAloudMode) {
            setReadAloudMode(false);
            return;
          }
          setReadAloudMode(true);
          const voices = await Speech.getAvailableVoicesAsync();
          let hasEnglishUS = false;
          console.log(voices);
          let voiceIndex = undefined;
          voiceIndex = voices.findIndex((voice) =>
            voice.identifier.includes('Google US English')
          );

          setVoiceIndex(voiceIndex);
          voices.forEach((voice) => {
            if (voice.language === 'en-US') {
              hasEnglishUS = true;
            }
          });
          if (!hasEnglishUS) {
            setVisible(true);
          }
        }}
        style={{
          backgroundColor: readAloudMode ? 'purple' : 'black',
          position: 'absolute',
          top: 10,
          right: 10,
          padding: 10,
          borderRadius: 5,
          zIndex: 50,
        }}
      >
        <Text style={{ color: 'white' }}>Set Read Aloud</Text>
      </TouchableOpacity>

      {/* <Toast

        action={{
          label: 'See Instructions',
          onPress: () => Linking.openURL(selectLanguageRedirect()),
        }}
      >
        To use text-to-speech, please add English (United States) / en-US as a
        language to your device.
      </Toast> */}
    </>
  );
}
