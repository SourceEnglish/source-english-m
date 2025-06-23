import React from 'react';
import Svg, { Path, Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ANIMATED_LETTER_COLORS } from '@/constants/constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const ANIMATION_DURATION = 900;

const pathData =
  'M1.25,17.267V7.489c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778';

export default function AnimatedLowercaseN({
  width = 50,
  height = 70,
}: {
  width?: number;
  height?: number;
}) {
  const progress = React.useRef([useSharedValue(0), useSharedValue(0)]).current;

  React.useEffect(() => {
    let mounted = true;
    function animate() {
      progress.forEach((p) => (p.value = 0));
      function animateStroke(idx: number) {
        if (!mounted || idx >= 2) {
          setTimeout(() => {
            if (mounted) animate();
          }, 500);
          return;
        }
        progress[idx].value = withTiming(
          1,
          {
            duration: ANIMATION_DURATION / 2,
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

  // Approximate path/line lengths
  const pathLength = 42;
  const lineLength = 32;

  const animatedProps1 = useAnimatedProps(() => ({
    strokeDashoffset: lineLength * (1 - progress[0].value),
    opacity: progress[0].value === 0 ? 0 : 1,
  }));

  const animatedProps2 = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress[1].value),
    opacity: progress[1].value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14.388 18.517"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedLine
        x1={1.25}
        y1={1.25}
        x2={1.25}
        y2={17.267}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={lineLength}
        animatedProps={animatedProps1}
      />
      <AnimatedPath
        d={pathData}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        animatedProps={animatedProps2}
      />
    </Svg>
  );
}
