import React, { ChangeEvent } from "react";
import FilterDisplay from "./FilterDisplay";
import Button from "./Button";
import { FILTER_TYPES, ROLLOFFS } from "../globals/constants";
import { Filter, FilterOptions } from "tone";

import "../styles/FilterControls.css";
import Knob from "./Knob";

interface FilterControlsProps {
  filterState: Partial<FilterOptions>;
  filter: Filter;
  setFilterType: (type: BiquadFilterType) => void;
  setFilterRolloff: (rolloff: number) => void;
  setFilterQ: (Q: number) => void;
  setFilterDetune: (detune: number) => void;
  setFilterGain: (gain: number) => void;
  setFilterFrequency: (frequency: number) => void;
}

const FilterControls = ({
  filter,
  filterState,
  setFilterType,
  setFilterRolloff,
  setFilterQ,
  setFilterDetune,
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
      <Button
        key={i}
        value={type}
        selected={filterState.type as string}
        width={28}
        height={28}
        onValueChange={onTypeChange}
      />
    );
  });

  const renderFilterRolloffButtons = ROLLOFFS.map((rolloff, i) => {
    return (
      <Button
        key={i}
        value={rolloff}
        selected={filterState.rolloff?.toString() || ""}
        width={26}
        height={12}
        onValueChange={onRolloffChange}
      />
    );
  });

  return (
    <div className="control-container filter-container">
      <label className="unselectable title-big">FILTER</label>
      <div className="row justify-between">{renderFilterTypeButtons}</div>
      <FilterDisplay filter={filter} />
      <div className="row">{renderFilterRolloffButtons}</div>
      <div className="row">
        <div className="column filter-knob">
          <label className="unselectable title-small">Q</label>
          <Knob
            value={filterState.Q as number}
            width={50}
            height={50}
            onValueChange={setFilterQ}
            min={0}
            max={20}
            step={1}
          />
          <p className="unselectable value">{`${filterState.Q}`}</p>
        </div>
        <div className="column filter-knob">
          <label className="unselectable title-small">Detune</label>
          <Knob
            value={filterState.detune as number}
            width={50}
            height={50}
            onValueChange={setFilterDetune}
            min={-200}
            max={200}
            step={10}
          />
          <p className="unselectable value">{`${filterState.detune}`}</p>
        </div>
        <div className="column filter-knob">
          <label className="unselectable title-small">Freq</label>
          <Knob
            value={filterState.frequency as number}
            width={50}
            height={50}
            onValueChange={setFilterFrequency}
            min={20}
            max={20000}
            step={100}
          />
          <p className="unselectable value">{`${filterState.frequency}Hz`}</p>
        </div>
        <div className="column filter-knob">
          <label className="unselectable title-small">Gain</label>
          <Knob
            value={filterState.gain as number}
            width={50}
            height={50}
            onValueChange={setFilterGain}
            min={0}
            max={5}
            step={1}
          />
          <p className="unselectable value">{`${filterState.gain}`}</p>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
