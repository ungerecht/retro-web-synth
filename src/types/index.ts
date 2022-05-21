import { ChangeEvent } from "react";
import {
  FFT,
  FilterRollOff,
  Volume,
  EQ3,
  PolySynth,
  Filter,
  FeedbackDelay,
  Reverb,
  Distortion,
  BitCrusher,
} from "tone";

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
  synth: PolySynth;
};

export type EnvelopeControlsProps = {
  synth1: PolySynth;
  synth2: PolySynth;
};

export type FilterControlsProps = {
  filter: Filter;
  isPlaying: boolean;
  fft: FFT;
};

export type FilterDisplayProps = {
  type: string;
  rolloff: number;
  q: number;
  freq: number;
  gain: number;
  isPlaying: boolean;
  fft: FFT;
};

export type EffectsControlsProps = {
  reverb: Reverb;
  distortion: Distortion;
  delay: FeedbackDelay;
  bitCrusher: BitCrusher;
};

export type EQ3ControlsProps = {
  eq3: EQ3;
};

export type MasterControlsProps = {
  masterVolume: Volume;
  octave: number;
  setOctave: (octave: number) => void;
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
  size: string;
  onValueChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type RadioButtonGroupProps = {
  items: string[];
  id: string;
  comparator: string;
  buttonSize: string;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type MidiProps = {
  playNote: (fullNote: string, startDrag?: boolean) => void;
  stopNote: (fullNote: string, stopDrag?: boolean) => void;
};
