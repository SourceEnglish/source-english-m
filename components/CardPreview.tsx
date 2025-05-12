import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
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
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768; // Example breakpoint for mobile devices

  // Resolve the icon component using the static mapping
  // const IconComponent = iconMap[word.toLowerCase()];

  return (
    <View
      style={[
        styles.card,
        isMobile ? styles.mobileCard : styles.desktopCard,
        ,
        { borderColor },
      ]}
    >
      {/* {IconComponent ? <IconComponent width={50} height={50} /> : null} */}
      <AppleIcon width={isMobile ? 50 : 100} height={isMobile ? 50 : 100} />
      <Text
        style={[styles.word, isMobile ? styles.mobileWord : styles.desktopWord]}
      >
        {word}
      </Text>
      <Text
        style={[
          styles.pos,
          isMobile ? styles.mobilePos : styles.desktopPos,
          { color: borderColor },
        ]}
      >
        {__pos}
      </Text>
    </View>
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

  mobileCard: {
    width: '30%', // Apply 30% width for mobile devices
    padding: 8, // Adjusted padding for mobile
    margin: 5, // Adjusted margin for mobile
  },
  desktopCard: {
    width: 240,
    fontSize: 18,
    padding: 12, // Adjusted padding for desktop
    margin: 10, // Adjusted margin for desktop
    height: 300,
  },

  word: {
    fontSize: 16,
    // fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  mobileWord: {
    fontSize: 14,
  },
  desktopWord: {
    fontSize: 34,
  },
  pos: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  mobilePos: {},
  desktopPos: {
    fontSize: 26,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
