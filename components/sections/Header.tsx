import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

const Header = ({ text, styling }: { text: string; styling?: string[] }) => (
  <>
    <View style={styles.container}>
      <ReadableText text={text} style={{ fontSize: 28, fontWeight: 'bold' }} />
    </View>
    <View style={styles.hr} />
  </>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    alignItems: 'flex-start',
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#bbb',
    marginBottom: 12,
  },
});

export default Header;
