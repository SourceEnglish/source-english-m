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

export default function Index() {
  const { requestedLanguage } = useSpeech();

  useEffect(() => {
    // Handle language change logic here if needed
  }, [requestedLanguage]);

  return (
    <ScrollView>
      <View style={[styles.thread, { gap: 10 }]}>
        {/* <LanguageSelector></LanguageSelector> */}
        <PageLink
          icon={
            <MaterialCommunityIcons
              name="format-letter-case"
              size={40}
              color="gray"
              style={{ width: 40, height: 40 }}
            />
          }
          pagePath={'/food'}
          pageText={'food'}
          pageTextTranslated={t('food')}
        />

        <PageLink
          icon={
            <MaterialCommunityIcons
              name="format-letter-case"
              size={40}
              color="gray"
              style={{ width: 40, height: 40 }}
            />
          }
          pagePath={'/letters'}
          pageText={'letters'}
          pageTextTranslated={t('letters')}
        />

        <PageLink
          icon={
            <MaterialCommunityIcons
              name="format-letter-case"
              size={40}
              color="gray"
              style={{ width: 40, height: 40 }}
            />
          }
          pagePath={'/printHTML'}
          pageText={'printHTML'}
          pageTextTranslated={t('printHTML')}
        />
        <PageLink
          icon={
            <Octicons
              name="number"
              size={40}
              color="gray"
              style={{
                width: 40,
                height: 40,
                paddingLeft: 5,
                paddingRight: -5,
              }}
            />
          }
          pagePath={'/print'}
          pageText={'print'}
          pageTextTranslated={t('print')}
        />

        <PageLink
          icon={
            <Octicons
              name="number"
              size={40}
              color="gray"
              style={{
                width: 40,
                height: 40,
                paddingLeft: 5,
                paddingRight: -5,
              }}
            />
          }
          pagePath={'/cardinalNumbers'}
          pageText={'cardinal numbers'}
          pageTextTranslated={t('cardinal numbers')}
        />

        <PageLink
          icon={<FontAwesome6 name="medal" size={40} color="gray" />}
          pagePath={'/ordinalNumbers'}
          pageText={'ordinal numbers'}
          pageTextTranslated={t('ordinal numbers')}
        />

        <PageLink
          icon={
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={40}
              color="gray"
            />
          }
          pagePath={'/months'}
          pageText={'months'}
          pageTextTranslated={t('months')}
        />

        <PageLink
          icon={
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={40}
              color="gray"
            />
          }
          pagePath={'/months'}
          pageText={'months'}
          pageTextTranslated={t('months')}
        />
        <PageLink
          icon={
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={40}
              color="gray"
            />
          }
          pagePath={'/months'}
          pageText={'months'}
          pageTextTranslated={t('months')}
        />
        <PageLink
          icon={
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={40}
              color="gray"
            />
          }
          pagePath={'/months'}
          pageText={'months'}
          pageTextTranslated={t('months')}
        />
        <PageLink
          icon={
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={40}
              color="gray"
            />
          }
          pagePath={'/months'}
          pageText={'months'}
          pageTextTranslated={t('months')}
        />
        <PageLink
          icon={
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={40}
              color="gray"
            />
          }
          pagePath={'/months'}
          pageText={'months'}
          pageTextTranslated={t('months')}
        />
        <PageLink
          icon={
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={40}
              color="gray"
            />
          }
          pagePath={'/months'}
          pageText={'months'}
          pageTextTranslated={t('months')}
        />
        <PageLink
          icon={
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={40}
              color="gray"
            />
          }
          pagePath={'/months'}
          pageText={'months'}
          pageTextTranslated={t('months')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  thread: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
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
