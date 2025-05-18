import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import * as Speech from 'expo-speech';
import i18n from '@/i18n';

// Define the context type
interface SpeechContextType {
  readAloudMode: boolean;
  voiceIndex: number | undefined;
  setVoiceIndex: (index: number | undefined) => void;
  setReadAloudMode: (mode: boolean) => void;
  setRequestedLanguage: (language: string) => void;
  requestedLanguage: string | null;

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
  const [requestedLanguage, setRequestedLanguage] =
    React.useState<string>('en-US');
  const [_, setLanguageChanged] = React.useState(false);
  const speakText = async (text: string, useNativeLanguage?: boolean) => {
    if (text) {
      Speech.stop(); // Stop any ongoing speech before starting new
      let selectedVoice: string | undefined = undefined;
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        if (
          typeof voiceIndex === 'number' &&
          voices[voiceIndex] &&
          voices[voiceIndex].identifier
        ) {
          selectedVoice = voices[voiceIndex].identifier;
        }
      } catch (e) {
        console.warn('Could not get voices:', e);
      }
      Speech.speak(text, {
        language: 'en-US',
        voice: selectedVoice,
        rate: 0.9,
      });
    }
    console.log(useNativeLanguage);
    console.log('The chosen voiceIndex is: ' + voiceIndex);
    console.log('The chosen language is: ' + i18n.language);
  };

  // Custom setter for voiceIndex to log changes
  const setVoiceIndexWithLog = (index: number | undefined) => {
    setVoiceIndex(index);
    console.log('voiceIndex set to:', index);
  };

  /*
  useEffect(() => {
    // Logic to reload or update the component when requestedLanguage changes
    console.log(`Language changed to: ${requestedLanguage}`);
    console.log('SpeechProvider component reloaded');
    setLanguageChanged((prev) => !prev); // Trigger re-render
    // Add any additional logic if needed
  }, [requestedLanguage]);
   */

  return (
    <SpeechContext.Provider
      value={{
        speakText,
        requestedLanguage,
        setRequestedLanguage,
        readAloudMode,
        setReadAloudMode,
        voiceIndex,
        setVoiceIndex: setVoiceIndexWithLog,
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
