import React from "react";

import "../styles/Key.css";

interface KeyProps {
  note: string;
  octave: number;
  notesPlaying: string[];
  playNote: (fullNote: string) => void;
  stopNote: (fullNote: string) => void;
}

const Key = ({ note, octave, notesPlaying, playNote, stopNote }: KeyProps) => {
  //build classname for Key, adding sharp or pressed
  let keyClassName = "key";
  const isSharp = keyIsSharp(note);
  const isPressed = keyIsPressed(note, octave, notesPlaying);
  if (isSharp) keyClassName += " sharp";
  if (isPressed) keyClassName += " pressed";

  const handleMouseDown = () => {
    const fullNote = note + octave;
    playNote(fullNote);
  };

  const handleMouseUp = () => {
    if (isPressed) {
      const fullNote = note + octave;
      stopNote(fullNote);
    }
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      const fullNote = note + octave;
      stopNote(fullNote);
    }
  };

  return (
    <div
      className={keyClassName}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    />
  );
};

const keyIsPressed = (note: string, octave: number, notesPlaying: string[]) => {
  return notesPlaying.includes(`${note}${octave}`);
};

const keyIsSharp = (note: string) => {
  return note.length > 1;
};

export default React.memo(Key);
