import React from "react";
import Slider from "./Slider";

interface EnvelopeControlsProps {
  envelopeOptions: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  setEnvelopeOption: (
    value: number,
    target: "attack" | "decay" | "sustain" | "release"
  ) => void;
}

const EnvelopeControls = ({
  envelopeOptions,
  setEnvelopeOption,
}: EnvelopeControlsProps) => {
  return (
    <div className="control-container envelope-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">ENVELOPE</label>
        </div>
      </div>
      <div className="row justify-center">
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={2}
            step={0.01}
            width={50}
            height={96}
            value={Number(envelopeOptions.attack)}
            onValueChange={(value) => {
              setEnvelopeOption(value, "attack");
            }}
          />
          <label className="unselectable title-small">ATK</label>
          <span className="tooltip unselectable value">{`${envelopeOptions.attack}`}</span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={2}
            step={0.01}
            width={50}
            height={96}
            value={Number(envelopeOptions.decay)}
            onValueChange={(value) => {
              setEnvelopeOption(value, "decay");
            }}
          />
          <label className="unselectable title-small">DEC</label>
          <span className="tooltip unselectable value">{`${envelopeOptions.decay}`}</span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={1}
            step={0.01}
            width={50}
            height={96}
            value={Number(envelopeOptions.sustain)}
            onValueChange={(value) => {
              setEnvelopeOption(value, "sustain");
            }}
          />
          <label className="unselectable title-small">SUS</label>
          <span className="tooltip unselectable value">{`${envelopeOptions.sustain}`}</span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={5}
            step={0.01}
            width={50}
            height={96}
            value={Number(envelopeOptions.release)}
            onValueChange={(value) => {
              setEnvelopeOption(value, "release");
            }}
          />
          <label className="unselectable title-small">REL</label>
          <span className="tooltip unselectable value">{`${envelopeOptions.release}`}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EnvelopeControls);
