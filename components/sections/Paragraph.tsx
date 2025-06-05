import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

interface ParagraphProps {
  text: string;
  styling?: string[];
  pronunciation?: string;
  indentation?: boolean;
}

const Paragraph = ({
  text,
  styling,
  pronunciation,
  indentation = false,
}: ParagraphProps) => (
  <View style={styles.container}>
    <ReadableText
      text={text}
      pronunciation={pronunciation}
      style={{
        fontSize: 16,
        textAlign: 'left',
        textIndent: indentation ? 24 : 0,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
    alignItems: 'flex-start',
    maxWidth: 120 * 8, // Approximate 80 characters at 8px per character
  },
});

export default Paragraph;
