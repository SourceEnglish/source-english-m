import React from 'react';
import { View, Button } from 'react-native';

interface LanguageSelectorProps {
  changeLanguage: (lng: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  changeLanguage,
}) => {
  return (
    <View>
      <Button title="English" onPress={() => changeLanguage('en-US')} />
      <Button title="Spanish" onPress={() => changeLanguage('es-MX')} />
      {/* Add more languages as needed */}
    </View>
  );
};

export default LanguageSelector;
