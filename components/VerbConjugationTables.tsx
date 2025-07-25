import React, { useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import ReadableText from './ReadableText';
import VocabularySection from './VocabularySection';

type Subject =
  | 'I'
  | 'you'
  | 'he'
  | 'she'
  | 'it'
  | 'we'
  | 'you (plural)'
  | 'they';

const subjects: Subject[] = [
  'I',
  'you',
  'he',
  'she',
  'it',
  'we',
  'you (plural)',
  'they',
];

type Conjugation = {
  present: string;
  present_participle: string;
  past: string;
};

type VocabularyEntry = {
  [verb: string]: {
    __pos: string;
    __tags: string[];
    word: string;
    conjugation: Conjugation;
    translation_note: string;
  };
};

type VerbConjugationTablesProps = {
  entry: VocabularyEntry[string];
};

function getPastSimple(subject: Subject, past: string): string {
  // Special case for "to be"
  if (past === 'was/were' || past === 'was') {
    if (['I', 'he', 'she', 'it'].includes(subject)) return 'was';
    return 'were';
  }
  // Special case for "go"
  if (past === 'went') return 'went';
  // Special case for "do"
  if (past === 'did') return 'did';
  // Special case for "have"
  if (past === 'had') return 'had';
  return past;
}

function getPresentSimple(subject: Subject, base: string): string {
  // Special case for "to be"
  if (base === 'am/are/is' || base === 'be') {
    if (subject === 'I') return 'am';
    if (['he', 'she', 'it'].includes(subject)) return 'is';
    return 'are';
  }
  // Special case for "go"
  if (base === 'go') {
    if (['he', 'she', 'it'].includes(subject)) return 'goes';
    return 'go';
  }
  // Special case for "do"
  if (base === 'do') {
    if (['he', 'she', 'it'].includes(subject)) return 'does';
    return 'do';
  }
  // Special case for "have"
  if (base === 'have') {
    if (['he', 'she', 'it'].includes(subject)) return 'has';
    return 'have';
  }
  // Handle phrasal verbs for 3rd person singular
  if (['he', 'she', 'it'].includes(subject)) {
    const phrasalMatch = base.match(/^([a-zA-Z]+)( .+)$/);
    if (phrasalMatch) {
      const verb = phrasalMatch[1];
      const rest = phrasalMatch[2];
      let third = '';
      if (verb.endsWith('y') && !/[aeiou]y$/.test(verb)) {
        third = verb.slice(0, -1) + 'ies';
      } else if (
        verb.endsWith('s') ||
        verb.endsWith('sh') ||
        verb.endsWith('ch') ||
        verb.endsWith('x') ||
        verb.endsWith('z') ||
        verb.endsWith('o')
      ) {
        third = verb + 'es';
      } else {
        third = verb + 's';
      }
      return third + rest;
    }
    // Not a phrasal verb
    if (base.endsWith('y') && !/[aeiou]y$/.test(base)) {
      return base.slice(0, -1) + 'ies';
    }
    if (
      base.endsWith('s') ||
      base.endsWith('sh') ||
      base.endsWith('ch') ||
      base.endsWith('x') ||
      base.endsWith('z') ||
      base.endsWith('o')
    ) {
      return base + 'es';
    }
    return base + 's';
  }
  return base;
}

function getFutureSimple(subject: Subject, base: string): string {
  // Special case for "to be"
  if (base === 'am/are/is' || base === 'be') {
    return 'will be';
  }
  // Special case for "go"
  if (base === 'go') return 'will go';
  // Special case for "do"
  if (base === 'do') return 'will do';
  // Special case for "have"
  if (base === 'have') return 'will have';
  return `${subject === 'I' ? 'will' : 'will'} ${base}`;
}

function getPresentContinuous(
  subject: Subject,
  presentParticiple: string
): string {
  let beForm = '';
  switch (subject) {
    case 'I':
      beForm = 'am';
      break;
    case 'he':
    case 'she':
    case 'it':
      beForm = 'is';
      break;
    default:
      beForm = 'are';
  }
  return `${beForm} ${presentParticiple}`;
}

const Table: React.FC<{
  title: string;
  rows: { subject: Subject; form: string }[];
  isSimpleTense?: boolean;
}> = ({ title, rows, isSimpleTense }) => {
  // Import readAloudMode from SpeechContext
  const { readAloudMode } = require('@/contexts/SpeechContext').useSpeech();

  // Get the verb for special pronunciation logic
  // Only used for past tense of "read"
  const verb =
    typeof rows[0]?.form === 'string' && rows[0]?.form.toLowerCase() === 'read'
      ? 'read'
      : undefined;

  return (
    <View
      style={[
        styles.tableContainer,
        // Fix for Android: backgroundColor must be set on the outermost View
        isSimpleTense ? styles.simpleTenseTableContainer : null,
      ]}
    >
      <View
        style={[
          styles.tableRowHeader,
          isSimpleTense && styles.simpleTenseHeader,
        ]}
      >
        <View style={[styles.cell, styles.headerCell, styles.cellBorderRight]}>
          <ReadableText
            text="Subject"
            style={[
              styles.headerText,
              readAloudMode && styles.headerTextInverted,
            ]}
          />
        </View>
        <View style={[styles.cell, styles.headerCell]}>
          <ReadableText
            text="Form"
            style={[
              styles.headerText,
              readAloudMode && styles.headerTextInverted,
            ]}
          />
        </View>
      </View>
      {rows.map(({ subject, form }, idx) => {
        const isDivider = idx === 5;
        const pronunciation = subject === 'you (plural)' ? 'you' : undefined;
        // Force pronunciation to "red" for past tense of "read"
        const forcePronunciation =
          title === 'Past Simple' &&
          typeof form === 'string' &&
          form.toLowerCase() === 'read'
            ? 'red'
            : undefined;
        return (
          <React.Fragment key={subject}>
            {isDivider && <View style={styles.singPlurDivider} />}
            <View
              style={[
                styles.tableRow,
                idx % 2 === 0 ? styles.rowEven : styles.rowOdd,
              ]}
            >
              <View style={[styles.cell, styles.cellBorderRight]}>
                <ReadableText
                  text={subject}
                  pronunciation={pronunciation}
                  style={styles.cellText}
                />
              </View>
              <View style={styles.cell}>
                <ReadableText
                  text={form}
                  pronunciation={forcePronunciation}
                  style={styles.cellText}
                />
              </View>
            </View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

export const VerbConjugationTables: React.FC<VerbConjugationTablesProps> = ({
  entry,
}) => {
  const { conjugation } = entry;
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768;

  // Table data
  const pastRows = subjects.map((subject) => ({
    subject,
    form: getPastSimple(subject, conjugation.past),
  }));

  const presentRows = subjects.map((subject) => ({
    subject,
    form: getPresentSimple(subject, conjugation.present),
  }));

  const futureRows = subjects.map((subject) => ({
    subject,
    form: getFutureSimple(subject, conjugation.present),
  }));

  const presentContinuousRows = subjects.map((subject) => ({
    subject,
    form: getPresentContinuous(subject, conjugation.present_participle),
  }));

  // Ref for horizontal ScrollView
  const scrollRef = useRef<ScrollView>(null);

  // Center the Present Simple table on mount if isMobile, without animation on first render
  useEffect(() => {
    if (isMobile && scrollRef.current) {
      const tableWidth = 220 + 24;
      const offset = tableWidth * 1 - screenWidth / 2 + tableWidth / 2;
      // Use setTimeout to ensure scroll happens after layout, and use animated: false for first render
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: offset > 0 ? offset : 0,
          animated: true,
        });
      }, 0);
    }
    // Only run on mount and when screenWidth/isMobile changes
  }, [screenWidth, isMobile]);

  // Dynamically set justifyContent for tablesRow
  const tablesRowStyle = {
    ...styles.tablesRow,
    justifyContent: isMobile ? ('flex-start' as const) : ('center' as const),
  };

  return (
    <VocabularySection headerText="Verb Conjugation" hasDivider={false}>
      {/* Scrollable row with dark background and borders */}
      <View style={styles.scrollableRowOuter}>
        <ScrollView
          ref={scrollRef}
          horizontal
          contentContainerStyle={tablesRowStyle}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            <ReadableText text="Past Simple" style={styles.readableLabel} />
            <Table title="Past Simple" rows={pastRows} isSimpleTense />
          </View>
          <View>
            <ReadableText
              text="Present Simple"
              style={styles.readableLabel}
              pronunciation='"present" simple'
            />
            <Table title="Present Simple" rows={presentRows} isSimpleTense />
          </View>
          <View>
            <ReadableText text="Future Simple" style={styles.readableLabel} />
            <Table title="Future Simple" rows={futureRows} isSimpleTense />
          </View>
        </ScrollView>
      </View>
      <View style={styles.presentContinuousRow}>
        <View>
          <ReadableText
            text="Present Continuous"
            pronunciation='"present" continuous'
            style={styles.readableLabel}
          />
          <Table title="Present Continuous" rows={presentContinuousRows} />
        </View>
      </View>
    </VocabularySection>
  );
};

const styles = StyleSheet.create({
  verbConjugationTables: {
    width: '100%',

    alignSelf: 'center',
  },
  sectionContainer: {
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    maxWidth: 1300,

    alignSelf: 'center',

    width: '100%',
  },
  scrollableRowOuter: {
    backgroundColor: '#d6d6d6',
    borderRadius: 2,
    borderTopColor: 'black',
    borderTopWidth: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 8,
    marginTop: 2,
    paddingBottom: 18,
    paddingVertical: 6,
    width: '100%',

    alignSelf: 'center',
    maxWidth: 1300,
  },
  tablesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1300,
    // Do not set justifyContent here; it is set dynamically above
  },
  presentContinuousRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    width: '100%',
    alignSelf: 'center',
    maxWidth: 700,
  },
  tableContainer: {
    width: 220,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: Platform.OS === 'android' ? 4 : 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#bbb',
    alignSelf: 'center',
  },
  simpleTenseTableContainer: {
    backgroundColor: '#e0e0e0',
    borderColor: '#000',
    borderWidth: 1,
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    minHeight: 36,
    alignItems: 'center',
    justifyContent: 'center', // Center the first row horizontally
  },
  simpleTenseHeader: {
    backgroundColor: '#d6d6d6',
    borderTopColor: '#000',
    borderTopWidth: 1,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#888',
    minHeight: 36,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  cellBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#bbb',
  },
  headerCell: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  headerTextInverted: {
    color: '#000',
  },
  cellText: {
    fontSize: 15,
    color: '#222',
    textAlign: 'left',
  },
  rowEven: {
    backgroundColor: '#f5f5f5',
  },
  rowOdd: {
    backgroundColor: '#eaeaea',
  },
  readableLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 0,
  },
  singPlurDivider: {
    height: 4,
    backgroundColor: '#bbb',
    width: '100%',
    marginVertical: 0,
  },
  headerContainer: {
    maxWidth: 700,
    width: '100%',
    alignSelf: 'flex-start',
  },
});

export default VerbConjugationTables;
