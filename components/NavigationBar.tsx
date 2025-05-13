import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure this is installed
import { useRouter } from 'expo-router'; // Use useRouter for navigation

const NavigationBar = () => {
  const router = useRouter(); // Get the router object for navigation

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/')} // Navigate to the home page
      >
        <MaterialCommunityIcons name="home" size={36} color="gray" />
      </TouchableOpacity>

      {/* Text-to-Speech Button */}
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="text-to-speech" size={36} color="gray" />
      </TouchableOpacity>

      {/* Settings Button */}
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="cog" size={36} color="gray" />
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
    padding: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavigationBar;
