import React from 'react';
import Svg, { Line } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedLine = Animated.createAnimatedComponent(Line);

const ANIMATION_DURATION = 1800;

// Stroke data from A.svg (with correct order and colors)
const strokes = [
  {
    // Left diagonal (red)
    x1: 14.584,
    y1: 1.25,
    x2: 1.25,
    y2: 34.708,
    color: '#d40000',
    length: 36, // approximate, adjust as needed
  },
  {
    // Right diagonal (orange)
    x1: 14.584,
    y1: 1.25,
    x2: 27.918,
    y2: 34.708,
    color: '#c97100',
    length: 36, // approximate, adjust as needed
  },
  {
    // Crossbar (pink)
    x1: 5.763,
    y1: 23.383,
    x2: 23.405,
    y2: 23.383,
    color: '#ff74b7',
    length: 17.642, // |23.405-5.763|, adjust as needed
  },
];

export default function AnimatedA({
  width = 140,
  height = 180,
}: {
  width?: number;
  height?: number;
}) {
  // Animation progress for each stroke
  const progress = React.useRef(strokes.map(() => useSharedValue(0))).current;

  React.useEffect(() => {
    let mounted = true;
    function animate() {
      progress.forEach((p) => (p.value = 0));
      // Animate each stroke in sequence
      function animateStroke(idx: number) {
        if (!mounted || idx >= strokes.length) {
          setTimeout(() => {
            if (mounted) animate();
          }, 600);
          return;
        }
        progress[idx].value = withTiming(
          1,
          {
            duration: ANIMATION_DURATION / strokes.length,
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

  // Animated props for each stroke
  const animatedPropsArr = strokes.map((stroke, i) =>
    useAnimatedProps(() => {
      const p = progress[i].value;
      return {
        strokeDashoffset: stroke.length * (1 - p),
        opacity: p === 0 ? 0 : 1,
      };
    })
  );

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 29.168 35.958"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Left diagonal */}
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
        animatedProps={animatedPropsArr[0]}
      />
      {/* Right diagonal */}
      <AnimatedLine
        x1={strokes[1].x1}
        y1={strokes[1].y1}
        x2={strokes[1].x2}
        y2={strokes[1].y2}
        stroke={strokes[1].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[1].length}
        animatedProps={animatedPropsArr[1]}
      />
      {/* Crossbar */}
      <AnimatedLine
        x1={strokes[2].x1}
        y1={strokes[2].y1}
        x2={strokes[2].x2}
        y2={strokes[2].y2}
        stroke={strokes[2].color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeDasharray={strokes[2].length}
        animatedProps={animatedPropsArr[2]}
      />
    </Svg>
  );
}
