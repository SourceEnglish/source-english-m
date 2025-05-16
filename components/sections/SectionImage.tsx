import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SectionImage = ({
  src,
  alt,
  caption,
}: {
  src?: string;
  alt?: string;
  caption?: string;
}) => {
  let imageSource = src;
  //   if (src && !src.startsWith('http')) {
  //     imageSource = require(`@/assets/images/${src}`);
  //   }
  return (
    <View style={styles.container}>
      <Image
        source={
          typeof imageSource === 'string' ? { uri: imageSource } : imageSource
        }
        style={styles.image}
        accessibilityLabel={alt}
      />
      {caption && <Text style={styles.caption}>{caption}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 12,
  },
  image: {
    width: 220,
    height: 140,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  caption: {
    marginTop: 6,
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default SectionImage;
