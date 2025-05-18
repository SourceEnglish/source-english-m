import React, { createContext, useContext, ReactNode } from 'react';
import * as Speech from 'expo-speech';
import i18n from '@/i18n';

// Define the context type
interface SpeechContextType {
  readAloudMode: boolean;
  voiceIdentifier: string | undefined;
  setVoiceIdentifier: (identifier: string | undefined) => void;
  setReadAloudMode: (mode: boolean) => void;
  setRequestedLanguage: (language: string) => void;
  requestedLanguage: string | null;
  //
  speakText: (
    text: string,
    useNativeLanguage?: boolean,
    voiceIdentifier?: string
  ) => void;
}

const defaultVoiceIdentifiers: string[] = [
  'Google US English',
  'Microsoft Jenny Online (Natural) - English (United States)',
  'Microsoft Ava Online (Natural) - English (United States)',

  'com.apple.voice.premium.en-US.Siri_Female',
  'com.apple.voice.premium.en-US.Samantha',
  'com.apple.voice.enhanced.en-US.Siri_Female',

  'com.apple.voice.compact.en-US.Samantha',
  'com.apple.voice.super-compact.en-US.Samantha',
  'com.apple.voice.premium.en-US.Voice1',
  'Microsoft Zira - English (United States)',
];

// Create the SpeechContext with a default value
const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

// Provider Props
interface SpeechProviderProps {
  children: ReactNode;
}

// Provider Component
export const SpeechProvider: React.FC<SpeechProviderProps> = ({ children }) => {
  const [voiceIdentifier, setVoiceIdentifier] = React.useState<
    string | undefined
  >(undefined);
  const [readAloudMode, setReadAloudMode] = React.useState(false);
  const [requestedLanguage, setRequestedLanguage] =
    React.useState<string>('en-US');
  const [_, setLanguageChanged] = React.useState(false);

  const speakText = async (text: string, useNativeLanguage?: boolean) => {
    if (text) {
      Speech.stop(); // Stop any ongoing speech before starting new
      let selectedVoice: string | undefined = voiceIdentifier;
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        // If no voiceIdentifier is set, select default now
        if (!selectedVoice) {
          let foundVoice;
          // 1. Try to match by identifier or name from defaultVoiceIdentifiers
          for (const identifier of defaultVoiceIdentifiers) {
            foundVoice = voices.find(
              (v) => v.identifier === identifier || v.name === identifier
            );
            if (foundVoice) {
              console.log(foundVoice);
              break;
            }
          }
          // 2. If not found, try to pick the first en-US voice
          if (!foundVoice) {
            console.log('no voices found!');
            foundVoice = voices.find(
              (v) => v.language && v.language.toLowerCase().startsWith('en-us')
            );
          }
          // 3. If still not found, fallback to first available
          if (!foundVoice && voices.length > 0) {
            foundVoice = voices[0];
          }
          if (foundVoice) {
            selectedVoice = foundVoice.identifier;
            setVoiceIdentifier(foundVoice.identifier);
          }
        } else {
          // Validate that the selectedVoice is still available
          if (!voices.find((v) => v.identifier === selectedVoice)) {
            let foundVoice;
            // 1. Try to match by identifier or name from defaultVoiceIdentifiers
            for (const identifier of defaultVoiceIdentifiers) {
              foundVoice = voices.find(
                (v) => v.identifier === identifier || v.name === identifier
              );
              if (foundVoice) break;
            }
            // 2. If not found, try to pick the first en-US voice
            if (!foundVoice) {
              foundVoice = voices.find(
                (v) =>
                  v.language && v.language.toLowerCase().startsWith('en-us')
              );
            }
            // 3. If still not found, fallback to first available
            if (!foundVoice && voices.length > 0) {
              foundVoice = voices[0];
            }
            if (foundVoice) {
              selectedVoice = foundVoice.identifier;
              setVoiceIdentifier(foundVoice.identifier);
            }
          }
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
    console.log('The chosen voiceIdentifier is: ' + voiceIdentifier);
    console.log('The chosen language is: ' + i18n.language);
  };

  // Custom setter for voiceIdentifier to log changes
  const setVoiceIdentifierWithLog = (identifier: string | undefined) => {
    setVoiceIdentifier(identifier);
    console.log('voiceIdentifier set to:', identifier);
  };

  return (
    <SpeechContext.Provider
      value={{
        speakText,
        requestedLanguage,
        setRequestedLanguage,
        readAloudMode,
        setReadAloudMode,
        voiceIdentifier,
        setVoiceIdentifier: setVoiceIdentifierWithLog,
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
