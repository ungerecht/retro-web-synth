import { MouseEvent } from "react";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FilterDisplay functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const getXofFrequency = (freq: number, width: number) => {
  return width * Math.sqrt((freq - 20) / (20000 - 20));
};

export const dbToY = (db: number, middle: number, pixelsPerDb: number) => {
  return middle - pixelsPerDb * db;
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Key functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const keyIsPressed = (
  note: string,
  octave: number,
  notesPlaying: string[]
) => {
  return notesPlaying.includes(`${note}${octave}`);
};

export const keyIsSharp = (note: string) => {
  return note.length > 1;
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Knob and Slider functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

export const drawKnobTickCoordinates = (
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

export const drawSliderTickCoordinates = (
  barHeight: number,
  height: number,
  width: number
) => {
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

export const getEndCoordinates = (
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

export const getBarCoordinates = (
  value: number,
  middle: number,
  min: number,
  max: number,
  barHeight: number,
  height: number
) => {
  const percentage = valueToPercentage(value, min, max);
  const x = middle;
  const y = percentageToValue(percentage, height - barHeight, 0);
  return { x, y };
};

const getParentSVG = (event: MouseEvent) => {
  let parentSVG = event.target as Element;
  if (parentSVG.nodeName !== "svg") {
    parentSVG = parentSVG.parentNode as Element;
  }
  return parentSVG;
};

export const calculateKnobNewValue = (
  event: MouseEvent,
  min: number,
  max: number,
  circleX: number,
  circleY: number,
  minAngle: number,
  maxAngle: number
) => {
  //get parent svg
  const parentSVG = getParentSVG(event);

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

  //convert polar angle to value
  let percentage = valueToPercentage(polar, minAngle, maxAngle);
  let newValue = percentageToValue(percentage, min, max);

  if (newValue > max) newValue = max;
  if (newValue < min) newValue = min;
  return newValue;
};

export const calculateSliderNewValue = (
  event: MouseEvent,
  min: number,
  max: number,
  barHeight: number
) => {
  //get parent svg
  const parentSVG = getParentSVG(event);

  //get parent svg's bounding client rect - we only need this to get the svg's position on the page
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
