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

const ANIMATION_DURATION = 1400;

// SVG path for uppercase C, from C.svg (starts at top right, ends at bottom left)
const pathD =
  'M29.691,29.615c-3.122,3.142-7.373,4.911-11.803,4.911-9.127,0-16.638-7.511-16.638-16.638S8.761,1.25,17.888,1.25c4.259,0,8.36,1.635,11.45,4.567';

const PATH_LENGTH = 77; // Adjust as needed for your path

export default function AnimatedUppercaseC({
  width = 120,
  height = 140,
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
      viewBox="0 0 30.577 35.776"
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
        transform="scale(1, -1) translate(0, -35)"
        fill="none"
      />
    </Svg>
  );
}
