import { MouseEvent, useEffect, useRef, useState, memo } from "react";
import { ControlProps } from "../types";
import {
  getBarCoordinates,
  calculateSliderNewValue,
  drawSliderTickCoordinates,
} from "../utils";

const Slider = ({
  min,
  max,
  step,
  value,
  width,
  height,
  onValueChange,
}: ControlProps) => {
  const middle = width / 2;
  const trackWidth = 10;
  const trackHeight = height;
  const barWidth = 40;
  const barHeight = 12;
  const barCoordinates = getBarCoordinates(
    value,
    middle,
    min,
    max,
    barHeight,
    height
  );

  const slider = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    let newValue = calculateSliderNewValue(event, min, max, barHeight);
    if (newValue !== value) {
      onValueChange(newValue);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      let newValue = calculateSliderNewValue(event, min, max, barHeight);
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
          ? (newValue = value + step * 4)
          : (newValue = value + step);

        if (newValue > max) newValue = max; //set newValue to max if it went over
      } else {
        //scrolling down

        if (value === min) return; //value is at min

        //scroll faster holding shift
        event.shiftKey
          ? (newValue = value - step * 4)
          : (newValue = value - step);

        if (newValue < min) newValue = min; //set newValue to min if it went over
      }
      if (newValue !== value) {
        onValueChange(newValue);
      }
    };

    if (slider) {
      const current = slider.current;
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
      ref={slider}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <path
        d={drawSliderTickCoordinates(barHeight, height, width)}
        stroke="white"
        strokeWidth={2}
      />
      <rect
        x={middle - trackWidth / 2}
        y={0}
        width={trackWidth}
        height={trackHeight}
        fill="black"
        rx={6}
      />
      <rect
        x={barCoordinates.x - barWidth / 2}
        y={barCoordinates.y}
        width={barWidth}
        height={barHeight}
        fill="black"
        rx={1}
      />
      <line
        stroke="white"
        strokeWidth={2}
        x1={barCoordinates.x - barWidth / 2 + 2}
        y1={barCoordinates.y + barHeight / 2}
        x2={barCoordinates.x + barWidth / 2 - 2}
        y2={barCoordinates.y + barHeight / 2}
      />
    </svg>
  );
};

export default memo(Slider);
