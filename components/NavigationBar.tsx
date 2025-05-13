import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Use useRouter for navigation
import ReadAloudToggle from '@/components/ReadAloudToggle'; // Import ReadAloudToggle
import HomeIcon from '@/assets/icons/licensed/home.svg'; // Import the home.svg as a React component
import MoreOptionsIcon from '@/assets/icons/licensed/more_options.svg'; // Import the more_options.svg as a React component

const NavigationBar = () => {
  const router = useRouter(); // Get the router object for navigation

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/')} // Navigate to the home page
      >
        <HomeIcon height={34} /> {/* Use the home.svg icon */}
      </TouchableOpacity>

      {/* Read Aloud Toggle */}
      <View style={styles.button}>
        <ReadAloudToggle />
      </View>

      {/* More Options */}
      <TouchableOpacity style={styles.button}>
        <MoreOptionsIcon height={34} /> {/* Placeholder for settings */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingRight: 10,
    paddingLeft: 10,
    columnGap: 10,
    height: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Thin black border
    borderColor: 'black', // Border color
    borderRadius: 5, // Rounded corners
    padding: 5, // Add some padding for better spacing
  },
});

export default NavigationBar;
//   },
