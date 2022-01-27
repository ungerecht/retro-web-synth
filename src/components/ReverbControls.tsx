import React from "react";
import Knob from "./Knob";
import "../styles/ReverbControls.css";

interface ReverbProps {
  reverb: { decay: number; wet: number };
  setReverbDecay: (decay: number) => void;
  setReverbWet: (wet: number) => void;
}

const ReverbControls = ({
  reverb,
  setReverbDecay,
  setReverbWet,
}: ReverbProps) => {
  return (
    <div className="control-container">
      <label className="unselectable title-big">REVERB</label>
      <div className="row">
        <div className="column">
          <label className="unselectable title-small">WET</label>
          <Knob
            min={0}
            max={1}
            value={reverb.wet}
            onValueChange={setReverbWet}
            width={50}
            height={50}
            step={0.01}
          />
          <p className="unselectable value">{`${(reverb.wet * 100).toFixed(
            0
          )}%`}</p>
        </div>
        <div className="column">
          <label className="unselectable title-small">DECAY</label>
          <Knob
            min={1}
            max={30}
            value={reverb.decay}
            onValueChange={setReverbDecay}
            width={50}
            height={50}
            step={1}
          />
          <p className="unselectable value">{`${reverb.decay}`}</p>
        </div>
      </div>
    </div>
  );
};

export default ReverbControls;
