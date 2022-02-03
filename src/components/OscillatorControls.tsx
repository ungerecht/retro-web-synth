import React from "react";
import { WAVEFORMS } from "../globals/constants";
import Button from "./Button";
import Knob from "./Knob";

interface OscillatorControlsProps {
  synthNum: 1 | 2;
  synthOptions: {
    volume: number;
    detune: number;
    type: OscillatorType;
    phase: number;
  };
  setSynthOption: (
    value: OscillatorType | number,
    target: "type" | "phase" | "volume" | "detune",
    synthNum: 1 | 2
  ) => void;
}

const OscillatorControls = ({
  synthNum,
  synthOptions,
  setSynthOption,
}: OscillatorControlsProps) => {
  console.log("render osc");
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
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">{`OSC ${synthNum}`}</label>
        </div>
      </div>

      <div className="row justify-center">
        <div className="waveform-container column">
          <div className="row justify-center">{renderWaveformButtons}</div>
        </div>
      </div>
      <div className="row justify-center">
        <div className="volume-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
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
              <label className="unselectable title-small">Level</label>
              <span className="tooltip unselectable value">{`${synthOptions.volume}db`}</span>
            </div>
          </div>
        </div>
        <div className="phase-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={-180}
                max={180}
                value={synthOptions.phase}
                onValueChange={(value) => {
                  setSynthOption(value, "phase", synthNum);
                }}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Phase</label>
              <span className="tooltip unselectable value">{`${synthOptions.phase}°`}</span>
            </div>
          </div>
        </div>
        <div className="detune-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={-1200}
                max={1200}
                value={synthOptions.detune}
                onValueChange={(value) => {
                  setSynthOption(value, "detune", synthNum);
                }}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Detune</label>
              <span className="tooltip unselectable value">{`${synthOptions.detune}cents`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OscillatorControls);
