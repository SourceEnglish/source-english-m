import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import VocabularySection from './VocabularySection';
import ReadableText from './ReadableText';

interface AbbreviationsProps {
  abbreviations: string[];
  abbreviationNotes?: Record<string, string>;
  abbreviationPronunciations?: Record<string, string>;
  word?: string;
}

const AbbreviationsDisplay: React.FC<AbbreviationsProps> = ({
  abbreviations,
  abbreviationNotes,
  abbreviationPronunciations,
  word,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth <= 768;

  if (!abbreviations || abbreviations.length === 0) {
    return null;
  }

  return (
    <VocabularySection
      headerText={abbreviations.length === 1 ? 'Abbreviation' : 'Abbreviations'}
    >
      <View style={styles.container}>
        {abbreviations.map((abbreviation, index) => (
          <View key={index} style={styles.abbreviationItem}>
            <View style={styles.abbreviationMain}>
              <ReadableText
                text={abbreviation}
                pronunciation={abbreviationPronunciations?.[abbreviation]}
                style={[
                  styles.abbreviationText,
                  { fontSize: isMobile ? 16 : 19 },
                ]}
              />
              {word && (
                <>
                  <Text
                    style={[styles.arrow, { fontSize: isMobile ? 16 : 19 }]}
                  >
                    {' '}
                    →{' '}
                  </Text>
                  <ReadableText
                    text={word}
                    style={[styles.fullForm, { fontSize: isMobile ? 16 : 19 }]}
                  />
                </>
              )}
            </View>
            {abbreviationNotes && abbreviationNotes[abbreviation] && (
              <ReadableText
                text={abbreviationNotes[abbreviation]}
                style={[
                  styles.abbreviationNote,
                  { fontSize: isMobile ? 14 : 16 },
                ]}
              />
            )}
          </View>
        ))}
      </View>
    </VocabularySection>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 8,
  },
  abbreviationItem: {
    marginBottom: 12,
    paddingLeft: 8,
  },
  abbreviationMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  abbreviationText: {
    fontWeight: '600',
    color: '#2c3e50',
    fontFamily: 'Lexend_400Regular', // Use Lexend font instead of monospace
  },
  fullForm: {
    color: '#34495e',
    marginLeft: 4,
  },
  arrow: {
    color: '#34495e',
  },
  abbreviationNote: {
    color: '#7f8c8d',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});

export default AbbreviationsDisplay;
