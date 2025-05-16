import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ReadableText from '../ReadableText';

const LessonLink = ({
  lessonName,
  text,
}: {
  lessonName?: string;
  text: string;
}) => {
  const router = useRouter();
  const handlePress = () => {
    if (lessonName) {
      router.push(`/${lessonName}` as any);
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

export default LessonLink;
