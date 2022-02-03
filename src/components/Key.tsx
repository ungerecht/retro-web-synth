import React, { useState } from "react";

import "../styles/Key.css";

interface KeyProps {
  note: string;
  octave: number;
  notesPlaying: string[];
  playNote: (fullNote: string) => void;
  stopNote: (fullNote: string) => void;
}

const Key = ({ note, octave, notesPlaying, playNote, stopNote }: KeyProps) => {
  const [isClicked, setIsClicked] = useState(false);

  //build classname for Key, adding sharp or pressed
  let keyClassName = "key";
  if (keyIsSharp(note)) keyClassName += " sharp";
  if (keyIsPressed(note, octave, notesPlaying)) keyClassName += " pressed";

  return (
    <div
      className={keyClassName}
      onMouseDown={() => {
        setIsClicked(true);
        playNote(note + octave);
      }}
      onMouseUp={() => {
        setIsClicked(false);
        stopNote(note + octave);
      }}
      onMouseOut={() => {
        if (isClicked) stopNote(note + octave);
      }}
    >
      <span className="unselectable value">{}</span>
    </div>
  );
};

const keyIsPressed = (note: string, octave: number, notesPlaying: string[]) => {
  return notesPlaying.includes(`${note}${octave}`);
};

const keyIsSharp = (note: string) => {
  return note.length > 1;
};

export default React.memo(Key);
