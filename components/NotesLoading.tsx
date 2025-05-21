import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const NotesLoading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color="#888" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    minHeight: 60, // Match collapsed notes header height
    height: 60, // Fixed height to match collapsed Notes
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 2,
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderWidth: 1, // Match collapsed notes border
    borderColor: '#bbb',
    borderRadius: 6, // Match collapsed notes border radius
  },
});

export default NotesLoading;
