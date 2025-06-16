import React from 'react';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ANIMATION_DURATION = 1200;

// SVG data for o from o.svg
const cx = 9.215;
const cy = 9.215;
const r = 7.964;
const PATH_LENGTH = 2 * Math.PI * r;

export default function AnimatedLowercaseO({
  width = 80,
  height = 80,
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

  // Draw counter-clockwise, starting at top, flipped horizontally
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: PATH_LENGTH * (1 - progress.value),
    opacity: progress.value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18.429 18.429"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedCircle
        cx={cx}
        cy={cy}
        r={r}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={PATH_LENGTH}
        animatedProps={animatedProps}
        fill="none"
        transform={`rotate(-90 ${cx} ${cy}) scale(1 -1) translate(0, -18.429 )`}
      />
    </Svg>
  );
}
