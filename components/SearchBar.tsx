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

// Emoji map for __pos
const posEmoji: Record<string, string> = {
  letter: '🔡',
  number: '🔢',
  noun: '📦',
  'proper noun': '🏷️',
  pronoun: '🙋',
  verb: '🏃',
  adjective: '🎨',
  adverb: '🕒',
  // fallback
  default: '📝',
};

function flattenVocabulary(
  vocabArr: any[]
): {
  word: string;
  clarifier?: string;
  key: string;
  altWords?: string[];
  pos?: string;
}[] {
  // Prevent duplicate display of the same word+clarifier+key combo, but allow both "I" (letter) and "I (pronoun)"
  const seen = new Set<string>();
  const result: {
    word: string;
    clarifier?: string;
    key: string;
    altWords?: string[];
    pos?: string;
  }[] = [];
  vocabArr.forEach((entry) => {
    const key = Object.keys(entry)[0];
    const value = entry[key];

    if (
      value &&
      typeof value === 'object' &&
      value.__pos === 'letter' &&
      key.length === 1
    ) {
      const sig = `${key}|letter|${key}`;
      if (!seen.has(sig)) {
        result.push({
          word: key,
          clarifier: undefined,
          key,
          pos: value.__pos,
        });
        seen.add(sig);
      }
      return;
    }

    if (
      value &&
      typeof value === 'object' &&
      value.__pos === 'number' &&
      value.__icon_text &&
      value.word
    ) {
      const sig = `${value.word}|${value.__clarifier || ''}|${key}`;
      if (!seen.has(sig)) {
        result.push({
          word: value.word,
          clarifier: value.__clarifier,
          key,
          altWords: [value.__icon_text, value.word],
          pos: value.__pos,
        });
        seen.add(sig);
      }
      return;
    }

    if (value && typeof value === 'object' && value.word) {
      const clarifier = value.__clarifier;
      const sig = `${value.word}|${clarifier || ''}|${key}`;
      if (!seen.has(sig)) {
        result.push({
          word: value.word,
          clarifier,
          key,
          pos: value.__pos,
        });
        seen.add(sig);
      }
    } else if (!value || typeof value !== 'object') {
      const sig = `${key}||${key}`;
      if (!seen.has(sig)) {
        result.push({ word: key, key });
        seen.add(sig);
      }
    }
  });
  return result;
}

// Utility: Simple Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: an + 1 }, () => Array(bn + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[i][0] = i;
  for (let j = 0; j <= bn; j++) matrix[0][j] = j;
  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[an][bn];
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();

  const lessons = getLessons() as Array<{ name: string; __hidden?: boolean }>;
  const vocabEntries = flattenVocabulary(vocabulary as any[]);

  // Prepare all suggestions (lessons and vocab, no prioritization by default)
  type Suggestion = {
    type: string;
    name: string;
    clarifier?: string;
    key?: string;
    altWords?: string[];
    pos?: string;
  };

  let allSuggestions: Suggestion[] = [
    ...lessons
      .filter((l) => !l.__hidden)
      .map((l) => {
        // Determine emoji for lessons
        let emoji = '📘';
        if (l.name.endsWith('vocab')) emoji = '📗';
        return { type: 'lesson', name: l.name, emoji, altWords: undefined };
      }),
    ...vocabEntries.map((v) => ({
      type: 'vocab',
      name: v.word,
      clarifier: v.clarifier,
      key: v.key,
      altWords: v.altWords,
      pos: v.pos,
    })),
  ].filter((item) => {
    const q = query.trim().toLowerCase();
    if (item.name.toLowerCase().includes(q)) return true;
    if (
      item.altWords &&
      item.altWords.some((alt) => alt.toLowerCase().includes(q))
    )
      return true;
    return false;
  });

  // Sort suggestions by closeness to query using Levenshtein distance, then by startsWith, then alphabetically
  if (query.length > 0) {
    allSuggestions = allSuggestions
      .map((item) => {
        const q = query.toLowerCase();
        // Use the closest altWord for distance if available
        let minLev = levenshtein(q, item.name.toLowerCase());
        let starts = item.name.toLowerCase().startsWith(q) ? 0 : 1;
        if (item.altWords && item.altWords.length > 0) {
          for (const alt of item.altWords) {
            const lev = levenshtein(q, alt.toLowerCase());
            if (lev < minLev) minLev = lev;
            if (alt.toLowerCase().startsWith(q)) starts = 0;
          }
        }
        return {
          ...item,
          _lev: minLev,
          _starts: starts,
        };
      })
      .sort((a, b) => {
        if (a._starts !== b._starts) return a._starts - b._starts;
        if (a._lev !== b._lev) return a._lev - b._lev;
        return a.name.localeCompare(b.name);
      });
  }

  // If the query is a single letter, prioritize single letter vocab entries
  let suggestions: {
    type: string;
    name: string;
    clarifier?: string;
    key?: string;
    pos?: string;
    emoji?: string;
  }[] = [];

  if (query.length === 1 && /^[a-zA-Z]$/.test(query)) {
    const letter = query.toUpperCase();

    const singleLetterVocab = vocabEntries
      .filter((v) => v.word.length === 1 && v.word.toUpperCase() === letter)
      .map((v) => ({
        type: 'vocab',
        name: v.word,
        clarifier: v.clarifier,
        key: v.key,
        pos: v.pos,
      }));

    const rest = allSuggestions.filter(
      (item) =>
        !(
          item.type === 'vocab' &&
          item.name.length === 1 &&
          item.name.toUpperCase() === letter
        ) &&
        !(
          item.type === 'vocab' &&
          item.key &&
          item.key.length === 1 &&
          item.key.toUpperCase() === letter &&
          item.key === item.name
        )
    );

    suggestions = [...singleLetterVocab, ...rest].slice(0, MAX_SUGGESTIONS);
  } else {
    suggestions = allSuggestions.slice(0, MAX_SUGGESTIONS);
  }

  const handleSelect = (item: { type: string; name: string; key?: string }) => {
    setQuery('');
    setFocused(false);
    if (item.type === 'lesson') {
      router.push(`/${item.name}`);
    } else {
      router.push(`/vocab/${encodeURIComponent(item.key || item.name)}`);
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
            keyExtractor={(item) => `${item.type}:${item.key || item.name}`}
            renderItem={({ item }) => {
              let emoji = '📝';
              if (item.type === 'lesson') {
                emoji =
                  item.emoji || (item.name.endsWith('vocab') ? '📗' : '📘');
              } else if (item.type === 'vocab' && item.pos) {
                emoji = posEmoji[item.pos] || posEmoji.default;
              }
              return (
                <TouchableOpacity
                  style={styles.suggestion}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.suggestionText}>
                    {emoji + ' '}
                    {t(item.name)}
                    {item.clarifier ? ` (${item.clarifier})` : ''}
                  </Text>
                </TouchableOpacity>
              );
            }}
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
