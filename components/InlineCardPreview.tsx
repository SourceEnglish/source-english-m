import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import posColors from '@/constants/constants';
import ReadableText from '@/components/ReadableText';
import { iconMap } from '@/utils/iconMap';

// Props and types for the inline card
interface InlineCardPreviewProps {
  card: {
    __pos: string;
    word: string;
  };
}

const InlineCardPreview: React.FC<InlineCardPreviewProps> = ({ card }) => {
  const { __pos, word } = card;
  const borderColor = posColors[__pos] || '#000';
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768;
  const Icon = iconMap[word.toLowerCase()];

  return (
    <View
      style={[
        styles.inlineCard,
        { borderColor },
        isMobile ? styles.mobile : styles.desktop,
      ]}
    >
      {Icon && <Icon width={isMobile ? 28 : 32} height={isMobile ? 28 : 32} />}
      <ReadableText
        text={word}
        style={{ fontSize: isMobile ? 13 : 15, marginBottom: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inlineCard: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    width: 56,
    height: 70,
    flexShrink: 0,
  },
  mobile: {
    width: 44,
    height: 56,
    padding: 2,
  },
  desktop: {
    width: 56,
    height: 70,
    padding: 4,
  },
});

export default InlineCardPreview;
