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

const ANIMATION_DURATION = 900;

const strokes = [
  {
    // Left diagonal (magenta)
    x1: 1.25,
    y1: 1.25,
    x2: 13.56,
    y2: 19.636,
    color: ANIMATED_LETTER_COLORS[0],
    length: Math.sqrt(Math.pow(13.56 - 1.25, 2) + Math.pow(19.636 - 1.25, 2)),
  },
  {
    // Right diagonal (blue)
    x1: 25.869,
    y1: 1.25,
    x2: 3.389,
    y2: 34.827,
    color: ANIMATED_LETTER_COLORS[1],
    length: Math.sqrt(Math.pow(25.869 - 3.389, 2) + Math.pow(1.25 - 34.827, 2)),
  },
];

export default function AnimatedLowercaseY({
  width = 50,
  height = 100,
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
      viewBox="0 0 27.119 36.077"
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
