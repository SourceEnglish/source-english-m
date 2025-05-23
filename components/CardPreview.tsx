import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Pressable } from 'react-native';
import posColors from '@/constants/constants';
import ReadableText from '@/components/ReadableText';
import { iconMap } from '@/utils/iconMap'; // Import the icon map
import { useRouter } from 'expo-router';

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
};

type CardPreviewProps = {
  card: VocabularyCard;
  vocabKey?: string;
};

export default function CardPreview({ card, vocabKey }: CardPreviewProps) {
  const { __pos, word } = card;
  const borderColor = posColors[__pos] || '#000';

  // Get screen width to determine if the device is mobile
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768;

  // State to track hover
  const [isHovered, setIsHovered] = useState(false);

  // Dynamically get the icon based on the word (or another property if needed)
  const Icon = iconMap[word.toLowerCase()];
  const router = useRouter();

  const handlePress = () => {
    const key = vocabKey || word;
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
        { borderColor },
        isHovered && styles.hoveredCard,
      ]}
    >
      {Icon && (
        <View>
          <Icon width={isMobile ? 55 : 120} height={isMobile ? 55 : 120} />
        </View>
      )}
      <ReadableText
        text={word}
        style={{
          fontSize: isMobile ? 18 : 28,
          marginBottom: 4,
          textAlign: 'center',
          flexWrap: 'wrap',
          alignSelf: 'center',
          width: '100%',
        }}
      />
      <ReadableText
        text={__pos}
        style={{
          fontStyle: 'italic',
          color: posColors[__pos],
          fontSize: isMobile ? 14 : 20,
        }}
      />
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
    width: '30%',
    fontSize: 20,
    padding: 8,
    margin: 5,
  },
  desktopCard: {
    width: 233,
    fontSize: 24,
    padding: 12,
    margin: 10,
    height: 300,
  },
  svgText: {
    userSelect: 'none',
  },
});
