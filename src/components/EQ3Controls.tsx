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
    <div className="EQ3-controls-container">
      <label className="unselectable">EQUALIZER</label>
      <div className="EQ3-knobs-container">
        <div className="EQ3-gain-knobs">
          <div className="EQ3-low-knob">
            <label className="unselectable">LOW</label>
            <Knob
              min={-60}
              max={6}
              value={eq3.low}
              onValueChange={setEQ3Low}
              width={50}
              height={50}
              step={1}
            />
            <p className="unselectable">{`${eq3.low}db`}</p>
          </div>
          <div className="EQ3-mid-knob">
            <label className="unselectable">MID</label>
            <Knob
              min={-60}
              max={6}
              value={eq3.mid}
              onValueChange={setEQ3Mid}
              width={50}
              height={50}
              step={1}
            />
            <p className="unselectable">{`${eq3.mid}db`}</p>
          </div>
          <div className="EQ3-high-knob">
            <label className="unselectable">HIGH</label>
            <Knob
              min={-60}
              max={6}
              value={eq3.high}
              onValueChange={setEQ3High}
              width={50}
              height={50}
              step={1}
            />
            <p className="unselectable">{`${eq3.high}db`}</p>
          </div>
        </div>
        <div className="EQ3-frequency-knobs">
          <div className="EQ3-lowFrequency-knob">
            <label className="unselectable">FREQLOW</label>
            <Knob
              min={50}
              max={5000}
              value={eq3.lowFrequency}
              onValueChange={setEQ3LowFrequency}
              width={50}
              height={50}
              step={1}
            />
            <p className="unselectable">{`${eq3.lowFrequency}hz`}</p>
          </div>
          <div className="EQ3-highFrequency-knob">
            <label className="unselectable">FREQHIGH</label>
            <Knob
              min={200}
              max={18000}
              value={eq3.highFrequency}
              onValueChange={setEQ3HighFrequency}
              width={50}
              height={50}
              step={1}
            />
            <p className="unselectable">{`${eq3.highFrequency}hz`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EQ3Controls;
