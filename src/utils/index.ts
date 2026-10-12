import { RefObject } from "react";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~FilterDisplay functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const getXofFrequency = (freq: number, width: number) => {
  if (width <= 0) {
    throw new RangeError("width must be greater than 0");
  }
  let min_f = Math.log10(20);
  let max_f = Math.log10(20000);
  let range = max_f - min_f;
  return ((Math.log10(freq) - min_f) / range) * width;
};

export const getFrequencyOfX = (x: number, width: number) => {
  const min = 20;
  const max = 20000;
  return min * Math.pow(10, (x * Math.log10(max / min)) / width);
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
export const valueToPercentage = (value: number, min: number, max: number) => {
  return ((value - min) * 100) / (max - min);
};

export const percentageToValue = (
  percentage: number,
  min: number,
  max: number
) => {
  return (percentage * (max - min)) / 100 + min;
};

export const polarToCartesian = (
  angle: number,
  radius: number,
  circleX: number,
  circleY: number
) => {
  const a = ((angle - 270) * Math.PI) / 180.0;
  const x = circleX + radius * parseFloat(Math.cos(a).toFixed(3));
  const y = circleY + radius * parseFloat(Math.sin(a).toFixed(3));
  return { x, y };
};

export const cartesianToPolar = (
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

export const calculateKnobNewValue = (
  event: MouseEvent | TouchEvent,
  min: number,
  max: number,
  circleX: number,
  circleY: number,
  minAngle: number,
  maxAngle: number,
  bounding: DOMRect | undefined
) => {
  //initialize empty relative coords
  let relativeCoords = { x: 0, y: 0 };

  //if event is a MouseEvent
  if ("clientX" in event) {
    if (bounding)
      //calculate mouse coordinates relative to the parent SVG
      relativeCoords = {
        x: event.clientX - bounding.x,
        y: event.clientY - bounding.y,
      };
  } /*if event is a TouchEvent*/ else {
    if (bounding)
      //calculate mouse coordinates relative to the parent SVG
      relativeCoords = {
        x: event.touches[0].clientX - bounding.x,
        y: event.touches[0].clientY - bounding.y,
      };
  }
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
  event: MouseEvent | TouchEvent,
  min: number,
  max: number,
  barHeight: number,
  bounding: DOMRect | undefined
) => {
  let relativeY = 0;

  if ("clientY" in event) {
    if (bounding)
      //calculate mouse y relative to the parent SVG
      relativeY = event.clientY - bounding.y;
  } else {
    if (bounding) relativeY = event.touches[0].clientY - bounding.y;
  }

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
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Tooltip functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const markAsInteracting = (ref: RefObject<Element>, interacting: boolean) => {
  if (interacting) {
    document.body.classList.add("interacting");
    ref.current?.classList.add("dragging");
  } else {
    document.body.classList.remove("interacting");
    ref.current?.classList.remove("dragging");
  }
};
