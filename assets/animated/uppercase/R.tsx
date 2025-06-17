import React from 'react';
import Svg, { Path, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const ANIMATION_DURATION = 1600;

// SVG data for uppercase R from R.svg
const strokes = [
  {
    // Vertical stem
    type: 'line' as const,
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    // Top bowl (flipped vertically, moved up to align with stem top)
    type: 'path' as const,
    d: 'M1.543,1.25h12.414c2.544,0,4.553,.721,6.029,2.162,1.475,1.442,2.213,3.197,2.213,5.266,0,1.458-.382,2.781-1.145,3.968-.763,1.187-1.781,2.128-3.053,2.824-1.272,.695-2.671,1.043-4.197,1.043H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60, // approximate
  },
  {
    // Diagonal leg
    type: 'line' as const,
    x1: 1.833,
    y1: 16.487,
    x2: 20.944,
    y2: 34.451,
    color: ANIMATED_LETTER_COLORS[1],
    length: 30, // approximate
  },
];

export default function AnimatedUppercaseR({
  width = 70,
  height = 100,
}: {
  width?: number;
  height?: number;
}) {
  const progress = React.useRef(strokes.map(() => useSharedValue(0))).current;

  React.useEffect(() => {
    let mounted = true;
    function animate() {
      progress.forEach((p) => (p.value = 0));
      function animateStroke(idx: number) {
        if (!mounted || idx >= strokes.length) {
          setTimeout(() => {
            if (mounted) animate();
          }, 600);
          return;
        }
        progress[idx].value = withTiming(
          1,
          {
            duration: ANIMATION_DURATION / strokes.length,
            easing: Easing.linear,
          },
          () => {
            if (mounted) animateStroke(idx + 1);
          }
        );
      }
      animateStroke(0);
    }
    animate();
    return () => {
      mounted = false;
    };
  }, [progress]);

  const animatedPropsArr = strokes.map((stroke, i) =>
    useAnimatedProps(() => ({
      strokeDashoffset: stroke.length * (1 - progress[i].value),
      opacity: progress[i].value === 0 ? 0 : 1,
    }))
  );

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 23.449 35.875"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedLine
        x1={strokes[0].x1}
        y1={strokes[0].y1}
        x2={strokes[0].x2}
        y2={strokes[0].y2}
        stroke={strokes[0].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[0].length}
        animatedProps={animatedPropsArr[0]}
      />
      <AnimatedPath
        d={strokes[1].d}
        stroke={strokes[1].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[1].length}
        animatedProps={animatedPropsArr[1]}
        fill="none"
      />
      <AnimatedLine
        x1={strokes[2].x1}
        y1={strokes[2].y1}
        x2={strokes[2].x2}
        y2={strokes[2].y2}
        stroke={strokes[2].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[2].length}
        animatedProps={animatedPropsArr[2]}
      />
    </Svg>
  );
}
