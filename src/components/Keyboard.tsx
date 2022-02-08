import { memo } from "react";
import KeyboardOctave from "./KeyboardOctave";
import { KeyboardProps } from "../types";
import "../styles/Keyboard.css";

const Keyboard = ({
  notesPlaying,
  octave,
  playNote,
  stopNote,
}: KeyboardProps) => {
  return (
    <div className="keyboard">
      <KeyboardOctave
        octave={octave}
        notesPlaying={notesPlaying}
        playNote={playNote}
        stopNote={stopNote}
      />
      <KeyboardOctave
        octave={octave + 1}
        notesPlaying={notesPlaying}
        playNote={playNote}
        stopNote={stopNote}
      />
      <KeyboardOctave
        octave={octave + 2}
        notesPlaying={notesPlaying}
        playNote={playNote}
        stopNote={stopNote}
      />
    </div>
  );
};

export default memo(Keyboard);
