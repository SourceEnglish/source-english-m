import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReadableText from '@/components/ReadableText';

export type TableHeader = {
  text: string;
  __type: string;
};

export type TableEntry = {
  text: string;
  __type: string;
};

interface TableProps {
  headers: TableHeader[];
  entries: TableEntry[];
}

const Table: React.FC<TableProps> = ({ headers, entries }) => {
  const numCols = headers.length;
  const numRows = Math.ceil(entries.length / numCols);

  // Split entries into rows
  const rows: TableEntry[][] = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(entries.slice(i * numCols, (i + 1) * numCols));
  }

  return (
    <View style={styles.table}>
      {/* Header row */}
      <View style={styles.row}>
        {headers.map((header, idx) => (
          <View style={styles.headerCell} key={idx}>
            <ReadableText text={header.text} style={styles.headerText} />
          </View>
        ))}
      </View>
      {/* Data rows */}
      {rows.map((row, rowIdx) => (
        <View style={styles.row} key={rowIdx}>
          {row.map((entry, colIdx) => (
            <View style={styles.cell} key={colIdx}>
              {entry.text.split('\n').map((line, i) => (
                <ReadableText text={line} style={styles.cellText} key={i} />
              ))}
            </View>
          ))}
          {/* Fill empty cells if last row is short */}
          {row.length < numCols &&
            Array(numCols - row.length)
              .fill(null)
              .map((_, idx) => (
                <View style={styles.cell} key={`empty-${idx}`} />
              ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#f5f5f5',
    borderRightWidth: 1,
    borderRightColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cell: {
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#888', // darker line between entries
    borderRightWidth: 1,
    borderRightColor: '#888', // darker line between entries
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  cellText: {
    fontSize: 15,
  },
});

export default Table;
