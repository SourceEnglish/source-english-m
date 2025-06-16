const posColors: Record<string, string> = {
  adverb: '#FFB6C1',
  preposition: '#ADD8E6',
  noun: '#D32F2F', // Prominent red
  verb: '#438943',

  adjective: '#1976D2', // Prominent blue
  determiner: '#9370DB',
  conjunction: '#FF6347',
  pronoun: '#4682B4',
  'auxiliary verb': '#FF4500',
  exclamation: '#387742',
  'modal verb': '#D2691E',
  number: '#8A2BE2',
  'ordinal number': '#5F9EA0',
  'proper noun': '#FF69B4',
  vowel: '#0C71B9',
  consonant: '#F44C40',
};

// Centralized max width for centered layouts
export const CENTERED_MAX_WIDTH = 1300;

// Stroke colors for animated letters (by order)
export const ANIMATED_LETTER_COLORS = [
  '#d40000', // red
  '#ff9100', // orange
  '#0a9a00', // pink
  '#1976D2', // blue (for 4-stroke letters)
  '#43a047', // green (for 5th stroke if needed)
];

export default posColors;
