import React, { useMemo } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import InlineCardPreview, {
  VocabularyCarouselContext,
} from '../InlineCardPreview';
import vocabulary from '@/i18n/locales/en-us/vocabulary.json';
import { useDeck } from '@/contexts/DeckContext';
import { useRouter } from 'expo-router';
import { useSpeech } from '@/contexts/SpeechContext';

interface VocabularyCarouselProps {
  tags: string[]; // Array of tags to filter vocabulary
}

const VocabularyCarousel: React.FC<VocabularyCarouselProps> = ({ tags }) => {
  const { setDeckEntries, setDeckIndex } = useDeck();
  const router = useRouter();
  const { readAloudMode } = useSpeech();

  // Flatten vocabulary (array of objects) to array of entries
  const vocabEntries = useMemo(() => {
    return vocabulary
      .flatMap((entryObj: any) =>
        Object.entries(entryObj).map(([key, entry]) => ({
          ...(entry as any),
          __objectKey: key,
        }))
      )
      .filter(
        (entry: any) =>
          entry.__tags && entry.__tags.some((tag: string) => tags.includes(tag))
      );
  }, [tags]);

  // Create array of entry keys for the deck
  const deckEntryKeys = useMemo(() => {
    return vocabEntries.map((entry) => entry.__objectKey);
  }, [vocabEntries]);

  const handleCardPress = (entry: any, index: number) => {
    if (readAloudMode) {
      // Do nothing if readAloudMode is true
      return;
    }

    // Set the deck to the current carousel entries
    setDeckEntries(deckEntryKeys);
    setDeckIndex(index);

    // Navigate to the vocab entry
    const redirect = entry.__redirect;
    const isProperNoun =
      entry.__pos === 'month' ||
      entry.__pos === 'proper_noun' ||
      entry.__pos === 'proper noun';
    let target;
    if (redirect) {
      target = redirect;
    } else if (isProperNoun) {
      if (entry.__objectKey) {
        target = entry.__objectKey.toLowerCase();
      } else if (entry.word) {
        target = entry.word.toLowerCase();
      } else {
        target = entry.__objectKey.toLowerCase();
      }
    } else {
      target = entry.__objectKey;
    }
    router.push(`/vocab/${encodeURIComponent(target)}`);
  };

  return (
    <VocabularyCarouselContext.Provider value={true}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {vocabEntries.map((entry, idx) => (
            <InlineCardPreview
              card={entry}
              key={entry.__objectKey || idx}
              onPress={() => handleCardPress(entry, idx)}
            />
          ))}
        </ScrollView>
      </View>
    </VocabularyCarouselContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100, // Height of one InlineCardPreview (desktop) or 56 (mobile)
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#d6d6d6', // Slightly darker background
    borderRadius: 2,
    paddingVertical: 6,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 6,
  },
});

export default VocabularyCarousel;
