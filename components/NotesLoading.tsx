import React from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import NotebookPen from '@/assets/icons/open_source/notebook-pen.svg';

const PULSE_DURATION = 1200;

const NotesLoading: React.FC<{ expanded?: boolean }> = ({ expanded }) => {
  const pulseAnim = React.useRef(new Animated.Value(0.7)).current;

  React.useEffect(() => {
    if (expanded) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: PULSE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.7,
            duration: PULSE_DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [expanded, pulseAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NotebookPen width={20} height={20} style={{ marginRight: 6 }} />
          <Text style={styles.label}>Notes</Text>
        </View>
        {/* Placeholder for chevron icon */}
        <View style={styles.chevron} />
      </View>
      {expanded && (
        <>
          <Animated.View style={[styles.input, { opacity: pulseAnim }]} />
          <View style={styles.counterPlaceholder} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontWeight: 'bold',
  },
  chevron: {
    width: 24,
    height: 24,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
  },
  input: {
    minHeight: 60,
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#eaeaea',
    marginBottom: 4,
  },
  counterPlaceholder: {
    alignSelf: 'flex-end',
    width: 60,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#e0e0e0',
  },
});

export default NotesLoading;
