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

// SVG path from S.svg
const pathData =
  'M23.6,6.3c-.9-1.1-1.9-2-3.1-2.7-1.1-.8-2.4-1.3-3.7-1.7s-2.6-.6-4-.6-3,.2-4.3.6c-1.3.4-2.4.9-3.3,1.7-.9.7-1.6,1.6-2.1,2.6s-.7,2.1-.7,3.3.2,1.8.6,2.6,1,1.5,1.8,2.2c.9.7,2,1.3,3.3,1.9,1.4.6,2.9,1,4.7,1.5h.2c1.8.5,3.3.9,4.6,1.4,1.3.5,2.4,1.1,3.3,1.7.9.7,1.6,1.5,2,2.4s.7,2,.7,3.2-.4,3.2-1.2,4.5c-.8,1.3-2,2.3-3.6,3-1.6.7-3.5,1-5.6,1s-5-.5-7.1-1.5c-2.1-1-3.8-2.3-4.9-3.9';

export default function AnimatedUppercaseS({
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

  // Approximate path length for S (visually estimated)
  const pathLength = 110;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress.value),
    opacity: progress.value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 35.9"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedPath
        d={pathData}
        stroke={ANIMATED_LETTER_COLORS[1]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        animatedProps={animatedProps}
      />
    </Svg>
  );
}
