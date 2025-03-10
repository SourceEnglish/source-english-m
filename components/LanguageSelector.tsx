import React, { useState, useEffect } from 'react';
import { Platform, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import languages from '@/languages.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';

interface LanguageSelectorProps {
  // changeLanguage: (lng: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({}) => {
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
      } else {
        await AsyncStorage.setItem('language', lng);
      }
    } catch (error) {
      console.error('Failed to change language', error);
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState(languages);

  // useEffect(() => {
  //   const fetchLanguage = async () => {
  //     let language;
  //     if (Platform.OS === 'web') {
  //       language = localStorage.getItem('language');
  //     } else {
  //       language = await AsyncStorage.getItem('language');
  //     }
  //     if (language) {
  //       setValue(language);
  //       changeLanguage(language);
  //     } else {
  //       let defaultValue = Localization.getLocales()[0].languageTag;
  //       if (defaultValue) {
  //         setValue(defaultValue);
  //       }
  //     }
  //   };

  //   fetchLanguage();
  // }, [changeLanguage]);

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
