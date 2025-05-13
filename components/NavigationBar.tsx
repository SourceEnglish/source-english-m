import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure this is installed
import { Link } from 'expo-router'; // Use Link for navigation

const NavigationBar = () => {
  return (
    <View style={styles.container}>
      {/* Home Button */}
      <Link href="/" style={styles.button}>
        <MaterialCommunityIcons name="home" size={36} color="gray" />
      </Link>

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
