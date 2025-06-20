import React from 'react';
import Svg, { Ellipse, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const ANIMATION_DURATION = 1500;

// Stroke data from p.svg
const strokes = [
  {
    type: 'line' as const,
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.889,
    color: ANIMATED_LETTER_COLORS[0], // black
    length: 33.639, // 34.889 - 1.25
  },
  {
    type: 'ellipse' as const,
    cx: 11.963,
    cy: 12.175,
    rx: 10.713,
    ry: 10.925,
    color: ANIMATED_LETTER_COLORS[1], // pink
    length:
      Math.PI *
      (3 * (10.713 + 10.925) -
        Math.sqrt((3 * 10.713 + 10.925) * (10.713 + 3 * 10.925))), // ellipse perimeter approx
  },
];

export default function AnimatedLowercaseP({
  width = 90,
  height = 140,
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
      let dashoffset = stroke.length * (1 - p);
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
      viewBox="0 0 23.926 36.139"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Vertical stem */}
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
      {/* Bowl (ellipse) */}
      <AnimatedEllipse
        cx={strokes[1].cx}
        cy={strokes[1].cy}
        rx={strokes[1].rx}
        ry={strokes[1].ry}
        stroke={strokes[1].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[1].length}
        animatedProps={animatedPropsArr[1]}
        fill="none"
        transform="scale(-1 -1) translate(-23.926 -23.926)"
      />
    </Svg>
  );
}
