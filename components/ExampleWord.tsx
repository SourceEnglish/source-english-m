import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import VocabularySection from './VocabularySection';
import VocabularyCarousel from './sections/VocabularyCarousel';
import PlayPronunciationButton from './PlayPronunciationButton';
import vocabulary from '@/i18n/locales/en-us/vocabulary.json';
import ReadableText from './ReadableText';
import InlineCardPreview, {
  VocabularyCarouselContext,
} from './InlineCardPreview';
import { useRouter } from 'expo-router';

interface ExampleWordProps {
  examples?: string[];
  highlight?: string; // substring to underline
}

const ExampleWord: React.FC<ExampleWordProps> = ({ examples, highlight }) => {
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth <= 768;
  const router = useRouter();

  if (!examples || !Array.isArray(examples) || examples.length === 0) {
    return null;
  }

  // Extract words for display
  const words = examples.map((ex) => ex).filter(Boolean);

  // Find the full vocab entries for each word, preserving order
  const vocabEntries = words.map((w) => {
    // Try to match by word (case-insensitive)
    let entryObj = vocabulary.find((entryObj: any) => {
      const entry = Object.values(entryObj)[0] as { word: string };
      return entry.word.toLowerCase() === w.toLowerCase();
    });
    // If not found, try to match by object key (case-insensitive)
    if (!entryObj) {
      entryObj = vocabulary.find((entryObj: any) => {
        const key = Object.keys(entryObj)[0];
        return key.toLowerCase().split(' ')[0] === w.toLowerCase();
      });
    }
    return entryObj ? Object.values(entryObj)[0] : null;
  });

  // Helper to render a word with the highlight substring underlined
  function renderHighlightedWord(word: string, highlight?: string) {
    if (!highlight) {
      return <ReadableText text={word} />;
    }
    // Normalize: replace underscores and multiple spaces with a single space
    const displayWord = word.replace(/[_ ]+/g, ' ').trim();
    const highlightNorm = highlight.toLowerCase().split(/[_ ]+/)[0];
    const displayWordLower = displayWord.toLowerCase();
    const idx = displayWordLower.indexOf(highlightNorm);
    if (idx === -1) return <ReadableText text={displayWord} />;
    return (
      <ReadableText
        text={displayWord}
        underlineRanges={[[idx, idx + highlightNorm.length]]}
      />
    );
  }

  return (
    <VocabularyCarouselContext.Provider value={true}>
      <VocabularySection headerText="Example Words">
        <View style={styles.wordsList}>
          {words.map((word, idx) => {
            const entry = vocabEntries[idx];
            return (
              <View key={idx} style={styles.wordRow}>
                {entry && (
                  <View style={{ marginRight: 10 }}>
                    <InlineCardPreview card={entry} />
                  </View>
                )}
                <PlayPronunciationButton word={word} pronunciation={word} />
                <View style={{ width: 12 }} />{' '}
                {/* gap between button and word */}
                {renderHighlightedWord(word, highlight)}
              </View>
            );
          })}
        </View>
      </VocabularySection>
    </VocabularyCarouselContext.Provider>
  );
};

const styles = StyleSheet.create({
  wordsList: {
    width: '100%',
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  wordText: {
    marginRight: 10,
    color: '#444',
    fontWeight: 'bold',
  },
});

export default ExampleWord;
