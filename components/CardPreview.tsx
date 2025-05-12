import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import * as Svg from 'react-native-svg';
import posColors from '@/constants/colors';

// Import the color codes
import AppleIcon from '@/assets/icons/licensed/apple.svg'; // Import the SVG as a React component

type VocabularyCard = {
  __pos: string;
  word: string;
};

type CardPreviewProps = {
  card: VocabularyCard;
};

// // Static mapping of words to their corresponding SVG components
// const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
//   apple: AppleIcon,
//   // Add more mappings here for other icons
// };

export default function CardPreview({ card }: CardPreviewProps) {
  const { __pos, word } = card;
  const borderColor = posColors[__pos] || '#000'; // Default to black if pos is not found

  // Resolve the icon component using the static mapping
  // const IconComponent = iconMap[word.toLowerCase()];

  return (
    <View style={[styles.card, { borderColor }]}>
      {/* {IconComponent ? <IconComponent width={50} height={50} /> : null} */}
      <AppleIcon width={50} height={50} />
      <Text style={styles.word}>{word}</Text>
      <Text style={[styles.pos, { color: borderColor }]}>{__pos}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    width: 120,
    height: 150,
  },
  word: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  pos: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
