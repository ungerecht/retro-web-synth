import { memo } from "react";
import Key from "./Key";
import { NOTES } from "../globals/constants";

interface KeyboardOctaveProps {
  octave: number;
  notesPlaying: string[];
  playNote: (fullNote: string) => void;
  stopNote: (fullNote: string) => void;
}

const KeyboardOctave = ({
  octave,
  notesPlaying,
  playNote,
  stopNote,
}: KeyboardOctaveProps) => {
  const createKeys = () => {
    return NOTES.map((note, i) => {
      return (
        <Key
          key={`${note}${octave}${i}`}
          note={note}
          octave={octave}
          notesPlaying={notesPlaying}
          playNote={playNote}
          stopNote={stopNote}
        />
      );
    });
  };

  const keys = createKeys();

  return <>{keys}</>;
};

export default memo(KeyboardOctave);
