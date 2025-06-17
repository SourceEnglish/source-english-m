import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import vocabularyData from '@/i18n/locales/en-us/vocabulary.json';
import VocabEntryDisplay from '@/components/VocabEntryDisplay';
import Notes from '@/components/Notes';
import ExampleSentences from '@/components/ExampleSentences';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';
import { useDeck } from '@/contexts/DeckContext';
import ChevronLeft from '@/assets/icons/open_source/chevron-left.svg';
import ChevronRight from '@/assets/icons/open_source/chevron-right.svg';
import { getIconForEntry } from '@/utils/iconMap';
import { useSpeech } from '@/contexts/SpeechContext';
import VerbConjugationTables from '@/components/VerbConjugationTables';
import AnimatedUppercaseA from '@/assets/animated/uppercase/A';
import AnimatedUppercaseB from '@/assets/animated/uppercase/B';
import AnimatedUppercaseC from '@/assets/animated/uppercase/C';
import AnimatedUppercaseD from '@/assets/animated/uppercase/D';
import AnimatedUppercaseE from '@/assets/animated/uppercase/E';
import AnimatedUppercaseF from '@/assets/animated/uppercase/F';
import AnimatedUppercaseR from '@/assets/animated/uppercase/R';

import AnimatedLowercaseA from '@/assets/animated/lowercase/a';
import AnimatedLowercaseO from '@/assets/animated/lowercase/o';
import AnimatedLowercaseB from '@/assets/animated/lowercase/b';
import AnimatedLowercaseC from '@/assets/animated/lowercase/c';
import AnimatedLowercaseD from '@/assets/animated/lowercase/d';
import AnimatedLowercaseE from '@/assets/animated/lowercase/e';
import AnimatedLowercaseF from '@/assets/animated/lowercase/f';
import AnimatedLowercaseR from '@/assets/animated/lowercase/r';

export function generateStaticParams() {
  return vocabularyData.map((entry: any) => {
    const name = Object.keys(entry)[0];
    return { entry: name };
  });
}

export default function VocabEntryPage() {
  const { entry } = useLocalSearchParams();
  const entryName = entry as string;
  const router = useRouter();
  const { deckEntries, deckIndex, setDeckIndex } = useDeck();
  const { speakText } = useSpeech();

  React.useEffect(() => {
    // No logging or side effects needed
  }, [deckEntries, deckIndex]);

  // Find the vocab entry
  const vocabEntryObj = vocabularyData.find(
    (e: any) => Object.keys(e)[0] === entryName
  );
  const vocabEntry = vocabEntryObj
    ? {
        ...vocabEntryObj[entryName as keyof typeof vocabEntryObj],
        __objectKey: entryName, // Pass the object key for icon mapping
      }
    : null;

  // Type guard: check for required fields
  if (
    !vocabEntry ||
    typeof vocabEntry !== 'object' ||
    !('__pos' in vocabEntry) ||
    !('word' in vocabEntry)
  ) {
    return <Text>Vocab entry not found</Text>;
  }

  // Deck navigation logic
  let prevEntry: string | null = null;
  let nextEntry: string | null = null;
  let prevIdx: number | null = null;
  let nextIdx: number | null = null;
  if (
    deckEntries &&
    deckEntries.length > 1 &&
    deckIndex !== null &&
    deckIndex >= 0
  ) {
    if (deckIndex > 0) {
      prevEntry = deckEntries[deckIndex - 1];
      prevIdx = deckIndex - 1;
    }
    if (deckIndex < deckEntries.length - 1) {
      nextEntry = deckEntries[deckIndex + 1];
      nextIdx = deckIndex + 1;
    }
  }

  // Helper: get animated letter component if this is a letter entry
  let AnimatedLetterComponent: React.FC<any> | null = null;
  if (vocabEntry.__pos === 'letter') {
    const word = vocabEntry.word || '';
    const upper = word.charAt(0);
    const lower = word.charAt(1);

    // Only render if both uppercase and lowercase are available
    if (upper === 'A' && lower === 'a') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseA width={70} height={100} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseA width={50} height={70} />
          </View>
        </View>
      );
    } else if (upper === 'B' && lower === 'b') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseB width={70} height={100} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseB width={70} height={100} />
          </View>
        </View>
      );
    } else if (upper === 'C' && lower === 'c') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseC width={70} height={100} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseC width={50} height={70} />
          </View>
        </View>
      );
    } else if (upper === 'D' && lower === 'd') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseD width={70} height={100} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseD width={70} height={100} />
          </View>
        </View>
      );
    } else if (upper === 'O' && lower === 'o') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
          }}
        >
          {/* No uppercase O animation yet */}
          <View style={{ flex: 1 }} />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseO width={50} height={70} />
          </View>
        </View>
      );
    } else if (upper === 'E' && lower === 'e') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseE width={70} height={100} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseE width={50} height={70} />
          </View>
        </View>
      );
    } else if (upper === 'F' && lower === 'f') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseF width={70} height={100} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseF width={50} height={100} />
          </View>
        </View>
      );
    } else if (upper === 'R' && lower === 'r') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseR width={70} height={100} />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseR width={50} height={60} />
          </View>
        </View>
      );
    } else if (upper === 'A') {
      AnimatedLetterComponent = AnimatedUppercaseA;
    } else if (upper === 'B') {
      AnimatedLetterComponent = AnimatedUppercaseB;
    } else if (upper === 'C') {
      AnimatedLetterComponent = AnimatedUppercaseC;
    } else if (lower === 'a') {
      AnimatedLetterComponent = AnimatedLowercaseA;
    } else if (lower === 'b') {
      AnimatedLetterComponent = AnimatedLowercaseB;
    } else if (lower === 'c') {
      AnimatedLetterComponent = AnimatedLowercaseC;
    } else if (lower === 'd') {
      AnimatedLetterComponent = AnimatedLowercaseD;
    } else if (lower === 'o') {
      AnimatedLetterComponent = AnimatedLowercaseO;
    } else if (lower === 'e') {
      AnimatedLetterComponent = AnimatedLowercaseE;
    } else if (lower === 'f') {
      AnimatedLetterComponent = AnimatedLowercaseF;
    } else {
      AnimatedLetterComponent = null;
    }
  }

  // Always render the navigation row, but only show chevrons if prev/next exist
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}
    >
      <View style={styles.outerContainer}>
        <Notes noteKey={`vocab_${entryName}`} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 40,
          }}
        >
          <View
            style={{
              width: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {prevEntry ? (
              <TouchableOpacity
                onPress={() => {
                  setDeckIndex(prevIdx);
                  router.replace({
                    pathname: '/vocab/[entry]',
                    params: { entry: prevEntry },
                  });
                }}
                accessibilityLabel="Previous card"
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: '#000000',
                  borderRadius: 8,
                  backgroundColor: '#f0f0f0',
                }}
              >
                <ChevronLeft width={32} height={32} />
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginLeft: 5,
              marginRight: 5,
              maxWidth: CENTERED_MAX_WIDTH,
            }}
          >
            <View style={{ flex: 1 }}>
              <VocabEntryDisplay entry={vocabEntry} />
            </View>
          </View>
          <View
            style={{
              width: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {nextEntry ? (
              <TouchableOpacity
                onPress={() => {
                  setDeckIndex(nextIdx);
                  router.replace({
                    pathname: '/vocab/[entry]',
                    params: { entry: nextEntry },
                  });
                }}
                accessibilityLabel="Next card"
                style={{
                  padding: 8,
                  borderWidth: 1,
                  borderColor: '#888',
                  borderRadius: 8,
                  backgroundColor: '#f0f0f0',
                }}
              >
                <ChevronRight width={32} height={32} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        {/* Example sentences in their own view, styled to match Notes width */}
        <View
          style={{
            width: '100%',
            maxWidth: CENTERED_MAX_WIDTH,
            alignSelf: 'center',
          }}
        >
          <ExampleSentences
            examples={
              'examples' in vocabEntry ? (vocabEntry as any).examples : []
            }
          />
        </View>
        {/* Verb conjugation tables for verbs, below example sentences */}
        <View
          style={{
            width: '100%',
            alignSelf: 'stretch',
            marginTop: 12,
          }}
        >
          {'__pos' in vocabEntry &&
            vocabEntry.__pos === 'verb' &&
            'conjugation' in vocabEntry &&
            vocabEntry.conjugation && (
              <VerbConjugationTables entry={vocabEntry as any} />
            )}
        </View>
      </View>
      {/* Animated letter drawing at the very bottom */}
      {AnimatedLetterComponent && (
        <View
          style={{
            alignItems: 'center',
            marginTop: 24,
            marginBottom: 32,
            minHeight: 100,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <AnimatedLetterComponent width={100} height={140} />
        </View>
      )}
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

    paddingVertical: 0,
  },
});
//                   });
//                 }}
//                 accessibilityLabel="Next card"
//                 style={{
//                   padding: 8,
//                   borderWidth: 1,
//                   borderColor: '#888',
//                   borderRadius: 8,
//                   backgroundColor: '#f0f0f0',
//                 }}
//               >
//                 <ChevronRight width={32} height={32} />
//               </TouchableOpacity>
//             ) : null}
//           </View>
//         </View>
//       </View>
//       <View
//         style={{
//           width: '100%',
//           alignSelf: 'center',
//           marginTop: 24,
//           marginBottom: 24,
//         }}
//       >
//         {/* Example sentences in their own view, styled to match Notes width */}
//         <View
//           style={{
//             width: '100%',
//             maxWidth: CENTERED_MAX_WIDTH,
//             alignSelf: 'center',
//           }}
//         >
//           <ExampleSentences
//             examples={
//               'examples' in vocabEntry ? (vocabEntry as any).examples : []
//             }
//           />
//         </View>
//         {/* Verb conjugation tables for verbs, below example sentences */}
//         <View
//           style={{
//             width: '100%',
//             alignSelf: 'stretch',
//             marginTop: 12,
//           }}
//         >
//           {'__pos' in vocabEntry &&
//             vocabEntry.__pos === 'verb' &&
//             'conjugation' in vocabEntry &&
//             vocabEntry.conjugation && (
//               <VerbConjugationTables entry={vocabEntry as any} />
//             )}
//         </View>
//       </View>
//       {/* Animated letter drawing at the very bottom */}
//       {AnimatedLetterComponent && (
//         <View
//           style={{
//             alignItems: 'center',
//             marginTop: 24,
//             marginBottom: 32,
//             minHeight: 100,
//             flexDirection: 'row',
//             justifyContent: 'center',
//           }}
//         >
//           <AnimatedLetterComponent width={100} height={140} />
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   outerContainer: {
//     width: '100%',
//     maxWidth: CENTERED_MAX_WIDTH,
//     alignSelf: 'center',
//     marginTop: 10,
//     marginBottom: 20,

//     paddingVertical: 0,
//   },
//   // title: {
//   //   fontSize: 36,
//   //   fontWeight: 'bold',
//   //   textAlign: 'center',
//   //   marginBottom: 10,
//   //   marginTop: 10,
//   // },
// });
