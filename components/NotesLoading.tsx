import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const NotesLoading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color="#888" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    minHeight: 40, // Match collapsed notes header height
    height: 40, // Fixed height to match collapsed Notes
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 2,
    paddingHorizontal: 12,
    paddingVertical: 0,
  },
});

export default NotesLoading;
