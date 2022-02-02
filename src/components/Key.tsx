import _ from "lodash";
import React, { useState } from "react";
import { NOTE_TO_KEY } from "../globals/constants";

import "../styles/Key.css";

interface KeyProps {
  note: string;
  octave: number;
  pressedKeys: string[];
  playNote: (note: string, octave: number) => void;
  stopNote: (note: string, octave: number) => void;
}

const Key = ({ note, octave, pressedKeys, playNote, stopNote }: KeyProps) => {
  const [isClicked, setIsClicked] = useState(false);

  //build classname for Key, adding sharp or pressed
  let keyClassName = "key";
  if (keyIsSharp(note)) keyClassName += " sharp";
  if (keyIsPressed(note, octave, pressedKeys)) keyClassName += " pressed";

  return (
    <div
      className={keyClassName}
      onMouseDown={() => {
        setIsClicked(true);
        playNote(note, octave);
      }}
      onMouseUp={() => {
        setIsClicked(false);
        stopNote(note, octave);
      }}
      onMouseOut={() => {
        if (isClicked) stopNote(note, octave);
      }}
    >
      <span className="unselectable value">{}</span>
    </div>
  );
};

const keyIsPressed = (note: string, octave: number, pressedKeys: string[]) => {
  return _.includes(pressedKeys, `${note}${octave}`);
};

const keyIsSharp = (note: string) => {
  return note.length > 1;
};

export default React.memo(Key);
