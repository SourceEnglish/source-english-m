import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ReadableText from '@/components/ReadableText';
import { useSpeech } from '@/contexts/SpeechContext';

export type TableHeader = {
  text: string;
  __type: string;
};

export type TableEntry = {
  text: string;
  __type: string;
  __forced_pronunciation?: string; // Add this property
};

interface TableProps {
  headers: TableHeader[];
  entries: TableEntry[];
}

const MIN_COL_WIDTH = 120; // Minimum column width in pixels

const Table: React.FC<TableProps> = ({ headers, entries }) => {
  const numCols = headers.length;
  const numRows = Math.ceil(entries.length / numCols);

  // Get readAloudMode from context
  const { readAloudMode } = useSpeech();

  // Split entries into rows
  const rows: TableEntry[][] = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(entries.slice(i * numCols, (i + 1) * numCols));
  }

  return (
    <ScrollView horizontal contentContainerStyle={styles.centeredScroll}>
      <View style={styles.table}>
        {/* Header row */}
        <View style={[styles.row, styles.rowEven]}>
          {headers.map((header, idx) => (
            <View
              style={[styles.headerCell, { minWidth: MIN_COL_WIDTH }]}
              key={idx}
            >
              <ReadableText
                text={header.text}
                style={[
                  styles.headerText,
                  readAloudMode && styles.headerTextInverted,
                ]}
              />
            </View>
          ))}
        </View>
        {/* Data rows */}
        {rows.map((row, rowIdx) => (
          <View
            style={[
              styles.row,
              rowIdx % 2 === 0 ? styles.rowEven : styles.rowOdd,
            ]}
            key={rowIdx}
          >
            {row.map((entry, colIdx) => (
              <View
                style={[styles.cell, { minWidth: MIN_COL_WIDTH }]}
                key={colIdx}
              >
                {entry.text.split('\n').map((line, i) => (
                  <ReadableText
                    text={line}
                    style={[styles.cellText, { textAlign: 'left' }]}
                    key={i}
                    pronunciation={entry.__forced_pronunciation}
                  />
                ))}
              </View>
            ))}
            {/* Fill empty cells if last row is short */}
            {row.length < numCols &&
              Array(numCols - row.length)
                .fill(null)
                .map((_, idx) => (
                  <View
                    style={[styles.cell, { minWidth: MIN_COL_WIDTH }]}
                    key={`empty-${idx}`}
                  />
                ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredScroll: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1, // Allows content to expand and prevents clipping
  },
  table: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: 12,
    marginHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
  },
  headerCell: {
    flex: 1,
    padding: 10,
    backgroundColor: '#333', // dark gray
    borderRightWidth: 1,
    borderRightColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff', // white text
  },
  headerTextInverted: {
    color: '#22262a', // matches headerCell background when inverted
  },
  cell: {
    flex: 1,
    padding: 10,
    paddingLeft: 2,
    paddingRight: 2,
    borderTopWidth: 1,
    borderTopColor: '#888', // darker line between entries
    borderRightWidth: 1,
    borderRightColor: '#888', // darker line between entries
    alignItems: 'flex-start',
    justifyContent: 'center',
    minHeight: 36,
  },
  cellText: {
    fontSize: 15,
  },
  rowEven: {
    backgroundColor: '#f5f5f5',
  },
  rowOdd: {
    backgroundColor: '#eaeaea',
  },
});

export default Table;
