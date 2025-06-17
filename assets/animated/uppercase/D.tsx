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

const ANIMATION_DURATION = 1800;

// Stroke data from D.svg (vertical stem, then outer curve)
const strokes = [
  {
    // Vertical stem
    type: 'line' as const,
    x1: 1.25,
    y1: 1.374,
    x2: 1.25,
    y2: 34.749,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    // Outer curve
    type: 'path' as const,
    d: 'M1.25,1.25h11.843c2.046,0,4.004.416,5.874,1.247,1.87.831,3.532,1.998,4.987,3.5s2.605,3.276,3.452,5.322c.847,2.046,1.271,4.283,1.271,6.713,0,2.397-.424,4.619-1.271,6.665-.847,2.046-1.998,3.828-3.452,5.346-1.454,1.518-3.117,2.693-4.987,3.524-1.87.831-3.828,1.247-5.874,1.247H1.25',
    color: ANIMATED_LETTER_COLORS[1],
    length: 80, // approximate, adjust as needed
  },
];

export default function AnimatedUppercaseD({
  width = 120,
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
          }, 600);
          return;
        }
        progress[idx].value = withTiming(
          1,
          {
            duration: ANIMATION_DURATION / strokes.length,
            easing: Easing.linear,
          },
          () => {
            if (mounted) animateStroke(idx + 1);
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
      viewBox="0 0 29.927 36.064"
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
