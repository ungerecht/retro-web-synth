import React from "react";
import { WAVEFORMS } from "../globals/constants";
import * as Icons from "../icons";
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
      <React.Fragment key={i}>
        <input
          type="radio"
          value={wf}
          id={wf}
          checked={wf === waveform}
          onChange={onValueChange}
        />
        <label className="radio-icon" htmlFor={wf}>
          {Icons[wf as keyof typeof Icons]}
        </label>
      </React.Fragment>
    );
  });

  return (
    <div className="waveform-switch-container">
      <label>WAVEFORM</label>
      <div className="waveform-switch">{renderWaveformButtons}</div>
    </div>
  );
};

export default WaveformSwitch;
