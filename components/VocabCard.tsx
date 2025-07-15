import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import posColors, { getLexendFontSizeToFit } from '@/constants/constants';
import ReadableText from '@/components/ReadableText';
import PlayPronunciationButton from './PlayPronunciationButton';
import { getIconForEntry } from '@/utils/iconMap';
import { useRouter, useSegments } from 'expo-router';
import { useSpeech } from '@/contexts/SpeechContext';
import { useDeck } from '@/contexts/DeckContext';

// Context to indicate if inside a VocabularyCarousel
export const VocabularyCarouselContext = React.createContext(false);

export type VocabCardSize = 'small' | 'medium' | 'large';

interface VocabCardProps {
  card: any;
  size: VocabCardSize;
  onPress?: () => void;
  vocabKey?: string;
  cardIndex?: number;
}

const VocabCard: React.FC<VocabCardProps> = ({
  card,
  size,
  onPress,
  vocabKey,
  cardIndex,
}) => {
  const {
    __pos,
    word,
    plural,
    __count,
    __forced_pronunciation,
    __vowel,
    __consonant,
    __show_word = true,
    __exampleEntries = [],
    __icon_text,
    examples,
    __tags,
  } = card as any;

  let borderColor = posColors[__pos] || '#000';
  let borderLeftColor = posColors[__pos] || '#000';
  let borderTopColor = posColors[__pos] || '#000';
  const color = posColors[__pos] || '#000';
  const screenWidth = Dimensions.get('window').width;
  const isMobile =
    size === 'small' ? Platform.OS !== 'web' : screenWidth <= 768;
  const objectKey = (card as any).__objectKey || vocabKey || word;
  const Icon = getIconForEntry({ ...card, __objectKey: objectKey });
  const isInCarousel = useContext(VocabularyCarouselContext);
  const router = useRouter();
  const segments = useSegments();
  const { readAloudMode } = useSpeech?.() || {};
  const { deckEntries, setDeckIndex, setDeckEntries } = useDeck?.() || {};
  const [isHovered, setIsHovered] = useState(false);

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

  // Press handler logic
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    if (size === 'small' && isInCarousel) {
      if (readAloudMode) return;
      const redirect = (card as any).__redirect;
      const isProperNoun =
        card.__pos === 'month' ||
        card.__pos === 'proper_noun' ||
        card.__pos === 'proper noun';
      let target;
      if (redirect) {
        target = redirect;
      } else if (isProperNoun) {
        if ((card as any).__objectKey) {
          target = (card as any).__objectKey.toLowerCase();
        } else if (card.word) {
          target = card.word.toLowerCase();
        } else {
          target = objectKey.toLowerCase();
        }
      } else {
        target = objectKey;
      }
      router.push(`/vocab/${encodeURIComponent(target)}`);
    } else if (size === 'medium') {
      const key = objectKey || word;
      if (typeof cardIndex === 'number' && setDeckIndex) {
        setDeckIndex(cardIndex);
      } else if (setDeckEntries && setDeckIndex) {
        setDeckEntries(null);
        setDeckIndex(null);
      }
      router.push({ pathname: '/vocab/[entry]', params: { entry: key } });
    }
  };

  // Render logic for each size
  if (size === 'small') {
    // InlineCardPreview
    const borderRadius = 6;
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
  }

  if (size === 'medium') {
    // CardPreview
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
                const displayText: string =
                  w.length > 14 ? w.slice(0, 13) + '…' : w;
                const fontSize: number =
                  w.length > 10
                    ? getLexendFontSizeToFit(w, previewBoxSize, minFontSize)
                    : isMobile
                    ? 18
                    : 28;
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

  // Large: VocabEntryDisplay
  return (
    <View
      style={[
        styles.container,
        { borderColor, borderLeftColor, borderTopColor },
      ]}
    >
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon
            textsize={isMobile ? 40 : 60}
            textwidth={isMobile ? 80 : 120}
            width={isMobile ? 80 : 140}
            height={isMobile ? 80 : 140}
          />
        </View>
      )}
      {/* Multigraph display */}
      {__pos === 'multigraph' && (
        <>
          <ReadableText
            text={word.length == 2 ? 'digraph' : 'multigraph'}
            style={{
              fontStyle: 'italic',
              color: posColors['multigraph'] || '#8e44ad',
              fontSize: isMobile ? 18 : 24,
              textAlign: 'center',
              marginBottom: 8,
            }}
          />
        </>
      )}
      {__show_word !== false &&
        __pos !== 'letter' &&
        __pos !== 'multigraph' && (
          <ReadableText
            text={word}
            pronunciation={__forced_pronunciation}
            style={[styles.word, { fontSize: isMobile ? 28 : 40 }]}
          />
        )}
      {__pos !== 'letter' && __pos !== 'multigraph' && (
        <ReadableText
          text={__pos}
          style={[
            styles.pos,
            { color, fontSize: isMobile ? 18 : 24, textAlign: 'center' },
          ]}
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
      {__pos === 'noun' && plural && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ReadableText text="Plural:" style={styles.plural} />
          <Text> </Text>
          <ReadableText text={`${plural}`} style={styles.plural} />
        </View>
      )}
      {__pos === 'noun' && __count && (
        <ReadableText
          text={`${__count.charAt(0).toUpperCase() + __count.slice(1)} noun`}
          style={styles.countable}
        />
      )}
      {/* Play pronunciation button inside the card */}
      {(__pos === 'multigraph'
        ? Array.isArray(card.__exampleEntries) &&
          card.__exampleEntries.length === 1
        : true) && (
        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <PlayPronunciationButton
            word={word}
            pronunciation={
              card.__forced_pronunciation
                ? card.__forced_pronunciation
                : card.word
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Large (VocabEntryDisplay)
  container: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 400,
    minHeight: 350,
  },
  iconContainer: {
    marginBottom: 16,
  },
  word: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  pos: {
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  plural: {
    marginBottom: 4,
    textAlign: 'center',
  },
  countable: {
    marginBottom: 4,
    textAlign: 'center',
    color: '#666',
  },
  // Medium (CardPreview)
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
  // Small (InlineCardPreview)
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

export default VocabCard;
