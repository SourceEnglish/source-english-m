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

  // If no lessons prop, don't render
  if (!lessons || lessons.length === 0) return null;


  // Filter out hidden and vocabulary lessons with __lesson, as in index
  const visibleLessons = lessonsData
    .map((entry: any) => Object.values(entry)[0])
    .filter(
      (lesson: any) =>
        !lesson.__hidden && !(lesson.__type === 'vocabulary' && lesson.__lesson)
    );

  // Only match visible lessons
  const lessonTagSet = new Set((lessons || []).map((t) => t.toLowerCase()));
  const matchingLessons = lessonsData
    .map((entry: any) => {
      const key = Object.keys(entry)[0];
      const lesson = entry[key];
      return { key, lesson };
    })
    .filter(({ lesson }) =>
      visibleLessons.includes(lesson) &&
      Array.isArray(lesson.__tags) &&
      lesson.__tags.some((lessonTag: string) => lessonTag && lessonTag.toLowerCase && lessonTag.toLowerCase() && lessonTagSet.has(lessonTag.toLowerCase()))
    );

  if (matchingLessons.length === 0) return null;

  return (
    <VocabularySection headerText="Lessons" hasDivider={true}>
      <View style={{ width: '100%', marginTop: 10, gap: 12, display: 'flex', flexDirection: 'column' }}>
        {matchingLessons.map(({ key, lesson }) => {
          // Determine lesson number as in index
          const lessonIndex = visibleLessons.findIndex((l: any) => l.name === key) + 1;
          // Use cards icon for vocabulary lessons, lesson icon otherwise
          let icon = null;
          if (lesson.__type === 'vocabulary') {
            const CardsIcon = iconMap['cards'];
            icon = CardsIcon ? <CardsIcon width={60} height={60} /> : null;
          } else if (lesson.__type === 'lesson') {
            const LessonIcon = iconMap['lesson'];
            icon = LessonIcon ? <LessonIcon width={60} height={60} /> : null;
          }
          return (
            <PageLink
              key={key}
              icon={icon}
              pagePath={`/${key}`}
              pageText={lesson.name || key.replace(/_/g, ' ')}
              pageTextTranslated={lesson.name || key.replace(/_/g, ' ')}
              index={lessonIndex > 0 ? lessonIndex : undefined}
            />
          );
        })}
      </View>
    </VocabularySection>
  );
};

const styles = StyleSheet.create({});

export default LessonBacklink;
