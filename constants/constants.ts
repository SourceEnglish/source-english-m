const tʃ = require('@/assets/sounds/tʃ.wav');
const ʃ = require('@/assets/sounds/ʃ.wav');
const θ = require('@/assets/sounds/θ.wav');
const ð = require('@/assets/sounds/ð.wav');
const ɑ = require('@/assets/sounds/ɑ.wav');
const æ = require('@/assets/sounds/æ.wav');
const aɪ = require('@/assets/sounds/aɪ.wav');
const aɪr = require('@/assets/sounds/aɪr.wav');
const ɑr = require('@/assets/sounds/ɑr.wav');
const aʊ = require('@/assets/sounds/aʊ.wav');
const b = require('@/assets/sounds/b.wav');
const ɔ = require('@/assets/sounds/ɔ.wav');
const ɔɪ = require('@/assets/sounds/ɔɪ.wav');
const ɔr = require('@/assets/sounds/ɔr.wav');
const d = require('@/assets/sounds/d.wav');
const dʒ = require('@/assets/sounds/dʒ.wav');
const ə = require('@/assets/sounds/ə.wav');
const ɚ = require('@/assets/sounds/ɚ.wav');
const eɪ = require('@/assets/sounds/eɪ.wav');
const ɛ = require('@/assets/sounds/ɛ.wav');
const ɝ = require('@/assets/sounds/ɝ.wav');
const ɛr = require('@/assets/sounds/ɛr.wav');
const f = require('@/assets/sounds/f.wav');
const g = require('@/assets/sounds/g.wav');
const h = require('@/assets/sounds/h.wav');
const i = require('@/assets/sounds/i.wav');
const ɪ = require('@/assets/sounds/ɪ.wav');
const ɪr = require('@/assets/sounds/ɪr.wav');
const j = require('@/assets/sounds/j.wav');
const k = require('@/assets/sounds/k.wav');
const l = require('@/assets/sounds/l.wav');
const m = require('@/assets/sounds/m.wav');
const n = require('@/assets/sounds/n.wav');
const ŋ = require('@/assets/sounds/ŋ.wav');
const oʊ = require('@/assets/sounds/oʊ.wav');
const p = require('@/assets/sounds/p.wav');
const r = require('@/assets/sounds/r.wav');
const s = require('@/assets/sounds/s.wav');
const t = require('@/assets/sounds/t.wav');
const t̬ = require('@/assets/sounds/t̬.wav');
const u = require('@/assets/sounds/u.wav');
const ʊ = require('@/assets/sounds/ʊ.wav');
const v = require('@/assets/sounds/v.wav');
const ʌ = require('@/assets/sounds/ʌ.wav');
const w = require('@/assets/sounds/w.wav');
const z = require('@/assets/sounds/z.wav');
const ʒ = require('@/assets/sounds/ʒ.wav');
const ʔ = require('@/assets/sounds/ʔ.wav');
const kw = require('@/assets/sounds/kw.wav');
const ks = require('@/assets/sounds/ks.wav');
const ju = require('@/assets/sounds/ju.wav');

export const soundsMap: Map<string, any> = new Map([
  ['tʃ.wav', tʃ],
  ['ʃ.wav', ʃ],
  ['θ.wav', θ],
  ['ð.wav', ð],
  ['ɑ.wav', ɑ],
  ['æ.wav', æ],
  ['aɪ.wav', aɪ],
  ['aɪr.wav', aɪr],
  ['ɑr.wav', ɑr],
  ['aʊ.wav', aʊ],
  ['b.wav', b],
  ['g.wav', g],
  ['ɔ.wav', ɔ],
  ['ɔɪ.wav', ɔɪ],
  ['ɔr.wav', ɔr],
  ['d.wav', d],
  ['dʒ.wav', dʒ],
  ['ə.wav', ə],
  ['ɚ.wav', ɚ],
  ['eɪ.wav', eɪ],
  ['ɛ.wav', ɛ],
  ['ɝ.wav', ɝ],
  ['ɛr.wav', ɛr],
  ['f.wav', f],
  ['g.wav', g],
  ['h.wav', h],
  ['i.wav', i],
  ['ɪ.wav', ɪ],
  ['ɪr.wav', ɪr],
  ['j.wav', j],
  ['k.wav', k],
  ['l.wav', l],
  ['m.wav', m],
  ['n.wav', n],
  ['ŋ.wav', ŋ],
  ['oʊ.wav', oʊ],
  ['p.wav', p],
  ['r.wav', r],
  ['s.wav', s],
  ['t.wav', t],
  ['t̬.wav', t̬],
  ['u.wav', u],
  ['ʊ.wav', ʊ],
  ['v.wav', v],
  ['ʌ.wav', ʌ],
  ['w.wav', w],
  ['z.wav', z],
  ['ʒ.wav', ʒ],
  ['ʔ.wav', ʔ],
  ['kw.wav', kw],
  ['ks.wav', ks],
  ['ju.wav', ju],
]);
const posColors: Record<string, string> = {
  adverb: '#004D40', // Teal (dark, readable) - swapped with preposition
  preposition: '#1A237E', // Indigo (dark, readable) - swapped with adverb
  noun: '#B71C1C', // Dark Red
  verb: '#2E7D32', // Dark Green
  adjective: '#01579B', // Dark Cyan Blue (swapped with number)
  determiner: '#37474F', // Blue Gray
  conjunction: '#0D47A1', // Dark Blue
  pronoun: '#263238', // Charcoal
  'auxiliary verb': '#616161', // Medium Gray
  exclamation: '#FF6F00',
  'modal verb': '#3E2723', // Dark Brown
  number: '#4A148C', // Deep Purple (swapped with adjective)
  'ordinal number': '#827717', // Olive
  'proper noun': '#880E4F', // Dark Magenta
  multigraph: '#311B92', // Violet
  article: '#212121', // Near Black
  letter: '#263238', // Charcoal
  contraction: '#263238', // Charcoal
  punctuation: '#263238', // Charcoal
  symbol: '#263238', // Charcoal
  vowel: '#006064', // Deep Cyan
  consonant: '#c66728', // Crimson
};

// Lighter shades for text on colored backgrounds
export const posColorsLight: Record<string, string> = {
  adverb: '#80cbc4', // Light Teal +20% - swapped with preposition
  preposition: '#9fa8da', // Light Indigo +20% - swapped with adverb
  noun: '#ef9a9a', // Light Red +20%
  verb: '#a5d6a7', // Light Green +20%
  adjective: '#81d4fa', // Light Cyan Blue +20% (swapped with number)
  determiner: '#b0bec5', // Light Blue Gray +20%
  conjunction: '#90caf9', // Light Blue +20%
  pronoun: '#cfd8dc', // Light Charcoal +20%
  'auxiliary verb': '#e0e0e0', // Light Gray +20%
  exclamation: '#ffe082', // Light Magenta +20%
  'modal verb': '#bcaaa4', // Light Brown +20%
  number: '#ce93d8', // Light Purple +20% (swapped with adjective)
  'ordinal number': '#e6ee9c', // Light Olive +20%
  'proper noun': '#f48fb1', // Light Amber +20%
  multigraph: '#b39ddb', // Light Violet +20%
  article: '#bdbdbd', // Light Near Black +20%
  letter: '#cfd8dc', // Light Charcoal +20%
  contraction: '#cfd8dc', // Light Charcoal +20%
  symbol: '#cfd8dc', // Light Charcoal +20%
  punctuation: '#cfd8dc', // Light Charcoal +20%
  vowel: '#80deea', // Light Cyan +20%
  consonant: '#fab18f', // Light Crimson +20%
};

export const posKeys: Record<string, string> = {
  adverb: 'adv.',
  preposition: 'prep.',
  noun: 'noun',
  verb: 'verb',
  adjective: 'adj.',
  determiner: 'det.',
  conjunction: 'conj.',
  punctuation: 'punct.',
  pronoun: 'pron.',
  'auxiliary verb': 'aux.',
  exclamation: 'excl.',
  'modal verb': 'mod.',
  number: 'num.',
  'ordinal number': 'ord.',
  'proper noun': 'p. noun',
  vowel: 'vowel',
  consonant: 'cons.',
  multigraph: 'mult.',
  article: 'article',
  letter: 'let.',
  contraction: 'contr.',
  symbol: 'sym.',
};

// Centralized max width for centered layouts
export const CENTERED_MAX_WIDTH = 1300;

// Stroke colors for animated letters (by order)
export const ANIMATED_LETTER_COLORS = [
  '#d40000', // red
  '#ff9100', // orange
  '#0a9a00', // pink
  '#1976D2', // blue (for 4-stroke letters)
  '#9300f5', // green (for 5th stroke if needed)
];

// Approximate Lexend font character widths (relative to fontSize)
const lexendCharWidths: Record<string, number> = {
  ' ': 0.28,
  '.': 0.28,
  ',': 0.28,
  ':': 0.28,
  ';': 0.28,
  '|': 0.28,
  '!': 0.32,
  i: 0.32,
  l: 0.32,
  I: 0.36,
  j: 0.36,
  t: 0.38,
  f: 0.42,
  r: 0.44,
  s: 0.48,
  J: 0.48,
  '1': 0.48,
  a: 0.54,
  c: 0.54,
  e: 0.54,
  o: 0.54,
  u: 0.54,
  v: 0.54,
  x: 0.54,
  z: 0.54,
  b: 0.58,
  d: 0.58,
  g: 0.58,
  h: 0.58,
  k: 0.58,
  n: 0.58,
  p: 0.58,
  q: 0.58,
  y: 0.58,
  m: 0.7,
  w: 0.68,
  A: 0.62,
  B: 0.62,
  C: 0.62,
  D: 0.62,
  E: 0.62,
  F: 0.62,
  G: 0.62,
  H: 0.62,
  K: 0.62,
  L: 0.62,
  N: 0.62,
  O: 0.62,
  P: 0.62,
  Q: 0.62,
  R: 0.62,
  S: 0.62,
  U: 0.62,
  V: 0.62,
  X: 0.62,
  Y: 0.62,
  Z: 0.62,
  M: 0.75,
  W: 0.75,
  '0': 0.58,
  '2': 0.58,
  '3': 0.58,
  '4': 0.58,
  '5': 0.58,
  '6': 0.58,
  '7': 0.58,
  '8': 0.58,
  '9': 0.58,
  '-': 0.38,
  _: 0.48,
  '+': 0.48,
  '=': 0.48,
  '/': 0.38,
  '\\': 0.38,
  '*': 0.48,
  '?': 0.54,
  '@': 0.68,
  '#': 0.58,
  $: 0.58,
  '%': 0.68,
  '&': 0.62,
  '^': 0.48,
  '(': 0.36,
  ')': 0.36,
  '[': 0.36,
  ']': 0.36,
  '{': 0.36,
  '}': 0.36,
  '<': 0.48,
  '>': 0.48,
  "'": 0.22,
  '"': 0.32,
};

// getLexendFontSizeToFit is used to scale each word individually in CardPreview
export function getLexendFontSizeToFit(
  text: string,
  boxSize: number,
  minFontSize: number = 8
): number {
  function estimateTextWidth(word: string, fontSize: number) {
    let total = 0;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      total += lexendCharWidths[c] ?? 0.58;
    }
    return total * fontSize;
  }

  // Split text into words and find the largest width
  const words = text.split(/\s+/);
  let fontSize = boxSize * 0.9;
  for (let trySize = fontSize; trySize >= minFontSize; trySize -= 0.5) {
    const maxWidth = Math.max(
      ...words.map((word) => estimateTextWidth(word, trySize))
    );
    if (maxWidth <= boxSize * 0.92) {
      fontSize = trySize;
      break;
    }
  }
  if (fontSize < minFontSize) fontSize = minFontSize;
  return fontSize;
}

export function getTopPlaceholderText(pos: string): string {
  return posKeys[pos] ?? '';
}

export default posColors;
