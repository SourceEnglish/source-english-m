import React from 'react';
import Svg, { Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const ANIMATION_DURATION = 900;

const strokes = [
  {
    // Main vertical (blue)
    x1: 1.25,
    y1: 1.25,
    x2: 1.25,
    y2: 34.612,
    color: ANIMATED_LETTER_COLORS[0],
    length: 34.612 - 1.25,
  },
];

export default function AnimatedLowercaseL({
  width = 16,
  height = 100,
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
        () => {
          if (mounted) setTimeout(animate, 500);
        }
      );
    }
    animate();
    return () => {
      mounted = false;
    };
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: strokes[0].length * (1 - progress.value),
    opacity: progress.value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 2.5 35.862"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedLine
        x1={strokes[0].x1}
        y1={strokes[0].y1}
        x2={strokes[0].x2}
        y2={strokes[0].y2}
        stroke={strokes[0].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[0].length}
        animatedProps={animatedProps}
      />
    </Svg>
  );
}
