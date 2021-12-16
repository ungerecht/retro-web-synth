import React from "react";
import {
  allpassIcon,
  lowpassIcon,
  highpassIcon,
  lowshelfIcon,
  highshelfIcon,
  notchIcon,
  bandpassIcon,
} from "../icons";
import { FilterOptions } from "tone";

import "../styles/FilterControls.css";

interface FilterProps {
  filter: Partial<FilterOptions>;
  setFilterType: (type: BiquadFilterType) => void;
}

const FilterControls = ({ filter, setFilterType }: FilterProps) => {
  const onTypeChange = (event: any) => {
    setFilterType(event.target.value);
  };

  return (
    <div className="filter-controls-container">
      <label>FILTER</label>
      <div className="filter-type-switch">
        <input
          type="radio"
          value="allpass"
          id="allpass"
          checked={filter.type === "allpass"}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor="allpass">
          {allpassIcon}
        </label>
        <input
          type="radio"
          value="lowpass"
          id="lowpass"
          checked={filter.type === "lowpass"}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor="lowpass">
          {lowpassIcon}
        </label>
        <input
          type="radio"
          value="highpass"
          id="highpass"
          checked={filter.type === "highpass"}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor="highpass">
          {highpassIcon}
        </label>
        <input
          type="radio"
          value="lowshelf"
          id="lowshelf"
          checked={filter.type === "lowshelf"}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor="lowshelf">
          {lowshelfIcon}
        </label>
        <input
          type="radio"
          value="highshelf"
          id="highshelf"
          checked={filter.type === "highshelf"}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor="highshelf">
          {highshelfIcon}
        </label>
        <input
          type="radio"
          value="notch"
          id="notch"
          checked={filter.type === "notch"}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor="notch">
          {notchIcon}
        </label>
        <input
          type="radio"
          value="bandpass"
          id="bandpass"
          checked={filter.type === "bandpass"}
          onChange={onTypeChange}
        />
        <label className="radio-icon" htmlFor="bandpass">
          {bandpassIcon}
        </label>
      </div>
    </div>
  );
};

export default FilterControls;
