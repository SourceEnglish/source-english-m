import React from 'react';
import Svg, { Line, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ANIMATION_DURATION = 1000;

const strokes = [
  {
    type: 'line' as const,
    x1: 1.25,
    y1: 6.65,
    x2: 1.25,
    y2: 23.267,
    color: ANIMATED_LETTER_COLORS[0], // pink
    length: 23.267 - 6.65,
  },
  {
    type: 'circle' as const,
    cx: 1.3,
    cy: 1.281,
    r: 0.8,
    color: ANIMATED_LETTER_COLORS[1], // pink
    length: 2 * Math.PI * 0.8,
  },
];

export default function AnimatedLowercaseI({
  width = 20,
  height = 60,
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
    // For the line: trace as before
    useAnimatedProps(() => {
      const p = progress[0].value;
      return {
        strokeDashoffset: strokes[0].length * (1 - p),
        opacity: p === 0 ? 0 : 1,
      };
    }),
    // For the dot: grow radius from 0 to r, with fallback for undefined
    useAnimatedProps(() => {
      const p = progress[1].value;
      const r = strokes[1] && strokes[1].r ? strokes[1].r : 0.8;
      return {
        r: r * p,
        opacity: p === 0 ? 0 : 1,
      };
    }),
  ];

  // Add extra space above for the dot
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 -4 2.581 28.517"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Main vertical stroke */}
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
      {/* Dot grows into existence */}
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
