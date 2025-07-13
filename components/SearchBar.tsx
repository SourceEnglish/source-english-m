import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { getLessons } from '@/utils/loadLessons';
import vocabulary from '@/i18n/locales/en-us/vocabulary.json';
import { t } from 'i18next';
import SearchIcon from '@/assets/icons/open_source/search.svg';
import { findIconComponent } from '@/utils/iconMap';
import posColors from '@/constants/constants';

const MAX_SUGGESTIONS = 8;

function flattenVocabulary(vocabArr: any[]): {
  word: string;
  clarifier?: string;
  key: string;
  altWords?: string[];
  pos?: string;
  redirect?: string;
  __icon_text?: string;
  __objectKey?: string;
}[] {
  // Prevent duplicate display of the same word+clarifier+key combo, but allow both "I" (letter) and "I (pronoun)"
  const seen = new Set<string>();
  const result: {
    word: string;
    clarifier?: string;
    key: string;
    altWords?: string[];
    pos?: string;
    redirect?: string;
    __icon_text?: string;
    __objectKey?: string;
  }[] = [];
  vocabArr.forEach((entry) => {
    const key = Object.keys(entry)[0];
    const value = entry[key];

    // Skip vocab entries with __show_word: false
    if (value && typeof value === 'object' && value.__show_word === false) {
      return;
    }

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
          redirect: value.__redirect,
          __icon_text: value.__icon_text,
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
          redirect: value.__redirect,
          __icon_text: value.__icon_text,
        });
        seen.add(sig);
      }
      return;
    }

    if (value && typeof value === 'object' && value.word) {
      const clarifier = value.__clarifier;
      const sig = `${value.word}|${clarifier || ''}|${key}`;
      if (!seen.has(sig)) {
        // If verb with conjugation, add conjugated forms and present simple 3rd person singular to altWords
        let altWords: string[] | undefined = undefined;
        if (
          value.__pos === 'verb' &&
          value.word &&
          value.conjugation &&
          typeof value.conjugation === 'object'
        ) {
          // Compute present simple 3rd person singular, including for phrasal verbs
          const base = value.word;
          let thirdPerson: string | undefined = undefined;
          if (base) {
            // Handle phrasal verbs (e.g., "get up" -> "gets up")
            const phrasalMatch = base.match(/^([a-zA-Z]+)( .+)$/);
            if (phrasalMatch) {
              const verb = phrasalMatch[1];
              const rest = phrasalMatch[2];
              let third = '';
              if (verb.endsWith('y') && !/[aeiou]y$/.test(verb)) {
                third = verb.slice(0, -1) + 'ies';
              } else if (
                verb.endsWith('s') ||
                verb.endsWith('sh') ||
                verb.endsWith('ch') ||
                verb.endsWith('x') ||
                verb.endsWith('z') ||
                verb.endsWith('o')
              ) {
                third = verb + 'es';
              } else {
                third = verb + 's';
              }
              thirdPerson = third + rest;
            } else {
              // Not a phrasal verb
              if (base.endsWith('y') && !/[aeiou]y$/.test(base)) {
                thirdPerson = base.slice(0, -1) + 'ies';
              } else if (
                base.endsWith('s') ||
                base.endsWith('sh') ||
                base.endsWith('ch') ||
                base.endsWith('x') ||
                base.endsWith('z') ||
                base.endsWith('o')
              ) {
                thirdPerson = base + 'es';
              } else {
                thirdPerson = base + 's';
              }
            }
          }
          altWords = [
            value.word,
            ...Object.values(value.conjugation).filter(
              (v) => typeof v === 'string'
            ),
          ];
          // Add present simple 3rd person singular if not already present
          if (thirdPerson && !altWords.includes(thirdPerson)) {
            altWords.push(thirdPerson);
          }
          // Add alternates for "be"
          if (value.word === 'be') {
            ['am', 'are', 'is', 'were'].forEach((form) => {
              if (!altWords!.includes(form)) altWords!.push(form);
            });
          }
          // Remove duplicates and falsy
          altWords = altWords.filter(
            (v, i, arr) => !!v && arr.indexOf(v) === i
          );
        }
        // Add plural forms for nouns
        if (value.__pos === 'noun' && value.word) {
          let plural: string | undefined = undefined;
          // Use explicit plural property if present, otherwise fall back to rules
          if (typeof value.plural === 'string' && value.plural.length > 0) {
            plural = value.plural;
          } else {
            const base = value.word;
            // Basic English pluralization rules
            if (base.endsWith('y') && !/[aeiou]y$/.test(base)) {
              plural = base.slice(0, -1) + 'ies';
            } else if (
              base.endsWith('s') ||
              base.endsWith('sh') ||
              base.endsWith('ch') ||
              base.endsWith('x') ||
              base.endsWith('z')
            ) {
              plural = base + 'es';
            } else {
              plural = base + 's';
            }
          }
          // Add plural to altWords if not already present
          if (plural && plural !== value.word) {
            if (!altWords) altWords = [value.word];
            if (!altWords.includes(plural)) {
              altWords.push(plural);
            }
            // Remove duplicates and falsy
            altWords = altWords.filter(
              (v, i, arr) => !!v && arr.indexOf(v) === i
            );
          }
        }
        result.push({
          word: value.word,
          clarifier,
          key,
          altWords,
          pos: value.__pos,
          redirect: value.__redirect,
          __icon_text: value.__icon_text,
          __objectKey: value.__objectKey,
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

  // const lessons = getLessons() as Array<{ name: string; __hidden?: boolean }>;
  const vocabEntries = flattenVocabulary(vocabulary as any[]);

  // Helper to resolve redirect for vocab entries
  function resolveRedirect(item: { key?: string; redirect?: string }) {
    let targetKey = item.key;
    let redirect = item.redirect;
    // Follow redirects up to a reasonable depth to avoid infinite loops
    let depth = 0;
    while (redirect && depth < 5) {
      const found = vocabEntries.find((v) => v.key === redirect);
      if (found) {
        targetKey = found.key;
        redirect = found.redirect;
        depth++;
      } else {
        break;
      }
    }
    return targetKey;
  }

  const handleSelect = (item: {
    type: string;
    name: string;
    key?: string;
    redirect?: string;
  }) => {
    // Do not blur the searchbar when selecting from the dropdown
    setQuery('');
    // setFocused(false); // <-- Remove this line to keep focus on the searchbar
    if (item.type === 'lesson') {
      router.push(`/${item.name}`);
    } else {
      // If vocab entry has a redirect, resolve it
      // Find the vocab entry by key to get its redirect property
      const vocabEntry = vocabEntries.find((v) => v.key === item.key);
      const targetKey =
        vocabEntry && vocabEntry.redirect
          ? resolveRedirect(vocabEntry)
          : item.key || item.name;
      if (targetKey) {
        router.push(`/vocab/${encodeURIComponent(targetKey)}`);
      }
    }
  };

  const lessons = getLessons() as Array<{ name: string; __hidden?: boolean }>;

  // Prepare all suggestions (lessons and vocab, no prioritization by default)
type Suggestion = {
  type: string;
  name: string;
  clarifier?: string;
  key?: string;
  altWords?: string[];
  pos?: string;
  __icon_text?: string;
  lessonIndex?: number;
  __objectKey?: string;
};

  // Add lessonIndex to lessons for rendering index as TextIcon
  // Use the same logic as PageLink to skip certain lessons in the index
  // (e.g., skip lessons with __hidden or any other custom logic)
  // We'll assign lessonIndex based on the filtered, visible lessons only.
  const visibleLessons = lessons.filter((l) => !l.__hidden);
  let allSuggestions: Suggestion[] = [
    ...visibleLessons.map((l, idx) => {
      // Determine emoji for lessons
      let emoji = '📘';
      if (l.name && l.name.endsWith('vocab')) emoji = '📗';
      // Use the index in the visible list for lessonIndex
      return {
        type: 'lesson',
        name: l.name,
        emoji,
        altWords: undefined,
        lessonIndex: idx + 1,
      };
    }),
    ...vocabEntries.map((v) => ({
      type: 'vocab',
      name: v.word,
      clarifier: v.clarifier,
      key: v.key,
      altWords: v.altWords,
      pos: v.pos,
      __icon_text: v.__icon_text,
      __objectKey: v.__objectKey,
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
  __icon_text?: string;
  altWords?: string[];
  __objectKey?: string;
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
        __icon_text: v.__icon_text,
        altWords: v.altWords, // <-- Add altWords here
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

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <SearchIcon width={22} height={22} style={styles.searchIcon} />
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
          onSubmitEditing={() => {
            if (suggestions.length > 0) {
              handleSelect(suggestions[0]);
              // Optionally blur or keep focus as desired
              // inputRef.current?.blur();
            }
          }}
        />
      </View>
      {focused && query.length > 0 && suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            data={suggestions}
            keyExtractor={(item) => `${item.type}:${item.key || item.name}`}
            renderItem={({ item }) => {
              // Use icon instead of emoji
              let iconComponent: React.FC<any>;
              // Define vocabEntry for use in all branches
              // Add type assertion to help TypeScript
              const vocabEntry =
                item.type === 'vocab'
                  ? ((vocabEntries.find((v) => v.key === item.key) || item) as {
                      key?: string;
                      word?: string;
                      plural?: string;
                      conjugation?: Record<string, string>;
                      __objectKey?: string;
                      pos?: string;
                      [key: string]: any;
                    })
                  : undefined;

              if (item.type === 'lesson') {
                // Render green book emoji as the icon for lessons
                iconComponent = (props: any) => {
                  const { width = 22, height = 22, style } = props || {};
                  return (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width,
                        height,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Math.min(width, height) * 0.95,
                          color: undefined,
                          textAlign: 'center',
                          fontFamily: 'Lexend_400Regular',
                        }}
                      >
                        {item.name.endsWith('vocab') ? '📗' : '📘'}
                      </Text>
                    </View>
                  );
                };
              } else {
                // For vocab, try to find the vocab entry for more info
                iconComponent = findIconComponent(vocabEntry);
              }
              const Icon = iconComponent;

              // Determine display text and part of speech for suggestion
              let displayText = t(item.name);
              // If vocab entry has __objectKey, display it in parenthesis after the word
              if (
                item.type === 'vocab' &&
                (item.__objectKey || (vocabEntry && typeof vocabEntry.__objectKey === 'string' && vocabEntry.__objectKey.trim() !== ''))
              ) {
                // Prefer item.__objectKey, fallback to vocabEntry.__objectKey
                const objectKey = item.__objectKey || (vocabEntry ? vocabEntry.__objectKey : undefined);
                if (objectKey) {
                  // If __objectKey contains parenthesis, show only the text inside
                  const match = objectKey.match(/\(([^)]+)\)/);
                  if (match && match[1]) {
                    displayText = `${t(item.name)} (${match[1]})`;
                  } else {
                    displayText = `${t(item.name)} (${objectKey})`;
                  }
                }
              }
              let partOfSpeech =
                item.type === 'lesson' ? 'lesson' : item.pos || '';

              // If the query matches an altWord (not the base), show "altWord (base)" and adjust part of speech
              if (
                item.altWords &&
                item.altWords.length > 0 &&
                typeof query === 'string' &&
                query.length > 0
              ) {
                const q = query.trim().toLowerCase();
                // Find the best altWord match
                const matchedAlt = item.altWords.find(
                  (alt) => alt.toLowerCase() === q && alt !== item.name
                );
                if (matchedAlt) {
                  displayText = `${matchedAlt} (${item.name})`;
                  // Adjust part of speech for plural nouns
                  if (
                    item.pos === 'noun' &&
                    vocabEntry &&
                    typeof vocabEntry.plural === 'string' &&
                    matchedAlt === vocabEntry.plural &&
                    matchedAlt !== item.name
                  ) {
                    partOfSpeech = 'Noun (plural)';
                  }
                  // Adjust part of speech for conjugated verbs
                  if (
                    item.pos === 'verb' &&
                    vocabEntry &&
                    vocabEntry.conjugation &&
                    typeof vocabEntry.conjugation === 'object'
                  ) {
                    // Find which conjugation key matches the altWord
                    const foundKey = Object.entries(
                      vocabEntry.conjugation
                    ).find(
                      ([k, v]) =>
                        typeof v === 'string' &&
                        v.toLowerCase() === matchedAlt.toLowerCase()
                    );
                    if (foundKey) {
                      // Capitalize first letter of key for display
                      const tense = foundKey[0]
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                      partOfSpeech = `verb (${tense})`;
                    } else {
                      // Check for present simple 3rd person singular
                      // If not found in conjugation, but is a 3rd person form
                      if (
                        matchedAlt !== item.name &&
                        matchedAlt !== vocabEntry.word
                      ) {
                        partOfSpeech = 'verb (3rd person singular)';
                      }
                    }
                  }
                }
              }

              // Prevent focus from shifting away on press/longPress
              const handlePress = (e: any) => {
                e.preventDefault?.();
                e.stopPropagation?.();
                handleSelect(item);
                inputRef.current?.focus();
              };
              return (
                <TouchableOpacity
                  style={styles.suggestion}
                  onPress={handlePress}
                  onLongPress={handlePress}
                  delayLongPress={100}
                  activeOpacity={0.6}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        minWidth: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon width={22} height={22} />
                    </View>
                    <View
                      style={{
                        width: 2,
                        height: 22,
                        backgroundColor: 'gray',
                        marginHorizontal: 8,
                        borderRadius: 1,
                      }}
                    />
                    <Text style={styles.suggestionText}>
                      {displayText}
                      {item.clarifier ? ` (${item.clarifier})` : ''}
                    </Text>
                    {/* Divider and POS/lesson type */}
                    <View
                      style={{
                        width: 2,
                        height: 22,
                        backgroundColor:
                          item.type === 'vocab'
                            ? posColors[item.pos || 'default'] ||
                              posColors.default
                            : item.type === 'lesson'
                            ? '#000000'
                            : '#000000',
                        marginHorizontal: 8,
                        borderRadius: 1,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        color:
                          item.type === 'vocab'
                            ? posColors[item.pos || 'default'] ||
                              posColors.default
                            : item.type === 'lesson'
                            ? '#000000'
                            : '#000000',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    >
                      {partOfSpeech}
                    </Text>
                  </View>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    paddingVertical: 0,
  },
  searchIcon: {
    marginRight: 6,
    color: '#888',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    // Remove border and radius here, handled by inputRow
    borderWidth: 0,
    borderRadius: 0,
    padding: 10,
    fontFamily: 'Lexend_400Regular',
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
    fontFamily: 'Lexend_400Regular',
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
    fontFamily: 'Lexend_400Regular',
  },
});
