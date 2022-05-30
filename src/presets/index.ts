import { preset } from "../types";

const defaults: preset = {
  synth1: {
    volume: 0, // -60 - 0
    detune: 0, //-1200 - 1200
    oscillator: {
      type: "sine", //sine | square | triangle | sawtooth
      phase: 0, //-180 - 180
    },
  },
  synth2: {
    volume: -10,
    detune: 0,
    oscillator: {
      type: "square",
      phase: 0,
    },
  },
  envelope: {
    attack: 0.01, // 0 - 2
    decay: 0, // 0 - 2
    sustain: 1, // 0 - 1
    release: 0.01, // 0 - 5
  },
  filter: {
    Q: 2, // 0 - 20
    frequency: 400, // 20 - 20k
    gain: 0, // 0 - 5
    rolloff: -12, // -12 | -24 | -48 | -96
    type: "allpass", // lowpass | highpass | lowshelf | highshelf | notch | allpass | bandpass
  },
  reverb: {
    decay: 1, // 1 - 30
    wet: 0, // 0 - 1
  },
  eq3: {
    low: 0,
    mid: 0,
    high: 0,
    lowFrequency: 250,
    highFrequency: 2500,
  },
  distortion: {
    distortion: 0,
    wet: 0,
  },
  delay: {
    wet: 0,
    delayTime: 0,
    feedback: 0.2,
  },
  bitCrusher: {
    wet: 0,
    bits: 16,
  },
  masterVolume: -2, // -60 - 0
};

export { defaults };
