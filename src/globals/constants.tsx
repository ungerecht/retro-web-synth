const ROLLOFFS: string[] = ["-12", "-24", "-48", "-96"];

const WAVEFORMS: string[] = ["sine", "square", "triangle", "sawtooth"];

const FILTER_TYPES: string[] = [
  "allpass",
  "lowpass",
  "highpass",
  "lowshelf",
  "highshelf",
  "notch",
  "bandpass",
];

const NOTES: string[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const VALID_KEYS = [
  "q",
  "2",
  "w",
  "3",
  "e",
  "r",
  "5",
  "t",
  "6",
  "y",
  "7",
  "u",
  "i",
  "9",
  "o",
  "0",
  "p",
  "[",
  "=",
  "]",
  "a",
  "z",
  "s",
  "x",
  "c",
  "f",
  "v",
  "g",
  "b",
  "n",
  "j",
  "m",
  "k",
  ",",
  "l",
  ".",
];

type fullNote = {
  note: string;
  octaveMod: number;
};

type key = {
  [key: string]: fullNote;
};

const KEY_TO_FULLNOTE: key = {
  q: { note: "C", octaveMod: 0 },
  2: { note: "C#", octaveMod: 0 },
  w: { note: "D", octaveMod: 0 },
  3: { note: "D#", octaveMod: 0 },
  e: { note: "E", octaveMod: 0 },
  r: { note: "F", octaveMod: 0 },
  5: { note: "F#", octaveMod: 0 },
  t: { note: "G", octaveMod: 0 },
  6: { note: "G#", octaveMod: 0 },
  y: { note: "A", octaveMod: 0 },
  7: { note: "A#", octaveMod: 0 },
  u: { note: "B", octaveMod: 0 },
  i: { note: "C", octaveMod: 1 },
  9: { note: "C#", octaveMod: 1 },
  o: { note: "D", octaveMod: 1 },
  0: { note: "D#", octaveMod: 1 },
  p: { note: "E", octaveMod: 1 },
  "[": { note: "F", octaveMod: 1 },
  "=": { note: "F#", octaveMod: 1 },
  "]": { note: "G", octaveMod: 1 },
  a: { note: "G#", octaveMod: 1 },
  z: { note: "A", octaveMod: 1 },
  s: { note: "A#", octaveMod: 1 },
  x: { note: "B", octaveMod: 1 },
  c: { note: "C", octaveMod: 2 },
  f: { note: "C#", octaveMod: 2 },
  v: { note: "D", octaveMod: 2 },
  g: { note: "D#", octaveMod: 2 },
  b: { note: "E", octaveMod: 2 },
  n: { note: "F", octaveMod: 2 },
  j: { note: "F#", octaveMod: 2 },
  m: { note: "G", octaveMod: 2 },
  k: { note: "G#", octaveMod: 2 },
  ",": { note: "A", octaveMod: 2 },
  l: { note: "A#", octaveMod: 2 },
  ".": { note: "B", octaveMod: 2 },
};

export {
  NOTES,
  KEY_TO_FULLNOTE,
  VALID_KEYS,
  FILTER_TYPES,
  ROLLOFFS,
  WAVEFORMS,
};
