import { useCallback, memo, ChangeEvent } from "react";
import FilterDisplay from "./FilterDisplay";
import Knob from "./Knob";
import RadioButtonGroup from "./RadioButtonGroup";
import { FILTER_TYPES, ROLLOFFS } from "../globals/constants";
import { FilterControlsProps } from "../types";
import "../styles/FilterControls.css";

const FilterControls = ({
  filterOptions,
  setFilterOption,
  isPlaying,
  fft,
}: FilterControlsProps) => {
  const handleFilterTypeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFilterOption(e.target.value as BiquadFilterType, "type");
    },
    [setFilterOption]
  );
  const handleFilterRolloffChange = useCallback(
    (e: any) => {
      setFilterOption(e.target.value, "rolloff");
    },
    [setFilterOption]
  );
  const handleFilterQChange = useCallback(
    (value: number) => {
      setFilterOption(value, "Q");
    },
    [setFilterOption]
  );
  const handleFilterFrequencyChange = useCallback(
    (value: number) => {
      setFilterOption(value, "frequency");
    },
    [setFilterOption]
  );
  const handleFilterGainChange = useCallback(
    (value: number) => {
      setFilterOption(value, "gain");
    },
    [setFilterOption]
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
            filterOptions={filterOptions}
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
            comparator={filterOptions.type}
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
              comparator={filterOptions.rolloff.toString()}
              buttonSize="small"
              onValueChange={handleFilterRolloffChange}
            />
          </div>
          <label className="unselectable title-small">Rolloff</label>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={filterOptions.Q}
            width={50}
            height={50}
            onValueChange={handleFilterQChange}
            min={0}
            max={20}
            step={1}
          />
          <label className="unselectable title-small">Res</label>
          <span className="tooltip unselectable value">{`${Math.round(
            filterOptions.Q as number
          )}`}</span>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={filterOptions.frequency}
            width={50}
            height={50}
            onValueChange={handleFilterFrequencyChange}
            min={20}
            max={20000}
            step={100}
          />
          <label className="unselectable title-small">Cutoff</label>
          <span className="tooltip unselectable value">{`${Math.round(
            filterOptions.frequency
          )}Hz`}</span>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={filterOptions.gain}
            width={50}
            height={50}
            onValueChange={handleFilterGainChange}
            min={0}
            max={5}
            step={1}
          />
          <label className="unselectable title-small">Gain</label>
          <span className="tooltip unselectable value">{`${Math.round(
            filterOptions.gain
          )}`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(FilterControls);
