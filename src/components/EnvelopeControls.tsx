import React, { useCallback } from "react";
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
  const handleAttackChange = useCallback(
    (value) => {
      setEnvelopeOption(value, "attack");
    },
    [setEnvelopeOption]
  );
  const handleDecayChange = useCallback(
    (value) => {
      setEnvelopeOption(value, "decay");
    },
    [setEnvelopeOption]
  );
  const handleSustainChange = useCallback(
    (value) => {
      setEnvelopeOption(value, "sustain");
    },
    [setEnvelopeOption]
  );
  const handleReleaseChange = useCallback(
    (value) => {
      setEnvelopeOption(value, "release");
    },
    [setEnvelopeOption]
  );
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
            onValueChange={handleAttackChange}
          />
          <label className="unselectable title-small">ATK</label>
          <span className="tooltip unselectable value">{`${Number(
            parseFloat(envelopeOptions.attack.toString()).toFixed(3)
          )}`}</span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={2}
            step={0.01}
            width={50}
            height={96}
            value={Number(envelopeOptions.decay)}
            onValueChange={handleDecayChange}
          />
          <label className="unselectable title-small">DEC</label>
          <span className="tooltip unselectable value">{`${Number(
            parseFloat(envelopeOptions.decay.toString()).toFixed(3)
          )}`}</span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={1}
            step={0.01}
            width={50}
            height={96}
            value={Number(envelopeOptions.sustain)}
            onValueChange={handleSustainChange}
          />
          <label className="unselectable title-small">SUS</label>
          <span className="tooltip unselectable value">{`${Number(
            parseFloat(envelopeOptions.sustain.toString()).toFixed(3)
          )}`}</span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={5}
            step={0.01}
            width={50}
            height={96}
            value={Number(envelopeOptions.release)}
            onValueChange={handleReleaseChange}
          />
          <label className="unselectable title-small">REL</label>
          <span className="tooltip unselectable value">{`${Number(
            parseFloat(envelopeOptions.release.toString()).toFixed(3)
          )}`}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EnvelopeControls);
