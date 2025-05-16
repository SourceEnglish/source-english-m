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
      style={styles.container} // Only apply container styles here
    >
      <Text
        style={{
          ...style, // Apply custom styles passed via the `style` prop
          color: (style as any)?.color || theme.textColor,
          backgroundColor: readAloudMode ? theme.highlightColor : 'transparent',
          alignSelf: 'flex-start', // Prevents text from stretching
          borderRadius: 4, // Optional: rounded highlight
          paddingHorizontal: 2, // Optional: some padding for highlight
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
