import React, { ChangeEvent } from "react";
import _ from "lodash";
import { FILTER_TYPES, ROLLOFFS } from "../globals/constants";
import * as Icons from "../icons";
import { Filter, FilterOptions, FilterRollOff } from "tone";

import "../styles/FilterControls.css";

interface FilterProps {
  filter: Partial<FilterOptions>;
  setFilterType: (type: BiquadFilterType) => void;
  setFilterRolloff: (type: number) => void;
}

const FilterControls = ({
  filter,
  setFilterType,
  setFilterRolloff,
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
      <div className="filter-type-switch">{filterTypeSwitch}</div>
      <div className="filter-rolloff-switch">{filterRolloffSwitch}</div>
    </div>
  );
};

export default FilterControls;
