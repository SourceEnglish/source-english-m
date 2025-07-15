import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import VocabularySection from './VocabularySection';
import ReadableText from './ReadableText';
import InlineCardPreview from './VocabCard';
import VocabCard, { VocabularyCarouselContext } from './VocabCard';
import vocabulary from '@/i18n/locales/en-us/vocabulary.json';

interface SynonymDisplayProps {
  synonyms: string[];
  synonymNotes?: Record<string, string>;
  synonymPronunciations?: Record<string, string>;
  word?: string;
}

const SynonymDisplay: React.FC<SynonymDisplayProps> = ({
  synonyms,
  synonymNotes,
  synonymPronunciations,
  word,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth <= 768;

  if (!synonyms || synonyms.length === 0) {
    return null;
  }

  return (
    <VocabularyCarouselContext.Provider value={true}>
      <VocabularySection
        headerText={synonyms.length === 1 ? 'Synonym' : 'Synonyms'}
      >
        <View style={styles.container}>
          {synonyms.map((synonym, index) => {
            // Find vocab entry for preview
            let vocabEntryObj = vocabulary.find((entryObj: any) => {
              const entryVal = Object.values(entryObj)[0] as { word: string };
              return entryVal.word.toLowerCase() === synonym.toLowerCase();
            });
            if (!vocabEntryObj) {
              vocabEntryObj = vocabulary.find((entryObj: any) => {
                const key = Object.keys(entryObj)[0];
                return (
                  key.toLowerCase().split(' ')[0] === synonym.toLowerCase()
                );
              });
            }
            const vocabEntry = vocabEntryObj
              ? Object.values(vocabEntryObj)[0]
              : null;

            return (
              <View key={index} style={styles.synonymItem}>
                <View style={styles.synonymMain}>
                  {vocabEntry && (
                    <View style={{ marginRight: 10 }}>
                      <VocabCard card={vocabEntry} size="small" />
                    </View>
                  )}
                  <View style={styles.synonymContent}>
                    <View style={styles.synonymLine}>
                      <ReadableText
                        text={synonym.split('_')[0]}
                        pronunciation={synonymPronunciations?.[synonym]}
                        style={[
                          styles.synonymText,
                          { fontSize: isMobile ? 15 : 19 },
                        ]}
                      />
                      {word && (
                        <>
                          <Text
                            style={[
                              styles.arrow,
                              { fontSize: isMobile ? 15 : 19 },
                            ]}
                          >
                            {' '}
                            ≈{' '}
                          </Text>
                          <ReadableText
                            text={word}
                            style={[
                              styles.fullForm,
                              { fontSize: isMobile ? 15 : 19 },
                            ]}
                          />
                        </>
                      )}
                    </View>
                    {synonymNotes && synonymNotes[synonym] && (
                      <ReadableText
                        text={synonymNotes[synonym]}
                        style={[
                          styles.synonymNote,
                          { fontSize: isMobile ? 13 : 16 },
                        ]}
                      />
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </VocabularySection>
    </VocabularyCarouselContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 8,
  },
  synonymItem: {
    marginBottom: 12,
    paddingLeft: 8,
  },
  synonymMain: {
    flexDirection: 'row',
    alignItems: 'center', // Center vertically
    marginBottom: 4,
  },
  synonymContent: {
    flex: 1,
    alignItems: 'flex-start',
  },
  synonymLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    flexWrap: 'wrap', // Allow wrapping for long content
    flexShrink: 1,
    minWidth: 0,
  },
  synonymText: {
    fontWeight: '600',
    color: '#2c3e50',
    fontFamily: 'Lexend_400Regular',
  },
  fullForm: {
    color: '#34495e',
    marginLeft: 4,
  },
  arrow: {
    color: '#34495e',
    flexShrink: 0,
    alignSelf: 'center',
  },
  synonymNote: {
    color: '#7f8c8d',
    fontStyle: 'italic',

    lineHeight: 18,
    alignItems: 'flex-start',
  },
});

export default SynonymDisplay;
