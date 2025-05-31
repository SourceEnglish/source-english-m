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
  pronunciation?: string; // Add this prop
}

const ReadableText: React.FC<ReadableTextProps> = ({
  text,
  translatedText,
  style,
  displayText,
  pronunciation, // Add this prop
  ...props // Capture additional props
}) => {
  const { speakText, readAloudMode, setReadAloudMode } = useSpeech();
  const { theme } = useTheme();

  const handlePress = (e: GestureResponderEvent) => {
    if (readAloudMode) {
      e.preventDefault?.(); // Prevent link navigation if available
      e.stopPropagation?.(); // Prevent parent link navigation if available
      speakText(pronunciation || text); // Use pronunciation if provided
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
        style={{
          ...flatStyle,
          color: flatStyle?.color || theme.textColor,
          backgroundColor: readAloudMode ? theme.highlightColor : 'transparent',
          alignSelf: 'center',
          borderRadius: 4,
          paddingHorizontal: 2,
          fontFamily: flatStyle?.fontFamily || 'Lexend_400Regular',
          textAlign: flatStyle?.textAlign || 'left',
          width: flatStyle?.width || undefined,
          flexWrap: 'wrap',
        }}
        numberOfLines={props.numberOfLines}
        ellipsizeMode={props.ellipsizeMode}
        selectable={true}
      >
        {displayText !== undefined ? displayText : text}
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
