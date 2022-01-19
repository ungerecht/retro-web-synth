import React, { ChangeEvent } from "react";
import FilterDisplay from "./FilterDisplay";
import { FILTER_TYPES, ROLLOFFS } from "../globals/constants";
import * as Icons from "../icons";
import { Filter, FilterOptions } from "tone";

import "../styles/FilterControls.css";
import Knob from "./Knob";

interface FilterControlsProps {
  filterState: Partial<FilterOptions>;
  filter: Filter;
  setFilterType: (type: BiquadFilterType) => void;
  setFilterRolloff: (rolloff: number) => void;
  setFilterQ: (Q: number) => void;
  setFilterGain: (gain: number) => void;
  setFilterFrequency: (frequency: number) => void;
}

const FilterControls = ({
  filter,
  filterState,
  setFilterType,
  setFilterRolloff,
  setFilterQ,
  setFilterGain,
  setFilterFrequency,
}: FilterControlsProps) => {
  const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterType(event.target.value as BiquadFilterType);
  };

  const onRolloffChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterRolloff(Number(event.target.value));
  };

  const renderFilterTypeButtons = FILTER_TYPES.map((type, i) => {
    return (
      <React.Fragment key={i}>
        <input
          type="radio"
          value={type}
          id={type}
          checked={filterState.type === type}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor={type}>
          {Icons[type as keyof typeof Icons]}
        </label>
      </React.Fragment>
    );
  });

  const renderFilterRolloffButtons = ROLLOFFS.map((rolloff, i) => {
    return (
      <React.Fragment key={i}>
        <input
          type="radio"
          value={rolloff}
          id={rolloff}
          checked={filterState.rolloff === Number(rolloff)}
          onChange={onRolloffChange}
        />
        <label className="radio-icon" htmlFor={rolloff}>
          {rolloff}
        </label>
      </React.Fragment>
    );
  });

  return (
    <div className="filter-controls-container">
      <label>FILTER</label>

      <div className="filter-type-switch">{renderFilterTypeButtons}</div>
      <FilterDisplay filter={filter} />
      <div className="filter-rolloff-switch">{renderFilterRolloffButtons}</div>
      <div className="filter-knobs-container">
        <div className="filter-Q-knob">
          <label>Q</label>
          <Knob
            value={filterState.Q as number}
            width={50}
            height={50}
            onValueChange={setFilterQ}
            min={0}
            max={20}
            step={1}
          />
          <p>{`${filterState.Q}`}</p>
        </div>
        <div className="filter-frequency-knob">
          <label>FREQ</label>
          <Knob
            value={filterState.frequency as number}
            width={50}
            height={50}
            onValueChange={setFilterFrequency}
            min={20}
            max={20000}
            step={100}
          />
          <p>{`${filterState.frequency}hz`}</p>
        </div>
        <div className="filter-gain-knob">
          <label>GAIN</label>
          <Knob
            value={filterState.gain as number}
            width={50}
            height={50}
            onValueChange={setFilterGain}
            min={0}
            max={5}
            step={1}
          />
          <p>{`${filterState.gain}`}</p>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
