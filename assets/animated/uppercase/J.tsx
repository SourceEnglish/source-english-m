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

const ANIMATION_DURATION = 1400;

const strokes = [
  {
    // Top bar (green)
    type: 'line' as const,
    x1: 11.517,
    y1: 1.25,
    x2: 26.35,
    y2: 1.25,
    color: ANIMATED_LETTER_COLORS[0],
    length: 26.35 - 11.517,
  },
  {
    // Main hook (blue)
    type: 'path' as const,
    d: 'M18.9,1.25v23.128c0,1.782-.223,3.318-.668,4.608-.445,1.29-1.068,2.358-1.866,3.203-.799.845-1.743,1.467-2.834,1.866-1.091.399-2.281.599-3.571.599-1.045,0-2.02-.138-2.926-.415-.906-.277-1.728-.676-2.465-1.198-.737-.522-1.383-1.152-1.936-1.889-.553-.737-1.014-1.567-1.383-2.489',
    color: ANIMATED_LETTER_COLORS[1],
    length: 55, // Approximate, for strokeDasharray
  },
];

export default function AnimatedUppercaseJ({
  width = 60,
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

  const animatedPropsArr = [
    // Top bar: trace
    useAnimatedProps(() => {
      const p = progress[0].value;
      return {
        strokeDashoffset: strokes[0].length * (1 - p),
        opacity: p === 0 ? 0 : 1,
      };
    }),
    // Main hook: trace
    useAnimatedProps(() => {
      const p = progress[1].value;
      return {
        strokeDashoffset: strokes[1].length * (1 - p),
        opacity: p === 0 ? 0 : 1,
      };
    }),
  ];

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 27.6 35.904"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Top bar */}
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
      {/* Main hook */}
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
