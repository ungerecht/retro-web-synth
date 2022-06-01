import { useCallback, memo, useState, useEffect } from "react";
import Knob from "./Knob";
import { MasterControlsProps } from "../types";
import { left, right } from "../icons";
import "../styles/MasterControls.css";

const MasterControls = ({
  masterVolume,
  octave,
  setOctave,
  update,
}: MasterControlsProps) => {
  const [volume, setVolume] = useState(masterVolume.volume.value);

  useEffect(() => {
    setVolume(masterVolume.volume.value);
  }, [update, masterVolume]);

  const handleVolumeChange = useCallback(
    (value: number) => {
      masterVolume.set({ volume: value });
      setVolume(value);
    },
    [masterVolume]
  );

  return (
    <div className="master-controls-container">
      <div className="column hasTooltip">
        <Knob
          min={-60}
          max={0}
          value={volume}
          onValueChange={handleVolumeChange}
          width={50}
          height={50}
          step={1}
        />
        <label className="unselectable title-small">Volume</label>
        <span className="tooltip unselectable value">{`${Math.round(
          volume
        )}db`}</span>
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

export default memo(MasterControls);
