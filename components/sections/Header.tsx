import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

const Header = ({ text, styling }: { text: string; styling?: string[] }) => (
  <View style={styles.container}>
    <ReadableText text={text} style={{ fontSize: 28, fontWeight: 'bold' }} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 4,
  },
});

export default Header;
