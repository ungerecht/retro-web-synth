import { options } from "../types";

const defaults: options = {
  name: "Default",
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

const supersaw: options = {
  name: "Supersaw",
  synth1: {
    volume: 0,
    detune: -200,
    oscillator: {
      type: "sawtooth", //sine | square | triangle | sawtooth
      phase: 0, //-180 - 180
    },
  },
  synth2: {
    volume: -10,
    detune: 200,
    oscillator: {
      type: "sawtooth",
      phase: 90,
    },
  },
  envelope: {
    attack: 0,
    decay: 0,
    sustain: 0.2,
    release: 0,
  },
  filter: {
    Q: 0,
    frequency: 200,
    gain: 0,
    rolloff: -24,
    type: "highpass",
  },
  reverb: {
    decay: 10,
    wet: 0.35,
  },
  eq3: {
    low: 0,
    mid: 0,
    high: 0,
    lowFrequency: 250,
    highFrequency: 2500,
  },
  distortion: {
    distortion: 0.5,
    wet: 0.5,
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
  masterVolume: 0,
};

const waterTemple: options = {
  name: "Water Temple",
  synth1: {
    volume: 0,
    detune: 0,
    oscillator: {
      type: "sine", //sine | square | triangle | sawtooth
      phase: 0, //-180 - 180
    },
  },
  synth2: {
    volume: 0,
    detune: 600,
    oscillator: {
      type: "triangle",
      phase: 90,
    },
  },
  envelope: {
    attack: 0.01,
    decay: 1,
    sustain: 0.5,
    release: 0.01,
  },
  filter: {
    Q: 0,
    frequency: 200,
    gain: 0,
    rolloff: -12,
    type: "allpass",
  },
  reverb: {
    decay: 20,
    wet: 0.1,
  },
  eq3: {
    low: 0,
    mid: 0,
    high: -6,
    lowFrequency: 250,
    highFrequency: 2500,
  },
  distortion: {
    distortion: 0,
    wet: 0,
  },
  delay: {
    wet: 0.2,
    delayTime: 0.2,
    feedback: 0.4,
  },
  bitCrusher: {
    wet: 0,
    bits: 16,
  },
  masterVolume: 0,
};

const sleepy: options = {
  name: "Sleepy",
  synth1: {
    volume: 0,
    detune: 1200,
    oscillator: {
      type: "square", //sine | square | triangle | sawtooth
      phase: 0, //-180 - 180
    },
  },
  synth2: {
    volume: 0,
    detune: -1200,
    oscillator: {
      type: "triangle",
      phase: 0,
    },
  },
  envelope: {
    attack: 1,
    decay: 1.5,
    sustain: 1,
    release: 5,
  },
  filter: {
    Q: 0,
    frequency: 300,
    gain: 0,
    rolloff: -24,
    type: "highpass",
  },
  reverb: {
    decay: 30,
    wet: 0.05,
  },
  eq3: {
    low: 0,
    mid: 0,
    high: -60,
    lowFrequency: 250,
    highFrequency: 2500,
  },
  distortion: {
    distortion: 0,
    wet: 0,
  },
  delay: {
    wet: 0.3,
    delayTime: 0.5,
    feedback: 0.3,
  },
  bitCrusher: {
    wet: 0,
    bits: 16,
  },
  masterVolume: 0,
};

export { defaults, supersaw, waterTemple, sleepy };
