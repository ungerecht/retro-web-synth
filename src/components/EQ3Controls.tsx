import { useState, useCallback, memo } from "react";
import Knob from "./Knob";
import { EQ3ControlsProps } from "../types";
import "../styles/EQ3Controls.css";

const EQ3Controls = ({ eq3 }: EQ3ControlsProps) => {
  const [low, setLow] = useState(eq3.low.value);
  const [mid, setMid] = useState(eq3.mid.value);
  const [high, setHigh] = useState(eq3.high.value);
  const [lowFreq, setLowFreq] = useState(eq3.lowFrequency.value as number);
  const [highFreq, setHighFreq] = useState(eq3.highFrequency.value as number);

  const handleLowChange = useCallback(
    (value: number) => {
      eq3.set({ low: value });
      setLow(value);
    },
    [eq3]
  );

  const handleMidChange = useCallback(
    (value: number) => {
      eq3.set({ mid: value });
      setMid(value);
    },
    [eq3]
  );

  const handleHighChange = useCallback(
    (value: number) => {
      eq3.set({ high: value });
      setHigh(value);
    },
    [eq3]
  );

  const handleLowFreqChange = useCallback(
    (value: number) => {
      eq3.set({ lowFrequency: value });
      setLowFreq(value);
    },
    [eq3]
  );

  const handleHighFreqChange = useCallback(
    (value: number) => {
      eq3.set({ highFrequency: value });
      setHighFreq(value);
    },
    [eq3]
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
            value={low}
            onValueChange={handleLowChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">Low</label>
          <span className="tooltip unselectable value">{`${Math.round(
            low
          )}db`}</span>
        </div>
        <div className="column hasTooltip">
          <Knob
            min={-60}
            max={6}
            value={mid}
            onValueChange={handleMidChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">Mid</label>
          <span className="tooltip unselectable value">{`${Math.round(
            mid
          )}db`}</span>
        </div>
        <div className="column hasTooltip">
          <Knob
            min={-60}
            max={6}
            value={high}
            onValueChange={handleHighChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">High</label>
          <span className="tooltip unselectable value">{`${Math.round(
            high
          )}db`}</span>
        </div>
      </div>
      <div className="row justify-between">
        <div className="column eq-freq-knob hasTooltip">
          <Knob
            min={50}
            max={5000}
            value={lowFreq}
            onValueChange={handleLowFreqChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">FreqLow</label>
          <span className="tooltip unselectable value">{`${Math.round(
            lowFreq
          )}hz`}</span>
        </div>
        <div className="column eq-freq-knob hasTooltip">
          <Knob
            min={200}
            max={18000}
            value={highFreq}
            onValueChange={handleHighFreqChange}
            width={50}
            height={50}
            step={1}
          />
          <label className="unselectable title-small">FreqHigh</label>
          <span className="tooltip unselectable value">{`${Math.round(
            highFreq
          )}hz`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(EQ3Controls);
