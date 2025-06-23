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

const ANIMATION_DURATION = 900;

// SVG path from s.svg
const pathData =
  'M11.9,3.6c-.4-.5-.9-.9-1.5-1.3s-1.1-.6-1.7-.8c-.6-.2-1.3-.3-1.9-.3s-1.4,0-2,.3c-.6.2-1.1.4-1.5.8-.4.3-.8.8-1,1.2s-.4,1-.4,1.6,0,.9.3,1.2c.2.4.5.7.8,1,.4.3.9.6,1.6.9.6.3,1.4.5,2.2.7h.1c.8.2,1.6.4,2.2.7.6.2,1.1.5,1.6.8.4.3.8.7,1,1.1s.3.9.3,1.5-.2,1.5-.6,2.1-1,1.1-1.7,1.4c-.8.3-1.6.5-2.7.5s-2.4-.2-3.4-.7-1.8-1.1-2.3-1.9';

export default function AnimatedLowercaseS({
  width = 50,
  height = 70,
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

  // Approximate path length for s (visually estimated)
  const pathLength = 42;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress.value),
    opacity: progress.value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 13.2 18.4"
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
