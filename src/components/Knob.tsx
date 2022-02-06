import React, { MouseEvent, useEffect, useRef, useState } from "react";

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
  const circleX = width / 2;
  const circleY = height / 2;
  const radius = (smallestSide / 2) * 0.85;
  const endCoordinates = getEndCoordinates(
    value,
    min,
    max,
    minAngle,
    maxAngle,
    radius,
    circleX,
    circleY
  );

  const knob = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    let newValue = getValueFromMouseEvent(
      event,
      circleX,
      circleY,
      min,
      max,
      minAngle,
      maxAngle
    );
    onValueChange(newValue);
  };

  const handleMouseUp = (event: MouseEvent) => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      let newValue = getValueFromMouseEvent(
        event,
        circleX,
        circleY,
        min,
        max,
        minAngle,
        maxAngle
      );
      onValueChange(newValue);
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
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

    if (knob) {
      const current = knob.current;
      if (current) {
        current.addEventListener("wheel", handleWheel);

        return () => {
          current.removeEventListener("wheel", handleWheel);
        };
      }
    }
  }, [min, max, onValueChange, step, value]);

  return (
    <svg
      width={width}
      height={height}
      ref={knob}
      className="knob-wheel"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
        d={drawTickCoordinates(radius, circleX, circleY)}
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
        x2={endCoordinates.x}
        y2={endCoordinates.y}
      />
      <line
        stroke="white"
        strokeWidth={2}
        strokeLinecap="butt"
        x1={circleX}
        y1={circleY}
        x2={endCoordinates.x}
        y2={endCoordinates.y}
      />
    </svg>
  );
};

const valueToPercentage = (v: number, min: number, max: number) => {
  return ((v - min) * 100) / (max - min);
};

const percentageToValue = (percentage: number, min: number, max: number) => {
  return (percentage * (max - min)) / 100 + min;
};

const polarToCartesian = (
  angle: number,
  radius: number,
  circleX: number,
  circleY: number
) => {
  const a = ((angle - 270) * Math.PI) / 180.0;
  const x = circleX + radius * Math.cos(a);
  const y = circleY + radius * Math.sin(a);
  return { x, y };
};

const cartesianToPolar = (
  x: number,
  y: number,
  circleX: number,
  circleY: number
) => {
  return Math.round(
    Math.atan((y - circleY) / (x - circleX)) / (Math.PI / 180) +
      (x >= circleX ? 270 : 90)
  );
};

const drawTickCoordinates = (
  radius: number,
  circleX: number,
  circleY: number
) => {
  let tcs = new Array(7);
  for (let i = 1; i < 8; i += 1) {
    tcs[i - 1] = polarToCartesian(i * 45, radius, circleX, circleY);
  }
  let s = "";
  for (let i = 0; i < tcs.length; i += 1) {
    s += `M${circleX} ${circleY} L ${tcs[i].x} ${tcs[i].y} `;
  }

  return s;
};

const getEndCoordinates = (
  value: number,
  min: number,
  max: number,
  minAngle: number,
  maxAngle: number,
  radius: number,
  circleX: number,
  circleY: number
) => {
  const percentage = valueToPercentage(value, min, max);
  const angle = percentageToValue(percentage, minAngle, maxAngle);
  return polarToCartesian(angle, radius - 7, circleX, circleY);
};

const getValueFromMouseEvent = (
  event: MouseEvent,
  circleX: number,
  circleY: number,
  min: number,
  max: number,
  minAngle: number,
  maxAngle: number
) => {
  //get parent svg
  let parentSVG = event.target as Element;
  if (parentSVG.nodeName !== "svg") {
    parentSVG = parentSVG.parentNode as Element;
  }

  //get parent svg's bounding client rect - we only need this to get the svg's position on the page
  let bounding = parentSVG.getBoundingClientRect();

  //calculate mouse coordinates relative to the parent SVG
  let relativeCoords = {
    x: event.clientX - bounding.x,
    y: event.clientY - bounding.y,
  };

  //convert relative mouse coordinates to polar angle
  let polar = cartesianToPolar(
    relativeCoords.x,
    relativeCoords.y,
    circleX,
    circleY
  );
  if (polar > maxAngle) polar = maxAngle;
  if (polar < minAngle) polar = minAngle;

  //convert polar angle to value
  let percentage = valueToPercentage(polar, minAngle, maxAngle);
  return percentageToValue(percentage, min, max);
};

export default React.memo(Knob);
