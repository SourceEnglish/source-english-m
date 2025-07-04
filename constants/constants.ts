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
const ɡ = require('@/assets/sounds/ɡ.wav');
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
  ['ɡ.wav', ɡ],
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
]);

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
  multigraph: '#8e44ad', // Add this line for multigraph color
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
