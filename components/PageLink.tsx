import { Link, RelativePathString } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useSpeech } from '@/contexts/SpeechContext';
import ReadableText from '@/components/ReadableText';

interface PageLinkProps {
  pagePath: string;
  pageText: string;
  pageTextTranslated: string;
  icon?: React.ReactNode;
}

const PageLink: React.FC<PageLinkProps> = ({
  pagePath,
  pageText,
  pageTextTranslated,
  icon,
}) => {
  const { theme } = useTheme();
  const { readAloudMode, requestedLanguage } = useSpeech();

  return (
    <Link
      href={pagePath as RelativePathString}
      style={{
        backgroundColor: theme.backgroundColor,
        borderRadius: 4,
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        width: '100%', // Make the link take full width of its container
        opacity: readAloudMode ? 1 : 1,
        alignContent: 'center',
        textAlignVertical: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
      onPress={(e) => {
        if (readAloudMode) {
          e.preventDefault(); // Prevent link navigation
          e.stopPropagation(); // Prevent parent link navigation
        }
      }}
    >
      <View style={{ paddingRight: 5 }}>{icon}</View>
      <View>
        <ReadableText
          text={pageText}
          style={{ color: theme.textColor, fontSize: 20 }}
          translatedText={
            requestedLanguage !== 'en-US' ? pageTextTranslated : undefined
          }
        />
      </View>
    </Link>
  );
};

export default PageLink;
