import { useCallback, memo } from "react";
import Knob from "./Knob";
import RadioButtonGroup from "./RadioButtonGroup";
import { WAVEFORMS } from "../globals/constants";
import { OscillatorControlsProps } from "../types";

const OscillatorControls = ({
  synthNum,
  synthOptions,
  setSynthOption,
}: OscillatorControlsProps) => {
  const handleTypeChange = useCallback(
    (e: any) => {
      setSynthOption(e.target.value as OscillatorType, "type", synthNum);
    },
    [setSynthOption, synthNum]
  );

  const handleVolumechange = useCallback(
    (value: number) => {
      setSynthOption(value, "volume", synthNum);
    },
    [setSynthOption, synthNum]
  );

  const handlePhaseChange = useCallback(
    (value: number) => {
      setSynthOption(value, "phase", synthNum);
    },
    [setSynthOption, synthNum]
  );

  const handleDetuneChange = useCallback(
    (value: number) => {
      setSynthOption(value, "detune", synthNum);
    },
    [setSynthOption, synthNum]
  );

  return (
    <div className="control-container oscillator-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">{`OSC ${synthNum}`}</label>
        </div>
      </div>
      <div className="row justify-center">
        <div className="waveform-container column">
          <div className="row justify-center">
            <RadioButtonGroup
              items={WAVEFORMS}
              id={`waveforms${synthNum}`}
              comparator={synthOptions.type}
              buttonWidth={26}
              buttonHeight={26}
              onValueChange={handleTypeChange}
            />
          </div>
        </div>
      </div>
      <div className="row justify-center">
        <div className="volume-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={-60}
                max={0}
                value={synthOptions.volume}
                onValueChange={handleVolumechange}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Level</label>
              <span className="tooltip unselectable value">{`${Math.round(
                synthOptions.volume
              )}db`}</span>
            </div>
          </div>
        </div>
        <div className="phase-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={-180}
                max={180}
                value={synthOptions.phase}
                onValueChange={handlePhaseChange}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Phase</label>
              <span className="tooltip unselectable value">{`${Math.round(
                synthOptions.phase
              )}°`}</span>
            </div>
          </div>
        </div>
        <div className="detune-container">
          <div className="row justify-center">
            <div className="column hasTooltip">
              <Knob
                min={-1200}
                max={1200}
                value={synthOptions.detune}
                onValueChange={handleDetuneChange}
                width={50}
                height={50}
                step={1}
              />
              <label className="unselectable title-small">Detune</label>
              <span className="tooltip unselectable value">{`${Math.round(
                synthOptions.detune
              )}cents`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(OscillatorControls);
