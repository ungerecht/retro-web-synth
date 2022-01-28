import React from "react";
import { WAVEFORMS } from "../globals/constants";
import Button from "./Button";
import "../styles/WaveformSwitch.css";

interface WaveformProps {
  waveform: OscillatorType;
  setWaveform: (type: OscillatorType) => void;
}

const WaveformSwitch = ({ waveform, setWaveform }: WaveformProps) => {
  const onValueChange = (event: any) => {
    setWaveform(event.target.value);
  };

  const renderWaveformButtons = WAVEFORMS.map((wf, i) => {
    return (
      <Button
        key={i}
        value={wf}
        selected={waveform}
        width={26}
        height={26}
        onValueChange={onValueChange}
      />
    );
  });

  return (
    <div className="control-container waveform-container">
      <label className="unselectable title-big">WAVEFORM</label>
      <div
        className="row justify-center"
        style={{ display: "grid", gridTemplateColumns: "34px 34px" }}
      >
        {renderWaveformButtons}
      </div>
    </div>
  );
};

export default WaveformSwitch;
