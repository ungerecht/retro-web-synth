import { MouseEvent, useEffect, useRef, useState, memo } from "react";
import { ControlProps } from "../types";
import {
  getEndCoordinates,
  calculateKnobNewValue,
  drawKnobTickCoordinates,
} from "../utils";

const Knob = ({
  min,
  max,
  value,
  width,
  height,
  step,
  onValueChange,
}: ControlProps) => {
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
    let newValue = calculateKnobNewValue(
      event,
      min,
      max,
      circleX,
      circleY,
      minAngle,
      maxAngle
    );
    if (newValue !== value) {
      onValueChange(newValue);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      let newValue = calculateKnobNewValue(
        event,
        min,
        max,
        circleX,
        circleY,
        minAngle,
        maxAngle
      );
      if (newValue !== value) {
        onValueChange(newValue);
      }
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
      } else {
        //scrolling down

        if (value === min) return; //value is at min

        //scroll faster holding shift
        event.shiftKey
          ? (newValue = value - 4 * step)
          : (newValue = value - step);

        if (newValue < min) newValue = min; //set newValue to min if it went over
      }
      if (newValue !== value) {
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
        d={drawKnobTickCoordinates(radius, circleX, circleY)}
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

export default memo(Knob);
