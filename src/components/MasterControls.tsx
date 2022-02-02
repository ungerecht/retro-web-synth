import React from "react";
import Knob from "./Knob";
import "../styles/MasterControls.css";
import { left, right } from "../icons";

interface MasterControlsProps {
  volume: number;
  octave: number;
  setOctave: (octave: number) => void;
  setVolume: (value: number) => void;
}

const OctaveSwitch = ({
  octave,
  volume,
  setOctave,
  setVolume,
}: MasterControlsProps) => {
  console.log("render octave");
  return (
    <div className="master-controls-container">
      <div className="column hasTooltip">
        <Knob
          min={-60}
          max={0}
          value={volume}
          onValueChange={(value) => {
            setVolume(value);
          }}
          width={50}
          height={50}
          step={1}
        />
        <label className="unselectable title-small">Volume</label>
        <span className="tooltip value">{`${volume}db`}</span>
      </div>
      <div className="column">
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
            disabled={octave === 6}
          >
            {right}
          </button>
        </div>
        <label className="unselectable title-small">Octave</label>
      </div>
    </div>
  );
};

export default React.memo(OctaveSwitch);
