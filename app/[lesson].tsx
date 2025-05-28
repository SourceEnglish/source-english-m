import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, Text, StyleSheet, Platform } from 'react-native';
import lessonsData from '@/i18n/locales/en-us/lessons.json';
import sectionsData from '@/i18n/locales/en-us/sections.json';
import vocabularyData from '@/i18n/locales/en-us/vocabulary.json';
import CardPreview from '@/components/CardPreview';
import SectionRenderer from '@/components/SectionRenderer';
import Notes from '@/components/Notes';
import { useDeck } from '@/contexts/DeckContext';

import { CENTERED_MAX_WIDTH } from '@/constants/constants';

export function generateStaticParams() {
  return lessonsData.map((entry: any) => {
    const name = Object.keys(entry)[0];
    return { lesson: name };
  });
}

export default function LessonPage() {
  const { lesson } = useLocalSearchParams();
  const lessonName = lesson as string;
  const { setDeckEntries, setDeckIndex } = useDeck();

  // Find the lesson entry
  const lessonEntry = lessonsData.find((entry: any) => entry[lessonName]);
  const lessonData = lessonEntry
    ? (lessonEntry as Record<string, any>)[lessonName]
    : null;

  if (!lessonData) {
    return <Text>Lesson not found</Text>;
  }

  // Use lessonData.name if available, otherwise fallback to lessonName
  const displayName = lessonData.name || lessonName;

  if (lessonData.__type === 'vocabulary') {
    const vocabEntries = Array.isArray(vocabularyData)
      ? vocabularyData
          .map((entry: any) => {
            const key = Object.keys(entry)[0];
            const cardData = entry[key];
            return {
              ...cardData,
              vocabKey: key,
              __forced_pronunciation: cardData.__forced_pronunciation,
            };
          })
          .filter((entry: any) =>
            lessonData.__tags?.some((tag: string) =>
              entry.__tags?.includes(tag)
            )
          )
      : [];

    React.useEffect(() => {
      const deckKeys = vocabEntries.map((entry: any) => entry.vocabKey);
      setDeckEntries(deckKeys);
      setDeckIndex(null);
      return () => {
        setDeckEntries(null);
        setDeckIndex(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonName]);

    return (
      <ScrollView>
        <View style={[styles.outerContainer, { marginTop: 10 }]}>
          <Notes noteKey={`lesson_${lessonName}`} />
          {/* <Text style={{ fontSize: 28, fontWeight: 'bold', margin: 16 }}>
            {displayName}
          </Text> */}
          {lessonData.intro && (
            <Text style={{ margin: 16, fontSize: 16 }}>{lessonData.intro}</Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              rowGap: 3,
              columnGap: 3,
              justifyContent:
                Platform.OS !== 'web' ? 'space-between' : undefined,
            }}
          >
            {vocabEntries.map((entry: any, idx: number) => (
              <CardPreview
                key={entry.vocabKey}
                card={entry}
                vocabKey={entry.vocabKey}
                cardIndex={idx}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  if (lessonData.__type === 'lesson') {
    const sections = Array.isArray(sectionsData)
      ? sectionsData
          .filter((section: any) => section.__lessons?.includes(lessonName))
          .sort((a: any, b: any) => (a.__order ?? 0) - (b.__order ?? 0))
      : [];

    return (
      <ScrollView>
        <View style={styles.outerContainer}>
          <Notes noteKey={`lesson_${lessonName}`} />
          {/* <Text style={{ fontSize: 28, fontWeight: 'bold', margin: 16 }}>
            {displayName}
          </Text> */}
          {lessonData.intro && (
            <Text style={{ margin: 16, fontSize: 16 }}>{lessonData.intro}</Text>
          )}
          <View style={{ padding: 16 }}>
            {sections.map((section: any) => (
              <SectionRenderer
                key={section._id || section.__order}
                section={section}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  return <Text>Unknown lesson type</Text>;
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    maxWidth: CENTERED_MAX_WIDTH,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 0,
  },
});
