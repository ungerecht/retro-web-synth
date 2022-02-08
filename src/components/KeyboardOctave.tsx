import { memo } from "react";
import Key from "./Key";
import { NOTES } from "../globals/constants";
import { KeyboardProps } from "../types";

const KeyboardOctave = ({
  octave,
  notesPlaying,
  playNote,
  stopNote,
}: KeyboardProps) => {
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
