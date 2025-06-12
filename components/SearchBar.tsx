import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getLessons } from '@/utils/loadLessons';
import vocabulary from '@/i18n/locales/en-us/vocabulary.json';
import { t } from 'i18next';

const MAX_SUGGESTIONS = 8;

function flattenVocabulary(vocabArr: any[]): string[] {
  return vocabArr.map((entry) => Object.keys(entry)[0]);
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  const lessons = getLessons() as Array<{ name: string; __hidden?: boolean }>;
  const vocabWords = flattenVocabulary(vocabulary as any[]);

  const suggestions = [
    ...lessons
      .filter((l) => !l.__hidden)
      .map((l) => ({ type: 'lesson', name: l.name })),
    ...vocabWords.map((w) => ({ type: 'vocab', name: w })),
  ]
    .filter((item) =>
      item.name.toLowerCase().includes(query.trim().toLowerCase())
    )
    .slice(0, MAX_SUGGESTIONS);

  const handleSelect = (item: { type: string; name: string }) => {
    setQuery('');
    setFocused(false);
    if (item.type === 'lesson') {
      router.push(`/${item.name}`);
    } else {
      router.push(`/vocab/${encodeURIComponent(item.name)}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={t('Search for lessons or vocabulary')}
        value={query}
        onChangeText={setQuery}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        autoCorrect={false}
        autoCapitalize="none"
      />
      {focused && query.length > 0 && suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={suggestions}
            keyExtractor={(item) => `${item.type}:${item.name}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestion}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.suggestionText}>
                  {item.type === 'lesson' ? '📘 ' : '🔤 '}
                  {t(item.name)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    zIndex: 100,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  dropdown: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: 240,
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  suggestion: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
  },
});
