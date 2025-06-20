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
    x2: 11.417,
    y2: 34.708,
    x1: 1.25,
    y1: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(11.417 - 1.25, 2) + Math.pow(34.708 - 1.25, 2)),
  },
  {
    // First right diagonal (blue)
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
    // Second left diagonal (blue)
    x2: 31.896,
    y2: 34.708,
    x1: 21.729,
    y1: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(
      Math.pow(31.896 - 21.729, 2) + Math.pow(34.708 - 1.25, 2)
    ),
  },
  {
    // Second right diagonal (blue)
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

export default function AnimatedUppercaseW({
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
      viewBox="0 0 43.312 35.958"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Four strokes for W */}
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
