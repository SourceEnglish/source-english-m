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
import AnimatedUppercaseG from '@/assets/animated/uppercase/G';
import AnimatedUppercaseR from '@/assets/animated/uppercase/R';
import AnimatedUppercaseP from '@/assets/animated/uppercase/P';
import AnimatedUppercaseH from '@/assets/animated/uppercase/H';
import AnimatedUppercaseI from '@/assets/animated/uppercase/I';
import AnimatedUppercaseJ from '@/assets/animated/uppercase/J';
import AnimatedUppercaseK from '@/assets/animated/uppercase/K';
import AnimatedUppercaseL from '@/assets/animated/uppercase/L';
import AnimatedUppercaseT from '@/assets/animated/uppercase/T';
import AnimatedUppercaseV from '@/assets/animated/uppercase/V';
import AnimatedUppercaseW from '@/assets/animated/uppercase/W';
import AnimatedUppercaseX from '@/assets/animated/uppercase/X';
import AnimatedUppercaseO from '@/assets/animated/uppercase/O';
import AnimatedUppercaseQ from '@/assets/animated/uppercase/Q';
import AnimatedUppercaseM from '@/assets/animated/uppercase/M';
import AnimatedUppercaseN from '@/assets/animated/uppercase/N';
import AnimatedUppercaseS from '@/assets/animated/uppercase/S';
import AnimatedUppercaseU from '@/assets/animated/uppercase/U';
import AnimatedUppercaseY from '@/assets/animated/uppercase/Y';
import AnimatedUppercaseZ from '@/assets/animated/uppercase/Z';

import AnimatedLowercaseA from '@/assets/animated/lowercase/a';
import AnimatedLowercaseO from '@/assets/animated/lowercase/o';
import AnimatedLowercaseB from '@/assets/animated/lowercase/b';
import AnimatedLowercaseC from '@/assets/animated/lowercase/c';
import AnimatedLowercaseD from '@/assets/animated/lowercase/d';
import AnimatedLowercaseE from '@/assets/animated/lowercase/e';
import AnimatedLowercaseF from '@/assets/animated/lowercase/f';
import AnimatedLowercaseG from '@/assets/animated/lowercase/g';
import AnimatedLowercaseR from '@/assets/animated/lowercase/r';
import AnimatedLowercaseQ from '@/assets/animated/lowercase/q';
import AnimatedLowercaseP from '@/assets/animated/lowercase/p';
import AnimatedLowercaseH from '@/assets/animated/lowercase/h';
import AnimatedLowercaseI from '@/assets/animated/lowercase/i';
import AnimatedLowercaseJ from '@/assets/animated/lowercase/j';
import AnimatedLowercaseK from '@/assets/animated/lowercase/k';
import AnimatedLowercaseL from '@/assets/animated/lowercase/l';
import AnimatedLowercaseT from '@/assets/animated/lowercase/t';
import AnimatedLowercaseV from '@/assets/animated/lowercase/v';
import AnimatedLowercaseW from '@/assets/animated/lowercase/w';
import AnimatedLowercaseX from '@/assets/animated/lowercase/x';
import AnimatedLowercaseM from '@/assets/animated/lowercase/m';
import AnimatedLowercaseN from '@/assets/animated/lowercase/n';
import AnimatedLowercaseS from '@/assets/animated/lowercase/s';
import AnimatedLowercaseU from '@/assets/animated/lowercase/u';
import AnimatedLowercaseY from '@/assets/animated/lowercase/y';
import AnimatedLowercaseZ from '@/assets/animated/lowercase/z';

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
  let containerMarginTop = 0;
  if (vocabEntry.__pos === 'letter') {
    const word = vocabEntry.word || '';
    const upper = word.charAt(0);
    const lower = word.charAt(1);

    // Only render if both uppercase and lowercase are available
    const descenderLetters = ['g', 'j', 'p', 'q', 'y'];
    const hasDescender = descenderLetters.includes(lower);
    const lowerHeight = hasDescender ? 100 : 70;
    // For descenders, shift them down by half their height so their top starts below the uppercase baseline
    const lowerTranslateY = hasDescender ? lowerHeight / 4 : 0;
    // Calculate negative margin so the baseline aligns with non-descender pairs
    containerMarginTop = hasDescender ? -lowerTranslateY : 0;
    if (upper === 'A' && lower === 'a') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseA width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseA width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'B' && lower === 'b') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseB width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
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
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseC width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseC width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'D' && lower === 'd') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseD width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
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
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseO width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseO width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'E' && lower === 'e') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseE width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseE width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'F' && lower === 'f') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseF width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseF width={50} height={100} />
          </View>
        </View>
      );
    } else if (upper === 'G' && lower === 'g') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseG width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseG width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'R' && lower === 'r') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseR width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseR width={50} height={60} />
          </View>
        </View>
      );
    } else if (upper === 'Q' && lower === 'q') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseQ width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseQ width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'P' && lower === 'p') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseP width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseP width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'H' && lower === 'h') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 8, // Add margin between uppercase and lowercase
            }}
          >
            <AnimatedUppercaseH width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseH width={50} height={100} />
          </View>
        </View>
      );
    } else if (upper === 'I' && lower === 'i') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100,
            marginTop: hasDescender ? -lowerHeight / 2 : 0,
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseI width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedLowercaseI width={50} height={70} />
          </View>
        </View>
      );
    } else if (upper === 'J' && lower === 'j') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            marginTop: hasDescender ? -lowerHeight / 4 : 0,
            gap: 16, // Add gap between uppercase and lowercase
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseJ width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseJ width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'K' && lower === 'k') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseK width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseK width={50} height={100} />
          </View>
        </View>
      );
    } else if (upper === 'L' && lower === 'l') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <AnimatedUppercaseL width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseL width={50} height={100} />
          </View>
        </View>
      );
    } else if (upper === 'T' && lower === 't') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseT width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseT width={50} height={100} />
          </View>
        </View>
      );
    } else if (upper === 'V' && lower === 'v') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseV width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseV width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'W' && lower === 'w') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseW width={90} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseW width={60} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'X' && lower === 'x') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseX width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseX width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'M' && lower === 'm') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseM width={90} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseM width={70} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'N' && lower === 'n') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseN width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseN width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'S' && lower === 's') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseS width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseS width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'U' && lower === 'u') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseU width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseU width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'Y' && lower === 'y') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseY width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseY width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'Z' && lower === 'z') {
      AnimatedLetterComponent = () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            minHeight: 100 + (hasDescender ? lowerHeight / 2 : 0),
            gap: 16,
          }}
        >
          <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
            <AnimatedUppercaseZ width={70} height={100} />
          </View>
          <View
            style={{
              justifyContent: 'flex-end',
              alignItems: 'center',
              transform: [{ translateY: lowerTranslateY }],
            }}
          >
            <AnimatedLowercaseZ width={50} height={lowerHeight} />
          </View>
        </View>
      );
    } else if (upper === 'A') {
      AnimatedLetterComponent = AnimatedUppercaseA;
    } else if (upper === 'B') {
      AnimatedLetterComponent = AnimatedUppercaseB;
    } else if (upper === 'C') {
      AnimatedLetterComponent = AnimatedUppercaseC;
    } else if (upper === 'M') {
      AnimatedLetterComponent = AnimatedUppercaseM;
    } else if (upper === 'N') {
      AnimatedLetterComponent = AnimatedUppercaseN;
    } else if (upper === 'S') {
      AnimatedLetterComponent = AnimatedUppercaseS;
    } else if (upper === 'U') {
      AnimatedLetterComponent = AnimatedUppercaseU;
    } else if (upper === 'Y') {
      AnimatedLetterComponent = AnimatedUppercaseY;
    } else if (upper === 'Z') {
      AnimatedLetterComponent = AnimatedUppercaseZ;
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
    } else if (lower === 'm') {
      AnimatedLetterComponent = AnimatedLowercaseM;
    } else if (lower === 'n') {
      AnimatedLetterComponent = AnimatedLowercaseN;
    } else if (lower === 's') {
      AnimatedLetterComponent = AnimatedLowercaseS;
    } else if (lower === 'u') {
      AnimatedLetterComponent = AnimatedLowercaseU;
    } else if (lower === 'y') {
      AnimatedLetterComponent = AnimatedLowercaseY;
    } else if (lower === 'z') {
      AnimatedLetterComponent = AnimatedLowercaseZ;
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
            marginTop: 24 + containerMarginTop,
            marginBottom: 32,
            minHeight: 100,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {/* If AnimatedLetterComponent is a pair, render as-is (it already handles sizing). If it's a single letter, pass width/height. */}
          {
            // List of all letter pairs handled above
            [
              'Aa',
              'Bb',
              'Cc',
              'Dd',
              'Ee',
              'Ff',
              'Gg',
              'Hh',
              'Ii',
              'Jj',
              'Kk',
              'Ll',
              'Oo',
              'Pp',
              'Qq',
              'Rr',
              'Tt',
              'Vv',
              'Ww',
              'Xx',
            ].includes(vocabEntry.word || '') ? (
              <AnimatedLetterComponent />
            ) : (
              <AnimatedLetterComponent width={100} height={140} />
            )
          }
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
