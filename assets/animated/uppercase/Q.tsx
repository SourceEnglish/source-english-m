import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const ANIMATION_DURATION = 1400;

const strokes = [
  {
    // Main circle (pink)
    type: 'circle',
    cx: 17.886,
    cy: 17.886,
    r: 16.636,
    color: ANIMATED_LETTER_COLORS[0],
    length: 2 * Math.PI * 16.636,
  },
  {
    // Diagonal tail (black)
    type: 'line',
    x1: 18.923,
    y1: 21.846,
    x2: 31.599,
    y2: 34.522,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(
      Math.pow(31.599 - 18.923, 2) + Math.pow(34.522 - 21.846, 2)
    ),
  },
];

export default function AnimatedUppercaseQ({
  width = 70,
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
      viewBox="0 0 35.773 35.773"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <g transform="scale(-1,1) translate(-35.773,0)">
        <g transform="rotate(-90 17.886 17.886)">
          {/* Main circle */}
          <AnimatedCircle
            cx={strokes[0].cx}
            cy={strokes[0].cy}
            r={strokes[0].r}
            stroke={strokes[0].color}
            strokeWidth={2.5}
            strokeMiterlimit={10}
            strokeDasharray={strokes[0].length}
            animatedProps={animatedPropsArr[0]}
            fill="none"
          />
        </g>
      </g>
      {/* Diagonal tail (not transformed) */}
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
