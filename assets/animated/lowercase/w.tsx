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
    // First left diagonal (blue)
    x2: 6.667,
    y2: 16.815,
    x1: 1.25,
    y1: 1.255,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(6.667 - 1.25, 2) + Math.pow(16.815 - 1.255, 2)),
  },
  {
    // First right diagonal (magenta)
    x1: 6.667,
    y1: 16.81,
    x2: 12.083,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(12.083 - 6.667, 2) + Math.pow(16.81 - 1.25, 2)),
  },
  {
    // Second left diagonal (blue)
    x2: 17.5,
    y2: 16.817,
    x1: 12.083,
    y1: 1.257,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(17.5 - 12.083, 2) + Math.pow(16.817 - 1.257, 2)),
  },
  {
    // Second right diagonal (magenta)
    x1: 17.5,
    y1: 16.812,
    x2: 22.917,
    y2: 1.252,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(22.917 - 17.5, 2) + Math.pow(16.812 - 1.252, 2)),
  },
];

export default function AnimatedLowercaseW({ width = 40, height = 40 }) {
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
      viewBox="0 0 24.167 18.067"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Four strokes for w */}
      {strokes.map((stroke, i) => (
        <AnimatedLine
          key={i}
          x1={stroke.x1}
          y1={stroke.y1}
          x2={stroke.x2}
          y2={stroke.y2}
          stroke={stroke.color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeDasharray={stroke.length}
          animatedProps={animatedPropsArr[i]}
        />
      ))}
    </Svg>
  );
}
