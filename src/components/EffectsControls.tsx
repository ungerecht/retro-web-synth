import React from "react";
import Knob from "./Knob";
import "../styles/EffectsControls.css";

interface EffectsControlsProps {
  reverbOptions: { decay: number; wet: number };
  distortionOptions: { distortion: number; wet: number };
  delayOptions: { delayTime: number; feedback: number };
  setReverbOption: (value: number, target: "wet" | "decay") => void;
  setDistortionOption: (value: number, target: "wet" | "distortion") => void;
  setDelayOption: (value: number, target: "delayTime" | "feedback") => void;
}

const EffectsControls = ({
  reverbOptions,
  distortionOptions,
  delayOptions,
  setReverbOption,
  setDistortionOption,
  setDelayOption,
}: EffectsControlsProps) => {
  return (
    <div className="control-container effects-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">EFFECTS</label>
        </div>
      </div>
      <div className="row justify-between">
        <div className="delay-container">
          <label className="unselectable title-medium">DELAY</label>
          <div className="row">
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={delayOptions.delayTime}
                onValueChange={(value) => {
                  setDelayOption(value, "delayTime");
                }}
                width={50}
                height={50}
                step={0.001}
              />
              <label className="unselectable title-small">Time</label>
              <span className="tooltip unselectable value">{`${
                delayOptions.delayTime * 1000
              }ms`}</span>
            </div>
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={delayOptions.feedback}
                onValueChange={(value) => {
                  setDelayOption(value, "feedback");
                }}
                width={50}
                height={50}
                step={0.01}
              />
              <label className="unselectable title-small">Feedbk</label>
              <span className="tooltip unselectable value">{`${(
                delayOptions.feedback * 100
              ).toFixed(0)}%`}</span>
            </div>
          </div>
        </div>
        <div className="reverb-container">
          <label className="unselectable title-medium">REVERB</label>
          <div className="row justify-between">
            <div className="column hasTooltip">
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
              <label className="unselectable title-small">Wet</label>
              <span className="tooltip unselectable value">{`${(
                reverbOptions.wet * 100
              ).toFixed(0)}%`}</span>
            </div>
            <div className="column hasTooltip">
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
              <label className="unselectable title-small">Decay</label>
              <span className="tooltip unselectable value">{`${reverbOptions.decay}`}</span>
            </div>
          </div>
        </div>
        <div className="distortion-container">
          <label className="unselectable title-medium">DISTORTION</label>
          <div className="row justify-between">
            <div className="column hasTooltip">
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
              <label className="unselectable title-small">Wet</label>
              <span className="tooltip unselectable value">{`${(
                distortionOptions.wet * 100
              ).toFixed(0)}%`}</span>
            </div>
            <div className="column hasTooltip">
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
              <label className="unselectable title-small">Amount</label>
              <span className="tooltip unselectable value">{`${(
                distortionOptions.distortion * 100
              ).toFixed(0)}%`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EffectsControls);
