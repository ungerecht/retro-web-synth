import React, { useState } from "react";

interface KnobProps {
  min: number;
  max: number;
  value: number;
  width: number;
  height: number;
  step: number;
  onValueChange: (value: number) => void;
}

const Knob = ({
  min,
  max,
  value,
  width,
  height,
  step,
  onValueChange,
}: KnobProps) => {
  const minAngle = 45;
  const maxAngle = 315;
  const smallestSide = Math.min(width, height);
  const [circleX] = useState(width / 2);
  const [circleY] = useState(height / 2);
  const [radius] = useState((smallestSide / 2) * 0.85);

  const onScroll = (event: any) => {
    let newValue;
    if (event.deltaY < 0) {
      //scrolling up

      if (value === max) return; //value is at max

      //scroll faster holding shift
      event.shiftKey
        ? (newValue = value + 4 * step)
        : (newValue = value + step);

      if (newValue > max) newValue = max; //set newValue to max if it went over

      onValueChange(newValue);
    } else {
      //scrolling down

      if (value === min) return; //value is at min

      //scroll faster holding shift
      event.shiftKey
        ? (newValue = value - 4 * step)
        : (newValue = value - step);

      if (newValue < min) newValue = min; //set newValue to min if it went over

      onValueChange(newValue);
    }
  };

  const valueToPercentage = (v: number, min: number, max: number) => {
    return ((v - min) * 100) / (max - min);
  };

  const percentageToValue = (percentage: number, min: number, max: number) => {
    return (percentage * (max - min)) / 100 + min;
  };

  // const cartesianToPolar = (x: number, y: number) => {
  //   return Math.round(
  //     Math.atan((y - circleY) / (x - circleX)) / (Math.PI / 180) +
  //       (x > circleX ? 270 : 90)
  //   );
  // };

  const polarToCartesian = (angle: number, radius: number) => {
    const a = ((angle - 270) * Math.PI) / 180.0;
    const x = circleX + radius * Math.cos(a);
    const y = circleY + radius * Math.sin(a);
    return { x, y };
  };

  const percentage = valueToPercentage(value, min, max);
  const angle = percentageToValue(percentage, minAngle, maxAngle);

  const endCoordinate = polarToCartesian(angle, radius - 7);

  const drawTickCoordinates = () => {
    let tcs = new Array(7);
    for (let i = 1; i < 8; i += 1) {
      tcs[i - 1] = polarToCartesian(i * 45, radius);
    }

    let s = "";
    for (let i = 0; i < tcs.length; i += 1) {
      s += `M${circleX} ${circleY} L ${tcs[i].x} ${tcs[i].y} `;
    }
    return s;
  };

  const tickLines: string = drawTickCoordinates();

  return (
    <svg
      width={width}
      height={height}
      onWheel={onScroll}
      className="knob-wheel"
    >
      <circle
        cx={circleX}
        cy={circleY}
        r={radius + 1}
        fill="#7f7f7f"
        stroke="black"
        strokeWidth={3}
      />
      <path
        stroke="white"
        strokeWidth={2}
        fill="none"
        d={tickLines}
        strokeLinecap="round"
      />
      <circle
        cx={circleX}
        cy={circleY}
        r={radius - 5}
        fill="#4c4c4c"
        stroke="black"
        strokeWidth={3}
      />
      <line
        stroke="black"
        strokeWidth={8}
        strokeLinecap="round"
        x1={circleX}
        y1={circleY}
        x2={endCoordinate.x}
        y2={endCoordinate.y}
      />
      <line
        stroke="white"
        strokeWidth={2}
        strokeLinecap="butt"
        x1={circleX}
        y1={circleY}
        x2={endCoordinate.x}
        y2={endCoordinate.y}
      />
    </svg>
  );
};

export default Knob;
