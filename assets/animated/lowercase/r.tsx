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

const ANIMATION_DURATION = 1200;

// SVG data for lowercase r from r.svg
const strokes = [
  {
    // Vertical stem
    type: 'line' as const,
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 16.883,
    color: ANIMATED_LETTER_COLORS[0],
    length: 15.633,
  },
  {
    // Arc to the right
    type: 'path' as const,
    d: 'M1.25,5.962c.538-.98,1.194-1.869,1.968-2.665.774-.796,1.62-1.374,2.539-1.733.919-.359,1.838-.356,2.758.009.313.124.59.27.831.439.242.168.448.359.619.571',
    color: ANIMATED_LETTER_COLORS[0],
    length: 12, // approximate
  },
];

export default function AnimatedLowercaseR({
  width = 50,
  height = 70,
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
    useAnimatedProps(() => ({
      strokeDashoffset: stroke.length * (1 - progress[i].value),
      opacity: progress[i].value === 0 ? 0 : 1,
    }))
  );

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 11.216 18.133"
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
    </Svg>
  );
}
