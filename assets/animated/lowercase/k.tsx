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

const ANIMATION_DURATION = 1200;

const strokes = [
  {
    // Main vertical (black)
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.667,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.667 - 1.25,
  },
  {
    // Upper diagonal (blue)
    x1: 11.2,
    y1: 17.946,
    x2: 1.32,
    y2: 26.255,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(11.2 - 1.32, 2) + Math.pow(26.255 - 17.946, 2)),
  },
  {
    // Lower diagonal (magenta)
    x1: 1.32,
    y1: 26.275,
    x2: 11.2,
    y2: 34.583,
    color: ANIMATED_LETTER_COLORS[2],
    length: Math.sqrt(Math.pow(11.2 - 1.32, 2) + Math.pow(34.583 - 26.275, 2)),
  },
];

export default function AnimatedLowercaseK({
  width = 32,
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
      viewBox="0 0 12.45 35.917"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Main vertical */}
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
      {/* Lower diagonal */}
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
      {/* Upper diagonal */}
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
