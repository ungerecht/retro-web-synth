import React from "react";
import { WAVEFORMS } from "../globals/constants";
import Button from "./Button";
import Knob from "./Knob";
import Slider from "./Slider";
import { EnvelopeOptions } from "tone";

interface OscillatorControlsProps {
  waveform: OscillatorType;
  envelope: Partial<EnvelopeOptions>;
  volume: number;
  phase: number;
  detune: number;
  setWaveform: (type: OscillatorType) => void;
  setAttack: (value: number) => void;
  setDecay: (value: number) => void;
  setSustain: (value: number) => void;
  setRelease: (value: number) => void;
  setVolume: (volume: number) => void;
  setPhase: (phase: number) => void;
  setDetune: (detune: number) => void;
}

const OscillatorControls = ({
  waveform,
  envelope,
  volume,
  phase,
  detune,
  setWaveform,
  setAttack,
  setDecay,
  setSustain,
  setRelease,
  setVolume,
  setPhase,
  setDetune,
}: OscillatorControlsProps) => {
  const handleWaveformChange = (event: any) => {
    setWaveform(event.target.value);
  };

  const renderWaveformButtons = WAVEFORMS.map((wf, i) => {
    return (
      <Button
        key={i}
        value={wf}
        selected={waveform}
        width={26}
        height={26}
        onValueChange={handleWaveformChange}
      />
    );
  });

  return (
    <div className="control-container oscillator-container">
      <label className="unselectable title-big">OSCILLATOR</label>
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
                value={volume}
                onValueChange={setVolume}
                width={50}
                height={50}
                step={1}
              />
              <p className="unselectable value">{`${volume}db`}</p>
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
                value={phase}
                onValueChange={setPhase}
                width={50}
                height={50}
                step={1}
              />
              <p className="unselectable value">{`${phase}`}</p>
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
                value={detune}
                onValueChange={setDetune}
                width={50}
                height={50}
                step={1}
              />
              <p className="unselectable value">{`${detune}`}</p>
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
                value={Number(envelope.attack)}
                onValueChange={setAttack}
              />
              <p className="unselectable value">{`${envelope.attack}`}</p>
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
              <p className="unselectable value">{`${envelope.decay}`}</p>
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
              <p className="unselectable value">{`${envelope.sustain}`}</p>
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
              <p className="unselectable value">{`${envelope.release}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OscillatorControls;
