import React from 'react';

import AnimatedLetter from '@/components/AnimatedLetter';
import { Stroke } from '@/components/AnimatedLetter';

export const ANIMATED_LETTER_COLORS = [
  '#d40000', // red
  '#ff9100', // orange
  '#0a9a00', // pink
  '#1976D2', // blue (for 4-stroke letters)
  '#43a047', // green (for 5th stroke if needed)
];

const defaultDuration = 1200; // Default animation duration in ms

const strokeMap = new Map<string, Stroke[]>([]);
const strokeDurationsMap = new Map<string, number[]>();

export function GetAnimatedLetter(letter: string) {
  const strokes = strokeMap.get(letter) || [];
  const durations =
    strokeDurationsMap.get(letter) || getDefaultDurations(letter);
  return <AnimatedLetter strokes={strokes} durations={durations} />;
}

function getDefaultDurations(letter: string): number[] {
  const strokes = strokeMap.get(letter) || [];
  const perStroke =
    strokes.length > 0 ? defaultDuration / strokes.length : defaultDuration;
  return Array(strokes.length).fill(perStroke);
}
const aStrokes: Stroke[] = [
  {
    type: 'circle',
    cx: 9.215,
    cy: 9.435,
    r: 7.964,
    color: ANIMATED_LETTER_COLORS[0],
    length: 2 * Math.PI * 7.964,
    transform: `rotate(150 9.215 9.435) scale(-1 1) translate(-18.429 0)`,
  },
  {
    type: 'line',
    x1: 17.178,
    y1: 1.25,
    x2: 17.178,
    y2: 17.399,
    color: ANIMATED_LETTER_COLORS[1],
    length: 16.149,
  },
];
strokeMap.set('a', aStrokes);

const bStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.3,
    y1: 1.2,
    x2: 1.3,
    y2: 34.8,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.6,
  },
  {
    type: 'circle',
    cx: 9.2,
    cy: 26.9,
    r: 8,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 8,
    rotation: 210,
    transform: `rotate(180 9.2 26.9) scale(1 1) translate(0 0)`,
  },
];
strokeMap.set('b', bStrokes);

const cStrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M14.863,14.564 C13.369,16.068 11.334,16.915 9.214,16.915 C4.845,16.915 1.25,13.32 1.25,8.951 S4.845,1.987,9.214,1.987 c2.039,0,4.001,0.783,5.481,2.186',
    color: ANIMATED_LETTER_COLORS[0],
    length: 37,
    // This path is flipped vertically so it starts at the bottom of the viewBox
    transform: 'scale(1,-1) translate(0,-36)',
  },
];
strokeMap.set('c', cStrokes);

const dStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 9.215,
    y1: 1.25,
    x2: 9.215,
    y2: 34.815,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.565,
    transform: 'translate(8 0)',
  },
  {
    type: 'circle',
    cx: 9.215,
    cy: 26.852,
    r: 7.964,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 7.964,

    transform: 'rotate(150 9.215 26.852) scale(-1 1) translate(-18.429 0)',
  },
];
strokeMap.set('d', dStrokes);

const eStrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M1.2,3.2c4.3-0.02,8.6-0.04,12.9-0.06l0.03-0.7c0.04-1-0.09-1.9-0.39-2.7-0.3-0.8-0.75-1.5-1.33-2.1-0.58-0.6-1.27-1.06-2.07-1.37-0.8-0.32-1.67-0.48-2.62-0.48-1.03,0-1.98,0.19-2.85,0.57-0.86,0.37-1.6,0.91-2.22,1.6-0.62,0.69-1.1,1.51-1.44,2.46-0.34,0.95-0.51,1.99-0.51,3.13,0,1.53,0.31,2.9,0.93,4.1,0.62,1.2,1.48,2.14,2.59,2.8,1.11,0.66,2.39,0.99,3.83,0.99,0.72,0,1.4-0.09,2.04-0.27,0.64-0.18,1.21-0.43,1.78-0.74,0.55-0.32,1.07-0.7,1.55-1.14',
    color: ANIMATED_LETTER_COLORS[0],
    length: 60,

    transform: 'translate(1,26.5)',
  },
];
strokeMap.set('e', eStrokes);

const fStrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M15.299,3.135c-.419-.568-.963-1.025-1.639-1.369s-1.549-.516-2.626-.516c-.928,0-1.751.187-2.469.561-.718.374-1.272.973-1.661,1.796-.389.823-.584,1.893-.584,3.21v28.102',
    color: ANIMATED_LETTER_COLORS[0],
    length: 60,
    transform: 'translate(0, -20)',
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 12.338,
    x2: 14.263,
    y2: 12.338,
    color: ANIMATED_LETTER_COLORS[1],
    length: 13.013,
    transform: 'translate(0, -20)',
  },
];
strokeMap.set('f', fStrokes);

const gStrokes: Stroke[] = [
  // Please fill in with the actual stroke data from AnimatedLowercaseG if needed
];
strokeMap.set('g', gStrokes);

const hStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.858,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.608,
  },
  {
    type: 'path',
    d: 'M1.25,34.858v-10.85c0-1.389.236-2.525.707-3.407.472-.882,1.149-1.527,2.031-1.935.883-.408,1.965-.612,3.247-.612,1.282,0,2.364.204,3.247.612.883.408,1.56,1.053,2.031,1.935.472.882.707,2.018.707,3.407v10.85',
    color: ANIMATED_LETTER_COLORS[0],
    length: 50,
  },
];
strokeMap.set('h', hStrokes);

const iStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 6.65,
    x2: 1.25,
    y2: 23.267,
    color: ANIMATED_LETTER_COLORS[0],
    length: 23.267 - 6.65,
  },
  {
    type: 'circle',
    cx: 1.3,
    cy: 1.281,
    r: 0.8,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 0.8,
  },
];
strokeMap.set('i', iStrokes);

const jStrokes: Stroke[] = [
  // Please fill in with the actual stroke data from AnimatedLowercaseJ if needed
];
strokeMap.set('j', jStrokes);

const kStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.667,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.667 - 1.25,
  },
  {
    type: 'line',
    x1: 11.2,
    y1: 17.946,
    x2: 1.32,
    y2: 26.255,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(11.2 - 1.32, 2) + Math.pow(26.255 - 17.946, 2)),
  },
  {
    type: 'line',
    x1: 1.32,
    y1: 26.275,
    x2: 11.2,
    y2: 34.583,
    color: ANIMATED_LETTER_COLORS[2],
    length: Math.sqrt(Math.pow(11.2 - 1.32, 2) + Math.pow(34.583 - 26.275, 2)),
  },
];
strokeMap.set('k', kStrokes);

const lStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.612,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.612 - 1.25,
  },
];
strokeMap.set('l', lStrokes);

// m, n, o, p, q, r, s, t, u, v, w, x, y, z...

const xStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.511,
    y1: 1.269,
    x2: 13.904,
    y2: 17.307,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(
      Math.pow(13.904 - 1.511, 2) + Math.pow(17.307 - 1.269, 2)
    ),
  },
  {
    type: 'line',
    x1: 13.643,
    y1: 1.25,
    x2: 1.25,
    y2: 17.288,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(13.643 - 1.25, 2) + Math.pow(17.288 - 1.25, 2)),
  },
];
strokeMap.set('x', xStrokes);

const yStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 13.7,
    y2: 18.745,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(13.7 - 1.25, 2) + Math.pow(18.745 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 26.15,
    y1: 1.25,
    x2: 13.7,
    y2: 18.745,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(26.15 - 13.7, 2) + Math.pow(1.25 - 18.745, 2)),
  },
  {
    type: 'line',
    x1: 13.7,
    y1: 18.745,
    x2: 13.7,
    y2: 34.578,
    color: ANIMATED_LETTER_COLORS[1],
    length: 34.578 - 18.745,
  },
];
strokeMap.set('y', yStrokes);

const zStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 2.597,
    y1: 1.25,
    x2: 26.181,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: 26.181 - 2.597,
  },
  {
    type: 'line',
    x1: 26.181,
    y1: 1.25,
    x2: 1.25,
    y2: 34.683,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(26.181 - 1.25, 2) + Math.pow(34.683 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 34.683,
    x2: 26.181,
    y2: 34.683,
    color: ANIMATED_LETTER_COLORS[0],
    length: 26.181 - 1.25,
  },
];
strokeMap.set('z', zStrokes);

// UPPERCASE LETTERS

const Astrokes: Stroke[] = [
  {
    type: 'line',
    x1: 14.584,
    y1: 1.25,
    x2: 1.25,
    y2: 34.708,
    color: ANIMATED_LETTER_COLORS[0],
    length: 36,
  },
  {
    type: 'line',
    x1: 14.584,
    y1: 1.25,
    x2: 27.918,
    y2: 34.708,
    color: ANIMATED_LETTER_COLORS[1],
    length: 36,
  },
  {
    type: 'line',
    x1: 5.763,
    y1: 23.383,
    x2: 23.405,
    y2: 23.383,
    color: ANIMATED_LETTER_COLORS[2],
    length: 17.642,
  },
];
strokeMap.set('A', Astrokes);

const Bstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'path',
    d: 'M1.543,0.912h12.414c2.544,0,4.553,0.721,6.029,2.162,1.475,1.442,2.213,3.197,2.213,5.266,0,1.458-.382,2.781-1.145,3.968-.763,1.187-1.781,2.128-3.053,2.824-1.272,0.695-2.671,1.043-4.197,1.043H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60,
  },
  {
    type: 'path',
    d: 'M1.543,17.25h12.516c2.137,0,3.951,.365,5.444,1.094,1.492,.729,2.629,1.738,3.409,3.027,.78,1.289,1.17,2.764,1.17,4.426,0,1.594-.339,3.027-1.018,4.299-.678,1.272-1.772,2.281-3.282,3.027-1.509,.746-3.502,1.119-5.978,1.119H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60,
  },
];
strokeMap.set('B', Bstrokes);

const Cstrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M29.691,29.615c-3.122,3.142-7.373,4.911-11.803,4.911-9.127,0-16.638-7.511-16.638-16.638S8.761,1.25,17.888,1.25c4.259,0,8.36,1.635,11.45,4.567',
    color: ANIMATED_LETTER_COLORS[0],
    length: 77,
    transform: 'scale(1, -1) translate(0, -35)',
  },
];
strokeMap.set('C', Cstrokes);

const Dstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.374,
    x2: 1.25,
    y2: 34.749,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'path',
    d: 'M1.25,1.25h11.843c2.046,0,4.004.416,5.874,1.247,1.87.831,3.532,1.998,4.987,3.5s2.605,3.276,3.452,5.322c.847,2.046,1.271,4.283,1.271,6.713,0,2.397-.424,4.619-1.271,6.665-.847,2.046-1.998,3.828-3.452,5.346-1.454,1.518-3.117,2.693-4.987,3.524-1.87.831-3.828,1.247-5.874,1.247H1.25',
    color: ANIMATED_LETTER_COLORS[1],
    length: 80,
  },
];
strokeMap.set('D', Dstrokes);

const Estrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 22.5,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: 21.25,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 17.937,
    x2: 17.5,
    y2: 17.937,
    color: ANIMATED_LETTER_COLORS[2],
    length: 16.25,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 34.625,
    x2: 22.5,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[3],
    length: 21.25,
  },
];
strokeMap.set('E', Estrokes);

const Fstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 22.5,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: 21.25,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 17.937,
    x2: 17.5,
    y2: 17.937,
    color: ANIMATED_LETTER_COLORS[2],
    length: 16.25,
  },
];
strokeMap.set('F', Fstrokes);

const Gstrokes: Stroke[] = [
  // Please fill in with the actual stroke data from AnimatedUppercaseG if needed
];
strokeMap.set('G', Gstrokes);

const Hstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.667,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.417,
  },
  {
    type: 'line',
    x1: 24.948,
    y1: 1.25,
    x2: 24.948,
    y2: 34.667,
    color: ANIMATED_LETTER_COLORS[1],
    length: 33.417,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 17.83,
    x2: 24.638,
    y2: 17.83,
    color: ANIMATED_LETTER_COLORS[2],
    length: 23.388,
  },
];
strokeMap.set('H', Hstrokes);

const Istrokes: Stroke[] = [
  {
    type: 'line',
    x1: 8.498,
    y1: 1.25,
    x2: 8.498,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 16.083,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: 14.833,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 34.625,
    x2: 16.083,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[2],
    length: 14.833,
  },
];
strokeMap.set('I', Istrokes);

const Jstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 11.517,
    y1: 1.25,
    x2: 26.35,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: 26.35 - 11.517,
  },
  {
    type: 'path',
    d: 'M18.9,1.25v23.128c0,1.782-.223,3.318-.668,4.608-.445,1.29-1.068,2.358-1.866,3.203-.799.845-1.743,1.467-2.834,1.866-1.091.399-2.281.599-3.571.599-1.045,0-2.02-.138-2.926-.415-.906-.277-1.728-.676-2.465-1.198-.737-.522-1.383-1.152-1.936-1.889-.553-.737-1.014-1.567-1.383-2.489',
    color: ANIMATED_LETTER_COLORS[1],
    length: 55,
  },
];
strokeMap.set('J', Jstrokes);

const Kstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.292,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.625 - 1.292,
  },
  {
    type: 'line',
    x1: 19.002,
    y1: 1.25,
    x2: 1.339,
    y2: 17.917,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(19.002 - 1.339, 2) + Math.pow(17.917 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 1.339,
    y1: 17.958,
    x2: 19.002,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[2],
    length: Math.sqrt(
      Math.pow(19.002 - 1.339, 2) + Math.pow(34.625 - 17.958, 2)
    ),
  },
];
strokeMap.set('K', Kstrokes);

const Lstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.612,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.612 - 1.25,
  },
  {
    type: 'line',
    x1: 1.264,
    y1: 34.573,
    x2: 16.93,
    y2: 34.573,
    color: ANIMATED_LETTER_COLORS[0],
    length: 16.93 - 1.264,
  },
];
strokeMap.set('L', Lstrokes);

// M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z...

const mStrokes: Stroke[] = [
  // Leftmost vertical line
  {
    type: 'line',
    x1: 1.25,
    y1: 1.251,
    x2: 1.25,
    y2: 17.268,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34, // matches AnimatedLowercaseM
  },
  // First arch
  {
    type: 'path',
    d: 'M1.25,17.268V7.49c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778',
    color: ANIMATED_LETTER_COLORS[0],
    length: 38,
  },
  // Second arch
  {
    type: 'path',
    d: 'M13.139,17.268V7.49c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778',
    color: ANIMATED_LETTER_COLORS[0],
    length: 38,
  },
];
strokeMap.set('m', mStrokes);

const Mstrokes: Stroke[] = [
  // Left vertical
  {
    type: 'line',
    x1: 1.25,
    y1: 1.31,
    x2: 1.25,
    y2: 34.588,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.588 - 1.31,
  },
  // Left diagonal
  {
    type: 'line',
    x1: 1.25,
    y1: 1.31,
    x2: 15.933,
    y2: 34.663,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(15.933 - 1.25, 2) + Math.pow(34.663 - 1.31, 2)),
  },
  // Right diagonal
  {
    type: 'line',
    x1: 16.083,
    y1: 34.603,
    x2: 30.767,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(
      Math.pow(30.767 - 16.083, 2) + Math.pow(1.25 - 34.603, 2)
    ),
  },
  // Right vertical
  {
    type: 'line',
    x1: 30.767,
    y1: 1.31,
    x2: 30.767,
    y2: 34.588,
    color: ANIMATED_LETTER_COLORS[1],
    length: 34.588 - 1.31,
  },
];
strokeMap.set('M', Mstrokes);

const nStrokes: Stroke[] = [
  // Left vertical line
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 17.267,
    color: ANIMATED_LETTER_COLORS[0],
    length: 16.017,
  },
  // Arch
  {
    type: 'path',
    d: 'M1.25,17.267V7.489c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778',
    color: ANIMATED_LETTER_COLORS[0],
    length: 42,
  },
];
strokeMap.set('n', nStrokes);

const Nstrokes: Stroke[] = [
  // Left vertical
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.576,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.576 - 1.25,
  },
  // Diagonal
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 26.972,
    y2: 34.576,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(26.972 - 1.25, 2) + Math.pow(34.576 - 1.25, 2)),
  },
  // Right vertical
  {
    type: 'line',
    x1: 26.972,
    y1: 34.576,
    x2: 26.972,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: 34.576 - 1.25,
  },
];
strokeMap.set('N', Nstrokes);

const oStrokes: Stroke[] = [
  {
    type: 'circle',
    cx: 9.215,
    cy: 9.215,
    r: 7.964,
    color: ANIMATED_LETTER_COLORS[0],
    length: 2 * Math.PI * 7.964,
    // Draw counter-clockwise, starting at top, flipped horizontally
    transform: 'rotate(-90 9.215 9.215) scale(1 -1) translate(-2.5, -18.429)',
  },
];
strokeMap.set('o', oStrokes);

const Ostrokes: Stroke[] = [
  {
    type: 'circle',
    cx: 17.886,
    cy: 17.886,
    r: 16.636,
    color: ANIMATED_LETTER_COLORS[0],
    length: 2 * Math.PI * 16.636,
    // Flipped horizontally, rotated -90deg, matches AnimatedUppercaseO
    transform: 'scale(-1,1) translate(-35.773,2.5) rotate(-90 17.886 17.886)',
  },
];
strokeMap.set('O', Ostrokes);

const pStrokes: Stroke[] = [
  // Vertical stem
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 27.181,
    color: ANIMATED_LETTER_COLORS[0],
    length: 27.181 - 1.25,
  },
  // Bowl (circle)
  {
    type: 'circle',
    cx: 9.95,
    cy: 9.45,
    r: 8,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 8,
    transform: 'scale(-1 -1) translate(-19.5 -19.5)',
    // No transform needed for this SVG
  },
];
strokeMap.set('p', pStrokes);

const Pstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'path',
    d: 'M1.543,1.25h12.414c2.544,0,4.553,0.721,6.029,2.162,1.475,1.442,2.213,3.197,2.213,5.266,0,1.458-.382,2.781-1.145,3.968-.763,1.187-1.781,2.128-3.053,2.824-1.272,.695-2.671,1.043-4.197,1.043H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60,
  },
];
strokeMap.set('P', Pstrokes);

const Qstrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M29.691,29.615c-3.122,3.142-7.373,4.911-11.803,4.911-9.127,0-16.638-7.511-16.638-16.638S8.761,1.25,17.888,1.25c4.259,0,8.36,1.635,11.45,4.567',
    color: ANIMATED_LETTER_COLORS[0],
    length: 77,
    transform: 'scale(1, -1) translate(0, -35)',
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[1],
    length: 33.375,
  },
];
strokeMap.set('Q', Qstrokes);

const Rstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'path',
    d: 'M1.543,1.25h12.414c2.544,0,4.553,0.721,6.029,2.162,1.475,1.442,2.213,3.197,2.213,5.266,0,1.458-.382,2.781-1.145,3.968-.763,1.187-1.781,2.128-3.053,2.824-1.272,0.695-2.671,1.043-4.197,1.043H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 17.937,
    x2: 17.5,
    y2: 17.937,
    color: ANIMATED_LETTER_COLORS[2],
    length: 16.25,
  },
];
strokeMap.set('R', Rstrokes);

const Sstrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M1.2,3.2c4.3-0.02,8.6-0.04,12.9-0.06l0.03-0.7c0.04-1-0.09-1.9-0.39-2.7-0.3-0.8-0.75-1.5-1.33-2.1-0.58-0.6-1.27-1.06-2.07-1.37-0.8-0.32-1.67-0.48-2.62-0.48-1.03,0-1.98,0.19-2.85,0.57-0.86,0.37-1.6,0.91-2.22,1.6-0.62,0.69-1.1,1.51-1.44,2.46-0.34,0.95-0.51,1.99-0.51,3.13,0,1.53,0.31,2.9,0.93,4.1,0.62,1.2,1.48,2.14,2.59,2.8,1.11,0.66,2.39,0.99,3.83,0.99,0.72,0,1.4-0.09,2.04-0.27,0.64-0.18,1.21-0.43,1.78-0.74,0.55-0.32,1.07-0.7,1.55-1.14',
    color: ANIMATED_LETTER_COLORS[0],
    length: 60,

    transform: 'translate(1,26.5)',
  },
];
strokeMap.set('S', Sstrokes);

const Tstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 22.5,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: 21.25,
  },
];
strokeMap.set('T', Tstrokes);

const Ustrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 34.625,
    x2: 22.5,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[1],
    length: 21.25,
  },
];
strokeMap.set('U', Ustrokes);

const Vstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 22.5,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[1],
    length: 33.375,
  },
];
strokeMap.set('V', Vstrokes);

const Wstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 11.5,
    y2: 17.625,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(11.5 - 1.25, 2) + Math.pow(17.625 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 11.5,
    y1: 17.625,
    x2: 22.75,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(22.75 - 11.5, 2) + Math.pow(17.625 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 22.75,
    y1: 1.25,
    x2: 22.75,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[2],
    length: 33.375,
  },
];
strokeMap.set('W', Wstrokes);

const Xstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.2,
    y1: 1.2,
    x2: 24.6,
    y2: 34.6,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(24.6 - 1.2, 2) + Math.pow(34.6 - 1.2, 2)),
  },
  {
    type: 'line',
    x1: 24.6,
    y1: 1.2,
    x2: 1.2,
    y2: 34.6,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(24.6 - 1.2, 2) + Math.pow(34.6 - 1.2, 2)),
  },
];
strokeMap.set('X', Xstrokes);

const Ystrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 13.7,
    y2: 18.745,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(13.7 - 1.25, 2) + Math.pow(18.745 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 26.15,
    y1: 1.25,
    x2: 13.7,
    y2: 18.745,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(26.15 - 13.7, 2) + Math.pow(1.25 - 18.745, 2)),
  },
  {
    type: 'line',
    x1: 13.7,
    y1: 18.745,
    x2: 13.7,
    y2: 34.578,
    color: ANIMATED_LETTER_COLORS[1],
    length: 34.578 - 18.745,
  },
];
strokeMap.set('Y', Ystrokes);

const Zstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 2.597,
    y1: 1.25,
    x2: 26.181,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: 26.181 - 2.597,
  },
  {
    type: 'line',
    x1: 26.181,
    y1: 1.25,
    x2: 1.25,
    y2: 34.683,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(26.181 - 1.25, 2) + Math.pow(34.683 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 34.683,
    x2: 26.181,
    y2: 34.683,
    color: ANIMATED_LETTER_COLORS[0],
    length: 26.181 - 1.25,
  },
];
strokeMap.set('Z', Zstrokes);
