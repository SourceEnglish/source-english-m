import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import VocabularySection from './VocabularySection';
import lessonsData from '@/i18n/locales/en-us/lessons.json';
import PageLink from '@/components/PageLink';
import { iconMap } from '@/utils/iconMap';

interface LessonBacklinkProps {
  lessons?: string[];
}

const LessonBacklink: React.FC<LessonBacklinkProps> = ({ lessons }) => {
  const router = useRouter();

  if (!lessons || lessons.length === 0) return null;

  // Only link to the first lesson for now
  const lessonKey = lessons[0];
  const lessonEntry = lessonsData.find(
    (entry: any) => Object.keys(entry)[0] === lessonKey
  );
  // Use type assertion to avoid TS index error
  const lessonData = lessonEntry
    ? (lessonEntry as Record<string, any>)[lessonKey]
    : null;

  // Determine lesson number as in index.tsx
  // Filter out hidden and vocabulary lessons with __lesson
  const visibleLessons = lessonsData
    .map((entry: any) => Object.values(entry)[0])
    .filter(
      (lesson: any) =>
        !lesson.__hidden && !(lesson.__type === 'vocabulary' && lesson.__lesson)
    );
  const lessonIndex =
    visibleLessons.findIndex((l: any) => l.name === lessonKey) + 1;

  // Use cards icon for vocabulary lessons, lesson icon otherwise
  let icon = null;
  if (lessonData?.__type === 'vocabulary') {
    const CardsIcon = iconMap['cards'];
    icon = CardsIcon ? <CardsIcon width={60} height={60} /> : null;
  } else if (lessonData?.__type === 'lesson') {
    const LessonIcon = iconMap['cards'];
    icon = LessonIcon ? <LessonIcon width={60} height={60} /> : null;
  }

  return (
    <VocabularySection headerText="Lessons" hasDivider={true}>
      <View style={{ width: '100%', marginTop: 10 }}>
        <PageLink
          icon={icon}
          pagePath={`/${lessonKey}`}
          pageText={lessonData?.name || lessonKey.replace(/_/g, ' ')}
          pageTextTranslated={lessonData?.name || lessonKey.replace(/_/g, ' ')}
          index={lessonIndex > 0 ? lessonIndex : undefined}
        />
      </View>
    </VocabularySection>
  );
};

const styles = StyleSheet.create({});

export default LessonBacklink;
