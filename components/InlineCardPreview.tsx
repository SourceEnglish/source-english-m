import React, { useContext } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';
import posColors from '@/constants/constants';
import ReadableText from '@/components/ReadableText';
import { getIconForEntry } from '@/utils/iconMap';
import { useRouter, useSegments } from 'expo-router';

// Context to indicate if inside a VocabularyCarousel
export const VocabularyCarouselContext = React.createContext(false);

// Props and types for the inline card
interface InlineCardPreviewProps {
  card: {
    __show_word: boolean;
    __pos: string;
    word: string;
    __forced_pronunciation?: string;
  };
  onPress?: () => void;
}

const InlineCardPreview: React.FC<InlineCardPreviewProps> = ({ card, onPress }) => {
  const {
    __pos,
    word,
    __forced_pronunciation,
    __vowel,
    __consonant,
    __show_word = true,
  } = card as any;
  let borderColor = posColors[__pos] || '#000';
  let borderLeftColor = posColors[__pos] || '#000';
  let borderTopColor = posColors[__pos] || '#000';
  const borderRadius = 6;

  // Special border color for letters: vowel/consonant
  if (__pos === 'letter') {
    if (__vowel) {
      borderColor = posColors['vowel'] || borderColor;
      borderLeftColor = borderColor;
      borderTopColor = borderColor;
      if (__consonant) {
        borderLeftColor = posColors['consonant'] || borderLeftColor;
        borderTopColor = posColors['consonant'] || borderTopColor;
      }
    } else {
      borderColor = posColors['consonant'] || borderColor;
      borderLeftColor = borderColor;
      borderTopColor = borderColor;
    }
  }

  // Use only Platform.OS for mobile/desktop check to avoid hydration/layout mismatch
  const isMobile = Platform.OS !== 'web';
  const Icon = getIconForEntry(card);
  const isInCarousel = useContext(VocabularyCarouselContext);

  // Expo Router navigation
  const router = useRouter();
  const segments = useSegments();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (isInCarousel) {
      // Only navigate to the vocab entry page, do not include "back" in the URL
      router.push(`/vocab/${encodeURIComponent(word)}`);
    }
  };

  const CardContent = (
    <View
      style={[
        styles.inlineCard,
        { borderColor, borderLeftColor, borderTopColor, borderRadius },
        (__vowel || __consonant || __pos === 'number') && {
          borderTopWidth: borderRadius,
        },
        isMobile ? styles.mobile : styles.desktop,
      ]}
    >
      {Icon && (
        <Icon
          textsize={isMobile ? 24 : 22}
          textwidth={isMobile ? 42 : 42}
          width={isMobile ? 42 : 42}
          height={isMobile ? 28 : 32}
        />
      )}
      {__show_word && (
        <ReadableText
          text={word}
          pronunciation={__forced_pronunciation}
          displayText={word.length > 7 ? word.slice(0, 6) + '…' : word}
          style={{
            fontSize: isMobile ? 13 : 14,
            marginBottom: 0,
            textAlign: 'center',
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        />
      )}
    </View>
  );

  if (isInCarousel) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        {CardContent}
      </TouchableOpacity>
    );
  }
  return CardContent;
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

    height: 70,
    flexShrink: 0,
  },
  mobile: {
    width: 54,
    height: 56,
    padding: 2,
  },
  desktop: {
    width: 63,
    height: 70,
    padding: 4,
  },
});

export default InlineCardPreview;
