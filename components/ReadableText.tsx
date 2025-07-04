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
import { Audio } from 'expo-av';
import { soundsMap } from '@/constants/constants';

interface ReadableTextProps {
  text: string;
  translatedText?: string;
  style?: object; // Allow custom styles to be passed
  numberOfLines?: number; // Number of lines to display before truncating
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip'; // How to truncate the text
  displayText?: string; // Optional: text to display (for truncation)
  pronunciation?: string; // Add this prop
  underlineRanges?: [number, number][]; // Array of [start, end) indices to underline
  children?: React.ReactNode; // For custom rendering (used in ExampleWord)
}

const ReadableText: React.FC<ReadableTextProps> = ({
  text,
  translatedText,
  style,
  displayText,
  pronunciation, // Add this prop
  underlineRanges,
  children,
  ...props // Capture additional props
}) => {
  const { speakText, readAloudMode, setReadAloudMode } = useSpeech();
  const { theme } = useTheme();

  const handlePress = (e: GestureResponderEvent) => {
    if (readAloudMode) {
      e.preventDefault?.();
      e.stopPropagation?.();
      if (pronunciation && pronunciation.endsWith('.wav')) {
        const soundPath = soundsMap.get(pronunciation);
        if (soundPath) {
          Audio.Sound.createAsync(soundPath).then(({ sound }) => {
            sound.playAsync();
          });
        }
      } else {
        speakText(pronunciation || text);
      }
      setReadAloudMode(false);
    }
  };

  const flatStyle = StyleSheet.flatten(style) as TextStyle | undefined;

  // If children are provided, render as-is (for custom composition)
  if (children) {
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
            backgroundColor: readAloudMode
              ? theme.highlightColor
              : 'transparent',
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
          {children}
        </Text>
        {translatedText && (
          <Text style={{ color: theme.textColor, fontSize: 14 }}>
            {translatedText}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  // If underlineRanges is provided, split and render with underlines
  let renderedText: React.ReactNode = null;
  if (underlineRanges && underlineRanges.length > 0) {
    const segments: React.ReactNode[] = [];
    let lastIdx = 0;
    underlineRanges
      .sort((a, b) => a[0] - b[0])
      .forEach(([start, end], i) => {
        if (start > lastIdx) {
          segments.push(
            <Text key={`plain-${i}`}>
              {(displayText ?? text).slice(lastIdx, start)}
            </Text>
          );
        }
        segments.push(
          <Text
            key={`underline-${i}`}
            style={{ textDecorationLine: 'underline' }}
          >
            {(displayText ?? text).slice(start, end)}
          </Text>
        );
        lastIdx = end;
      });
    if (lastIdx < (displayText ?? text).length) {
      segments.push(
        <Text key="plain-last">{(displayText ?? text).slice(lastIdx)}</Text>
      );
    }
    renderedText = segments;
  } else {
    renderedText = displayText !== undefined ? displayText : text;
  }

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
        {renderedText}
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
