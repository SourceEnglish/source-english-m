import React, { useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import ReadableText from './ReadableText';

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

function getPresentSimple(subject: Subject, base: string): string {
  // 3rd person singular
  if (['he', 'she', 'it'].includes(subject)) {
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

function getPastSimple(_subject: Subject, past: string): string {
  return past;
}

function getFutureSimple(subject: Subject, base: string): string {
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
}> = ({ title, rows }) => {
  // Import readAloudMode from SpeechContext
  const { readAloudMode } = require('@/contexts/SpeechContext').useSpeech();

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableRowHeader}>
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
                <ReadableText text={form} style={styles.cellText} />
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
  const { width: screenWidth } = useWindowDimensions();
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

  // Center the Present Simple table on mount
  useEffect(() => {
    if (scrollRef.current) {
      // There are 3 tables: Past, Present, Future
      // Center the Present (middle) table
      // Each tableContainer has width 220 + marginHorizontal: 12 (so 24 total margin)
      const tableWidth = 220 + 24;
      // The Present Simple table is the second (index 1)
      const offset = tableWidth * 1 - screenWidth / 2 + tableWidth / 2;
      scrollRef.current.scrollTo({ x: offset > 0 ? offset : 0, animated: true });
    }
  }, [screenWidth]);

  return (
    <View style={[styles.verbConjugationTables, styles.sectionContainer]}>
      {/* Section header and hr, copied from ExampleSentences */}
      <View style={[styles.headerContainer, { alignItems: 'flex-start' }]}>
        <ReadableText
          text="Verb Conjugation"
          style={{
            fontWeight: 'bold',
            marginBottom: 4,
            fontSize: isMobile ? 16 : 22,
            color: '#333',
            textAlign: 'left',
            alignSelf: 'flex-start',
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          minWidth: '100%',
          alignSelf: 'stretch',
          marginVertical: 8,
        }}
      >
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 2,
            width: '100%',
            minWidth: '100%',
          }}
        />
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal
        contentContainerStyle={styles.tablesRow}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <ReadableText text="Past Simple" style={styles.readableLabel} />
          <Table title="Past Simple" rows={pastRows} />
        </View>
        <View>
          <ReadableText
            text="Present Simple"
            style={styles.readableLabel}
            pronunciation='"present" simple'
          />
          <Table title="Present Simple" rows={presentRows} />
        </View>
        <View>
          <ReadableText text="Future Simple" style={styles.readableLabel} />
          <Table title="Future Simple" rows={futureRows} />
        </View>
      </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  verbConjugationTables: {
    width: '100%',
  },
  sectionContainer: {
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    maxWidth: 700,
    alignSelf: 'center',
  },
  tablesRow: {
    flexDirection: 'row',
    paddingBottom: 16,
    alignItems: 'flex-start',
  },
  presentContinuousRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  tableContainer: {
    width: 220,
    marginHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#bbb',
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#333',
    minHeight: 36,
    alignItems: 'center',
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
