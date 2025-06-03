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
          // Sort by __display_priority if present
          .sort((a: any, b: any) => {
            const aHasPriority = typeof a.__display_priority === 'number';
            const bHasPriority = typeof b.__display_priority === 'number';
            if (aHasPriority && bHasPriority) {
              return a.__display_priority - b.__display_priority;
            }
            if (aHasPriority) return -1;
            if (bHasPriority) return 1;
            return 0;
          })
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
  const maxCards = Math.min(
    16,
    Math.max(3, Math.floor(availablePreviewWidth / MAX_INLINE_CARD_WIDTH) + 1)
  );

  return (
    <Link
      href={pagePath as any}
      style={{
        backgroundColor: theme.backgroundColor,
        borderRadius: 4,
        padding: 10,
        paddingLeft: 16,
        paddingTop: lessonData && lessonData.__type !== 'vocabulary' ? 18 : 10,
        paddingBottom:
          lessonData && lessonData.__type !== 'vocabulary' ? 18 : 10,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        opacity: readAloudMode ? 1 : 1,
        boxSizing: 'border-box',
        overflow: 'hidden',
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
          width: '100%',
        }}
      >
        <View style={{ paddingRight: 5 }}>
          {icon}
          {lessonData && lessonData.__type === 'vocabulary' &&
            !lessonData.__tags?.includes('letters') &&
            !lessonData.__tags?.includes('numbers') && (
            <View
              style={{
                backgroundColor: '#176a3d',
                borderRadius: 4,
                paddingHorizontal: 1,
                paddingVertical: 1,
                marginTop: 2,
                alignSelf: 'center',
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontSize: 11,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontFamily: 'Lexend_400Regular, sans-serif',
                  display: 'block',
                  lineHeight: '12px',
                  width: '100%',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                vocab
              </span>
            </View>
          )}
        </View>
        <View
          style={{
            width: 1,
            height: 28,
            backgroundColor: '#d0d0d0',
            marginHorizontal: 10,
            alignSelf: 'center',
          }}
        />
        <View style={{ flex: 1, minWidth: 0, alignItems: 'flex-start' }}>
          <ReadableText
            text={pageText}
            style={{
              color: theme.textColor,
              fontSize: 20,
              textAlign: 'left',
            }}
            translatedText={
              requestedLanguage !== 'en-US' ? pageTextTranslated : undefined
            }
          />
          {/* InlineCardPreviews below the text for vocabulary cards */}
          {vocabEntries.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                marginTop: 6,
                alignItems: 'center',
                maxWidth: '100%',
                overflow: 'hidden',
              }}
            >
              {vocabEntries.slice(0, maxCards).map((entry: any) => (
                <InlineCardPreview key={entry.word} card={entry} />
              ))}
            </View>
          )}
        </View>
      </View>
    </Link>
  );
};

export default PageLink;
