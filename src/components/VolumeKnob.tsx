import React from "react";
import Knob from "./Knob";
import "../styles/VolumeKnob.css";

interface VolumeProps {
  volume: number;
  setVolume: (volume: number) => void;
}

const VolumeKnob = ({ volume, setVolume }: VolumeProps) => {
  return (
    <div className="volume-knob-container">
      <label className="unselectable">VOLUME</label>
      <Knob
        min={-60}
        max={0}
        value={volume}
        onValueChange={setVolume}
        width={50}
        height={50}
        step={1}
      />
      <p className="unselectable">{`${volume}db`}</p>
    </div>
  );
};

export default VolumeKnob;
