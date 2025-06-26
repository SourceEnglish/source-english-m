import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import ReadableText from './ReadableText';
import { styles as exampleStyles } from '@/components/ExampleSentences';

type VocabularySectionProps = {
  children?: React.ReactNode;
  headerText?: string;
};

export default function VocabularySection({
  children,
  headerText,
}: VocabularySectionProps) {
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth <= 768;

  return (
    <View style={[exampleStyles.container, { marginBottom: 0 }]}>
      {headerText && (
        <View style={[exampleStyles.inner, { alignItems: 'flex-start' }]}>
          <ReadableText
            text={headerText}
            style={{
              fontWeight: 'bold',
              marginBottom: 4,
              fontSize: isMobile ? 16 : 22,
              color: '#333',
              textAlign: 'left',
              alignSelf: 'flex-start',
            }}
          />
        </View>
      )}
      <View
        style={{
          width: '100%',
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
        {children}
      </View>
    </View>
  );
}
