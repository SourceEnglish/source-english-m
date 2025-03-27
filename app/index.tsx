import React, { useEffect, useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import { Link } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { t } from 'i18next';
import PageLink from '@/components/PageLink';
import { useSpeech } from '@/contexts/SpeechContext';

export default function Index() {
  const { requestedLanguage } = useSpeech();

  useEffect(() => {
    // Handle language change logic here if needed
  }, [requestedLanguage]);

  return (
    <View style={[styles.thread, { gap: 10 }]}>
      <LanguageSelector></LanguageSelector>

      <PageLink
        pagePath={'/letters'}
        pageText={'letters'}
        pageTextTranslated={t('letters')}
      />

      <PageLink
        pagePath={'/cardinalNumbers'}
        pageText={'cardinal numbers'}
        pageTextTranslated={t('cardinal numbers')}
      />

      <PageLink
        pagePath={'/ordinalNumbers'}
        pageText={'ordinal numbers'}
        pageTextTranslated={t('ordinal numbers')}
      />

      <PageLink
        pagePath={'/months'}
        pageText={'months'}
        pageTextTranslated={t('months')}
      />
    </View>
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
