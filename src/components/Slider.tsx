import React from "react";
import "../styles/Slider.css";

interface SliderProps {
  label: string;
  max: number;
  value: number;
  setEnvelope: (value: number, label: string) => void;
}

const Slider = ({ label, max, value, setEnvelope }: SliderProps) => {
  const onValueChange = (event: any) => {
    setEnvelope(parseFloat(event.target.value), label);
  };

  return (
    <div className="slider-container">
      <label>{label}</label>
      <input
        className="slider"
        type="range"
        min={0}
        max={max}
        step={0.001}
        defaultValue={value}
        onChange={onValueChange}
      />
    </div>
  );
};

export default Slider;
