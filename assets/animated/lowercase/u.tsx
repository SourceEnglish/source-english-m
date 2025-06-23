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

// SVG path and line from u.svg
const pathData =
  'M1.2,1.2v9.8c0,1.2.2,2.3.7,3.2.5.9,1.2,1.7,2.1,2.2.9.5,1.9.8,3,.8s2.2-.3,3.1-.8c.9-.5,1.6-1.3,2.1-2.2s.8-2,.8-3.2V1.2';

export default function AnimatedLowercaseU({
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
  const pathLength = 36;
  const lineLength = 20;

  const animatedProps1 = useAnimatedProps(() => ({
    strokeDashoffset: pathLength * (1 - progress[0].value),
    opacity: progress[0].value === 0 ? 0 : 1,
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    strokeDashoffset: lineLength * (1 - progress[1].value),
    opacity: progress[1].value === 0 ? 0 : 1,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14.4 18.5"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <AnimatedPath
        d={pathData}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        animatedProps={animatedProps1}
      />
      <AnimatedLine
        x1={13.1}
        y1={1.2}
        x2={13.1}
        y2={17.3}
        stroke={ANIMATED_LETTER_COLORS[0]}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={lineLength}
        animatedProps={animatedProps2}
      />
    </Svg>
  );
}
