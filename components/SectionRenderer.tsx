import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Section } from './sectionTypes';
import Paragraph from '@/components/sections/Paragraph';
import Header from '@/components/sections/Header';
import Subheader from '@/components/sections/Subheader';
import Quote from '@/components/sections/Quote';
import SectionImage from '@/components/sections/SectionImage';
import SectionVideo from '@/components/sections/SectionVideo';
import SectionLink from '@/components/sections/SectionLink';
import LessonLink from '@/components/sections/LessonLink';
import Table from '@/components/sections/Table'; // <-- Add this import
import VocabularyCarousel from '@/components/sections/VocabularyCarousel'; // <-- Add this import

import { TableHeader, TableEntry } from '@/components/sections/Table';

const SectionRenderer = ({ section }: { section: Section }) => {
  switch (section.__type) {
    case 'paragraph':
      return (
        <Paragraph
          text={section.text || ''}
          styling={section.__styling}
          pronunciation={section.__forced_pronunciation}
          indentation={section.__indentation}
        />
      );
    case 'header':
      return (
        <Header
          text={section.text || ''}
          styling={section.__styling}
          __forced_pronunciation={section.__forced_pronunciation}
        />
      );
    case 'subheader':
      return (
        <Subheader
          text={section.text || ''}
          styling={section.__styling}
          __forced_pronunciation={section.__forced_pronunciation}
        />
      );
    case 'quote':
      return <Quote text={section.text || ''} styling={section.__styling} />;
    case 'image':
      return (
        <SectionImage
          src={section.__src}
          alt={section.alt}
          caption={section.caption}
        />
      );
    case 'video':
      return (
        <SectionVideo
          src={section.__src}
          alt={section.alt}
          caption={section.caption}
        />
      );
    case 'section_link':
      return (
        <SectionLink
          sectionName={section.__section_link}
          text={section.text || ''}
        />
      );
    case 'lesson_link':
      return (
        <LessonLink
          lessonName={section.__lesson_link}
          text={section.text || ''}
        />
      );
    case 'link':
      return (
        <SectionLink
          sectionName={section.__section_link}
          text={section.text || ''}
          url={section.__src}
        />
      );
    case 'table':
      return (
        <Table
          headers={section.__headers || []}
          entries={section.__entries || []}
        />
      );
    case 'vocabularyCarousel':
      return <VocabularyCarousel words={section.__words || []} />;
    // Table and other types can be added here
    default:
      return null;
  }
};

export default SectionRenderer;
