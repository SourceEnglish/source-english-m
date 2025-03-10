import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import languages from '@/languages.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

interface LanguageSelectorProps {
  changeLanguage: (lng: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  changeLanguage,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState(languages);

  useEffect(() => {
    const fetchLanguage = async () => {
      let language;
      if (Platform.OS === 'web') {
        language = localStorage.getItem('language');
      } else {
        language = await AsyncStorage.getItem('language');
      }
      if (language) {
        setValue(language);
        changeLanguage(language);
      } else {
        let defaultValue = Localization.getLocales()[0].languageTag;
        if (defaultValue) {
          setValue(defaultValue);
        }
      }
    };

    fetchLanguage();
  }, [changeLanguage]);

  return (
    <>
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
