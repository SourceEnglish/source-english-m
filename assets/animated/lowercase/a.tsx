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

const ANIMATION_DURATION = 1400;

// Use shared colors from constants
const strokes = [
  {
    type: 'circle' as const,
    cx: 9.215,
    cy: 9.435,
    r: 7.964,
    color: ANIMATED_LETTER_COLORS[0],
    length: 2 * Math.PI * 7.964,
    rotation: 150,
    reverse: true,
  },
  {
    type: 'line' as const,
    x1: 17.178,
    y1: 1.25,
    x2: 17.178,
    y2: 17.399,
    color: ANIMATED_LETTER_COLORS[1],
    length: 16.149,
  },
];

export default function AnimatedLowercaseA({
  width = 90,
  height = 90,
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
      let dashoffset;
      if (stroke.reverse) {
        dashoffset = stroke.length * (1 - p); // draw in as p increases
      } else {
        dashoffset = stroke.length * (1 - p);
      }
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
      viewBox="0 0 18.429 18.65"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Circle (main body), rotated so stroke starts at top, counter-clockwise */}
      <AnimatedCircle
        cx={strokes[0].cx}
        cy={strokes[0].cy}
        r={strokes[0].r}
        stroke={strokes[0].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[0].length}
        animatedProps={animatedPropsArr[0]}
        fill="none"
        transform={`rotate(${strokes[0].rotation} ${strokes[0].cx} ${strokes[0].cy}) scale(-1 1) translate(-18.429 0)`}
      />
      {/* Vertical line (stem) */}
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
    </Svg>
  );
}
