import { Link, RelativePathString } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useSpeech } from '@/contexts/SpeechContext';
import * as Speech from 'expo-speech';

interface PageLinkProps {
  pagePath: string;
  pageText: string;
  pageTextTranslated: string;
}

const PageLink: React.FC<PageLinkProps> = ({
  pagePath,
  pageText,
  pageTextTranslated,
}) => {
  const { theme } = useTheme();
  const { speakText, readAloudMode, setReadAloudMode } = useSpeech();

  return (
    <Link
      href={pagePath as RelativePathString}
      style={{
        backgroundColor: theme.backgroundColor,
        borderRadius: 4,
        padding: 16,
        opacity: readAloudMode ? 0.5 : 1, // Adjust opacity to indicate disabled state
      }}
      onPress={(e) => {
        if (readAloudMode) {
          e.stopPropagation(); // Prevent parent link navigation
          e.preventDefault();
        }
      }}
    >
      <TouchableOpacity
        disabled={!readAloudMode}
        onPress={(e) => {
          if (readAloudMode) {
            e.stopPropagation(); // Prevent parent link navigation
            e.preventDefault();
            speakText(pageText);
            setReadAloudMode(false);
          }
        }}
      >
        <Text
          style={{
            color: theme.textColor,
            backgroundColor: readAloudMode
              ? theme.highlightColor
              : theme.backgroundColor,
          }}
        >
          {pageText}
        </Text>
      </TouchableOpacity>
      <Text> | </Text>
      <TouchableOpacity
        disabled={!readAloudMode}
        onPress={(e) => {
          if (readAloudMode) {
            e.stopPropagation(); // Prevent parent link navigation
            e.preventDefault();
            speakText(pageTextTranslated, true);
            setReadAloudMode(false);
          }
        }}
      >
        <Text style={{ color: theme.textColor }}>{pageTextTranslated}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default PageLink;
