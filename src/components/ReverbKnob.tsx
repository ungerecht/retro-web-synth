import React from "react";
import Knob from "./Knob";
import "../styles/ReverbKnob.css";

interface ReverbProps {
  reverb: number;
  setReverb: (reverb: number) => void;
}

const ReverbKnob = ({ reverb, setReverb }: ReverbProps) => {
  return (
    <div className="reverb-knob-container">
      <label>REVERB</label>
      <Knob
        min={1}
        max={100}
        value={reverb}
        onValueChange={setReverb}
        width={50}
        height={50}
        step={5}
      />
      <p>{`${reverb}`}</p>
    </div>
  );
};

export default ReverbKnob;
