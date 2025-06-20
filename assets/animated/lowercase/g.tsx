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

// Stroke data from g.svg
const strokes = [
  {
    type: 'ellipse' as const,
    cx: 11.963,
    cy: 12.175,
    rx: 10.713,
    ry: 10.925,
    color: ANIMATED_LETTER_COLORS[0],
    length:
      Math.PI *
      (3 * (10.713 + 10.925) -
        Math.sqrt((3 * 10.713 + 10.925) * (10.713 + 3 * 10.925))), // ellipse perimeter approx
  },
  {
    type: 'path' as const,
    // Reverse the direction: start at the bottom and go up
    d: 'M22.716,12.175V1.408',
    color: ANIMATED_LETTER_COLORS[0],
    length: 10.767, // exact vertical length
  },
  {
    type: 'path' as const,
    d: 'M22.676,12.175c.013,3.753.026,7.507.04,11.26,0,1.777-.27,3.373-.809,4.786-.539,1.413-1.289,2.608-2.251,3.584-.961.976-2.069,1.726-3.322,2.251-1.253.524-2.593.787-4.021.787-2.367,0-4.096-.686-4.436-.83-1.676-.713-2.815-1.717-3.474-2.404',
    color: ANIMATED_LETTER_COLORS[0],
    length: 38, // estimate
  },
];

export default function AnimatedLowercaseG({
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
      viewBox="0 0 23.966 36.091"
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
        transform="rotate(180) scale(-1 1) translate(0 -24.35)"
      />
      {/* Ascender (top vertical) */}
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
      {/* Descender (tail) */}
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
