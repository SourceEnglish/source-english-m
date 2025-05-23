import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import posColors from '@/constants/constants';
import { getIconForEntry } from '@/utils/iconMap';
import ReadableText from './ReadableText';

interface VocabEntryDisplayProps {
  entry: {
    __pos: string;
    word: string;
    plural?: string;
    __count?: string;
  };
}

const VocabEntryDisplay: React.FC<VocabEntryDisplayProps> = ({ entry }) => {
  const { __pos, word, plural, __count } = entry;
  const borderColor = posColors[__pos] || '#000';
  const color = posColors[__pos] || '#000';
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768;
  const Icon = getIconForEntry(entry);

  return (
    <View style={[styles.container, { borderColor }]}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon width={isMobile ? 80 : 140} height={isMobile ? 80 : 140} />
        </View>
      )}
      {__pos !== 'letter' && (
        <ReadableText
          text={word}
          style={[styles.word, { fontSize: isMobile ? 28 : 40 }]}
        />
      )}
      <ReadableText
        text={__pos}
        style={[
          styles.pos,
          { color, fontSize: isMobile ? 18 : 24, textAlign: 'center' },
        ]}
      />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    width: '90%',
    alignSelf: 'center',
    maxWidth: 400,
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
});

export default VocabEntryDisplay;
