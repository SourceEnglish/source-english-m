import { Link, RelativePathString } from 'expo-router';
import React from 'react';
import {
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useSpeech } from '@/contexts/SpeechContext';
import * as Speech from 'expo-speech';
import { MaterialIcons } from '@expo/vector-icons';

interface PageLinkProps {
  pagePath: string;
  pageText: string;
  pageTextTranslated: string;
  icon?: React.ReactNode; // Optional icon prop
}

const PageLink: React.FC<PageLinkProps> = ({
  pagePath,
  pageText,
  pageTextTranslated,
  icon,
}) => {
  const { theme } = useTheme();
  const { speakText, readAloudMode, setReadAloudMode, requestedLanguage } =
    useSpeech();

  return (
    <Link
      href={pagePath as RelativePathString}
      style={{
        backgroundColor: theme.backgroundColor,
        borderRadius: 4,
        padding: 16,
        display: 'flex',

        opacity: readAloudMode ? 0.5 : 1, // Adjust opacity to indicate disabled state
        alignContent: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
        columnGap: 5,
      }}
      onPress={(e) => {
        if (readAloudMode) {
          e.stopPropagation(); // Prevent parent link navigation
          e.preventDefault();
        }
      }}
    >
      <MaterialIcons name="home" size={32} color="gray" />
      <View>
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
          style={{
            pointerEvents: 'auto',
            zIndex: 1000,
            borderBottomColor: 'gray',

            borderBottomWidth: requestedLanguage === 'en-US' ? 0 : 1,
          }}
        >
          <Text
            style={{
              color: theme.textColor,
              backgroundColor: readAloudMode
                ? theme.highlightColor
                : theme.backgroundColor,

              fontSize: 16,
            }}
          >
            {pageText}
          </Text>
        </TouchableOpacity>

        {requestedLanguage !== 'en-US' && (
          <TouchableOpacity
            style={{
              zIndex: 1000,
            }}
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
        )}
      </View>
    </Link>
  );
};

export default PageLink;
