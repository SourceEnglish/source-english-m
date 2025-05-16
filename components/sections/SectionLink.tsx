import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ReadableText from '../ReadableText';

const SectionLink = ({
  sectionName,
  text,
  url,
}: {
  sectionName?: string;
  text: string;
  url?: string;
}) => {
  const router = useRouter();
  const handlePress = () => {
    if (url) {
      // Open external link
      window.open(url, '_blank');
    } else if (sectionName) {
      // Navigate to section anchor
      router.push(`#${sectionName}` as any);
    }
  };
  return (
    <TouchableOpacity style={styles.link} onPress={handlePress}>
      <ReadableText
        text={text}
        style={{ color: '#007AFF', textDecorationLine: 'underline' }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    marginVertical: 6,
    marginHorizontal: 4,
  },
});

export default SectionLink;
