import React from "react";
import Slider from "./Slider";

import "../styles/EnvelopeSliders.css";
import { EnvelopeOptions } from "tone";

interface EnvelopeProps {
  envelope: Partial<EnvelopeOptions>;
  setEnvelope: (value: number, label: string) => void;
}

const EnvelopeSliders = ({ envelope, setEnvelope }: EnvelopeProps) => {
  return (
    <div className="envelopes">
      <Slider
        label="ATK"
        max={2}
        value={envelope.attack}
        setEnvelope={setEnvelope}
      />
      <Slider
        label="DEC"
        max={2}
        value={envelope.decay}
        setEnvelope={setEnvelope}
      />
      <Slider
        label="SUS"
        max={1}
        value={envelope.sustain}
        setEnvelope={setEnvelope}
      />
      <Slider
        label="REL"
        max={5}
        value={envelope.release}
        setEnvelope={setEnvelope}
      />
    </div>
  );
};

export default EnvelopeSliders;
