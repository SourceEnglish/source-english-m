import React from 'react';
import { View, StyleSheet } from 'react-native';
import VocabularySection from './VocabularySection';
import PlayPronunciationButton from './PlayPronunciationButton';
import vocabulary from '@/i18n/locales/en-us/vocabulary.json';
import ReadableText from './ReadableText';
import InlineCardPreview, {
  VocabularyCarouselContext,
} from './InlineCardPreview';

interface ExampleEntry {
  ipa?: string;
  pronunciation?: string;
  examples: string[];
  header?: string;
  header_pronunciation?: string;
}

interface ExampleEntriesProps {
  entries: ExampleEntry[];
  highlight?: string;
}

const ExampleEntries: React.FC<ExampleEntriesProps> = ({
  entries,
  highlight,
}) => {
  // Helper to render a word with the highlight substring underlined
  function renderHighlightedWord(word: string, highlight?: string) {
    if (!highlight) {
      return <ReadableText text={word} />;
    }
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
      {entries.map((entry, entryIdx) => (
        <VocabularySection
          key={entryIdx}
          headerItem={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {entry.header_pronunciation && (
                <PlayPronunciationButton
                  word={entry.header || entry.ipa || ''}
                  pronunciation={entry.header_pronunciation}
                  style={{ marginRight: 8 }}
                />
              )}
              {!entry.header_pronunciation && entry.ipa && (
                <PlayPronunciationButton
                  word={entry.ipa}
                  pronunciation={entry.pronunciation || entry.ipa}
                  style={{ marginRight: 8 }}
                />
              )}
              <ReadableText
                text={
                  entry.header ||
                  (entry.ipa ? `/${entry.ipa}/` : 'Example Words')
                }
                pronunciation={entry.header_pronunciation}
                style={{ fontSize: 28 }}
              />
            </View>
          }
        >
          <View style={styles.wordsList}>
            {entry.examples.map((word, idx) => {
              // Find vocab entry for preview
              let vocabEntryObj = vocabulary.find((entryObj: any) => {
                const entryVal = Object.values(entryObj)[0] as { word: string };
                return entryVal.word.toLowerCase() === word.toLowerCase();
              });
              if (!vocabEntryObj) {
                vocabEntryObj = vocabulary.find((entryObj: any) => {
                  const key = Object.keys(entryObj)[0];
                  return key.toLowerCase().split(' ')[0] === word.toLowerCase();
                });
              }
              const vocabEntry = vocabEntryObj
                ? Object.values(vocabEntryObj)[0]
                : null;

              return (
                <View key={idx} style={styles.wordRow}>
                  {vocabEntry && (
                    <View style={{ marginRight: 10 }}>
                      <InlineCardPreview card={vocabEntry} />
                    </View>
                  )}
                  <PlayPronunciationButton
                    word={word}
                    pronunciation={
                      vocabEntry?.__forced_pronunciation ||
                      vocabEntry?.__forcedPronunciation ||
                      vocabEntry?.pronunciation ||
                      word
                    }
                  />
                  <View style={{ width: 12 }} />
                  {renderHighlightedWord(word, highlight)}
                </View>
              );
            })}
          </View>
        </VocabularySection>
      ))}
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
});

export default ExampleEntries;
