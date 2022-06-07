import { useCallback, memo, useContext } from "react";
import Knob from "./Knob";
import { MasterControlsProps } from "../types";
import { left, right } from "../icons";
import "../styles/MasterControls.css";

import { OptionsContext } from "../contexts/OptionsContext";

const MasterControls = ({
  masterVolume,
  octave,
  setOctave,
}: MasterControlsProps) => {
  const volume = masterVolume.volume.value;

  const optionsContext = useContext(OptionsContext);

  const handleVolumeChange = useCallback(
    (value: number) => {
      masterVolume.set({ volume: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.masterVolume = value;
      optionsContext.setOptions(optionsCopy);
    },
    [masterVolume, optionsContext]
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
