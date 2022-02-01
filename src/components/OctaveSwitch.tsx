import React from "react";
import "../styles/OctaveSwitch.css";
import { left, right } from "../icons";

interface OctaveProps {
  octave: number;
  setOctave: (octave: number) => void;
}

const OctaveSwitch = ({ octave, setOctave }: OctaveProps) => {
  console.log("render octave");
  return (
    <div className="control-container octave-container">
      <label className="unselectable title-big">OCTAVE</label>
      <div className="row justify-between">
        <button
          className="octave-button"
          onClick={() => {
            setOctave(octave - 1);
          }}
          disabled={octave === 0}
        >
          {left}
        </button>
        <p className="unselectable octave">{octave}</p>
        <button
          className="octave-button"
          onClick={() => {
            setOctave(octave + 1);
          }}
          disabled={octave === 9}
        >
          {right}
        </button>
      </div>
    </div>
  );
};

export default React.memo(OctaveSwitch);
