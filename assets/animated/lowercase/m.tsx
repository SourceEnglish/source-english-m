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

const ANIMATION_DURATION = 1300;

const pathData1 =
  'M1.25,17.268V7.49c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778';
const pathData2 =
  'M13.139,17.268V7.49c0-1.21.261-2.284.783-3.222.522-.938,1.237-1.675,2.144-2.212.908-.537,1.943-.806,3.108-.806,1.134,0,2.144.268,3.029.806.885.537,1.577,1.274,2.076,2.212.499.938.749,2.012.749,3.222v9.778';

export default function AnimatedLowercaseM({
  width = 70,
  height = 70,
}: {
  width?: number;
  height?: number;
}) {
  const progress = React.useRef([
    useSharedValue(0),
    useSharedValue(0),
    useSharedValue(0),
  ]).current;

  React.useEffect(() => {
    let mounted = true;
    function animate() {
      progress.forEach((p) => (p.value = 0));
      function animateStroke(idx: number) {
        if (!mounted || idx >= 3) {
          setTimeout(() => {
            if (mounted) animate();
          }, 500);
          return;
        }
        progress[idx].value = withTiming(
          1,
          {
            duration: ANIMATION_DURATION / 3,
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

  // Approximate path lengths
  const pathLength1 = 38;
  const pathLength2 = 38;
  const lineLength = 34;

  const animatedProps1 = useAnimatedProps(() => ({
    strokeDashoffset: pathLength1 * (1 - progress[0].value),
    opacity: progress[0].value === 0 ? 0 : 1,
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    strokeDashoffset: pathLength2 * (1 - progress[1].value),
    opacity: progress[1].value === 0 ? 0 : 1,
  }));
  const animatedProps3 = useAnimatedProps(() => ({
    strokeDashoffset: lineLength * (1 - progress[2].value),
    opacity: progress[2].value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 26.278 18.518"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Draw the leftmost vertical line first */}
      <AnimatedLine
        x1={1.25}
        y1={1.251}
        x2={1.25}
        y2={17.268}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={lineLength}
        animatedProps={animatedProps1}
      />
      <AnimatedPath
        d={pathData1}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={pathLength1}
        animatedProps={animatedProps2}
      />
      <AnimatedPath
        d={pathData2}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={pathLength2}
        animatedProps={animatedProps3}
      />
    </Svg>
  );
}
