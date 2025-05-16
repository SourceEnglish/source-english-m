import lessons from '@/i18n/locales/en-us/lessons.json';
import vocabulary from '@/i18n/locales/en-us/vocabulary.json';
import sections from '@/i18n/locales/en-us/sections.json';

export function getLessons() {
  // lessons.json is an array of objects with a single key each
  return lessons.map((entry: any) => Object.values(entry)[0]);
}

export function getVocabulary() {
  // vocabulary.json is an array of objects with a single key each
  return vocabulary.map((entry: any) => Object.values(entry)[0]);
}

export function getSections() {
  // sections.json is an array of objects
  return sections;
}
