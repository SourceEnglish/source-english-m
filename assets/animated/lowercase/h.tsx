import React from 'react';
import Svg, { Line, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const ANIMATION_DURATION = 1500;

// Stroke data from h.svg
const strokes = [
  {
    type: 'line' as const,
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.858,
    color: ANIMATED_LETTER_COLORS[0], // black
    length: 33.608, // 34.858 - 1.25
  },
  {
    type: 'path' as const,
    d: 'M1.25,34.858v-10.85c0-1.389.236-2.525.707-3.407.472-.882,1.149-1.527,2.031-1.935.883-.408,1.965-.612,3.247-.612,1.282,0,2.364.204,3.247.612.883.408,1.56,1.053,2.031,1.935.472.882.707,2.018.707,3.407v10.85',
    color: ANIMATED_LETTER_COLORS[0], // black
    length: 50, // estimate
  },
];

export default function AnimatedLowercaseH({
  width = 60,
  height = 140,
}: {
  width?: number;
  height?: number;
}) {
  // Animation progress for each stroke
  const progress = React.useRef(strokes.map(() => useSharedValue(0))).current;

  React.useEffect(() => {
    let mounted = true;
    function animate() {
      progress.forEach((p) => (p.value = 0));
      function animateStroke(idx: number) {
        if (!mounted || idx >= strokes.length) {
          setTimeout(() => {
            if (mounted) animate();
          }, 500);
          return;
        }
        progress[idx].value = withTiming(
          1,
          {
            duration: ANIMATION_DURATION / strokes.length,
            easing: Easing.linear,
          },
          (finished) => {
            if (finished && mounted) animateStroke(idx + 1);
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

  // Animated props for each stroke
  const animatedPropsArr = strokes.map((stroke, i) =>
    useAnimatedProps(() => {
      const p = progress[i].value;
      let dashoffset = stroke.length * (1 - p);
      return {
        strokeDashoffset: dashoffset,
        opacity: p === 0 ? 0 : 1,
      };
    })
  );

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14.47 36.108"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Vertical stem */}
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
      {/* Arch and right stem */}
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
    </Svg>
  );
}
