import React, { useState } from "react";
import { sineIcon, squareIcon, triangleIcon, sawtoothIcon } from "../icons";
import "../styles/WaveformSwitch.css";

const WaveformSwitch = () => {
  const [selected, setSelected] = useState("sine");

  const onValueChange = (event: any) => {
    setSelected(event.target.value);
  };

  console.log(selected);

  return (
    <div className="waveform-switch-container">
      <label>WAVEFORM</label>
      <div className="waveform-switch">
        <input
          type="radio"
          value="sine"
          id="sine"
          checked={selected === "sine"}
          onChange={onValueChange}
        />
        <label className="radio-icon" htmlFor="sine">
          {sineIcon}
        </label>
        <input
          type="radio"
          value="square"
          id="square"
          checked={selected === "square"}
          onChange={onValueChange}
        />
        <label className="radio-icon" htmlFor="square">
          {squareIcon}
        </label>
        <input
          type="radio"
          value="triangle"
          id="triangle"
          checked={selected === "triangle"}
          onChange={onValueChange}
        />
        <label className="radio-icon" htmlFor="triangle">
          {triangleIcon}
        </label>
        <input
          type="radio"
          value="sawtooth"
          id="sawtooth"
          checked={selected === "sawtooth"}
          onChange={onValueChange}
        />
        <label className="radio-icon" htmlFor="sawtooth">
          {sawtoothIcon}
        </label>
      </div>
    </div>
  );
};

export default WaveformSwitch;
