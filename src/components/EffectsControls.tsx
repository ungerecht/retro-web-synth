import React from "react";
import Knob from "./Knob";

interface EffectsControlsProps {
  reverbOptions: { decay: number; wet: number };
  distortionOptions: { distortion: number; wet: number };
  setReverbOption: (value: number, target: "wet" | "decay") => void;
  setDistortionOption: (value: number, target: "wet" | "distortion") => void;
}

const EffectsControls = ({
  reverbOptions,
  distortionOptions,
  setReverbOption,
  setDistortionOption,
}: EffectsControlsProps) => {
  console.log("render effects");
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
                value={reverbOptions.wet}
                onValueChange={(value) => {
                  setReverbOption(value, "wet");
                }}
                width={50}
                height={50}
                step={0.01}
              />
              <p className="unselectable value">{`${(
                reverbOptions.wet * 100
              ).toFixed(0)}%`}</p>
            </div>
            <div className="column">
              <label className="unselectable title-small">DECAY</label>
              <Knob
                min={1}
                max={30}
                value={reverbOptions.decay}
                onValueChange={(value) => {
                  setReverbOption(value, "decay");
                }}
                width={50}
                height={50}
                step={1}
              />
              <p className="unselectable value">{`${reverbOptions.decay}`}</p>
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
                value={distortionOptions.wet}
                onValueChange={(value) => {
                  setDistortionOption(value, "wet");
                }}
                width={50}
                height={50}
                step={0.01}
              />
              <p className="unselectable value">{`${(
                distortionOptions.wet * 100
              ).toFixed(0)}%`}</p>
            </div>
            <div className="column">
              <label className="unselectable title-small">AMOUNT</label>
              <Knob
                min={0}
                max={1}
                value={distortionOptions.distortion}
                onValueChange={(value) => {
                  setDistortionOption(value, "distortion");
                }}
                width={50}
                height={50}
                step={0.01}
              />
              <p className="unselectable value">{`${(
                distortionOptions.distortion * 100
              ).toFixed(0)}%`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EffectsControls);
