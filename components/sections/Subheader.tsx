import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

interface SubheaderProps {
  text: string;
  styling?: string[];
  __forced_pronunciation?: string;
}

const Subheader = ({ text, styling, __forced_pronunciation }: SubheaderProps) => (
  <View style={styles.container}>
    <ReadableText
      text={text}
      pronunciation={__forced_pronunciation}
      style={{ fontSize: 20, fontWeight: '600' }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
});

export default Subheader;
