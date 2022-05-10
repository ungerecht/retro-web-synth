import { memo, useEffect, useRef } from "react";
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

  const key = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      if (!isPressed) {
        const fullNote = note + octave;
        playNote(fullNote, true);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      const fullNote = note + octave;
      playNote(fullNote, true);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault();
      if (isPressed) {
        const fullNote = note + octave;
        stopNote(fullNote, true);
      }
    };
    if (key) {
      const current = key.current;
      if (current) {
        current.addEventListener("mousedown", handleMouseDown);
        current.addEventListener("touchstart", handleTouchStart);
        current.addEventListener("touchend", handleTouchEnd);

        return () => {
          current.removeEventListener("mousedown", handleMouseDown);
          current.removeEventListener("touchstart", handleTouchStart);
          current.removeEventListener("touchend", handleTouchEnd);
        };
      }
    }
  }, [isPressed, note, octave, playNote, stopNote]);

  return (
    <div
      ref={key}
      className={keyClassName}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    />
  );
};

export default memo(Key);
