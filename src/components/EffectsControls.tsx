import React from "react";
import Knob from "./Knob";

interface EffectsControlsProps {
  reverb: { decay: number; wet: number };
  distortion: { distortion: number; wet: number };
  setReverbDecay: (decay: number) => void;
  setReverbWet: (wet: number) => void;
  setDistortion: (distortion: number) => void;
  setDistortionWet: (wet: number) => void;
}

const EffectsControls = ({
  reverb,
  distortion,
  setReverbDecay,
  setReverbWet,
  setDistortion,
  setDistortionWet,
}: EffectsControlsProps) => {
  return (
    <div className="control-container">
      <label className="unselectable title-big">EFFECTS</label>
      <div className="row">
        <div className="reverb-container column">
          <label className="unselectable title-medium">REVERB</label>
          <div className="row justify-between">
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
        <div className="distortion-container column">
          <label className="unselectable title-medium">DISTORTION</label>
          <div className="row justify-between">
            <div className="column">
              <label className="unselectable title-small">WET</label>
              <Knob
                min={0}
                max={1}
                value={distortion.wet}
                onValueChange={setDistortionWet}
                width={50}
                height={50}
                step={0.01}
              />
              <p className="unselectable value">{`${(
                distortion.wet * 100
              ).toFixed(0)}%`}</p>
            </div>
            <div className="column">
              <label className="unselectable title-small">AMOUNT</label>
              <Knob
                min={0}
                max={1}
                value={distortion.distortion}
                onValueChange={setDistortion}
                width={50}
                height={50}
                step={0.01}
              />
              <p className="unselectable value">{`${(
                distortion.distortion * 100
              ).toFixed(0)}%`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EffectsControls;
