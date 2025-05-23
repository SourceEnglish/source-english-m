import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';
import { useSpeech } from '@/contexts/SpeechContext';
import { useTheme } from '@/contexts/ThemeContext';

interface ReadableTextProps {
  text: string;
  translatedText?: string;
  style?: object; // Allow custom styles to be passed
  numberOfLines?: number; // Number of lines to display before truncating
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'; // How to truncate the text
  displayText?: string; // Optional: text to display (for truncation)
}

const ReadableText: React.FC<ReadableTextProps> = ({
  text,
  translatedText,
  style,
  displayText,
  ...props // Capture additional props
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

  const flatStyle = StyleSheet.flatten(style) as TextStyle | undefined;

  return (
    <TouchableOpacity
      disabled={!readAloudMode}
      onPress={handlePress}
      style={styles.container}
    >
      <Text
        selectable
        style={{
          ...flatStyle,
          color: flatStyle?.color || theme.textColor,
          backgroundColor: readAloudMode ? theme.highlightColor : 'transparent',
          fontFamily: 'Lexend',
          fontWeight: '400',
          alignSelf: 'center',
          borderRadius: 4,
          paddingHorizontal: 2,
          textAlign: flatStyle?.textAlign || 'left',
          width: flatStyle?.width || undefined,
          flexWrap: 'wrap',
        }}
        numberOfLines={props.numberOfLines}
        ellipsizeMode={props.ellipsizeMode}
        selectionColor={theme.highlightColor}
      >
        {displayText !== undefined ? displayText : text}
      </Text>
      {translatedText && (
        <Text selectable style={{ color: theme.textColor, fontSize: 14 }}>
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
