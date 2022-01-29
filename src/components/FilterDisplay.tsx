import React, { useRef } from "react";
import { Filter } from "tone";

import "../styles/FilterDisplay.css";

interface FilterDisplayProps {
  filter: Filter;
}

const FilterDisplay = ({ filter }: FilterDisplayProps) => {
  const getXofFrequency = (freq: number) => {
    return width * Math.sqrt((freq - 20) / (20000 - 20));
  };

  const width = 256;
  const height = 150;

  const response = filter.getFrequencyResponse(width);
  const canvas = useRef<HTMLCanvasElement>(null);
  const context = canvas.current?.getContext("2d");
  const middle = height / 2;
  const dbScale = 40;
  const pixelsPerDb = middle / dbScale;

  const dbToY = (db: number) => {
    return middle - pixelsPerDb * db;
  };

  if (context) {
    //draw box
    context.imageSmoothingEnabled = false;
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    //draw frequency scale
    context.lineWidth = 1;
    context.strokeStyle = "gray";
    context.beginPath();
    for (let i = 100; i <= 10000; i = i * 10) {
      const freqX = getXofFrequency(i);
      context.moveTo(freqX, 0);
      context.lineTo(freqX, height - 12);
      context.stroke();

      let unit = "Hz";
      let value = i;
      if (i >= 1000) {
        value = value / 1000;
        unit = "KHz";
      }
      context.font = "9px Helvetica";
      context.fillStyle = "lightgray";
      context.textAlign = "center";
      context.fillText(value + unit, freqX, height - 3);
    }

    // //draw dbScale
    context.lineWidth = 1;
    context.strokeStyle = "gray";
    context.beginPath();
    for (let i = -dbScale + 10; i < dbScale; i = i + 10) {
      let y = dbToY(i);
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    //draw frequency response graph
    context.strokeStyle = "cyan";
    context.lineWidth = 2;
    context.beginPath();

    for (let i = 0; i < width; i++) {
      const db = (20 * Math.log(response[i])) / Math.LN10;
      context.lineTo(i, dbToY(db));
    }
    context.stroke();
  }

  return (
    <div className="filter-display-container">
      <canvas ref={canvas} width={width} height={height} />
    </div>
  );
};

export default FilterDisplay;
