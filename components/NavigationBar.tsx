import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure this is installed
import {
  useSafeAreaInsets,
  useSafeAreaFrame,
} from 'react-native-safe-area-context';

const NavigationBar = () => {
  const insets = useSafeAreaInsets();
  const dinsets = useSafeAreaFrame();
  const screenWidth = dinsets.width; // Get the screen width
  const headerHeight = insets.top; // Get the height of the header
  return (
    <View style={[styles.container]}>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="home" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="text-to-speech" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="cog" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1, // Ensure it is above other components

    right: 0, // Stick to the right of the screen
    width: '25%', // Adjust width for the navigation bar
    flexDirection: 'row',

    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white', // Optional: Add a background color
  },
  button: {
    flex: 1, // Allow buttons to resize proportionally
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavigationBar;
