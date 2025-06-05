import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

const Quote = ({ text, styling }: { text: string; styling?: string[] }) => (
  <View style={styles.container}>
    <ReadableText
      text={text}
      style={{
        fontSize: 16,
        borderLeftWidth: 4,
        color: '#171717',
        borderLeftColor: '#ccc',
        paddingLeft: 12,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 6,
    alignItems: 'flex-start',
  },
});

export default Quote;
