import React from 'react';
import Svg, { Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const ANIMATION_DURATION = 1400;

// Stroke data for E (vertical, top, middle, bottom)
const strokes = [
  {
    // Vertical stem
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    // Top bar
    x1: 1.25,
    y1: 1.25,
    x2: 22.5,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[1],
    length: 21.25,
  },
  {
    // Middle bar
    x1: 1.25,
    y1: 17.937,
    x2: 17.5,
    y2: 17.937,
    color: ANIMATED_LETTER_COLORS[2],
    length: 16.25,
  },
  {
    // Bottom bar
    x1: 1.25,
    y1: 34.625,
    x2: 22.5,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[3],
    length: 21.25,
  },
];

export default function AnimatedUppercaseE({
  width = 120,
  height = 140,
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
    useAnimatedProps(() => {
      const p = progress[i].value;
      return {
        strokeDashoffset: stroke.length * (1 - p),
        opacity: p === 0 ? 0 : 1,
      };
    })
  );

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 36"
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
      <AnimatedLine
        x1={strokes[1].x1}
        y1={strokes[1].y1}
        x2={strokes[1].x2}
        y2={strokes[1].y2}
        stroke={strokes[1].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[1].length}
        animatedProps={animatedPropsArr[1]}
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
      <AnimatedLine
        x1={strokes[3].x1}
        y1={strokes[3].y1}
        x2={strokes[3].x2}
        y2={strokes[3].y2}
        stroke={strokes[3].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[3].length}
        animatedProps={animatedPropsArr[3]}
      />
    </Svg>
  );
}
