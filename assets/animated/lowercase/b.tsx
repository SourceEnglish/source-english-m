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

// Data from b.svg
const strokes = [
  {
    // Vertical line (stem)
    type: 'line' as const,
    x1: 1.3,
    y1: 1.2,
    x2: 1.3,
    y2: 34.8,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.6, // |34.8 - 1.2|
  },
  {
    // Circle (main body)
    type: 'circle' as const,
    cx: 9.2,
    cy: 26.9,
    r: 8,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 8,
    rotation: 210,
    // Draw counter-clockwise by flipping horizontally
    counterClockwise: true,
  },
];

export default function AnimatedLowercaseB({
  width = 90,
  height = 180,
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
      viewBox="0 0 18.4 36.1"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Vertical line (stem) */}
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
      {/* Circle (main body), counter-clockwise by flipping horizontally */}
      <AnimatedCircle
        cx={strokes[1].cx}
        cy={strokes[1].cy}
        r={strokes[1].r}
        stroke={strokes[1].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[1].length}
        animatedProps={animatedPropsArr[1]}
        fill="none"
        transform={`rotate(${strokes[1].rotation} ${strokes[1].cx} ${strokes[1].cy}) scale(1 1) translate(0 0)`}
      />
    </Svg>
  );
}
