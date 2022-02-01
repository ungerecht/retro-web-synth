import React from "react";
import Knob from "./Knob";
import "../styles/EQ3Controls.css";

interface EQ3Props {
  eq3Options: {
    low: number;
    mid: number;
    high: number;
    lowFrequency: number;
    highFrequency: number;
  };
  setEQ3Option: (
    value: number,
    target: "low" | "mid" | "high" | "lowFrequency" | "highFrequency"
  ) => void;
}

const EQ3Controls = ({ eq3Options, setEQ3Option }: EQ3Props) => {
  console.log("render eq");
  return (
    <div className="control-container EQ3-container">
      <label className="unselectable title-big">EQUALIZER</label>
      <div className="row justify-between">
        <div className="column">
          <label className="unselectable title-small">Low</label>
          <Knob
            min={-60}
            max={6}
            value={eq3Options.low}
            onValueChange={(value) => {
              setEQ3Option(value, "low");
            }}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3Options.low}db`}</p>
        </div>
        <div className="column">
          <label className="unselectable title-small">Mid</label>
          <Knob
            min={-60}
            max={6}
            value={eq3Options.mid}
            onValueChange={(value) => {
              setEQ3Option(value, "mid");
            }}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3Options.mid}db`}</p>
        </div>
        <div className="column">
          <label className="unselectable title-small">High</label>
          <Knob
            min={-60}
            max={6}
            value={eq3Options.high}
            onValueChange={(value) => {
              setEQ3Option(value, "high");
            }}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3Options.high}db`}</p>
        </div>
      </div>
      <div className="row justify-between">
        <div className="column eq-freq-knob">
          <label className="unselectable title-small">FreqLow</label>
          <Knob
            min={50}
            max={5000}
            value={eq3Options.lowFrequency}
            onValueChange={(value) => {
              setEQ3Option(value, "lowFrequency");
            }}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3Options.lowFrequency}hz`}</p>
        </div>
        <div className="column eq-freq-knob">
          <label className="unselectable title-small">FreqHigh</label>
          <Knob
            min={200}
            max={18000}
            value={eq3Options.highFrequency}
            onValueChange={(value) => {
              setEQ3Option(value, "highFrequency");
            }}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${eq3Options.highFrequency}hz`}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EQ3Controls);
