import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ANIMATION_DURATION = 1200;

const strokes = [
  {
    // Main hook (black)
    type: 'path' as const,
    d: 'M10.522,6.65v23.217c0,.946-.146,1.788-.438,2.525-.292.737-.779,1.315-1.461,1.732s-1.607.626-2.776.626h-.71c-.93,0-1.847-.692-2.004-.802-2.246-1.587-1.857-4.99-1.857-5.032',
    color: ANIMATED_LETTER_COLORS[0],
    length: 40, // Approximate, for strokeDasharray
  },
  {
    // Dot (pink)
    type: 'circle' as const,
    cx: 10.572,
    cy: 1.281,
    r: 0.8,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 0.8,
  },
];

export default function AnimatedLowercaseJ({
  width = 24,
  height = 80,
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
    // Path: trace
    useAnimatedProps(() => {
      const p = progress[0].value;
      return {
        strokeDashoffset: strokes[0].length * (1 - p),
        opacity: p === 0 ? 0 : 1,
      };
    }),
    // Dot: grow
    useAnimatedProps(() => {
      const p = progress[1].value;
      const r = strokes[1] && strokes[1].r ? strokes[1].r : 0.8;
      return {
        r: r * p,
        opacity: p === 0 ? 0 : 1,
      };
    }),
  ];

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 -4 11.853 44"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Main hook */}
      <AnimatedPath
        d={strokes[0].d}
        stroke={strokes[0].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[0].length}
        animatedProps={animatedPropsArr[0]}
        fill="none"
      />
      {/* Dot */}
      <AnimatedCircle
        cx={strokes[1].cx}
        cy={strokes[1].cy}
        stroke={strokes[1].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        fill="none"
        animatedProps={animatedPropsArr[1]}
      />
    </Svg>
  );
}
