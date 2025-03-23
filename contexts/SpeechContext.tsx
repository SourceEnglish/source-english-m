import React, { createContext, useContext, ReactNode } from 'react';
import * as Speech from 'expo-speech';

// Define the context type
interface SpeechContextType {
  readAloudMode: boolean;
  voiceIndex: number | undefined;
  setVoiceIndex: (index: number | undefined) => void;

  setReadAloudMode: (mode: boolean) => void;
  setRequestedLanguage: (language: string) => void;
  requestedLanguage: string | null;

  speakText: (text: string, language?: string, voiceIndex?: number) => void;
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
  const [requestedLanguage, setRequestedLanguage] = React.useState<
    string | null
  >('en-US');
  const speakText = (text: string, language: string = 'en-US') => {
    if (text) {
      console.log(voiceIndex);
      Speech.speak(text, {
        language: language,
        _voiceIndex: voiceIndex,
        rate: 0.9,
      });
    }
  };

  return (
    <SpeechContext.Provider
      value={{
        speakText,
        requestedLanguage,
        setRequestedLanguage,
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
