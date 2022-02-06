import React from "react";
import "../styles/Keyboard.css";
import KeyboardOctave from "./KeyboardOctave";

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
  return (
    <div className="keyboard">
      <KeyboardOctave
        octave={baseOctave}
        notesPlaying={notesPlaying}
        playNote={playNote}
        stopNote={stopNote}
      />
      <KeyboardOctave
        octave={baseOctave + 1}
        notesPlaying={notesPlaying}
        playNote={playNote}
        stopNote={stopNote}
      />
      <KeyboardOctave
        octave={baseOctave + 2}
        notesPlaying={notesPlaying}
        playNote={playNote}
        stopNote={stopNote}
      />
    </div>
  );
};

export default React.memo(Keyboard);
