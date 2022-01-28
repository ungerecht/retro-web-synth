import React from "react";

import Knob from "./Knob";

import "../styles/DistortionControls.css";

interface DistortionProps {
  distortion: number;
  setDistortion: (distortion: number) => void;
}

const DistortionControls = ({ distortion, setDistortion }: DistortionProps) => {
  return (
    <div className="control-container distortion-container">
      <label className="unselectable title-big">DISTORT</label>
      <div className="row justify-center">
        <div className="column">
          <Knob
            min={0}
            max={1}
            value={distortion}
            onValueChange={setDistortion}
            width={50}
            height={50}
            step={0.1}
          />
          <p className="unselectable value">{`${distortion * 100}%`}</p>
        </div>
      </div>
    </div>
  );
};

export default DistortionControls;
