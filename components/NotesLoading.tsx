import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';

const NotesLoading: React.FC = () => {
  // Use screen width to determine if the device is mobile (like CardPreview)
  const screenWidth = Dimensions.get('window').width;
  const isMobile = screenWidth <= 768;
  const platformStyle = isMobile
    ? { minHeight: 62, height: 62 }
    : { minHeight: 63, height: 63 };
  return (
    <View style={[styles.container, platformStyle]}>
      <View style={styles.pulseBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 2,
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 6, // Match collapsed notes border radius
  },
  pulseBar: {
    width: '100%',
    height: 32, // Match the height of the collapseHeader in Notes
    borderRadius: 6, // Match collapseHeader borderRadius
    backgroundColor: '#e0e0e0',
    opacity: 0.7,
    marginVertical: 4,
    // Pulsing animation
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    // For web, add animation
    ...(Platform.OS === 'web'
      ? {
          animation: 'notesPulse 1.2s infinite',
        }
      : {}),
  },
});

// For web: inject keyframes for pulsing animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes notesPulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
  `;
  document.head.appendChild(style);
}

export default NotesLoading;
