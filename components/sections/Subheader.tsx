import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

interface SubheaderProps {
  text: string;
  styling?: string[];
  __forced_pronunciation?: string;
}

const Subheader = ({
  text,
  styling,
  __forced_pronunciation,
}: SubheaderProps) => (
  <>
    <View style={styles.container}>
      <ReadableText
        text={text}
        pronunciation={__forced_pronunciation}
        style={{ fontSize: 20, fontWeight: '600' }}
      />
    </View>
    <View style={styles.hr} />
  </>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#bbb',
    marginTop: 4,
    marginBottom: 8,
  },
});

export default Subheader;
