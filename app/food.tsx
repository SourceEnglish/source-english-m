import { ScrollView } from 'react-native';
import CardPreview from '@/components/CardPreview';
// import vocabulary from '@/i18n/locales/en-us/vocabulary.json'; // Import the JSON file

// Define the type for the vocabulary object
type VocabularyEntry = {
  __pos: string;
  __count?: string;
  __tags?: string[];
  word: string;
  plural?: string;
  translation_note?: string;
};

type Vocabulary = Record<string, VocabularyEntry>;

export default function Food() {
  // const typedVocabulary = vocabulary as Vocabulary; // Cast the imported JSON to the Vocabulary type

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
      }}
    >
      <CardPreview card={{ __pos: 'noun', word: 'apple' }} />
      <CardPreview card={{ __pos: 'noun', word: 'apple' }} />
      <CardPreview card={{ __pos: 'noun', word: 'apple' }} />
      <CardPreview card={{ __pos: 'noun', word: 'apple' }} />
      <CardPreview card={{ __pos: 'noun', word: 'apple' }} />
      <CardPreview card={{ __pos: 'noun', word: 'apple' }} />
      {/* {Object.keys(typedVocabulary).map((key) => {
        const card = typedVocabulary[key];
        return (
          <CardPreview
            key={key}
            card={{
              __pos: card.__pos,
              word: card.word,
            }}
          />
        );
      })} */}
    </ScrollView>
  );
}
