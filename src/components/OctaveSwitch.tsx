import React from "react";
import "../styles/OctaveSwitch.css";
import { left, right } from "../icons";

interface OctaveProps {
  octave: number;
  setOctave: (octave: number) => void;
}

const OctaveSwitch = ({ octave, setOctave }: OctaveProps) => {
  return (
    <div className="control-container">
      <label className="unselectable title-big">OCTAVE</label>
      <div className="row">
        <button
          className="octave-button"
          onClick={() => {
            setOctave(octave - 1);
          }}
        >
          {left}
        </button>
        <p className="unselectable octave">{octave}</p>
        <button
          className="octave-button"
          onClick={() => {
            setOctave(octave + 1);
          }}
        >
          {right}
        </button>
      </div>
    </div>
  );
};

export default OctaveSwitch;
