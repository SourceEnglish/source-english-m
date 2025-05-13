import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Pressable } from 'react-native'; // Import Pressable for hover effects
import posColors from '@/constants/colors';
import AppleIcon from '@/assets/icons/licensed/apple.svg'; // Import the SVG as a React component

type VocabularyCard = {
  __pos: string;
  word: string;
};

type CardPreviewProps = {
  card: VocabularyCard;
};

export default function CardPreview({ card }: CardPreviewProps) {
  const { __pos, word } = card;
  const borderColor = posColors[__pos] || '#000'; // Default to black if pos is not found

  // Get screen width to determine if the device is mobile
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768; // Example breakpoint for mobile devices

  // State to track hover
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onHoverIn={() => setIsHovered(true)} // Trigger hover state
      onHoverOut={() => setIsHovered(false)} // Reset hover state
      style={[
        styles.card,
        isMobile ? styles.mobileCard : styles.desktopCard,
        { borderColor },
        isHovered && styles.hoveredCard, // Apply hover style when hovered
      ]}
    >
      <AppleIcon
        width={isMobile ? 50 : 100}
        height={isMobile ? 50 : 100}
        style={styles.svgText}
      />
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
    backgroundColor: '#ffeeee', // Change background color to red when hovered
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
  svgText: {
    userSelect: 'none', // React Native equivalent for user-select
  },
  word: {
    fontSize: 16,
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
