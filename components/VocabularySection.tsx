import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import ReadableText from './ReadableText';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';

type VocabularySectionProps = {
  children?: React.ReactNode;
  headerText?: string;
  hasDivider?: boolean;
  headerItem?: React.ReactNode;
};

export default function VocabularySection({
  children,
  headerText,
  hasDivider = true,
  headerItem,
}: VocabularySectionProps) {
  const { width: screenWidth } = useWindowDimensions();
  const isMobile = screenWidth <= 768;

  return (
    <View style={[exampleStyles.container, { marginBottom: 0 }]}>
      {headerText && (
        <View style={[exampleStyles.inner, { alignItems: 'flex-start' }]}>
          <ReadableText
            text={headerText}
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
      )}
      {headerItem && headerItem}
      <View
        style={{
          width: '100%',
          minWidth: '100%',
          marginVertical: 8,
        }}
      >
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: hasDivider ? 2 : 0,
            width: '100%',
            minWidth: '100%',
          }}
        />
        {children}
      </View>
    </View>
  );
}
export const exampleStyles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: CENTERED_MAX_WIDTH,
    alignSelf: 'center',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  inner: {
    maxWidth: 700,
    width: '100%',
    alignSelf: 'flex-start',
  },
});
