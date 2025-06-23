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

const ANIMATION_DURATION = 1600;

const strokes = [
  {
    // Left vertical (blue)
    x1: 1.25,
    y1: 1.31,
    x2: 1.25,
    y2: 34.588,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.588 - 1.31,
  },
  {
    // Left diagonal (magenta)
    x1: 1.25,
    y1: 1.31,
    x2: 15.933,
    y2: 34.663,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(15.933 - 1.25, 2) + Math.pow(34.663 - 1.31, 2)),
  },
  {
    // Right diagonal (green)
    x2: 30.767,
    y2: 1.25,
    x1: 16.083,
    y1: 34.603,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(
      Math.pow(30.767 - 16.083, 2) + Math.pow(1.25 - 34.603, 2)
    ),
  },
  {
    // Right vertical (black)
    x1: 30.767,
    y1: 1.31,
    x2: 30.767,
    y2: 34.588,
    color: ANIMATED_LETTER_COLORS[1],
    length: 34.588 - 1.31,
  },
];

export default function AnimatedUppercaseM({
  width = 90,
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
      viewBox="0 0 32.017 35.913"
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
