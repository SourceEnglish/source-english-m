import React from 'react';
import { View, StyleSheet } from 'react-native';
import ReadableText from '../ReadableText';

interface HeaderProps {
  text: string;
  styling?: string[];
  __forced_pronunciation?: string;
}

const Header = ({ text, styling, __forced_pronunciation }: HeaderProps) => (
  <>
    <View style={styles.container}>
      <ReadableText
        text={text}
        pronunciation={__forced_pronunciation}
        style={{ fontSize: 28, fontWeight: 'bold' }}
      />
    </View>
    <View style={styles.hr} />
  </>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 16,

    alignItems: 'flex-start',
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#bbb',
    marginTop: 12,
    marginBottom: 6,
  },
});

export default Header;
