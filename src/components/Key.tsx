import { memo } from "react";
import { KeyProps } from "../types";
import { keyIsPressed, keyIsSharp } from "../utils";
import "../styles/Key.css";

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

export default memo(Key);
