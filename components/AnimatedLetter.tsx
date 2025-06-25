import React from 'react';
import { View } from 'react-native';
import Svg, { Line, Path, Circle, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// Types for strokes
type LineStroke = {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  length: number;
  [key: string]: any;
};
type PathStroke = {
  type: 'path';
  d: string;
  color: string;
  length: number;
  [key: string]: any;
};
type CircleStroke = {
  type: 'circle';
  cx: number;
  cy: number;
  r: number;
  color: string;
  length: number;
  rotation?: number;
  transform?: string; // For rotation/translation

  [key: string]: any;
};
export type Stroke = LineStroke | PathStroke | CircleStroke;

const viewBox = '0 0 44 36'; // Default viewBox for the SVG
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type AnimatedLetterProps = {
  strokes: Stroke[];
  durations: number[]; // ms for each stroke
  width?: number;
  height?: number;
  viewBox?: string;
  style?: any;
  svgProps?: any;
  letter?: string;
};

export default function AnimatedLetter({
  strokes,
  durations,
  width = 100,
  height = 100,
  style,
  svgProps,
}: AnimatedLetterProps) {
  // One sharedValue per stroke
  const progress = React.useRef(strokes.map(() => useSharedValue(0))).current;

  React.useEffect(() => {
    let mounted = true;
    function animate() {
      progress.forEach((p) => (p.value = 0));
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
            duration: durations[idx] ?? 1000,
            easing: Easing.linear,
          },
          () => {
            if (mounted) animateStroke(idx + 1);
          }
        );
      }
      animateStroke(0);
    }
    animate();
    return () => {
      mounted = false;
    };
  }, [progress, strokes, durations]);

  // Use viewBox from props or default
  let vbArr = (svgProps?.viewBox || viewBox).split(' ').map(Number);
  let viewBoxHeight = vbArr[3];
  let viewBoxWidth = vbArr[2];

  // Compute minY and maxY from all strokes
  let minY = Infinity,
    maxY = -Infinity;
  strokes.forEach((stroke) => {
    if (stroke.type === 'line') {
      minY = Math.min(minY, stroke.y1, stroke.y2);
      maxY = Math.max(maxY, stroke.y1, stroke.y2);
    } else if (stroke.type === 'circle') {
      minY = Math.min(minY, stroke.cy - stroke.r);
      maxY = Math.max(maxY, stroke.cy + stroke.r);
    } else if (stroke.type === 'path') {
      // Path: skip for now, or parse path for bounds if needed
    }
  });
  if (!isFinite(minY) || !isFinite(maxY)) {
    minY = 0;
    maxY = viewBoxHeight;
  }
  const drawingHeight = maxY - minY;
  const drawingWidth = viewBoxWidth;
  // Always align to bottom
  const offsetY = viewBoxHeight - drawingHeight - minY;

  // Animated props for each stroke
  const animatedPropsArr = strokes.map((stroke, i) => {
    if (stroke.type === 'circle') {
      // Animate strokeDashoffset for circle, allow for optional rotation/transform
      return useAnimatedProps(() => ({
        strokeDashoffset: stroke.length * (1 - progress[i].value),
        opacity: progress[i].value === 0 ? 0 : 1,
      }));
    } else if (stroke.type === 'line') {
      return useAnimatedProps(() => ({
        strokeDashoffset: stroke.length * (1 - progress[i].value),
        opacity: progress[i].value === 0 ? 0 : 1,
      }));
    } else if (stroke.type === 'path') {
      return useAnimatedProps(() => ({
        strokeDashoffset: stroke.length * (1 - progress[i].value),
        opacity: progress[i].value === 0 ? 0 : 1,
      }));
    }
    return undefined;
  });

  return (
    <View style={[{ width, height, position: 'relative' }, style]}>
      <Svg
        width={width}
        height={height}
        viewBox={vbArr.join(' ')}
        fill="none"
        {...svgProps}
      >
        <G transform={`translate(0, ${offsetY})`}>
          {/* Static light gray background strokes */}
          {strokes.map((stroke, i) => {
            if (stroke.type === 'line') {
              const { transform, ...restStroke } = stroke;
              return (
                <Line
                  key={`bg-line-${i}`}
                  x1={stroke.x1}
                  y1={stroke.y1}
                  x2={stroke.x2}
                  y2={stroke.y2}
                  stroke="#e0e0e0"
                  strokeWidth={stroke.strokeWidth ?? 2.5}
                  strokeLinecap={stroke.strokeLinecap ?? 'round'}
                  strokeMiterlimit={stroke.strokeMiterlimit ?? 10}
                  strokeDasharray={stroke.length}
                  fill="none"
                  {...(transform ? { transform } : {})}
                />
              );
            }
            if (stroke.type === 'path') {
              const { transform, ...restStroke } = stroke;
              return (
                <Path
                  key={`bg-path-${i}`}
                  d={stroke.d}
                  stroke="#e0e0e0"
                  strokeWidth={stroke.strokeWidth ?? 2.5}
                  strokeLinecap={stroke.strokeLinecap ?? 'round'}
                  strokeMiterlimit={stroke.strokeMiterlimit ?? 10}
                  strokeDasharray={stroke.length}
                  fill="none"
                  {...(transform ? { transform } : {})}
                />
              );
            }
            if (stroke.type === 'circle') {
              const { transform, ...restStroke } = stroke;
              return (
                <Circle
                  key={`bg-circle-${i}`}
                  cx={stroke.cx}
                  cy={stroke.cy}
                  r={stroke.r}
                  stroke="#e0e0e0"
                  strokeWidth={stroke.strokeWidth ?? 2.5}
                  strokeLinecap={stroke.strokeLinecap ?? 'round'}
                  strokeMiterlimit={stroke.strokeMiterlimit ?? 10}
                  strokeDasharray={stroke.length}
                  fill="none"
                  {...(transform ? { transform } : {})}
                />
              );
            }
            return null;
          })}
          {/* Animated strokes */}
          {strokes.map((stroke, i) => {
            if (stroke.type === 'line') {
              const { transform, ...restStroke } = stroke;
              return (
                <AnimatedLine
                  key={i}
                  x1={stroke.x1}
                  y1={stroke.y1}
                  x2={stroke.x2}
                  y2={stroke.y2}
                  stroke={stroke.color}
                  strokeWidth={stroke.strokeWidth ?? 2.5}
                  strokeLinecap={stroke.strokeLinecap ?? 'round'}
                  strokeMiterlimit={stroke.strokeMiterlimit ?? 10}
                  strokeDasharray={stroke.length}
                  animatedProps={animatedPropsArr[i]}
                  {...(transform ? { transform } : {})}
                />
              );
            }
            if (stroke.type === 'path') {
              const { transform, ...restStroke } = stroke;
              return (
                <AnimatedPath
                  key={i}
                  d={stroke.d}
                  stroke={stroke.color}
                  strokeWidth={stroke.strokeWidth ?? 2.5}
                  strokeLinecap={stroke.strokeLinecap ?? 'round'}
                  strokeMiterlimit={stroke.strokeMiterlimit ?? 10}
                  strokeDasharray={stroke.length}
                  animatedProps={animatedPropsArr[i]}
                  fill="none"
                  {...(transform ? { transform } : {})}
                />
              );
            }
            if (stroke.type === 'circle') {
              const { transform, ...restStroke } = stroke;
              return (
                <AnimatedCircle
                  key={i}
                  cx={stroke.cx}
                  cy={stroke.cy}
                  r={stroke.r}
                  stroke={stroke.color}
                  strokeWidth={stroke.strokeWidth ?? 2.5}
                  strokeLinecap={stroke.strokeLinecap ?? 'round'}
                  strokeMiterlimit={stroke.strokeMiterlimit ?? 10}
                  strokeDasharray={stroke.length}
                  animatedProps={animatedPropsArr[i]}
                  fill="none"
                  {...(transform ? { transform } : {})}
                />
              );
            }
            return null;
          })}
        </G>
      </Svg>
    </View>
  );
}
