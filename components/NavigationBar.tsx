import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import { useSpeech } from '@/contexts/SpeechContext';
import HomeIcon from '@/assets/icons/licensed/home.svg';
import MoreOptionsIcon from '@/assets/icons/licensed/more_options.svg';
import SpeakIcon from '@/assets/icons/licensed/speak.svg';
import PropTypes from 'prop-types';

interface NavigationBarProps {
  headerHeight: number;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ headerHeight }) => {
  const router = useRouter();
  const { readAloudMode, setReadAloudMode, setVoiceIndex } = useSpeech();
  const [visible, setVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false); // State to track button press

  const handleReadAloudToggle = async () => {
    if (readAloudMode) {
      setReadAloudMode(false);
      return;
    }
    setReadAloudMode(true);
    const voices = await Speech.getAvailableVoicesAsync();
    let hasEnglishUS = false;
    let voiceIndex = voices.findIndex((voice) =>
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
  };

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <HomeIcon height={headerHeight} />
      </TouchableOpacity>

      {/* Read Aloud Toggle */}
      <TouchableOpacity
        onPress={handleReadAloudToggle}
        onPressIn={() => setIsPressed(true)} // Set isPressed to true when button is pressed
        onPressOut={() => setIsPressed(false)} // Set isPressed to false when button is released
        style={{
          ...styles.button,
          backgroundColor: isPressed || readAloudMode ? '#ffff73' : 'white',
        }}
      >
        <SpeakIcon height={headerHeight} />
      </TouchableOpacity>

      {/* More Options */}
      <TouchableOpacity style={styles.button}>
        <MoreOptionsIcon height={headerHeight} />
      </TouchableOpacity>
    </View>
  );
};

NavigationBar.propTypes = {
  headerHeight: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 10,
    marginBottom: 4,
    marginTop: 4,
    paddingLeft: 10,
    columnGap: 10,
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(216, 216, 216)',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
  },
});

export default NavigationBar;
