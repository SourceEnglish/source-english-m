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

// SVG path for c, all points reversed: starts at top right, ends at bottom left
const pathD =
  'M14.863,3.436 C13.369,1.932 11.334,1.085 9.214,1.085 C4.845,1.085 1.25,4.68 1.25,9.049 S4.845,17.013,9.214,17.013 c2.039,0,4.001-0.783,5.481-2.186';

const PATH_LENGTH = 37; // Adjust as needed for your path

export default function AnimatedLowercaseC({
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
      viewBox="0 0 18 18.5"
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
        // No transform needed, path is already reversed
      />
    </Svg>
  );
}
