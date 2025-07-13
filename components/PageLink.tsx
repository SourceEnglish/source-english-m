import { Link } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useSpeech } from '@/contexts/SpeechContext';
import ReadableText from '@/components/ReadableText';
import InlineCardPreview from '@/components/InlineCardPreview';
import lessonsData from '@/i18n/locales/en-us/lessons.json';
import vocabularyData from '@/i18n/locales/en-us/vocabulary.json';
import CardsIcon from '@/assets/icons/licensed/cards.svg';
import LessonIcon from '@/assets/icons/licensed/lesson.svg';
interface PageLinkProps {
  pagePath: string;
  pageText: string;
  pageTextTranslated: string;
  icon?: React.ReactNode;
  index?: number; // Optional index prop for testing purposes
}

const PageLink: React.FC<PageLinkProps> = ({
  pagePath,
  pageText,
  pageTextTranslated,
  icon,
  index,
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
  if (
    (lessonData && lessonData.__type === 'vocabulary') ||
    (lessonData?.__type === 'lesson' && lessonData.__vocab_lesson)
  ) {
    vocabEntries = Array.isArray(vocabularyData)
      ? vocabularyData
          .map((entry: any) => {
            const word = Object.keys(entry)[0];
            return { word, ...entry[word] };
          })
          .filter((entry: any) => {
            if (lessonData?.__type === 'lesson') {
              // If lessonData is a lesson, get entries from its __vocab_lesson instead
              if (lessonData.__vocab_lesson) {
                // Find the vocab lesson entry
                const vocabLessonEntry = lessonsData.find(
                  (entry: any) =>
                    Object.keys(entry)[0] === lessonData.__vocab_lesson
                );
                const vocabLessonData = vocabLessonEntry
                  ? (vocabLessonEntry as Record<string, any>)[
                      lessonData.__vocab_lesson
                    ]
                  : null;
                return vocabLessonData?.__tags?.some((tag: string) =>
                  entry.__tags?.includes(tag)
                );
              }
              return false;
            } else if (lessonData?.__type === 'vocabulary') {
              // For vocabulary lessons, filter by tags
              return lessonData.__tags?.some((tag: string) =>
                entry.__tags?.includes(tag)
              );
            }
            return false;
          })
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
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        // Minimal styling, just layout
        gap: 2, // small gap between links
      }}
    >
      {/* Main page link */}
      <Link
        className="rat"
        href={pagePath as any}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f8f8f8',
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#d0d0d0',
          padding: 10,
          minWidth: 0,
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
          }}
        >
          <View
            style={{
              flex: 1,
              minWidth: 0,
              alignItems: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'nowrap',
              }}
            >
              {/* Show icon before the lesson number */}
              {/* {lessonData?.__type === 'vocabulary' && (
                <CardsIcon
                  width={28}
                  height={28}
                  style={{ marginRight: 6, marginLeft: 0 }}
                />
              )}
              {lessonData?.__type === 'lesson' && (
                <LessonIcon
                  width={28}
                  height={28}
                  style={{ marginRight: 6, marginLeft: 0 }}
                />
              )} */}
              {typeof index === 'number' && (
                <ReadableText
                  text={String(index).padStart(2, '0')}
                  pronunciation={'' + index}
                  style={{
                    color: theme.textColor,
                    fontSize: 20,
                    textAlign: 'left',
                    marginRight: 6,
                  }}
                />
              )}
              <Text style={{ color: 'gray', fontSize: 18 }}>{'| '}</Text>
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
            </View>
            {/* InlineCardPreviews below the text for vocabulary cards */}
            {vocabEntries.length > 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  marginTop: 6,
                  alignItems: 'center',

                  overflow: 'hidden',
                }}
              >
                {vocabEntries.slice(0, maxCards).map((entry: any) => (
                  <InlineCardPreview
                    key={entry.__objectKey || entry.word}
                    card={entry}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </Link>

      {/* Vocab link as sibling if lessonData is a lesson and has __vocab_lesson */}
      {lessonData &&
        lessonData.__type === 'lesson' &&
        lessonData.__vocab_lesson && (
          <Link
            href={`/${lessonData.__vocab_lesson}`}
            style={{
              width: '20%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f8f8f8',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#d0d0d0',
              padding: 10,
              minWidth: 0,
            }}
            onPress={(e) => {
              if (readAloudMode) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <View
              className="vocab"
              style={{
                paddingRight: 4,
                cursor: 'pointer',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                borderColor: 'black',
                borderRadius: 4,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {icon}
                <ReadableText
                  text={'vocab'}
                  style={{
                    fontSize: 16,

                    textAlign: 'center',
                  }}
                ></ReadableText>
              </View>
            </View>
          </Link>
        )}
    </View>
  );
};

export default PageLink;
