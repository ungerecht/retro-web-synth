import React from "react";
import { sineIcon, squareIcon, triangleIcon, sawtoothIcon } from "../icons";
import "../styles/WaveformSwitch.css";

interface WaveformProps {
  waveform: OscillatorType;
  setWaveform: (type: OscillatorType) => void;
}

const WaveformSwitch = ({ waveform, setWaveform }: WaveformProps) => {
  const onValueChange = (event: any) => {
    setWaveform(event.target.value);
  };

  return (
    <div className="waveform-switch-container">
      <label>WAVEFORM</label>
      <div className="waveform-switch">
        <input
          type="radio"
          value="sine"
          id="sine"
          checked={waveform === "sine"}
          onChange={onValueChange}
        />
        <label className="radio-icon" htmlFor="sine">
          {sineIcon}
        </label>
        <input
          type="radio"
          value="square"
          id="square"
          checked={waveform === "square"}
          onChange={onValueChange}
        />
        <label className="radio-icon" htmlFor="square">
          {squareIcon}
        </label>
        <input
          type="radio"
          value="triangle"
          id="triangle"
          checked={waveform === "triangle"}
          onChange={onValueChange}
        />
        <label className="radio-icon" htmlFor="triangle">
          {triangleIcon}
        </label>
        <input
          type="radio"
          value="sawtooth"
          id="sawtooth"
          checked={waveform === "sawtooth"}
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
