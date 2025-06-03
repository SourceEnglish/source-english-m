import React, { useEffect, useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import { Link } from 'expo-router';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { t } from 'i18next';
import PageLink from '@/components/PageLink';
import { useSpeech } from '@/contexts/SpeechContext';
import { MaterialIcons } from '@expo/vector-icons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getLessons } from '@/utils/loadLessons';
import { iconMap } from '@/utils/iconMap';
import { CENTERED_MAX_WIDTH } from '@/constants/constants';

export default function Index() {
  const { requestedLanguage } = useSpeech();
  const lessons = getLessons() as Array<{ name: string }>;

  useEffect(() => {
    // Handle language change logic here if needed
  }, [requestedLanguage]);

  return (
    <ScrollView>
      <View style={styles.outerContainer}>
        <View style={[styles.thread, { gap: 12 }]}>
          {/* <PageLink
            icon={
              iconMap['speak']
                ? iconMap['speak']({ width: 32, height: 32 })
                : null
            }
            pagePath="/voiceList"
            pageText="Voice List"
            pageTextTranslated={t('Voice List')}
          /> */}

          {lessons.map((lesson) => {
            // Skip lessons with __hidden property
            if ((lesson as any).__hidden) return null;
            const Icon = iconMap[lesson.name];
            return (
              <PageLink
                key={lesson.name}
                icon={Icon ? <Icon width={40} height={40} /> : null}
                pagePath={`/${lesson.name}`}
                pageText={lesson.name}
                pageTextTranslated={t(lesson.name)}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    maxWidth: CENTERED_MAX_WIDTH,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  thread: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: 'black',
    backgroundColor: 'gray',
  },
  link: {
    backgroundColor: 'white',
    display: 'flex',
    fontWeight: 'bold',
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 50,
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 10,
    columnGap: 10,
    paddingRight: 10,
    alignItems: 'center',
    fontSize: 14,
  },
});
