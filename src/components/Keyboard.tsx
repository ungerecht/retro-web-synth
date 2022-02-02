import React from "react";
import Key from "./Key";
import _, { keys } from "lodash";
import { NOTES } from "../globals/constants";

import "../styles/Keyboard.css";
import { render } from "@testing-library/react";

interface KeyboardProps {
  pressedKeys: string[];
  baseOctave: number;
  playNote: (note: string, octave: number) => void;
  stopNote: (note: string, octave: number) => void;
}

const Keyboard = ({
  pressedKeys,
  baseOctave,
  playNote,
  stopNote,
}: KeyboardProps) => {
  console.log("render board");

  const renderKeys = () => {
    let keys: JSX.Element[] = [];
    for (let octave = baseOctave; octave <= baseOctave + 2; octave += 1) {
      const octaveKeys = _.map(NOTES, (note, index) => {
        keys.push(
          <Key
            key={`${note}${octave}`}
            note={note}
            octave={octave}
            pressedKeys={pressedKeys}
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
