import React, { useState, useEffect, useContext } from 'react';
import { Platform, Linking } from 'react-native';

import { Button, Portal, Snackbar } from 'react-native-paper';
import { useSpeech } from '@/contexts/SpeechContext';

type LanguagePackToastProps = {
  visible: boolean;
  onDismiss: () => void;
};

export default function LanguagePackToast() {
  const { speakText, readAloudMode, setReadAloudMode, requestedLanguage } =
    useSpeech();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        onPress={() => {
          setReadAloudMode(true);
          setVisible(true);
          console.log('pressed');
        }}
        style={{ backgroundColor: 'black' }}
      >
        Set Read Aloud
      </Button>
      <Portal>
        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={5000}
        >
          Please add en-US / English Us as a language pack
        </Snackbar>
      </Portal>
    </>
  );
}
