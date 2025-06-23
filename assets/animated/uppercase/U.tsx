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

const ANIMATION_DURATION = 1200;

// SVG path from U.svg (mirrored for left-to-right)
const pathData =
  'M1.2,1.2v20.5c0,2.5.5,4.8,1.6,6.7,1,2,2.5,3.5,4.3,4.6,1.9,1.1,4,1.7,6.3,1.7s4.6-.6,6.5-1.7c1.9-1.1,3.4-2.7,4.5-4.6,1.1-2,1.6-4.2,1.6-6.7V1.2';

export default function AnimatedUppercaseU({
  width = 70,
  height = 140,
}: {
  width?: number;
  height?: number;
}) {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    let mounted = true;
    function animate() {
      progress.value = 0;
      progress.value = withTiming(
        1,
        {
          duration: ANIMATION_DURATION,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished && mounted) {
            setTimeout(animate, 500);
          }
        }
      );
    }
    animate();
    return () => {
      mounted = false;
    };
  }, [progress]);

  // Approximate path length for U (visually estimated)
  const pathLength = 90;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress.value),
    opacity: progress.value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 27.4 36"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedPath
        d={pathData}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        animatedProps={animatedProps}
      />
    </Svg>
  );
}
