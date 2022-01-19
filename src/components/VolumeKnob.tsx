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
      <label>VOLUME</label>
      <Knob
        min={-60}
        max={0}
        value={volume}
        onValueChange={setVolume}
        width={50}
        height={50}
        step={1}
      />
      <p>{`${volume}db`}</p>
    </div>
  );
};

export default VolumeKnob;
