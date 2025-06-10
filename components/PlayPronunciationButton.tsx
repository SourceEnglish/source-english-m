import React from 'react';
import { TouchableOpacity } from 'react-native';
import { getIconForEntry } from '@/utils/iconMap';
import { useSpeech } from '@/contexts/SpeechContext';

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

  return (
    <TouchableOpacity
      onPress={() => {
        speakText(pronunciation || word);
      }}
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
