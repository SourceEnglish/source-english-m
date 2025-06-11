import React, { useContext } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';
import posColors from '@/constants/constants';
import ReadableText from '@/components/ReadableText';
import { getIconForEntry } from '@/utils/iconMap';
import { useRouter, useSegments } from 'expo-router';
import { useSpeech } from '@/contexts/SpeechContext';

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

const InlineCardPreview: React.FC<InlineCardPreviewProps> = ({
  card,
  onPress,
}) => {
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
  // Use __objectKey if provided, otherwise use the object key from the parent if available
  const Icon = getIconForEntry({
    ...card,
    __objectKey: (card as any).__objectKey || Object.keys(card).length === 1 ? Object.keys(card)[0] : card.word,
  });
  const isInCarousel = useContext(VocabularyCarouselContext);

  // Expo Router navigation
  const router = useRouter();
  const segments = useSegments();

  // Use useSpeech to get readAloudMode
  const { readAloudMode } = useSpeech();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (isInCarousel) {
      if (readAloudMode) {
        // Do nothing if readAloudMode is true
        return;
      }
      // Redirect to __redirect if present, otherwise use word
      const redirect = (card as any).__redirect;
      const target = redirect ? redirect : word;
      router.push(`/vocab/${encodeURIComponent(target)}`);
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
    borderWidth: 2,
    borderRadius: 6,
    padding: 4,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,

    height: 72,
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
