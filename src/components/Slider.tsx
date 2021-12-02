import React from "react";
import "../styles/Slider.css";

interface SliderProps {
  label: string;
}

const Slider = ({ label }: SliderProps) => {
  return (
    <div className="slider-container">
      <label>{label}</label>
      <input className="slider" type="range"></input>
    </div>
  );
};

export default Slider;
