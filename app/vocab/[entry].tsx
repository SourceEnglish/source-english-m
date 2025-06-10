import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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

export function generateStaticParams() {
  return vocabularyData.map((entry: any) => {
    const name = Object.keys(entry)[0];
    return { entry: name };
  });
}

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
    ? vocabEntryObj[entryName as keyof typeof vocabEntryObj]
    : null;

  if (!vocabEntry) {
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
    </ScrollView>
  );
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
  // title: {
  //   fontSize: 36,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginBottom: 10,
  //   marginTop: 10,
  // },
});
