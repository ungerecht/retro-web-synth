import React from "react";
import Knob from "./Knob";
import "../styles/EQ3Controls.css";

interface EQ3Props {
  eq3: {
    low: number;
    mid: number;
    high: number;
    lowFrequency: number;
    highFrequency: number;
  };
  setEQ3Low: (value: number) => void;
  setEQ3Mid: (value: number) => void;
  setEQ3High: (value: number) => void;
  setEQ3LowFrequency: (value: number) => void;
  setEQ3HighFrequency: (value: number) => void;
}

const EQ3Controls = ({
  eq3,
  setEQ3Low,
  setEQ3Mid,
  setEQ3High,
  setEQ3LowFrequency,
  setEQ3HighFrequency,
}: EQ3Props) => {
  return (
    <div className="control-container EQ3-container">
      <label className="unselectable title-big">EQUALIZER</label>
      <div className="row justify-between">
        <div className="column">
          <label className="unselectable title-small">Low</label>
          <Knob
            min={-60}
            max={6}
            value={eq3.low}
            onValueChange={setEQ3Low}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3.low}db`}</p>
        </div>
        <div className="column">
          <label className="unselectable title-small">Mid</label>
          <Knob
            min={-60}
            max={6}
            value={eq3.mid}
            onValueChange={setEQ3Mid}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3.mid}db`}</p>
        </div>
        <div className="column">
          <label className="unselectable title-small">High</label>
          <Knob
            min={-60}
            max={6}
            value={eq3.high}
            onValueChange={setEQ3High}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3.high}db`}</p>
        </div>
      </div>
      <div className="row justify-between">
        <div className="column eq-freq-knob">
          <label className="unselectable title-small">FreqLow</label>
          <Knob
            min={50}
            max={5000}
            value={eq3.lowFrequency}
            onValueChange={setEQ3LowFrequency}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3.lowFrequency}hz`}</p>
        </div>
        <div className="column eq-freq-knob">
          <label className="unselectable title-small">FreqHigh</label>
          <Knob
            min={200}
            max={18000}
            value={eq3.highFrequency}
            onValueChange={setEQ3HighFrequency}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3.highFrequency}hz`}</p>
        </div>
      </div>
    </div>
  );
};

export default EQ3Controls;
