import { ChangeEvent } from "react";
import { FilterRollOff } from "tone";

export type synthOptions = {
  volume: number;
  detune: number;
  type: OscillatorType;
  phase: number;
};

export type envelopeOptions = {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
};

export type filterOptions = {
  Q: number;
  frequency: number;
  gain: number;
  rolloff: FilterRollOff;
  type: BiquadFilterType;
};

export type reverbOptions = {
  wet: number;
  decay: number;
};

export type eq3Options = {
  low: number;
  mid: number;
  high: number;
  lowFrequency: number;
  highFrequency: number;
};

export type distortionOptions = { distortion: number; wet: number };

export type delayOptions = {
  wet: number;
  delayTime: number;
  feedback: number;
};

export type bitCrusherOptions = {
  wet: number;
  bits: number;
};

export type SynthControllerState = {
  baseOctave: number;
  notesPlaying: string[];
  masterVolume: number;
  dragging: boolean;
  synth1Options: synthOptions;
  synth2Options: synthOptions;
  envelopeOptions: envelopeOptions;
  filterOptions: filterOptions;
  reverbOptions: reverbOptions;
  eq3Options: eq3Options;
  distortionOptions: distortionOptions;
  delayOptions: delayOptions;
  bitCrusherOptions: bitCrusherOptions;
};

export type ControlProps = {
  min: number;
  max: number;
  value: number;
  width: number;
  height: number;
  step: number;
  onValueChange: (value: number) => void;
};

export type OscillatorControlsProps = {
  synthNum: 1 | 2;
  synthOptions: synthOptions;
  setSynthOption: (
    value: OscillatorType | number,
    target: "type" | "phase" | "volume" | "detune",
    synthNum: 1 | 2
  ) => void;
};

export type EnvelopeControlsProps = {
  envelopeOptions: envelopeOptions;
  setEnvelopeOption: (
    value: number,
    target: "attack" | "decay" | "sustain" | "release"
  ) => void;
};

export type FilterControlsProps = {
  filterOptions: filterOptions;
  setFilterOption: (
    value: number | FilterRollOff | BiquadFilterType,
    target: "type" | "rolloff" | "Q" | "frequency" | "gain"
  ) => void;
};

export type FilterDisplayProps = {
  filterOptions: filterOptions;
};

export type EffectsControlsProps = {
  reverbOptions: reverbOptions;
  distortionOptions: distortionOptions;
  delayOptions: delayOptions;
  bitCrusherOptions: bitCrusherOptions;
  setReverbOption: (value: number, target: "wet" | "decay") => void;
  setDistortionOption: (value: number, target: "wet" | "distortion") => void;
  setDelayOption: (
    value: number,
    target: "wet" | "delayTime" | "feedback"
  ) => void;
  setBitCrusherOption: (value: number, target: "wet" | "bits") => void;
};

export type EQ3ControlsProps = {
  eq3Options: eq3Options;
  setEQ3Option: (
    value: number,
    target: "low" | "mid" | "high" | "lowFrequency" | "highFrequency"
  ) => void;
};

export type MasterControlsProps = {
  volume: number;
  octave: number;
  setOctave: (octave: number) => void;
  setVolume: (value: number) => void;
};

export type KeyProps = {
  note: string;
  octave: number;
  notesPlaying: string[];
  playNote: (fullNote: string, startDrag?: boolean) => void;
  stopNote: (fullNote: string, stopDrag?: boolean) => void;
};

export type KeyboardProps = {
  notesPlaying: string[];
  octave: number;
  playNote: (fullNote: string, startDrag?: boolean) => void;
  stopNote: (fullNote: string, stopDrag?: boolean) => void;
};

export type RadioButtonProps = {
  value: string;
  name: string;
  selected: boolean;
  height: number;
  width: number;
  onValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type RadioButtonGroupProps = {
  items: string[];
  id: string;
  comparator: string;
  buttonWidth: number;
  buttonHeight: number;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type MidiProps = {
  playNote: (fullNote: string, startDrag?: boolean) => void;
  stopNote: (fullNote: string, stopDrag?: boolean) => void;
};
