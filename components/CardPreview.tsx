import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Pressable } from 'react-native';
import posColors, { getLexendFontSizeToFit } from '@/constants/constants';
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

  // Special color for multigraphs
  if (__pos === 'multigraph') {
    borderColor = posColors['multigraph'] || '#8e44ad';
    borderLeftColor = borderColor;
    borderTopColor = borderColor;
  }

  // Get screen width to determine if the device is mobile
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768;

  // State to track hover
  const [isHovered, setIsHovered] = useState(false);

  // Dynamically get the icon based on the __objectKey (or vocabKey or word)
  const objectKey = (card as any).__objectKey || vocabKey || word;
  const Icon = getIconForEntry({
    ...card,
    __objectKey: objectKey,
  });
  const router = useRouter();
  const { deckEntries, setDeckIndex, setDeckEntries } = useDeck();

  const handlePress = () => {
    const key = objectKey || word;
    if (typeof cardIndex === 'number') {
      setDeckIndex(cardIndex);
    } else {
      setDeckEntries(null);
      setDeckIndex(null);
    }
    router.push({ pathname: '/vocab/[entry]', params: { entry: key } });
  };

  // Calculate preview font size for each word (for truncation)
  const previewBoxSize = isMobile ? 90 : 120;
  const minFontSize = isMobile ? 12 : 16;
  const words = word.split(/\s+/);

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
            textsize={isMobile ? 40 : 60}
            textwidth={isMobile ? 80 : 120}
            height={isMobile ? 55 : 120}
          />
        </View>
      )}
      {/* Multigraph display */}
      {__pos === 'multigraph' && (
        <>
          <ReadableText
            text={
              word.length === 2
                ? 'digraph'
                : word.length === 3
                ? 'trigraph'
                : 'multigraph'
            }
            style={{
              fontStyle: 'italic',
              color: posColors['multigraph'] || '#8e44ad',
              fontSize: isMobile ? 13 : 18,
              textAlign: 'center',
              marginBottom: 2,
            }}
          />
        </>
      )}
      {__show_word !== false &&
        __pos !== 'letter' &&
        __pos !== 'multigraph' && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 4,
              width: '100%',
            }}
          >
            {words.map((w: string, idx: number) => {
              // Truncate if needed
              const displayText: string =
                w.length > 14 ? w.slice(0, 13) + '…' : w;
              const fontSize: number =
                w.length > 10
                  ? getLexendFontSizeToFit(w, previewBoxSize, minFontSize)
                  : isMobile
                  ? 18
                  : 28;
              interface ReadableTextProps {
                key: number;
                text: string;
                pronunciation?: string;
                displayText: string;
                style: object;
                numberOfLines: number;
                ellipsizeMode: 'tail' | 'head' | 'middle' | 'clip';
              }
              return (
                <ReadableText
                  key={idx}
                  text={w}
                  pronunciation={__forced_pronunciation}
                  displayText={displayText}
                  style={{
                    fontSize,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    alignSelf: 'center',
                    marginRight: idx < words.length - 1 ? 4 : 0,
                  }}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                />
              );
            })}
          </View>
        )}
      {__pos !== 'letter' && __pos !== 'multigraph' && (
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
