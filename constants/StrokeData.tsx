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
