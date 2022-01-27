import React from "react";
import Slider from "./Slider";

import "../styles/EnvelopeSliders.css";
import { EnvelopeOptions } from "tone";

interface EnvelopeProps {
  envelope: Partial<EnvelopeOptions>;
  setAttack: (value: number) => void;
  setDecay: (value: number) => void;
  setSustain: (value: number) => void;
  setRelease: (value: number) => void;
}

const EnvelopeSliders = ({
  envelope,
  setAttack,
  setDecay,
  setSustain,
  setRelease,
}: EnvelopeProps) => {
  return (
    <div className="control-container">
      <label className="unselectable title-big">ENVELOPE</label>
      <div className="row">
        <div className="column">
          <label className="unselectable title-small">ATK</label>
          <Slider
            min={0}
            max={2}
            step={0.01}
            width={50}
            height={100}
            value={Number(envelope.attack)}
            onValueChange={setAttack}
          />
        </div>
        <div className="column">
          <label className="unselectable title-small">DEC</label>
          <Slider
            min={0}
            max={2}
            step={0.01}
            width={50}
            height={100}
            value={Number(envelope.decay)}
            onValueChange={setDecay}
          />
        </div>
        <div className="column">
          <label className="unselectable title-small">SUS</label>
          <Slider
            min={0}
            max={1}
            step={0.01}
            width={50}
            height={100}
            value={Number(envelope.sustain)}
            onValueChange={setSustain}
          />
        </div>
        <div className="column">
          <label className="unselectable title-small">REL</label>
          <Slider
            min={0}
            max={5}
            step={0.01}
            width={50}
            height={100}
            value={Number(envelope.release)}
            onValueChange={setRelease}
          />
        </div>
      </div>
    </div>
  );
};

export default EnvelopeSliders;
