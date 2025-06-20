import React from 'react';
import Svg, { Ellipse, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const ANIMATION_DURATION = 1500;

// Stroke data from q.svg
const strokes = [
  {
    type: 'ellipse' as const,
    cx: 11.963,
    cy: 12.175,
    rx: 10.713,
    ry: 10.925,
    color: ANIMATED_LETTER_COLORS[1], // pink (#ff9ff2)
    length:
      Math.PI *
      (3 * (10.713 + 10.925) -
        Math.sqrt((3 * 10.713 + 10.925) * (10.713 + 3 * 10.925))), // ellipse perimeter approx
  },
  {
    type: 'path' as const,
    // Make the ascender perfectly vertical and reversed: from (22.676, 12.175) up to (22.676, 1.408)
    d: 'M22.676,12.175V1.408',
    color: ANIMATED_LETTER_COLORS[1], // pink (#ff9ff2)
    length: 10.767, // exact vertical length
  },
  {
    type: 'path' as const,
    d: 'M22.656,11.975c.027,7.638.054,15.276.081,22.914',
    color: ANIMATED_LETTER_COLORS[0], // green (#23ff00)
    length: 25, // estimate
  },
];

export default function AnimatedLowercaseQ({
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
      viewBox="0 0 23.986 36.139"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Ellipse (main body) */}
      <AnimatedEllipse
        cx={strokes[0].cx}
        cy={strokes[0].cy}
        rx={strokes[0].rx}
        ry={strokes[0].ry}
        stroke={strokes[0].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[0].length}
        animatedProps={animatedPropsArr[0]}
        fill="none"
        transform="scale(1 -1) translate(0 -24.35)"
      />
      {/* Ascender (top vertical) */}
      <AnimatedPath
        d={strokes[1].d}
        stroke={strokes[0].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[1].length}
        animatedProps={animatedPropsArr[1]}
        fill="none"
      />
      {/* Descender (tail) */}
      <AnimatedPath
        d={strokes[2].d}
        stroke={strokes[0].color}
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
