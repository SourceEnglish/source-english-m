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

// Stroke data from B.svg (order: vertical stem, top bowl, bottom bowl)
const strokes = [
  {
    // Vertical stem
    type: 'line' as const,
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.625,
    color: ANIMATED_LETTER_COLORS[0],
    length: 33.375,
  },
  {
    // Top bowl
    type: 'path' as const,
    d: 'M1.543,0.912h12.414c2.544,0,4.553,0.721,6.029,2.162,1.475,1.442,2.213,3.197,2.213,5.266,0,1.458-.382,2.781-1.145,3.968-.763,1.187-1.781,2.128-3.053,2.824-1.272,0.695-2.671,1.043-4.197,1.043H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    // approximate, adjust as needed (keep flipped, stays at the top)
    length: 60, // approximate, adjust as needed
  },
  {
    // Bottom bowl
    type: 'path' as const,
    // Flip vertically: y' = 35.875 - y (SVG height is 35.875)
    // Original: M1.543,34.625h12.516c2.137,0,3.951-.365,5.444-1.094,1.492-.729,2.629-1.738,3.409-3.027.78-1.289,1.17-2.764,1.17-4.426,0-1.594-.339-3.027-1.018-4.299-.678-1.272-1.772-2.281-3.282-3.027-1.509-.746-3.502-1.119-5.978-1.119H1.543
    // Flipped and shifted down by 20 units, then up by 4 units: M1.543,17.25h12.516c2.137,0,3.951,.365,5.444,1.094,1.492,.729,2.629,1.738,3.409,3.027,.78,1.289,1.17,2.764,1.17,4.426,0,1.594-.339,3.027-1.018,4.299-.678,1.272-1.772,2.281-3.282,3.027-1.509,.746-3.502,1.119-5.978,1.119H1.543
    d: 'M1.543,17.25h12.516c2.137,0,3.951,.365,5.444,1.094,1.492,.729,2.629,1.738,3.409,3.027,.78,1.289,1.17,2.764,1.17,4.426,0,1.594-.339,3.027-1.018,4.299-.678,1.272-1.772,2.281-3.282,3.027-1.509,.746-3.502,1.119-5.978,1.119H1.543',
    color: ANIMATED_LETTER_COLORS[1],
    length: 60, // approximate, adjust as needed
  },
];

export default function AnimatedUppercaseB({
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
      viewBox="0 0 25.332 35.875"
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
      <AnimatedPath
        d={strokes[2].d}
        stroke={strokes[2].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[2].length}
        animatedProps={animatedPropsArr[2]}
        fill="none"
      />
    </Svg>
  );
}
