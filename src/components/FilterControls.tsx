import { useCallback, memo, ChangeEvent, useContext } from "react";
import FilterDisplay from "./FilterDisplay";
import Knob from "./Knob";
import RadioButtonGroup from "./RadioButtonGroup";
import { FILTER_TYPES, ROLLOFFS } from "../globals/constants";
import { FilterControlsProps } from "../types";
import "../styles/FilterControls.css";
import { FilterRollOff } from "tone";
import { OptionsContext } from "../contexts/OptionsContext";

const FilterControls = ({ filter, isPlaying, fft }: FilterControlsProps) => {
  const type = filter.type;
  const rolloff = filter.rolloff;
  const q = filter.get().Q;
  const freq = filter.frequency.toFrequency(filter.frequency.value);
  const gain = filter.get().gain;

  const optionsContext = useContext(OptionsContext);

  const handleFilterTypeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as BiquadFilterType;
      filter.set({ type: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.filter.type = value;
      optionsContext.setOptions(optionsCopy);
    },
    [filter, optionsContext]
  );

  const handleFilterRolloffChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value) as FilterRollOff;
      filter.set({ rolloff: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.filter.rolloff = value;
      optionsContext.setOptions(optionsCopy);
    },
    [filter, optionsContext]
  );

  const handleFilterQChange = useCallback(
    (value: number) => {
      filter.set({ Q: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.filter.Q = value;
      optionsContext.setOptions(optionsCopy);
    },
    [filter, optionsContext]
  );

  const handleFilterFrequencyChange = useCallback(
    (value: number) => {
      filter.set({ frequency: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.filter.frequency = value;
      optionsContext.setOptions(optionsCopy);
    },
    [filter, optionsContext]
  );

  const handleFilterGainChange = useCallback(
    (value: number) => {
      filter.set({ gain: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.filter.gain = value;
      optionsContext.setOptions(optionsCopy);
    },
    [filter, optionsContext]
  );

  return (
    <div className="control-container filter-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">FILTER</label>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <FilterDisplay
            type={type}
            rolloff={rolloff}
            q={q}
            freq={freq}
            gain={gain}
            isPlaying={isPlaying}
            fft={fft}
          />
        </div>
      </div>
      <div className="column">
        <div className="row type-buttons">
          <RadioButtonGroup
            items={FILTER_TYPES}
            id={"filter types"}
            comparator={type}
            buttonSize="large"
            onValueChange={handleFilterTypeChange}
          />
        </div>
      </div>
      <div className="row justify-between">
        <div className="column">
          <div className="rolloff-buttons">
            <RadioButtonGroup
              items={ROLLOFFS}
              id={"filter rolloffs"}
              comparator={rolloff.toString()}
              buttonSize="small"
              onValueChange={handleFilterRolloffChange}
            />
          </div>
          <label className="unselectable title-small">Rolloff</label>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={q}
            width={50}
            height={50}
            onValueChange={handleFilterQChange}
            min={0}
            max={20}
            step={1}
          />
          <label className="unselectable title-small">Res</label>
          <span className="tooltip unselectable value">{`${Math.round(
            q
          )}`}</span>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={freq}
            width={50}
            height={50}
            onValueChange={handleFilterFrequencyChange}
            min={20}
            max={20000}
            step={100}
          />
          <label className="unselectable title-small">Cutoff</label>
          <span className="tooltip unselectable value">{`${Math.round(
            freq
          )}Hz`}</span>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={gain}
            width={50}
            height={50}
            onValueChange={handleFilterGainChange}
            min={0}
            max={5}
            step={1}
          />
          <label className="unselectable title-small">Gain</label>
          <span className="tooltip unselectable value">{`${Math.round(
            gain
          )}`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(FilterControls);
