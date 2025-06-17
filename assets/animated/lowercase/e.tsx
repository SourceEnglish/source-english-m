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

// SVG path for lowercase e, reversed: start at crossbar, draw to curve
// Adjusted to fit the viewBox 0 0 16.331 18.383
const pathD =
  'M1.2,15.2c4.3-0.02,8.6-0.04,12.9-0.06l0.03-0.7c0.04-1-0.09-1.9-0.39-2.7-0.3-0.8-0.75-1.5-1.33-2.1-0.58-0.6-1.27-1.06-2.07-1.37-0.8-0.32-1.67-0.48-2.62-0.48-1.03,0-1.98,0.19-2.85,0.57-0.86,0.37-1.6,0.91-2.22,1.6-0.62,0.69-1.1,1.51-1.44,2.46-0.34,0.95-0.51,1.99-0.51,3.13,0,1.53,0.31,2.9,0.93,4.1,0.62,1.2,1.48,2.14,2.59,2.8,1.11,0.66,2.39,0.99,3.83,0.99,0.72,0,1.4-0.09,2.04-0.27,0.64-0.18,1.21-0.43,1.78-0.74,0.55-0.32,1.07-0.7,1.55-1.14';

const PATH_LENGTH = 60; // Approximate, adjust as needed

export default function AnimatedLowercaseE({
  width = 80,
  height = 90,
}: {
  width?: number;
  height?: number;
}) {
  const progress = React.useRef(useSharedValue(0)).current;

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
            setTimeout(() => {
              if (mounted) animate();
            }, 400);
          }
        }
      );
    }
    animate();
    return () => {
      mounted = false;
    };
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: PATH_LENGTH * (1 - progress.value),
    opacity: progress.value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="-.5 4.2 16.331 18.383"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedPath
        d={pathD}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={PATH_LENGTH}
        animatedProps={animatedProps}
        fill="none"
      />
    </Svg>
  );
}
