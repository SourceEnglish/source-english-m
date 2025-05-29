import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Pressable } from 'react-native';
import posColors from '@/constants/constants';
import ReadableText from '@/components/ReadableText';
import { getIconForEntry } from '@/utils/iconMap'; // Import the icon getter
import { useRouter } from 'expo-router';
import { useDeck } from '@/contexts/DeckContext';

type VocabularyEntry = {
  __pos: string;
  __count?: string;
  __tags?: string[];
  word: string;
  plural?: string;
  translation_note?: string;
};

type VocabularyCard = {
  __pos: string;
  word: string;
  __forced_pronunciation?: string;
  __deckArray?: any[]; // Add this line to allow __deckArray property
};

type CardPreviewProps = {
  card: VocabularyCard;
  vocabKey?: string;
  cardIndex?: number;
};

export default function CardPreview({
  card,
  vocabKey,
  cardIndex,
}: CardPreviewProps) {
  const { __pos, word, __forced_pronunciation, __vowel, __consonant } =
    card as any;
  let borderColor = posColors[__pos] || '#000';
  let borderLeftColor = posColors[__pos] || '#000';
  let borderTopColor = posColors[__pos] || '#000';

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

  // Get screen width to determine if the device is mobile
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768;

  // State to track hover
  const [isHovered, setIsHovered] = useState(false);

  // Dynamically get the icon based on the word (or another property if needed)
  const Icon = getIconForEntry(card);
  const router = useRouter();
  const { deckEntries, setDeckIndex, setDeckEntries } = useDeck();

  const handlePress = () => {
    const key = vocabKey || word;
    if (typeof cardIndex === 'number') {
      setDeckIndex(cardIndex);
    } else {
      setDeckEntries(null);
      setDeckIndex(null);
    }
    router.push({ pathname: '/vocab/[entry]', params: { entry: key } });
  };

  return (
    <Pressable
      onPress={handlePress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={[
        styles.card,
        isMobile ? styles.mobileCard : styles.desktopCard,
        { borderColor, borderLeftColor, borderTopColor },
        isHovered && styles.hoveredCard,
      ]}
    >
      {Icon && (
        <View>
          <Icon
            width={isMobile ? 55 : 120}
            textSize={isMobile ? 40 : 70}
            textWidth={isMobile ? 70 : 120}
            height={isMobile ? 55 : 120}
          />
        </View>
      )}
      {__pos !== 'letter' && (
        <ReadableText
          text={word}
          pronunciation={__forced_pronunciation}
          displayText={word
            .split(' ')
            .map((w: any) => (w.length > 10 ? w.slice(0, 9) + '…' : w))
            .join('\n')}
          style={{
            fontSize: isMobile ? 18 : 28,
            marginBottom: 4,
            textAlign: 'center',
            flexWrap: 'wrap',
            alignSelf: 'center',
            width: '100%',
          }}
          numberOfLines={word.split(' ').length}
          ellipsizeMode="tail"
        />
      )}
      {__pos !== 'letter' && (
        <ReadableText
          text={__pos}
          style={{
            fontStyle: 'italic',
            color: posColors[__pos],
            fontSize: isMobile ? 14 : 20,
            textAlign: 'center',
          }}
        />
      )}
      {__pos === 'letter' && __consonant && (
        <ReadableText
          text={__vowel ? 'consonant,' : 'consonant'}
          style={{
            fontStyle: 'italic',
            color: posColors['consonant'],
            fontSize: isMobile ? 14 : 20,
            textAlign: 'center',
          }}
        />
      )}
      {__pos === 'letter' && __vowel && (
        <ReadableText
          text={'vowel'}
          style={{
            fontStyle: 'italic',
            color: posColors['vowel'],
            fontSize: isMobile ? 14 : 20,
            textAlign: 'center',
          }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 120,
    height: 150,
  },
  hoveredCard: {
    backgroundColor: '#ffeeee',
  },
  mobileCard: {
    width: '32%',
    fontSize: 20,
    padding: 8,
    margin: 1,
  },
  desktopCard: {
    width: '18%',
    fontSize: 24,
    padding: 12,
    height: 300,
  },
  svgText: {
    userSelect: 'none',
  },
});
