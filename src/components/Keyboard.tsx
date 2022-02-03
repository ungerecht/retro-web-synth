import React from "react";
import Key from "./Key";
import { NOTES } from "../globals/constants";

import "../styles/Keyboard.css";

interface KeyboardProps {
  notesPlaying: string[];
  baseOctave: number;
  playNote: (fullNote: string) => void;
  stopNote: (fullNote: string) => void;
}

const Keyboard = ({
  notesPlaying,
  baseOctave,
  playNote,
  stopNote,
}: KeyboardProps) => {
  const renderKeys = () => {
    let keys: JSX.Element[] = [];
    for (let octave = baseOctave; octave <= baseOctave + 2; octave += 1) {
      NOTES.forEach((note) => {
        keys.push(
          <Key
            key={`${note}${octave}`}
            note={note}
            octave={octave}
            notesPlaying={notesPlaying}
            playNote={playNote}
            stopNote={stopNote}
          />
        );
      });
    }
    return keys;
  };

  const keys = renderKeys();

  return <div className="keyboard">{keys}</div>;
};

export default React.memo(Keyboard);
