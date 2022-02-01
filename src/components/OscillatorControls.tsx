import React from "react";
import { WAVEFORMS } from "../globals/constants";
import Button from "./Button";
import Knob from "./Knob";
import Slider from "./Slider";

interface OscillatorControlsProps {
  synthNum: 1 | 2;
  synthOptions: {
    volume: number;
    detune: number;
    type: OscillatorType;
    phase: number;
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  setSynthOption: (
    value: OscillatorType | number,
    target:
      | "type"
      | "phase"
      | "attack"
      | "decay"
      | "sustain"
      | "release"
      | "volume"
      | "detune",
    synthNum: 1 | 2
  ) => void;
}

const OscillatorControls = ({
  synthNum,
  synthOptions,
  setSynthOption,
}: OscillatorControlsProps) => {
  const renderWaveformButtons = WAVEFORMS.map((wf, i) => {
    return (
      <Button
        key={`waveform${i}${synthNum}`}
        name={`${synthNum}`}
        value={wf}
        selected={synthOptions.type === wf}
        width={26}
        height={26}
        onValueChange={(e) => {
          setSynthOption(e.target.value as OscillatorType, "type", synthNum);
        }}
      />
    );
  });
  return (
    <div className="control-container oscillator-container">
      <label className="unselectable title-big">{`OSC ${synthNum}`}</label>
      <div className="row">
        <div className="waveform-container column">
          <label className="unselectable title-small">WAVEFORM</label>
          <div
            className="row justify-center"
            style={{ display: "grid", gridTemplateColumns: "34px 34px" }}
          >
            {renderWaveformButtons}
          </div>
        </div>
        <div className="volume-container">
          <div className="row justify-center">
            <div className="column">
              <label className="unselectable title-small">LEVEL</label>
              <Knob
                min={-60}
                max={0}
                value={synthOptions.volume}
                onValueChange={(value) => {
                  setSynthOption(value, "volume", synthNum);
                }}
                width={50}
                height={50}
                step={1}
              />
              <p className="unselectable value">{`${synthOptions.volume}db`}</p>
            </div>
          </div>
        </div>
        <div className="phase-container">
          <div className="row justify-center">
            <div className="column">
              <label className="unselectable title-small">PHASE</label>
              <Knob
                min={0}
                max={360}
                value={synthOptions.phase}
                onValueChange={(value) => {
                  setSynthOption(value, "phase", synthNum);
                }}
                width={50}
                height={50}
                step={1}
              />
              <p className="unselectable value">{`${synthOptions.phase}`}</p>
            </div>
          </div>
        </div>
        <div className="detune-container">
          <div className="row justify-center">
            <div className="column">
              <label className="unselectable title-small">DETUNE</label>
              <Knob
                min={-200}
                max={200}
                value={synthOptions.detune}
                onValueChange={(value) => {
                  setSynthOption(value, "detune", synthNum);
                }}
                width={50}
                height={50}
                step={1}
              />
              <p className="unselectable value">{`${synthOptions.detune}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-center">
        <div className="envelope-container column">
          <label className="unselectable title-medium">ENVELOPE</label>
          <div className="row justify-center">
            <div className="column">
              <label className="unselectable title-small">ATK</label>
              <Slider
                min={0}
                max={2}
                step={0.01}
                width={50}
                height={100}
                value={Number(synthOptions.attack)}
                onValueChange={(value) => {
                  setSynthOption(value, "attack", synthNum);
                }}
              />
              <p className="unselectable value">{`${synthOptions.attack}`}</p>
            </div>
            <div className="column">
              <label className="unselectable title-small">DEC</label>
              <Slider
                min={0}
                max={2}
                step={0.01}
                width={50}
                height={100}
                value={Number(synthOptions.decay)}
                onValueChange={(value) => {
                  setSynthOption(value, "decay", synthNum);
                }}
              />
              <p className="unselectable value">{`${synthOptions.decay}`}</p>
            </div>
            <div className="column">
              <label className="unselectable title-small">SUS</label>
              <Slider
                min={0}
                max={1}
                step={0.01}
                width={50}
                height={100}
                value={Number(synthOptions.sustain)}
                onValueChange={(value) => {
                  setSynthOption(value, "sustain", synthNum);
                }}
              />
              <p className="unselectable value">{`${synthOptions.sustain}`}</p>
            </div>
            <div className="column">
              <label className="unselectable title-small">REL</label>
              <Slider
                min={0}
                max={5}
                step={0.01}
                width={50}
                height={100}
                value={Number(synthOptions.release)}
                onValueChange={(value) => {
                  setSynthOption(value, "release", synthNum);
                }}
              />
              <p className="unselectable value">{`${synthOptions.release}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OscillatorControls;
