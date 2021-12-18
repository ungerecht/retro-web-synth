import React, { ChangeEvent } from "react";
import _ from "lodash";
import { FILTER_TYPES, ROLLOFFS } from "../globals/constants";
import * as Icons from "../icons";
import { Filter, FilterOptions, FilterRollOff } from "tone";

import "../styles/FilterControls.css";
import Knob from "./Knob";

interface FilterProps {
  filter: Partial<FilterOptions>;
  setFilterType: (type: BiquadFilterType) => void;
  setFilterRolloff: (rolloff: number) => void;
  setFilterQ: (Q: number) => void;
  setFilterGain: (gain: number) => void;
}

const FilterControls = ({
  filter,
  setFilterType,
  setFilterRolloff,
  setFilterQ,
  setFilterGain,
}: FilterProps) => {
  const onTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterType(event.target.value as BiquadFilterType);
  };

  const onRolloffChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterRolloff(Number(event.target.value));
  };

  const filterTypeSwitch = _.map(FILTER_TYPES, (type: string, index) => {
    return (
      <React.Fragment key={index}>
        <input
          key={index}
          type="radio"
          value={type}
          id={type}
          checked={filter.type === type}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor={type}>
          {Icons[type as keyof typeof Icons]}
        </label>
      </React.Fragment>
    );
  });

  const filterRolloffSwitch = _.map(ROLLOFFS, (rolloff: string, index) => {
    return (
      <React.Fragment key={index}>
        <input
          type="radio"
          value={rolloff}
          id={rolloff}
          checked={filter.rolloff === Number(rolloff)}
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
      <div className="filter-knobs-container">
        <div className="filter-Q-knob">
          <label>Q</label>
          <Knob
            value={filter.Q as number}
            width={50}
            height={50}
            onValueChange={setFilterQ}
            min={0}
            max={20}
          />
        </div>
        <div className="filter-gain-knob">
          <label>GAIN</label>
          <Knob
            value={filter.gain as number}
            width={50}
            height={50}
            onValueChange={setFilterGain}
            min={0}
            max={20}
          />
        </div>
      </div>
      <div className="filter-type-switch">{filterTypeSwitch}</div>
      <div className="filter-rolloff-switch">{filterRolloffSwitch}</div>
    </div>
  );
};

export default FilterControls;
