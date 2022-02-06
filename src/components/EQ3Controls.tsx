import React, { useCallback } from "react";
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
  const handleLowChange = useCallback(
    (value: number) => {
      setEQ3Option(value, "low");
    },
    [setEQ3Option]
  );
  const handleMidChange = useCallback(
    (value: number) => {
      setEQ3Option(value, "mid");
    },
    [setEQ3Option]
  );
  const handleHighChange = useCallback(
    (value: number) => {
      setEQ3Option(value, "high");
    },
    [setEQ3Option]
  );
  const handleLowFrequencyChange = useCallback(
    (value: number) => {
      setEQ3Option(value, "lowFrequency");
    },
    [setEQ3Option]
  );
  const handleHighFrequencyChange = useCallback(
    (value: number) => {
      setEQ3Option(value, "highFrequency");
    },
    [setEQ3Option]
  );
  return (
    <div className="control-container EQ3-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">EQUALIZER</label>
        </div>
      </div>
      <div className="row justify-between">
        <div className="column hasTooltip">
          <Knob
            min={-60}
            max={6}
            value={eq3Options.low}
            onValueChange={handleLowChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">Low</label>
          <span className="tooltip unselectable value">{`${Math.round(
            eq3Options.low
          )}db`}</span>
        </div>
        <div className="column hasTooltip">
          <Knob
            min={-60}
            max={6}
            value={eq3Options.mid}
            onValueChange={handleMidChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">Mid</label>
          <span className="tooltip unselectable value">{`${Math.round(
            eq3Options.mid
          )}db`}</span>
        </div>
        <div className="column hasTooltip">
          <Knob
            min={-60}
            max={6}
            value={eq3Options.high}
            onValueChange={handleHighChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">High</label>
          <span className="tooltip unselectable value">{`${Math.round(
            eq3Options.high
          )}db`}</span>
        </div>
      </div>
      <div className="row justify-between">
        <div className="column eq-freq-knob hasTooltip">
          <Knob
            min={50}
            max={5000}
            value={eq3Options.lowFrequency}
            onValueChange={handleLowFrequencyChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">FreqLow</label>
          <span className="tooltip unselectable value">{`${Math.round(
            eq3Options.lowFrequency
          )}hz`}</span>
        </div>
        <div className="column eq-freq-knob hasTooltip">
          <Knob
            min={200}
            max={18000}
            value={eq3Options.highFrequency}
            onValueChange={handleHighFrequencyChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">FreqHigh</label>
          <span className="tooltip unselectable value">{`${Math.round(
            eq3Options.highFrequency
          )}hz`}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EQ3Controls);
