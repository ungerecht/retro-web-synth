import { useCallback, useState, memo, ChangeEvent } from "react";
import Knob from "./Knob";
import RadioButtonGroup from "./RadioButtonGroup";
import { WAVEFORMS } from "../globals/constants";
import { OscillatorControlsProps } from "../types";

const OscillatorControls = ({ synthNum, synth }: OscillatorControlsProps) => {
  const [type, setType] = useState(synth.get().oscillator.type);
  const [volume, setVolume] = useState(synth.get().volume);
  const [phase, setPhase] = useState(synth.get().oscillator.phase);
  const [detune, setDetune] = useState(synth.get().detune);

  const handleTypeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as OscillatorType;
      synth.set({ oscillator: { type: value } });
      setType(value);
    },
    [synth]
  );

  const handleVolumeChange = useCallback(
    (value: number) => {
      synth.set({ volume: value });
      setVolume(value);
    },
    [synth]
  );

  const handlePhaseChange = useCallback(
    (value: number) => {
      synth.set({ oscillator: { phase: value } });
      setPhase(value);
    },
    [synth]
  );

  const handleDetuneChange = useCallback(
    (value: number) => {
      synth.set({ detune: value });
      setDetune(value);
    },
    [synth]
  );

  return (
    <div className="control-container oscillator-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">{`OSC ${synthNum}`}</label>
        </div>
      </div>
      <div className="row justify-center">
        <div className="waveform-container column">
          <div className="row justify-center">
            <RadioButtonGroup
              items={WAVEFORMS}
              id={`waveforms${synthNum}`}
              comparator={type}
              buttonSize="med"
              onValueChange={handleTypeChange}
            />
          </div>
        </div>
      </div>
      <div className="row justify-center">
        <div className="volume-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={-60}
                max={0}
                value={volume}
                onValueChange={handleVolumeChange}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Level</label>
              <span className="tooltip unselectable value">{`${Math.round(
                volume
              )}db`}</span>
            </div>
          </div>
        </div>
        <div className="phase-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={-180}
                max={180}
                value={phase}
                onValueChange={handlePhaseChange}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Phase</label>
              <span className="tooltip unselectable value">{`${Math.round(
                phase
              )}°`}</span>
            </div>
          </div>
        </div>
        <div className="detune-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={-1200}
                max={1200}
                value={detune}
                onValueChange={handleDetuneChange}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Detune</label>
              <span className="tooltip unselectable value">{`${Math.round(
                detune
              )}cents`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OscillatorControls);
