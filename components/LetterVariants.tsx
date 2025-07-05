import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getIconForEntry } from '@/utils/iconMap';
import VocabularySection from './VocabularySection';

interface LetterVariationsProps {
  variations: string[]; // Array of variation keys (icon names)
  headerText?: string;
}

const LetterVariations: React.FC<LetterVariationsProps> = ({
  variations,
  headerText = 'Alternative Variations',
}) => {
  if (!variations || variations.length === 0) return null;

  return (
    <VocabularySection headerText={headerText}>
      <View style={styles.variationsRow}>
        {variations.map((variation, idx) => {
          const Icon = getIconForEntry({
            word: variation,
            __objectKey: variation,
          });
          return (
            <View key={variation} style={styles.iconContainer}>
              <Icon width={48} height={48} />
            </View>
          );
        })}
      </View>
    </VocabularySection>
  );
};

const styles = StyleSheet.create({
  variationsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 16, // Increased top margin for spacing
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 16,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LetterVariations;
