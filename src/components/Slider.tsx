import React, { MouseEvent, useEffect, useRef, useState } from "react";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  width: number;
  height: number;
  onValueChange: (value: number) => void;
}

const Slider = ({
  min,
  max,
  step,
  value,
  width,
  height,
  onValueChange,
}: SliderProps) => {
  const middle = width / 2;
  const trackWidth = 10;
  const trackHeight = height;
  const barWidth = 40;
  const barHeight = 12;
  const slider = useRef<SVGSVGElement>(null);

  const [isDragging, setIsDragging] = useState(false);

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
      onValueChange(newValue);
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

  const valueToPercentage = (v: number, min: number, max: number) => {
    return ((v - min) * 100) / (max - min);
  };

  const percentageToValue = (percentage: number, min: number, max: number) => {
    return (percentage * (max - min)) / 100 + min;
  };

  const getBarCoordinates = (value: number) => {
    const percentage = valueToPercentage(value, min, max);
    const x = middle;
    const y = percentageToValue(percentage, height - barHeight, 0);
    return { x, y };
  };

  const barCoordinates = getBarCoordinates(value);

  const drawTickCoordinates = () => {
    let tickY = new Array(7);
    for (let i = 0; i < tickY.length; i += 1) {
      tickY[i] = percentageToValue(
        valueToPercentage(i, 0, tickY.length - 1),
        barHeight / 2,
        height - barHeight / 2
      );
    }

    let s = "";
    for (let i = 0; i < tickY.length; i += 1) {
      s += `M${2} ${tickY[i]} L ${width - 2} ${tickY[i]} `;
    }
    return s;
  };

  const tickLines: string = drawTickCoordinates();

  const getValueFromMouseEvent = (event: MouseEvent) => {
    //get parent svg
    let parentSVG = event.target as Element;
    if (parentSVG.nodeName !== "svg") {
      parentSVG = parentSVG.parentNode as Element;
    }

    //get parent svg's bounding client rect - we need this to get the svg's position on the page
    let bounding = parentSVG.getBoundingClientRect();

    //calculate mouse y relative to the parent SVG
    let relativeY = event.clientY - bounding.y;

    //convert y coordinate to value
    let percentage = valueToPercentage(
      relativeY,
      100 - barHeight / 2,
      0 + barHeight / 2
    );
    let newValue = percentageToValue(percentage, min, max);

    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;

    return newValue;
  };

  const handleMouseDown = (event: MouseEvent) => {
    setIsDragging(true);
    let newValue = getValueFromMouseEvent(event);
    onValueChange(newValue);
  };

  const handleMouseUp = (event: MouseEvent) => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      let newValue = getValueFromMouseEvent(event);
      onValueChange(newValue);
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

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
      <path d={tickLines} stroke="white" strokeWidth={2} />
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

export default React.memo(Slider);
