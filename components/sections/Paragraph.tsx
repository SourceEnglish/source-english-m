import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

const Paragraph = ({ text, styling }: { text: string; styling?: string[] }) => (
  <View style={styles.container}>
    <ReadableText
      text={text}
      style={{ fontSize: 16, textAlign: 'left', textIndent: 24 }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
    alignItems: 'flex-start',
  },
});

export default Paragraph;
