import React from 'react';
import ReadableText from './ReadableText';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';

interface ExampleSentencesProps {
  examples?: string[];
}

const ExampleSentences: React.FC<ExampleSentencesProps> = ({ examples }) => {
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth <= 768;

  if (!examples || !Array.isArray(examples) || examples.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <ReadableText
          text="Example Sentences"
          style={{
            fontWeight: 'bold',
            marginBottom: 4,
            fontSize: isMobile ? 16 : 22,
            color: '#333',
            width: '100%',
            textAlign: 'left',
            alignSelf: 'flex-start',
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: 'blue',

          minWidth: '100%',

          marginVertical: 8,
        }}
      >
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 2,
            width: '100%',
            minWidth: '100%',
          }}
        />
      </View>
      <View style={styles.inner}>
        {examples.map((ex: string, idx: number) => (
          <ReadableText
            key={idx}
            text={`• ${ex}`}
            style={{
              width: '100%',
              fontSize: isMobile ? 15 : 19,
              color: '#444',
              marginBottom: 2,
              textAlign: 'left',
              alignSelf: 'flex-start',
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: CENTERED_MAX_WIDTH,
    alignSelf: 'center',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  inner: {
    maxWidth: 700,
    width: '100%',
    alignSelf: 'flex-start',
  },
});

export default ExampleSentences;
