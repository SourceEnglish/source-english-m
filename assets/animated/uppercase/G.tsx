import React from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const ANIMATION_DURATION = 1800;

// Use shared colors from constants (single stroke for G)
const strokes = [
  {
    d: 'M29.796,7.304c-.993-1.211-2.127-2.274-3.399-3.19s-2.67-1.622-4.191-2.119c-1.521-.497-3.167-.745-4.936-.745-2.328,0-4.471.419-6.426,1.257-1.956.838-3.656,2.01-5.099,3.516-1.444,1.506-2.553,3.291-3.33,5.355-.776,2.065-1.164,4.339-1.164,6.822,0,2.422.396,4.649,1.187,6.683.792,2.033,1.902,3.788,3.33,5.262s3.128,2.616,5.099,3.423c1.971.807,4.121,1.211,6.45,1.211s4.416-.349,6.263-1.048,3.423-1.731,4.727-3.097c1.304-1.366,2.297-3.066,2.98-5.099.683-2.033,1.024-4.37,1.024-7.008v-.885h-14.576',
    color: ANIMATED_LETTER_COLORS[0],
    length: 120, // approximate, adjust as needed
  },
];

export default function AnimatedG({
  width = 140,
  height = 150,
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
          }, 600);
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
      viewBox="0 0 33.561 36.029"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Main G stroke */}
      <AnimatedPath
        d={strokes[0].d}
        stroke={strokes[0].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={strokes[0].length}
        animatedProps={animatedPropsArr[0]}
        fill="none"
      />
    </Svg>
  );
}
