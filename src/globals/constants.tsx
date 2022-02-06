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
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
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
  2: { note: "Db", octaveMod: 0 },
  w: { note: "D", octaveMod: 0 },
  3: { note: "Eb", octaveMod: 0 },
  e: { note: "E", octaveMod: 0 },
  r: { note: "F", octaveMod: 0 },
  5: { note: "Gb", octaveMod: 0 },
  t: { note: "G", octaveMod: 0 },
  6: { note: "Ab", octaveMod: 0 },
  y: { note: "A", octaveMod: 0 },
  7: { note: "Bb", octaveMod: 0 },
  u: { note: "B", octaveMod: 0 },
  i: { note: "C", octaveMod: 1 },
  9: { note: "Db", octaveMod: 1 },
  o: { note: "D", octaveMod: 1 },
  0: { note: "Eb", octaveMod: 1 },
  p: { note: "E", octaveMod: 1 },
  "[": { note: "F", octaveMod: 1 },
  "=": { note: "Gb", octaveMod: 1 },
  "]": { note: "G", octaveMod: 1 },
  a: { note: "Ab", octaveMod: 1 },
  z: { note: "A", octaveMod: 1 },
  s: { note: "Bb", octaveMod: 1 },
  x: { note: "B", octaveMod: 1 },
  c: { note: "C", octaveMod: 2 },
  f: { note: "Db", octaveMod: 2 },
  v: { note: "D", octaveMod: 2 },
  g: { note: "Eb", octaveMod: 2 },
  b: { note: "E", octaveMod: 2 },
  n: { note: "F", octaveMod: 2 },
  j: { note: "Gb", octaveMod: 2 },
  m: { note: "G", octaveMod: 2 },
  k: { note: "Ab", octaveMod: 2 },
  ",": { note: "A", octaveMod: 2 },
  l: { note: "Bb", octaveMod: 2 },
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
