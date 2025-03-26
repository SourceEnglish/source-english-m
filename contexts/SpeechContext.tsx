import React, { createContext, useContext, ReactNode } from 'react';
import * as Speech from 'expo-speech';
import i18n from '@/i18n';

// Define the context type
interface SpeechContextType {
  readAloudMode: boolean;
  voiceIndex: number | undefined;
  setVoiceIndex: (index: number | undefined) => void;

  setReadAloudMode: (mode: boolean) => void;
  // setRequestedLanguage: (language: string) => void;
  // requestedLanguage: string | null;

  //
  speakText: (
    text: string,
    useNativeLanguage?: boolean,
    voiceIndex?: number
  ) => void;
}

// Create the SpeechContext with a default value
const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

// Provider Props
interface SpeechProviderProps {
  children: ReactNode;
}

// Provider Component
export const SpeechProvider: React.FC<SpeechProviderProps> = ({ children }) => {
  const [voiceIndex, setVoiceIndex] = React.useState<number | undefined>(
    undefined
  );
  const [readAloudMode, setReadAloudMode] = React.useState(false);
  // const [requestedLanguage, setRequestedLanguage] =
  //   React.useState<string>('en-US');
  const speakText = (text: string, useNativeLanguage?: boolean) => {
    if (text) {
      Speech.speak(text, {
        language: useNativeLanguage ? i18n.language : 'en-US',
        _voiceIndex: useNativeLanguage ? undefined : voiceIndex,
        rate: 0.9,
      });
    }
    console.log(useNativeLanguage);
    console.log(voiceIndex);
    console.log('The chosen language is');
    console.log(i18n.language);
  };

  return (
    <SpeechContext.Provider
      value={{
        speakText,
        // requestedLanguage,
        // setRequestedLanguage,
        readAloudMode,
        setReadAloudMode,
        voiceIndex,
        setVoiceIndex,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
};

// Custom Hook for easy access
export const useSpeech = (): SpeechContextType => {
  const context = useContext(SpeechContext);
  if (!context) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};
