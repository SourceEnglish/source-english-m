import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import ReadableText from './ReadableText';
import AnimatedLetter, { Stroke } from './AnimatedLetter';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';
import { styles } from '@/components/ExampleSentences';

type LetterFormationProps = {
  children?: React.ReactNode;
  isNumber?: boolean;
};

export default function LetterFormation({
  children,
  isNumber,
}: LetterFormationProps) {
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth <= 768;

  return (
    <View style={[styles.container, { marginBottom: 0 }]}>
      <View style={[styles.inner, { alignItems: 'flex-start' }]}>
        <ReadableText
          text={isNumber ? 'Number Formation' : 'Letter Formation'}
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
      <View
        style={{
          width: '100%',
          minWidth: '100%',
          alignSelf: 'stretch',
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
