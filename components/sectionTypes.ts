import type { TableHeader, TableEntry } from './sections/Table';

// Section type definitions for strong typing and easier mapping
export type SectionType =
  | 'link'
  | 'paragraph'
  | 'header'
  | 'quote'
  | 'table'
  | 'image'
  | 'video'
  | 'subheader'
  | 'lesson_link'
  | 'table'
  | 'section_link'
  | 'vocabularyCarousel'; // Add this line

export interface Section {
  __forced_pronunciation?: string | undefined;
  __id?: string;
  translator_note?: string;
  __lessons: string[];
  __order: number;
  __styling?: string[];
  text?: string;
  __src?: string;
  alt?: string;
  __headers?: TableHeader[];
  __entries?: TableEntry[];
  __lesson_link?: string;
  __section_link?: string;
  __indentation?: boolean; // For paragraph indentation
  caption?: string;
  __type: SectionType;
  __tags?: string[]; // For vocabularyCarousel
  __words?: string[]; // For vocabularyCarousel, list of words to display
}
