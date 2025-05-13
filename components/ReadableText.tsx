import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { useSpeech } from '@/contexts/SpeechContext';
import { useTheme } from '@/contexts/ThemeContext';

interface ReadableTextProps {
  text: string;
  translatedText?: string;
  style?: object; // Allow custom styles to be passed
}

const ReadableText: React.FC<ReadableTextProps> = ({
  text,
  translatedText,
  style,
}) => {
  const { speakText, readAloudMode, setReadAloudMode } = useSpeech();
  const { theme } = useTheme();

  const handlePress = (e: GestureResponderEvent) => {
    if (readAloudMode) {
      e.preventDefault?.(); // Prevent link navigation if available
      e.stopPropagation?.(); // Prevent parent link navigation if available
      speakText(text);
      setReadAloudMode(false);
    }
  };

  return (
    <TouchableOpacity
      disabled={!readAloudMode}
      onPress={handlePress}
      style={[styles.container, style]} // Merge custom styles with container styles
    >
      <Text
        style={{
          ...style, // Apply custom styles passed via the `style` prop
          color: (style as any)?.color || theme.textColor, // Safely access custom color from style prop
          backgroundColor: readAloudMode ? theme.highlightColor : 'transparent',
          fontSize: 16,
        }}
      >
        {text}
      </Text>
      {translatedText && (
        <Text style={{ color: theme.textColor, fontSize: 14 }}>
          {translatedText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    pointerEvents: 'auto',
    borderBottomColor: 'gray',
  },
});

export default ReadableText;
