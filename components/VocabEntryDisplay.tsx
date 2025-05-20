import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import posColors from '@/constants/constants';
import { iconMap } from '@/utils/iconMap';

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
  const Icon = iconMap[word.toLowerCase()];

  return (
    <View style={[styles.container, { borderColor }]}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon width={isMobile ? 80 : 140} height={isMobile ? 80 : 140} />
        </View>
      )}
      <Text style={[styles.word, { fontSize: isMobile ? 28 : 40 }]}>
        {word}
      </Text>
      <Text style={[styles.pos, { color, fontSize: isMobile ? 18 : 24 }]}>
        {__pos}
      </Text>
      {__pos === 'noun' && plural && (
        <Text style={styles.plural}>
          Plural: <Text style={{ fontWeight: 'bold' }}>{plural}</Text>
        </Text>
      )}
      {__pos === 'noun' && __count && (
        <Text style={styles.countable}>
          {__count.charAt(0).toUpperCase() + __count.slice(1)} noun
        </Text>
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
