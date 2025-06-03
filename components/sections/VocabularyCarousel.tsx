import React, { useMemo } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import InlineCardPreview, {
  VocabularyCarouselContext,
} from '../InlineCardPreview';
import vocabulary from '@/i18n/locales/en-us/vocabulary.json';

interface VocabularyCarouselProps {
  tags: string[]; // Array of tags to filter vocabulary
}

const VocabularyCarousel: React.FC<VocabularyCarouselProps> = ({ tags }) => {
  // Flatten vocabulary (array of objects) to array of entries
  const vocabEntries = useMemo(() => {
    return vocabulary
      .flatMap((entryObj: any) => Object.values(entryObj))
      .filter(
        (entry: any) =>
          entry.__tags && entry.__tags.some((tag: string) => tags.includes(tag))
      );
  }, [tags]);

  return (
    <VocabularyCarouselContext.Provider value={true}>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {vocabEntries.map((entry, idx) => (
            <InlineCardPreview
              card={
                entry as {
                  __show_word: boolean;
                  __pos: string;
                  word: string;
                  __forced_pronunciation?: string;
                }
              }
              key={idx}
            />
          ))}
        </ScrollView>
      </View>
    </VocabularyCarouselContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100, // Height of one InlineCardPreview (desktop) or 56 (mobile)
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#d6d6d6', // Slightly darker background
    borderRadius: 2,
    paddingVertical: 6,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 6,
  },
});

export default VocabularyCarousel;
