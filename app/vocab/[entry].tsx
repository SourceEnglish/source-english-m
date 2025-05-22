import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import vocabularyData from '@/i18n/locales/en-us/vocabulary.json';
import VocabEntryDisplay from '@/components/VocabEntryDisplay';
import Notes from '@/components/Notes';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';

export function generateStaticParams() {
  return vocabularyData.map((entry: any) => {
    const name = Object.keys(entry)[0];
    return { entry: name };
  });
}

export default function VocabEntryPage() {
  const { entry } = useLocalSearchParams();
  const entryName = entry as string;

  // Find the vocab entry
  const vocabEntryObj = vocabularyData.find(
    (e: any) => Object.keys(e)[0] === entryName
  );
  const vocabEntry = vocabEntryObj
    ? vocabEntryObj[entryName as keyof typeof vocabEntryObj]
    : null;

  if (!vocabEntry) {
    return <Text>Vocab entry not found</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.outerContainer}>
        <Notes noteKey={`vocab_${entryName}`} />
        <VocabEntryDisplay entry={vocabEntry} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    maxWidth: CENTERED_MAX_WIDTH,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
  // title: {
  //   fontSize: 36,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginBottom: 10,
  //   marginTop: 10,
  // },
});
