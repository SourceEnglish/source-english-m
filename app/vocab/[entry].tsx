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
import VocabEntryDisplay from '@/components/VocabEntryDisplay';
import Notes from '@/components/Notes';
import ExampleSentences from '@/components/ExampleSentences';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';
import { useDeck } from '@/contexts/DeckContext';
import ChevronLeft from '@/assets/icons/open_source/chevron-left.svg';
import ChevronRight from '@/assets/icons/open_source/chevron-right.svg';
import { getIconForEntry } from '@/utils/iconMap';
import { useSpeech } from '@/contexts/SpeechContext';
import VerbConjugationTables from '@/components/VerbConjugationTables';

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
  const entryName = entry as string;
  const router = useRouter();
  const { deckEntries, deckIndex, setDeckIndex } = useDeck();
  const { speakText } = useSpeech();

  React.useEffect(() => {
    // No logging or side effects needed
  }, [deckEntries, deckIndex]);

  // Find the vocab entry
  const vocabEntryObj = vocabularyData.find(
    (e: any) => Object.keys(e)[0] === entryName
  );
  const vocabEntry = vocabEntryObj
    ? {
        ...vocabEntryObj[entryName as keyof typeof vocabEntryObj],
        __objectKey: entryName, // Pass the object key for icon mapping
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

  // Animated letter logic (only for letters)
  let AnimatedLetterComponent: React.FC<any> | null = null;
  let containerMarginTop = 0;
  if (vocabEntry.__pos === 'letter') {
    const word = vocabEntry.word || '';
    const upper = word.charAt(0);
    const lower = word.charAt(1);

    const descenderLetters = ['g', 'j', 'p', 'q', 'y'];
    const hasDescender = descenderLetters.includes(lower);

    // Only apply lowering to the lowercase letter when shown with uppercase
    const lowerTranslateY = hasDescender ? 100 / 3 : 0; // 1/3 lower than others
    containerMarginTop = 0;

    AnimatedLetterComponent = () => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {GetAnimatedLetter(upper)}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateY: lowerTranslateY }],
          }}
        >
          {GetAnimatedLetter(lower)}
        </View>
      </View>
    );
  }

  // Always render the navigation row, but only show chevrons if prev/next exist
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <View style={styles.outerContainer}>
        <Notes noteKey={`vocab_${entryName}`} />
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
            }}
          >
            {prevEntry ? (
              <TouchableOpacity
                onPress={() => {
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
              <VocabEntryDisplay entry={vocabEntry} />
            </View>
          </View>
          <View
            style={{
              width: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {nextEntry ? (
              <TouchableOpacity
                onPress={() => {
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
                  backgroundColor: '#f0f0f0',
                }}
              >
                <ChevronRight width={32} height={32} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        {/* Example sentences in their own view, styled to match Notes width */}
        <View
          style={{
            width: '100%',
            maxWidth: CENTERED_MAX_WIDTH,
            alignSelf: 'center',
          }}
        >
          <ExampleSentences
            examples={
              'examples' in vocabEntry ? (vocabEntry as any).examples : []
            }
          />
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
      {/* Animated letter drawing at the very bottom (only for letters) */}
      {AnimatedLetterComponent && (
        <View
          style={{
            alignItems: 'center',
            marginTop: 24 + containerMarginTop,
            marginBottom: 32,
            minHeight: 100,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <AnimatedLetterComponent />
        </View>
      )}
    </ScrollView>
  );
}
