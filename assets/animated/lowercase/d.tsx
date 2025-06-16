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

const strokes = [
  {
    // Vertical line (stem)
    type: 'line' as const,
    x1: 17.178,
    y1: 1.25,
    x2: 17.178,
    y2: 34.815,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.565,
  },
  {
    // Circle (main body)
    type: 'circle' as const,
    cx: 9.215,
    cy: 26.852,
    r: 7.964,
    color: ANIMATED_LETTER_COLORS[1],
    length: 2 * Math.PI * 7.964,
    rotation: 150,
    reverse: true,
  },
];

export default function AnimatedLowercaseD({
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
      let dashoffset;
      if (stroke.reverse) {
        dashoffset = stroke.length * (1 - p);
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
      viewBox="0 0 18.429 36.066"
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
      {/* Circle (main body) */}
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
        transform={`rotate(${strokes[1].rotation} ${strokes[1].cx} ${strokes[1].cy}) scale(-1 1) translate(-18.429 0)`}
      />
    </Svg>
  );
}
