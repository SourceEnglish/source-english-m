import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { GetAnimatedLetter } from '@/constants/StrokeData';
import vocabularyData from '@/i18n/locales/en-us/vocabulary.json';
import Notes from '@/components/Notes';
import ExampleSentences from '@/components/ExampleSentences';
import ExampleEntries from '@/components/ExampleEntries';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';
import { useDeck } from '@/contexts/DeckContext';
import ChevronLeft from '@/assets/icons/open_source/chevron-left.svg';
import ChevronRight from '@/assets/icons/open_source/chevron-right.svg';
import { getIconForEntry } from '@/utils/iconMap';
import { useSpeech } from '@/contexts/SpeechContext';
import VerbConjugationTables from '@/components/VerbConjugationTables';
import Svg, { Line, G } from 'react-native-svg';
import LetterFormation from '@/components/LetterFormation';
import VocabularySection from '@/components/VocabularySection';
import LetterVariations from '@/components/LetterVariants';
import AbbreviationsDisplay from '@/components/AbbreviationsDisplay';

import LessonBacklink from '@/components/LessonBacklink';
import SynonymDisplay from '@/components/SynonymDisplay';
import VocabCard from '@/components/VocabCard';

// Extend the Window interface to include __globalVocabScrollY
declare global {
  interface Window {
    __globalVocabScrollY?: number;
  }
}
export function generateStaticParams() {
  return vocabularyData.map((entry: any) => {
    const name = Object.keys(entry)[0];
    return { entry: name };
  });
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    maxWidth: CENTERED_MAX_WIDTH,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,

    paddingVertical: 0,
  },
});

export default function VocabEntryPage() {
  const { entry } = useLocalSearchParams();
  const entryName = (entry as string)?.toLowerCase();
  const router = useRouter();
  const { deckEntries, deckIndex, setDeckIndex } = useDeck();
  const { speakText } = useSpeech();

  // Refs for stable access in event handlers
  const deckEntriesRef = React.useRef(deckEntries);
  const deckIndexRef = React.useRef(deckIndex);
  const scrollViewRef = React.useRef<ScrollView>(null);
  // Store scroll position between navigations (persist across remounts)
  // Use a global variable so it survives navigation
  // eslint-disable-next-line no-var
  var __globalVocabScrollY =
    typeof window !== 'undefined' &&
    window.hasOwnProperty('__globalVocabScrollY')
      ? window.__globalVocabScrollY
      : undefined;
  const scrollPosRef = React.useRef(
    typeof __globalVocabScrollY === 'number' ? __globalVocabScrollY : 0
  );

  React.useEffect(() => {
    deckEntriesRef.current = deckEntries;
    deckIndexRef.current = deckIndex;
  }, [deckEntries, deckIndex]);

  React.useEffect(() => {
    // No logging or side effects needed
  }, [deckEntries, deckIndex]);

  // Restore scroll position if set
  React.useEffect(() => {
    // Always restore scroll position if set (even if 0)
    if (typeof scrollPosRef.current === 'number' && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          y: scrollPosRef.current,
          animated: false,
        });
        // Clear global after restoring
        if (typeof window !== 'undefined') {
          window.__globalVocabScrollY = undefined;
        }
      }, 0);
    }
  }, [entryName]);

  // Keyboard navigation: left/right arrow for prev/next card (always use DeckContext state)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const entries = deckEntriesRef.current;
      const idx = deckIndexRef.current;
      if (!entries || idx === null) return;
      const retainScroll = e.shiftKey;
      if (
        (e.key === 'ArrowLeft' && idx > 0) ||
        (e.key === 'ArrowRight' && idx < entries.length - 1)
      ) {
        if (typeof window !== 'undefined') {
          window.__globalVocabScrollY = retainScroll ? scrollPosRef.current : 0;
        }
      }
      if (e.key === 'ArrowLeft' && idx > 0) {
        setDeckIndex(idx - 1);
        router.replace({
          pathname: '/vocab/[entry]',
          params: { entry: entries[idx - 1] },
        });
      } else if (e.key === 'ArrowRight' && idx < entries.length - 1) {
        setDeckIndex(idx + 1);
        router.replace({
          pathname: '/vocab/[entry]',
          params: { entry: entries[idx + 1] },
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setDeckIndex, router]);

  // Find the vocab entry
  const vocabEntryObj = vocabularyData.find(
    (e: any) => Object.keys(e)[0].toLowerCase() === entryName
  );
  const vocabEntry = vocabEntryObj
    ? {
        ...vocabEntryObj[
          Object.keys(vocabEntryObj)[0] as keyof typeof vocabEntryObj
        ],
        __objectKey: Object.keys(vocabEntryObj)[0], // always use the original key for display
      }
    : null;

  // Type guard: check for required fields
  if (
    !vocabEntry ||
    typeof vocabEntry !== 'object' ||
    !('__pos' in vocabEntry) ||
    !('word' in vocabEntry)
  ) {
    return <Text>Vocab entry not found</Text>;
  }

  // Deck navigation logic
  let prevEntry: string | null = null;
  let nextEntry: string | null = null;
  let prevIdx: number | null = null;
  let nextIdx: number | null = null;
  if (
    deckEntries &&
    deckEntries.length > 1 &&
    deckIndex !== null &&
    deckIndex >= 0
  ) {
    if (deckIndex > 0) {
      prevEntry = deckEntries[deckIndex - 1];
      prevIdx = deckIndex - 1;
    }
    if (deckIndex < deckEntries.length - 1) {
      nextEntry = deckEntries[deckIndex + 1];
      nextIdx = deckIndex + 1;
    }
  }

  // Animated letter/number logic (for letters and numbers)
  let AnimatedLetterComponent: React.FC<any> | null = null;
  let containerMarginTop = 0;
  const numbers = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];
  // Only show animated formation for letter or number, not multigraph
  if (
    vocabEntry.__pos === 'letter' ||
    (vocabEntry.__pos === 'number' && numbers.includes(vocabEntry.word))
  ) {
    const word = vocabEntry.word || '';
    const isNumber = vocabEntry.__pos === 'number';

    const descenderLetters = ['g', 'j', 'p', 'q', 'y'];

    // Letter height background lines (shared for both letters and numbers)
    const LetterHeightLines = ({
      width = 100,
      height = 100,
      viewBox = '0 0 44 36',
      letter = '',
    }: {
      width?: number;
      height?: number;
      viewBox?: string;
      letter?: string;
    }) => {
      let vbArr = viewBox.split(' ').map(Number);
      let viewBoxHeight = vbArr[3];
      let viewBoxWidth = vbArr[2];
      // Y positions in SVG coordinates
      const topY = 5.5;
      const bottomY = viewBoxHeight - 5.5;
      const centerY = viewBoxHeight / 2;
      return (
        <Svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <G>
            {/* Top solid line */}
            <Line
              x1={0}
              y1={topY * (height / viewBoxHeight)}
              x2={width}
              y2={topY * (height / viewBoxHeight)}
              stroke="#000"
              strokeWidth={0.6}
            />
            {/* Bottom solid line */}
            <Line
              x1={0}
              y1={bottomY * (height / viewBoxHeight)}
              x2={width}
              y2={bottomY * (height / viewBoxHeight)}
              stroke="#000"
              strokeWidth={0.6}
            />
            {/* Center dotted line */}
            <Line
              x1={0}
              y1={centerY * (height / viewBoxHeight)}
              x2={width}
              y2={centerY * (height / viewBoxHeight)}
              stroke="#ADD8E6"
              strokeWidth={0.4}
              strokeDasharray="6,6"
            />
          </G>
        </Svg>
      );
    };

    if (isNumber) {
      // For numbers, just show the animated number (single digit, 0-9)
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: 120,
            height: 120,
          }}
        >
          {/* Letter height background lines, absolutely positioned */}
          <LetterHeightLines width={120} height={120} letter={word} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              flex: 1,
            }}
          >
            {GetAnimatedLetter(word)}
          </View>
        </View>
      );
    } else {
      // For letters, show uppercase and lowercase side by side
      const upper = word.charAt(0);
      const lower = word.charAt(1);
      const hasDescender = descenderLetters.includes(lower);
      const lowerTranslateY = hasDescender ? 100 / 3 : 0; // 1/3 lower than others
      containerMarginTop = 0;

      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: 200,
            height: 120,
          }}
        >
          {/* Letter height background lines, absolutely positioned */}
          <LetterHeightLines width={200} height={120} letter={lower} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              flex: 1,
            }}
          >
            {GetAnimatedLetter(upper)}
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
              zIndex: 1,
              flex: 1,
            }}
          >
            {GetAnimatedLetter(lower)}
          </View>
        </View>
      );
    }
  }

  // Always render the navigation row, but only show chevrons if prev/next exist
  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      onScroll={(e) => {
        // Keep scroll position up to date for fallback
        scrollPosRef.current = e.nativeEvent.contentOffset.y;
        // Do NOT update global here; only update when shift is held during navigation
      }}
      scrollEventThrottle={16}
    >
      <View style={styles.outerContainer}>
        <Notes noteKey={`vocab_${entryName}`} />
        {/* Lesson backlink moved to bottom as last section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 40,
          }}
        >
          <View
            style={{
              width: 48,
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              marginHorizontal: 4,
            }}
          >
            {prevEntry ? (
              <TouchableOpacity
                onPress={(e) => {
                  // Detect shift key
                  const retainScroll = e && (e as any).shiftKey;
                  if (typeof window !== 'undefined') {
                    window.__globalVocabScrollY = retainScroll
                      ? scrollPosRef.current
                      : 0;
                  }
                  setDeckIndex(prevIdx);
                  router.replace({
                    pathname: '/vocab/[entry]',
                    params: { entry: prevEntry },
                  });
                }}
                accessibilityLabel="Previous card"
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: '#000000',
                  borderRadius: 8,
                  height: '100%',
                  justifyContent: 'center',
                  backgroundColor: '#f0f0f0',
                }}
              >
                <ChevronLeft width={32} height={32} />
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: 5,
              marginRight: 5,
              maxWidth: CENTERED_MAX_WIDTH,
            }}
          >
            <View style={{ flex: 1 }}>
              <VocabCard
                card={{
                  ...vocabEntry,
                  __synonym_pronunciations: Array.isArray(
                    (vocabEntry as any).__synonym_pronunciations
                  )
                    ? Object.fromEntries(
                        (
                          (vocabEntry as any).__synonym_pronunciations || []
                        ).map((v: string, i: number) => [String(i), v])
                      )
                    : (vocabEntry as any).__synonym_pronunciations,
                  __abbreviation_pronunciations: Array.isArray(
                    (vocabEntry as any).__abbreviation_pronunciations
                  )
                    ? Object.fromEntries(
                        (
                          (vocabEntry as any).__abbreviation_pronunciations ||
                          []
                        ).map((v: string, i: number) => [String(i), v])
                      )
                    : (vocabEntry as any).__abbreviation_pronunciations,
                  synonym_notes:
                    typeof (vocabEntry as any).synonym_notes === 'string'
                      ? { default: (vocabEntry as any).synonym_notes }
                      : (vocabEntry as any).synonym_notes,
                }}
                size="large"
              />
            </View>
          </View>
          <View
            style={{
              width: 48,
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
              marginHorizontal: 4,
            }}
          >
            {nextEntry ? (
              <TouchableOpacity
                onPress={(e) => {
                  // Detect shift key
                  const retainScroll = e && (e as any).shiftKey;
                  if (typeof window !== 'undefined') {
                    window.__globalVocabScrollY = retainScroll
                      ? scrollPosRef.current
                      : 0;
                  }
                  setDeckIndex(nextIdx);
                  router.replace({
                    pathname: '/vocab/[entry]',
                    params: { entry: nextEntry },
                  });
                }}
                accessibilityLabel="Next card"
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: '#888',
                  borderRadius: 8,
                  height: '100%',
                  backgroundColor: '#f0f0f0',
                  justifyContent: 'center',
                }}
              >
                <ChevronRight width={32} height={32} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      {/* Animated letter drawing at the very top (only for letters/numbers) */}
      {AnimatedLetterComponent && (
        <VocabularySection
          headerText={
            vocabEntry.__pos === 'number'
              ? 'Number Formation'
              : 'Letter Formation'
          }
        >
          {AnimatedLetterComponent && (
            <View
              style={{
                alignItems: 'center',
                marginTop: 0 + containerMarginTop,
                minHeight: 100,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <AnimatedLetterComponent />
            </View>
          )}
        </VocabularySection>
      )}
      {/* Letter/number alternative variants */}
      {'__lowercase_variants' in vocabEntry &&
        Array.isArray((vocabEntry as any).__lowercase_variants) &&
        (vocabEntry as any).__lowercase_variants.length > 0 && (
          <LetterVariations
            variations={(vocabEntry as any).__lowercase_variants}
            headerText="Other Formations (Lowercase)"
          />
        )}
      {'__uppercase_variants' in vocabEntry &&
        Array.isArray((vocabEntry as any).__uppercase_variants) &&
        (vocabEntry as any).__uppercase_variants.length > 0 && (
          <LetterVariations
            variations={(vocabEntry as any).__uppercase_variants}
            headerText="Other Formations (Uppercase)"
          />
        )}
      {'__variants' in vocabEntry &&
        Array.isArray((vocabEntry as any).__variants) &&
        (vocabEntry as any).__variants.length > 0 && (
          <LetterVariations
            variations={(vocabEntry as any).__variants}
            headerText="Other Formations"
          />
        )}

      {/* Abbreviations section */}
      {'__abbreviations' in vocabEntry &&
        Array.isArray((vocabEntry as any).__abbreviations) &&
        (vocabEntry as any).__abbreviations.length > 0 && (
          <AbbreviationsDisplay
            abbreviations={(vocabEntry as any).__abbreviations}
            abbreviationNotes={(vocabEntry as any).__abbreviation_notes}
            abbreviationPronunciations={
              (vocabEntry as any).__abbreviation_pronunciations
            }
            word={vocabEntry.word}
          />
        )}

      {/* Synonyms section */}
      {'__synonyms' in vocabEntry &&
        Array.isArray((vocabEntry as any).__synonyms) &&
        (vocabEntry as any).__synonyms.length > 0 && (
          <SynonymDisplay
            synonyms={(vocabEntry as any).__synonyms}
            synonymNotes={(vocabEntry as any).synonym_notes}
            synonymPronunciations={(vocabEntry as any).__synonym_pronunciations}
            word={vocabEntry.word}
          />
        )}

      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        {/* Example sentences or words in their own view, styled to match Notes width */}
        <View
          style={{
            width: '100%',
            maxWidth: CENTERED_MAX_WIDTH,
            alignSelf: 'center',
          }}
        >
          {vocabEntry.__pos === 'multigraph' ||
          vocabEntry.__pos === 'letter' ? (
            (vocabEntry as any).__exampleEntries && (
              <ExampleEntries
                entries={(vocabEntry as any).__exampleEntries.map((e: any) => ({
                  ipa: e.__ipa,
                  pronunciation: e.__forced_pronunciation,
                  examples: e.examples || [],
                  header: e.header,
                  header_pronunciation: e.__header_pronunciation,
                }))}
                highlight={vocabEntry.word}
              />
            )
          ) : (
            <ExampleSentences
              examples={
                'examples' in vocabEntry ? (vocabEntry as any).examples : []
              }
            />
          )}
        </View>
        {/* Verb conjugation tables for verbs, below example sentences */}
        <View
          style={{
            width: '100%',
            alignSelf: 'stretch',
            marginTop: 12,
          }}
        >
          {'__pos' in vocabEntry &&
            vocabEntry.__pos === 'verb' &&
            'conjugation' in vocabEntry &&
            vocabEntry.conjugation && (
              <VerbConjugationTables entry={vocabEntry as any} />
            )}
        </View>
      </View>
      {/* Lesson backlink as last section: always show, pass tags if __lessons not present */}
      <LessonBacklink
        lessons={
          Array.isArray((vocabEntry as any)['__lessons']) &&
          (vocabEntry as any)['__lessons'].length > 0
            ? (vocabEntry as any)['__lessons']
            : Array.isArray((vocabEntry as any)['__tags'])
            ? (vocabEntry as any)['__tags']
            : []
        }
      />
    </ScrollView>
  );
}
