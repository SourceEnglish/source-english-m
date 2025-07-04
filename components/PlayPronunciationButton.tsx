import React from 'react';
import { TouchableOpacity } from 'react-native';
import { getIconForEntry } from '@/utils/iconMap';
import { useSpeech } from '@/contexts/SpeechContext';
import { Audio } from 'expo-av';
import { soundsMap } from '@/constants/constants';

interface PlayPronunciationButtonProps {
  word: string;
  pronunciation?: string;
  style?: object;
}

const PlayPronunciationButton: React.FC<PlayPronunciationButtonProps> = ({
  word,
  pronunciation,
  style,
}) => {
  const { speakText } = useSpeech();

  const handlePress = () => {
    if (pronunciation && pronunciation.endsWith('.wav')) {
      const soundPath = soundsMap.get(pronunciation);
      if (soundPath) {
        Audio.Sound.createAsync(soundPath).then(({ sound }) => {
          sound.playAsync();
        });
        return;
      }
    }
    speakText(pronunciation || word);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      accessibilityLabel="Play pronunciation"
      style={{
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        borderWidth: 1,
        borderColor: '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        minWidth: 56,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        ...(style || {}),
      }}
      activeOpacity={0.7}
    >
      {React.createElement(getIconForEntry({ word: 'speaker' }), {
        width: 24,
        height: 24,
      })}
    </TouchableOpacity>
  );
};

export default PlayPronunciationButton;
