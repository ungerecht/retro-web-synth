import _ from "lodash";
import React, { useState } from "react";
import { NOTE_TO_KEY } from "../globals/constants";

import "../styles/Key.css";

interface KeyProps {
  note: string;
  pressedKeys: string[];
  playNote: (note: string) => void;
  stopNote: (note: string) => void;
}

const Key = ({ note, pressedKeys, playNote, stopNote }: KeyProps) => {
  const [isClicked, setIsClicked] = useState(false);

  //build classname for Key, adding sharp or pressed
  let keyClassName = "key";
  if (keyIsSharp(note)) keyClassName += " sharp";
  if (keyIsPressed(note, pressedKeys)) keyClassName += " pressed";

  return (
    <div
      className={keyClassName}
      onMouseDown={() => {
        setIsClicked(true);
        playNote(note);
      }}
      onMouseUp={() => {
        setIsClicked(false);
        stopNote(note);
      }}
      onMouseOut={() => {
        if (isClicked) stopNote(note);
      }}
    >
      <span className="unselectable">{note}</span>
    </div>
  );
};

const keyIsPressed = (note: string, pressedKeys: string[]) => {
  return _.includes(pressedKeys, NOTE_TO_KEY[note]);
};

const keyIsSharp = (note: string) => {
  return note.length > 1;
};

export default React.memo(Key);
