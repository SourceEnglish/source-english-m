import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useSpeech } from '@/contexts/SpeechContext';
import ReadableText from '@/components/ReadableText';
import InlineCardPreview from '@/components/InlineCardPreview';
import lessonsData from '@/i18n/locales/en-us/lessons.json';
import vocabularyData from '@/i18n/locales/en-us/vocabulary.json';

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

  // Determine if this is a vocabulary lesson link
  let vocabEntries: any[] = [];
  let lessonData: any = null;
  const lessonKey = pagePath.replace(/^\//, '');
  const lessonEntry = lessonsData.find(
    (entry: any) => Object.keys(entry)[0] === lessonKey
  );
  if (lessonEntry) {
    // Use type assertion to access the property
    lessonData = (lessonEntry as Record<string, any>)[lessonKey];
  }
  if (lessonData && lessonData.__type === 'vocabulary') {
    vocabEntries = Array.isArray(vocabularyData)
      ? vocabularyData
          .map((entry: any) => {
            const word = Object.keys(entry)[0];
            return { word, ...entry[word] };
          })
          .filter((entry: any) =>
            lessonData.__tags?.some((tag: string) =>
              entry.__tags?.includes(tag)
            )
          )
      : [];
  }

  // Calculate how many InlineCardPreviews can fit in the available width
  // The available width is the width of the PageLink minus the left and right padding (32px total)
  // Subtract the estimated width of the icon and text (ESTIMATED_TEXT_WIDTH)
  // Each InlineCardPreview is MAX_INLINE_CARD_WIDTH wide (including margin)
  // The container is inside a View with marginLeft: 8, so subtract 8px as well
  const MAX_INLINE_CARD_WIDTH = 62; // 56px card + 6px margin
  const ESTIMATED_TEXT_WIDTH = 180; // icon + text
  const PAGELINK_PADDING = 16;
  const containerMarginLeft = 8;
  const TOTAL_WIDTH = typeof window !== 'undefined' ? window.innerWidth : 400;
  const availablePreviewWidth = Math.max(
    TOTAL_WIDTH * 0.95 -
      ESTIMATED_TEXT_WIDTH -
      PAGELINK_PADDING * 2 -
      containerMarginLeft,
    MAX_INLINE_CARD_WIDTH
  );
  const maxCards =
    Math.max(1, Math.floor(availablePreviewWidth / MAX_INLINE_CARD_WIDTH)) + 1;

  return (
    <Link
      href={pagePath as any}
      style={{
        backgroundColor: theme.backgroundColor,
        borderRadius: 4,
        padding: 16,
        display: 'flex', // Use flex, which is supported by React Native and web
        flexDirection: 'row',
        width: '100%',
        opacity: readAloudMode ? 1 : 1,
        boxSizing: 'border-box',
        overflow: 'hidden', // Ensures children are clipped to the full Link bounds
      }}
      onPress={(e) => {
        if (readAloudMode) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
          minWidth: 0,
          width: '100%', // Ensure child View fills the Link
        }}
      >
        <View style={{ paddingRight: 5 }}>{icon}</View>
        {/* Vertical divider between icon and text */}
        <View
          style={{
            width: 1,
            height: 28,
            backgroundColor: '#d0d0d0',
            marginHorizontal: 10,
            alignSelf: 'center',
          }}
        />
        <ReadableText
          text={pageText}
          style={{ color: theme.textColor, fontSize: 20 }}
          translatedText={
            requestedLanguage !== 'en-US' ? pageTextTranslated : undefined
          }
        />
        {/* InlineCardPreviews directly after text, inline, no line break */}
        {vocabEntries.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'nowrap',
              marginLeft: 8,
              alignItems: 'center',
              overflow: 'visible',
              maxWidth: '100%',
            }}
          >
            {vocabEntries.slice(0, maxCards).map((entry: any) => (
              <InlineCardPreview key={entry.word} card={entry} />
            ))}
          </View>
        )}
      </View>
    </Link>
  );
};

export default PageLink;
