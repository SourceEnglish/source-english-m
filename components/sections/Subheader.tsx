import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

const Subheader = ({ text, styling }: { text: string; styling?: string[] }) => (
  <View style={styles.container}>
    <ReadableText text={text} style={{ fontSize: 20, fontWeight: '600' }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'flex-start',
  },
});

export default Subheader;
