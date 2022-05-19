import { memo, MouseEvent, TouchEvent } from "react";
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

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isPressed) {
      const fullNote = note + octave;
      playNote(fullNote, true);
    }
  };

  const handleMouseUp = () => {
    if (isPressed) {
      const fullNote = note + octave;
      stopNote(fullNote, true);
    }
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      const fullNote = note + octave;
      stopNote(fullNote);
    }
  };

  const handleMouseEnter = () => {
    if (!isPressed) {
      const fullNote = note + octave;
      playNote(fullNote);
    }
  };

  const handleTouchStart = () => {
    const fullNote = note + octave;
    playNote(fullNote, true);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isPressed) {
      const fullNote = note + octave;
      stopNote(fullNote, true);
    }
  };

  return (
    <div
      // ref={key}
      className={keyClassName}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default memo(Key);
