import React, { useState, useEffect, useContext } from 'react';
import { Platform, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import languages from '@/languages.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { useSpeech } from '@/contexts/SpeechContext'; // Import SpeechContext

interface LanguageSelectorProps {
  initialLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({}) => {
  const { setVoiceIndex, setRequestedLanguage } = useSpeech(); // Get requestedLanguage from SpeechContext
  let [locale, setLocale] = useState(Localization.getLocales()[0].languageTag);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        let savedLanguage;
        if (Platform.OS === 'web') {
          savedLanguage = localStorage.getItem('language');
        } else {
          savedLanguage = await AsyncStorage.getItem('language');
        }

        if (savedLanguage) {
          setLocale(savedLanguage);
          setValue(savedLanguage); // Set the current value in the language selector
          await i18n.changeLanguage(savedLanguage);
          setRequestedLanguage(savedLanguage);
        } else {
          await changeLanguage(locale);
        }
      } catch (error) {
        console.error('Failed to load language', error);
      }
    };

    loadLanguage();
  }, []);

  const changeLanguage = async (lng: string) => {
    try {
      await i18n.changeLanguage(lng);
      setLocale(lng);
      if (Platform.OS === 'web') {
        localStorage.setItem('language', lng);
        console.log('set language to' + locale);
      } else {
        await AsyncStorage.setItem('language', lng);
        console.log('set language to' + locale);
      }
      setRequestedLanguage(lng);
    } catch (error) {
      console.error('Failed to change language', error);
      // Set the requested language in the SpeechContext
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState(languages);

  return (
    <>
      <Text>Current Locale: {locale}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={(value) => {
          if (value) {
            setValue(value);
            changeLanguage(value);
          }
        }}
        listMode="MODAL"
        setItems={setItems}
        searchable={true}
      />
    </>
  );
};

export default LanguageSelector;
