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
    r: 8,
    color: ANIMATED_LETTER_COLORS[0],
    length: 2 * Math.PI * 7.964,
    transform: `rotate(150 9.215 9.435) scale(-1 1) translate(-15.3 0)`,
  },
  {
    type: 'line',
    x1: 17.178,
    y1: 1.25,
    x2: 17.178,
    y2: 17.399,
    color: ANIMATED_LETTER_COLORS[1],
    length: 16.149,
    transform: `translate(2.9 -1.6)`,
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
    transform: `translate(0 -1.4)`,
  },
  {
    type: 'circle',
    cx: 9.2,
    cy: 26.9,
    r: 8,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 8,
    rotation: 210,
    transform: `rotate(180 9.2 26.9) scale(1 1) translate(0 1.4)`,
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
    transform: 'scale(1,-1) translate(0,-36.5)',
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
    transform: 'translate(10.4   -1.25)',
  },
  {
    type: 'circle',
    cx: 9.215,
    cy: 26.852,
    r: 8,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 7.964,

    transform: 'rotate(150 9.215 26.852) scale(-1 1) translate(-15.8 0)',
  },
];
strokeMap.set('d', dStrokes);

const eStrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M1.2,3.2c4.3-0.02,8.6-0.04,12.9-0.06l0.03-0.7c0.04-1-0.09-1.9-0.39-2.7-0.3-0.8-0.75-1.5-1.33-2.1-0.58-0.6-1.27-1.06-2.07-1.37-0.8-0.32-1.67-0.48-2.62-0.48-1.03,0-1.98,0.19-2.85,0.57-0.86,0.37-1.6,0.91-2.22,1.6-0.62,0.69-1.1,1.51-1.44,2.46-0.34,0.95-0.51,1.99-0.51,3.13,0,1.53,0.31,2.9,0.93,4.1,0.62,1.2,1.48,2.14,2.59,2.8,1.11,0.66,2.39,0.99,3.83,0.99,0.72,0,1.4-0.09,2.04-0.27,0.64-0.18,1.21-0.43,1.78-0.74,0.55-0.32,1.07-0.7,1.55-1.14',
    color: ANIMATED_LETTER_COLORS[0],
    length: 60,

    transform: 'translate(1, 23.1)',
  },
];
strokeMap.set('e', eStrokes);

const fStrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M15.299,3.135c-.419-.568-.963-1.025-1.639-1.369s-1.549-.516-2.626-.516c-.928,0-1.751.187-2.469.561-.718.374-1.272.973-1.661,1.796-.389.823-.584,1.893-.584,3.21v28.102',
    color: ANIMATED_LETTER_COLORS[0],
    length: 60,
    transform: 'translate(0, -23.7)',
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 12.338,
    x2: 14.263,
    y2: 12.338,
    color: ANIMATED_LETTER_COLORS[1],
    length: 13.013,
    transform: 'translate(0, -23.7)',
  },
];
strokeMap.set('f', fStrokes);

const gStrokes: Stroke[] = [
  {
    type: 'circle',
    cx: 11.963,
    cy: 12.175,
    r: 10.713,
    color: ANIMATED_LETTER_COLORS[0],
    length:
      Math.PI *
      (3 * (10.713 + 10.925) -
        Math.sqrt((3 * 10.713 + 10.925) * (10.713 + 3 * 10.925))),
    transform: 'rotate(180) scale(-1 1) translate(0 -11.35)',
  },
  // Ascender (top vertical)
  {
    type: 'path',
    d: 'M22.716,12.175V1.408',
    color: ANIMATED_LETTER_COLORS[0],
    length: 10.767,
    transform: 'translate(0, -13)',
  },
  // Descender (tail)
  {
    type: 'path',
    d: 'M22.676,12.175c.013,3.753.026,7.507.04,11.26,0,1.777-.27,3.373-.809,4.786-.539,1.413-1.289,2.608-2.251,3.584-.961.976-2.069,1.726-3.322,2.251-1.253.524-2.593.787-4.021.787-2.367,0-4.096-.686-4.436-.83-1.676-.713-2.815-1.717-3.474-2.404',
    color: ANIMATED_LETTER_COLORS[0],
    length: 38,
    transform: 'translate(0, -13)',
  },
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
    d: 'M1.25,34.858v-10.85c0-1.389.236-2.525.707-3.407.472-.882,1.149-1.527,2.031-1.935.883-.408,1.965-.612,3.247-.612,1.282,0,2.364.204,3.247.612.883.408,1.56,1.053,2.031,1.935.472.882.707 2.018.707 3.407v10.85',
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

// Lowercase j strokes (from j.tsx)
const jStrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M10.522,6.65v23.217c0,.946-.146,1.788-.438,2.525-.292.737-.779,1.315-1.461,1.732s-1.607.626-2.776.626h-.71c-.93,0-1.847-.692-2.004-.802-2.246-1.587-1.857-4.99-1.857-5.032',
    color: ANIMATED_LETTER_COLORS[0],
    length: 40, // Approximate, for strokeDasharray
    transform: 'translate(0, -35)',
  },
  {
    type: 'circle',
    cx: 10.572,
    cy: 1.281,
    r: 0.8,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 0.8,
    transform: 'translate(0, -35)',
  },
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

// Lowercase m strokes (from m.tsx)
const mStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.251,
    x2: 1.25,
    y2: 17.268,
    color: ANIMATED_LETTER_COLORS[0],
    length: 16.017, // 17.268 - 1.251
  },
  {
    type: 'path',
    d: 'M1.25,17.268V7.49c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778',
    color: ANIMATED_LETTER_COLORS[0],
    length: 38, // Approximate, matches pathLength1 in m.tsx
  },
  {
    type: 'path',
    d: 'M13.139,17.268V7.49c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778',
    color: ANIMATED_LETTER_COLORS[0],
    length: 38, // Approximate, matches pathLength2 in m.tsx
  },
];
strokeMap.set('m', mStrokes);

const Mstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.31,
    x2: 1.25,
    y2: 34.588,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.588 - 1.31,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.31,
    x2: 15.933,
    y2: 34.663,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(15.933 - 1.25, 2) + Math.pow(34.663 - 1.31, 2)),
  },
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

// x, y, z...

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

const yStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 13.56,
    y2: 19.636,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(13.56 - 1.25, 2) + Math.pow(19.636 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 25.869,
    y1: 1.25,
    x2: 3.389,
    y2: 34.827,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(25.869 - 3.389, 2) + Math.pow(1.25 - 34.827, 2)),
  },
];
strokeMap.set('y', yStrokes);

const zStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 12.211,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: 12.211 - 1.25,
  },
  {
    type: 'line',
    x1: 12.211,
    y1: 1.25,
    x2: 1.25,
    y2: 16.808,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(12.211 - 1.25, 2) + Math.pow(16.808 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 16.808,
    x2: 12.406,
    y2: 16.808,
    color: ANIMATED_LETTER_COLORS[0],
    length: 12.406 - 1.25,
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
    transform: 'translate(0, -1.5)',
  },
  {
    type: 'line',
    x1: 14.584,
    y1: 1.25,
    x2: 27.918,
    y2: 34.708,
    color: ANIMATED_LETTER_COLORS[1],
    length: 36,
    transform: 'translate(0, -1.5)',
  },
  {
    type: 'line',
    x1: 5.763,
    y1: 23.383,
    x2: 23.405,
    y2: 23.383,
    color: ANIMATED_LETTER_COLORS[2],
    length: 17.642,
    transform: 'translate(0, -1.5)',
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
    transform: 'translate(0, -0.88)',
  },
  {
    type: 'path',
    d: 'M1.543,0.912h12.414c2.544,0,4.553,0.721,6.029,2.162,1.475,1.442,2.213,3.197,2.213,5.266,0,1.458-.382,2.781-1.145,3.968-.763,1.187-1.781,2.128-3.053,2.824-1.272,0.695-2.671,1.043-4.197,1.043H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60,
    transform: 'translate(0, -0.88)',
  },
  {
    type: 'path',
    d: 'M1.543,17.25h12.516c2.137,0,3.951,.365,5.444,1.094,1.492,.729,2.629,1.738,3.409,3.027,.78,1.289,1.17,2.764,1.17,4.426,0,1.594-.339,3.027-1.018,4.299-.678,1.272-1.772,2.281-3.282,3.027-1.509,.746-3.502,1.119-5.978,1.119H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60,
    transform: 'translate(0, -0.88)',
  },
];
strokeMap.set('B', Bstrokes);

const Cstrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M29.691,29.615c-3.122,3.142-7.373,4.911-11.803,4.911-9.127,0-16.638-7.511-16.638-16.638S8.761,1.25,17.888,1.25c4.259,0,8.36,1.635,11.45,4.567',
    color: ANIMATED_LETTER_COLORS[0],
    length: 77,
    transform: 'scale(1, -1) translate(0, -35.75)',
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
    transform: 'translate(0, -1.4)',
  },
  {
    type: 'path',
    d: 'M1.25,1.25h11.843c2.046,0,4.004.416,5.874,1.247,1.87.831,3.532,1.998,4.987,3.5s2.605,3.276,3.452,5.322c.847,2.046,1.271,4.283,1.271,6.713,0,2.397-.424,4.619-1.271,6.665-.847,2.046-1.998,3.828-3.452,5.346-1.454,1.518-3.117,2.693-4.987,3.524-1.87.831-3.828,1.247-5.874,1.247H1.25',
    color: ANIMATED_LETTER_COLORS[1],
    length: 80,
    transform: 'translate(0, -1.4)',
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
    transform: 'translate(0, -1.35)',
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 22.5,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: 21.25,
    transform: 'translate(0, -1.35)',
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 17.937,
    x2: 17.5,
    y2: 17.937,
    color: ANIMATED_LETTER_COLORS[2],
    length: 16.25,
    transform: 'translate(0, -1.35)',
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 34.625,
    x2: 22.5,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[3],
    length: 21.25,
    transform: 'translate(0, -1.35  )',
  },
];
strokeMap.set('E', Estrokes);

const Fstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 0,
    x2: 1.25,
    y2: 35,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
    transform: 'translate(0, .25)',
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 0,
    x2: 22.5,
    y2: 0,
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
    transform: 'translate(0, -1)',
  },
];
strokeMap.set('F', Fstrokes);

const Gstrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M29.796,7.304c-.993-1.211-2.127-2.274-3.399-3.19s-2.67-1.622-4.191-2.119c-1.521-.497-3.167-.745-4.936-.745-2.328,0-4.471.419-6.426,1.257-1.956.838-3.656 2.01-5.099 3.516-1.444 1.506-2.553 3.291-3.33 5.355-.776 2.065-1.164 4.339-1.164 6.822 0 2.422.396 4.649 1.187 6.683.792 2.033 1.902 3.788 3.33 5.262s3.128 2.616 5.099 3.423c1.971.807 4.121 1.211 6.45 1.211s4.416-.349 6.263-1.048 3.423-1.731 4.727-3.097c1.304-1.366 2.297-3.066 2.98-5.099.683-2.033 1.024-4.37 1.024-7.008v-.885h-14.576',
    color: ANIMATED_LETTER_COLORS[0],
    length: 120,
  },
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
    transform: 'translate(0, -35)',
  },
  {
    type: 'path',
    d: 'M18.9,1.25v23.128c0,1.782-.223,3.318-.668,4.608-.445,1.29-1.068,2.358-1.866,3.203-.799.845-1.743,1.467-2.834,1.866-1.091.399-2.281.599-3.571.599-1.045,0-2.02-.138-2.926-.415-.906-.277-1.728-.676-2.465-1.198-.737-.522-1.383-1.152-1.936-1.889-.553-.737-1.014-1.567-1.383-2.489',
    color: ANIMATED_LETTER_COLORS[1],
    length: 55,
    transform: 'translate(0, -35)',
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

// Lowercase n strokes (from n.tsx)
const nStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 17.267,
    color: ANIMATED_LETTER_COLORS[0],
    length: 32, // Approximate, matches lineLength in n.tsx
  },
  {
    type: 'path',
    d: 'M1.25,17.267V7.489c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778',
    color: ANIMATED_LETTER_COLORS[0],
    length: 42, // Approximate, matches pathLength in n.tsx
  },
];
strokeMap.set('n', nStrokes);

const Nstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.576,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.576 - 1.25,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 26.972,
    y2: 34.576,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(26.972 - 1.25, 2) + Math.pow(34.576 - 1.25, 2)),
  },
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

// O, P, Q, R, S, T, U, V, W, X, Y, Z...

const oStrokes: Stroke[] = [
  {
    type: 'circle',
    cx: 9.215,
    cy: 9.215,
    r: 7.964,
    color: ANIMATED_LETTER_COLORS[0],
    length: 2 * Math.PI * 7.964,
    transform: 'rotate(-90 9.215 9.215) scale(1 -1) translate(-2, -18.429)',
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
    transform: 'scale(-1,1) translate(-35.773,0) rotate(-90 17.886 17.886)',
  },
];
strokeMap.set('O', Ostrokes);

// Lowercase p strokes (from p.tsx)
const pStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.889,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.639,
  },
  {
    type: 'circle',
    cx: 11.963,
    cy: 12.175,
    r: 10.713,
    color: ANIMATED_LETTER_COLORS[1],
    length:
      Math.PI *
      (3 * (10.713 + 10.925) -
        Math.sqrt((3 * 10.713 + 10.925) * (10.713 + 3 * 10.925))),
    transform: 'scale(-1 -1) translate(-23.926 -23.926)',
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
    d: 'M1.543,1.25h12.414c2.544,0,4.553,0.721,6.029,2.162,1.475,1.442,2.213,3.197,2.213,5.266,0,1.458-.382,2.781-1.145,3.968-.763,1.187-1.781,2.128-3.053,2.824-1.272,0.695-2.671,1.043-4.197,1.043H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60,
  },
];
strokeMap.set('P', Pstrokes);

// Lowercase q strokes (from q.tsx)
const qStrokes: Stroke[] = [
  {
    type: 'circle',
    cx: 11.963,
    cy: 12.175,
    r: 7.964,

    color: ANIMATED_LETTER_COLORS[0],
    length:
      Math.PI *
      (3 * (10.713 + 10.925) -
        Math.sqrt((3 * 10.713 + 10.925) * (10.713 + 3 * 10.925))),
    transform: 'scale(1 -1) translate(0 -8.5)',
  },
  {
    type: 'path',
    d: 'M22.676,12.175V1.408',
    color: ANIMATED_LETTER_COLORS[0],
    length: 10.767,
    transform: 'translate(-3 -13.5)',
  },
  {
    type: 'path',
    d: 'M22.656,11.975c.027,7.638.054,15.276.081,22.914',
    color: ANIMATED_LETTER_COLORS[0],
    length: 25,
    transform: 'translate(-3 -13.5)',
  },
];
strokeMap.set('q', qStrokes);

const Qstrokes: Stroke[] = [
  {
    type: 'circle',
    cx: 17.886,
    cy: 17.886,
    r: 16.636,
    color: ANIMATED_LETTER_COLORS[0],
    length: 2 * Math.PI * 16.636,
    transform: 'scale(-1,1) translate(-35.773,0) rotate(-90 17.886 17.886)',
  },
  {
    type: 'line',
    x1: 18.923,
    y1: 21.846,
    x2: 31.599,
    y2: 34.522,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(
      Math.pow(31.599 - 18.923, 2) + Math.pow(34.522 - 21.846, 2)
    ),
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
    x1: 1.833,
    y1: 16.487,
    x2: 20.944,
    y2: 34.451,
    color: ANIMATED_LETTER_COLORS[1],
    length: 30,
  },
];
strokeMap.set('R', Rstrokes);

// Lowercase s strokes (from s.tsx)
const sStrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M11.9,3.6c-.4-.5-.9-.9-1.5-1.3s-1.1-.6-1.7-.8c-.6-.2-1.3-.3-1.9-.3s-1.4,0-2,.3c-.6.2-1.1.4-1.5.8-.4.3-.8.8-1,1.2s-.4,1-.4,1.6,0,.9.3,1.2c.2.4.5.7.8,1,.4.3.9.6,1.6.9.6.3,1.4.5,2.2.7h.1c.8.2,1.6.4,2.2.7.6.2,1.1.5,1.6.8.4.3.8.7,1,1.1s.3.9.3,1.5-.2,1.5-.6,2.1-1,1.1-1.7,1.4c-.8.3-1.6.5-2.7.5s-2.4-.2-3.4-.7-1.8-1.1-2.3-1.9',
    color: ANIMATED_LETTER_COLORS[1],
    length: 42,
    transform: 'translate(0, 18)',
  },
];
strokeMap.set('s', sStrokes);

const Sstrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M23.6,6.3c-.9-1.1-1.9-2-3.1-2.7-1.1-.8-2.4-1.3-3.7-1.7s-2.6-.6-4-.6-3,.2-4.3.6c-1.3.4-2.4.9-3.3,1.7-.9.7-1.6,1.6-2.1,2.6s-.7,2.1-.7,3.3.2,1.8.6,2.6,1,1.5,1.8,2.2c.9.7,2,1.3,3.3,1.9,1.4.6,2.9,1,4.7,1.5h.2c1.8.5,3.3.9,4.6,1.4,1.3.5,2.4,1.1,3.3,1.7.9.7,1.6,1.5,2,2.4s.7,2 .7,3.2-.4,3.2-1.2,4.5c-.8,1.3-2,2.3-3.6,3-1.6.7-3.5,1-5.6,1s-5-.5-7.1-1.5c-2.1-1-3.8-2.3-4.9-3.9',
    color: ANIMATED_LETTER_COLORS[1],
    length: 110,
  },
];
strokeMap.set('S', Sstrokes);

const tStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 8.456,
    y1: 1.25,
    x2: 8.456,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.625 - 1.25,
  },
  {
    type: 'line',
    x1: 1.25,
    y1: 10.018,
    x2: 16.042,
    y2: 10.018,
    color: ANIMATED_LETTER_COLORS[1],
    length: 16.042 - 1.25,
  },
];
strokeMap.set('t', tStrokes);

const Tstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 24.653,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: 24.653 - 1.25,
  },
  {
    type: 'line',
    x1: 12.783,
    y1: 1.25,
    x2: 12.783,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[1],
    length: 34.625 - 1.25,
  },
];
strokeMap.set('T', Tstrokes);

const vStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.327,
    x2: 8.155,
    y2: 16.942,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(8.155 - 1.25, 2) + Math.pow(16.942 - 1.327, 2)),
  },
  {
    type: 'line',
    x1: 8.305,
    y1: 16.865,
    x2: 15.21,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(15.21 - 8.305, 2) + Math.pow(1.25 - 16.865, 2)),
  },
];
strokeMap.set('v', vStrokes);

const Vstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.2,
    y1: 1.2,
    x2: 14.3,
    y2: 34.7,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(14.3 - 1.2, 2) + Math.pow(34.7 - 1.2, 2)),
  },
  {
    type: 'line',
    x1: 14.4,
    y1: 34.7,
    x2: 27.4,
    y2: 1.3,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(27.4 - 14.4, 2) + Math.pow(34.7 - 1.3, 2)),
  },
];
strokeMap.set('V', Vstrokes);

const wStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.255,
    x2: 6.667,
    y2: 16.815,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(6.667 - 1.25, 2) + Math.pow(16.815 - 1.255, 2)),
  },
  {
    type: 'line',
    x1: 6.667,
    y1: 16.81,
    x2: 12.083,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(12.083 - 6.667, 2) + Math.pow(16.81 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 12.083,
    y1: 1.257,
    x2: 17.5,
    y2: 16.817,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(17.5 - 12.083, 2) + Math.pow(16.817 - 1.257, 2)),
  },
  {
    type: 'line',
    x1: 17.5,
    y1: 16.812,
    x2: 22.917,
    y2: 1.252,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(22.917 - 17.5, 2) + Math.pow(16.812 - 1.252, 2)),
  },
];
strokeMap.set('w', wStrokes);

const Wstrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 11.417,
    y2: 34.708,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(11.417 - 1.25, 2) + Math.pow(34.708 - 1.25, 2)),
  },
  {
    type: 'line',
    x1: 11.417,
    y1: 34.708,
    x2: 21.583,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(
      Math.pow(21.583 - 11.417, 2) + Math.pow(34.708 - 1.25, 2)
    ),
  },
  {
    type: 'line',
    x1: 21.729,
    y1: 1.25,
    x2: 31.896,
    y2: 34.708,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(
      Math.pow(31.896 - 21.729, 2) + Math.pow(34.708 - 1.25, 2)
    ),
  },
  {
    type: 'line',
    x1: 31.896,
    y1: 34.708,
    x2: 42.062,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(
      Math.pow(42.062 - 31.896, 2) + Math.pow(34.708 - 1.25, 2)
    ),
  },
];
strokeMap.set('W', Wstrokes);

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

// Lowercase r strokes (from r.tsx)
const rStrokes: Stroke[] = [
  {
    type: 'line',
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 16.883,
    color: ANIMATED_LETTER_COLORS[0],
    length: 15.633,
  },
  {
    type: 'path',
    d: 'M1.25,5.962c.538-.98,1.194-1.869,1.968-2.665.774-.796,1.62-1.374,2.539-1.733.919-.359,1.838-.356,2.758.009.313.124.59.27.831.439.242.168.448.359.619.571',
    color: ANIMATED_LETTER_COLORS[0],
    length: 12,
  },
];
strokeMap.set('r', rStrokes);

// Lowercase u strokes (from u.tsx)
const uStrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M1.2,1.2v9.8c0,1.2.2,2.3.7,3.2.5.9,1.2,1.7,2.1,2.2.9.5,1.9.8,3,.8s2.2-.3,3.1-.8c.9-.5,1.6-1.3,2.1-2.2s.8-2,.8-3.2V1.2',
    color: ANIMATED_LETTER_COLORS[0],
    length: 36, // Approximate, matches pathLength in u.tsx
  },
  {
    type: 'line',
    x1: 13.1,
    y1: 1.2,
    x2: 13.1,
    y2: 17.3,
    color: ANIMATED_LETTER_COLORS[0],
    length: 16.1,
  },
];
strokeMap.set('u', uStrokes);

const Ustrokes: Stroke[] = [
  {
    type: 'path',
    d: 'M1.2,1.2v20.5c0,2.5.5,4.8,1.6,6.7,1,2,2.5,3.5,4.3,4.6,1.9,1.1,4,1.7,6.3,1.7s4.6-.6,6.5-1.7c1.9-1.1,3.4-2.7,4.5-4.6,1.1-2,1.6-4.2,1.6-6.7V1.2',
    color: ANIMATED_LETTER_COLORS[0],
    length: 90, // Approximate, matches pathLength in U.tsx
  },
];
strokeMap.set('U', Ustrokes);
