import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LayoutChangeEvent,
} from 'react-native';

type TableDataRow = string[];

const tableData: TableDataRow[] = [
  ['Name', 'Age', 'Notes'],
  ['Alice', '30', 'Likes to hike and read books.'],
  ['Bob', '25', 'A musician.\nAlso works part-time at a cafe.'],
  [
    'Charlie',
    '28',
    'Very enthusiastic about software development and UI/UX design.',
  ],
];

const Table: React.FC = () => {
  const [columnWidths, setColumnWidths] = useState<number[]>(
    new Array(tableData[0].length).fill(0)
  );

  // Function to update the column width based on the largest content in that column (headers and data)
  const onCellLayoutWidth = (colIndex: number, width: number) => {
    setColumnWidths((prev) => {
      const newWidths = [...prev];
      if (newWidths[colIndex] < width) {
        newWidths[colIndex] = width + 1; // Set column width to fit the widest content (header or data)
      }
      return newWidths;
    });
  };

  return (
    <ScrollView horizontal>
      <View style={styles.table}>
        {tableData.map((row, rowIndex) => (
          <View key={rowIndex} style={[styles.row]}>
            {row.map((cell: string, colIndex: number) => (
              <View
                key={colIndex}
                style={[
                  styles.cell,
                  { width: columnWidths[colIndex] || 'auto' },
                ]}
                onLayout={(e: LayoutChangeEvent) => {
                  const { width } = e.nativeEvent.layout;
                  onCellLayoutWidth(colIndex, width); // Update column width based on the cell's width
                }}
              >
                <Text
                  style={rowIndex === 0 ? styles.headerText : styles.cellText}
                >
                  {cell}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontWeight: 'bold',
  },
  cellText: {
    color: '#333',
  },
});

export default Table;
