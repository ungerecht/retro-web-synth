import React from "react";
import FilterDisplay from "./FilterDisplay";
import { FILTER_TYPES, ROLLOFFS } from "../globals/constants";
import { FilterRollOff } from "tone";

import "../styles/FilterControls.css";
import Knob from "./Knob";
import RadioButtonGroup from "./RadioButtonGroup";

interface FilterControlsProps {
  filterOptions: {
    Q: number;
    frequency: number;
    gain: number;
    rolloff: FilterRollOff;
    type: BiquadFilterType;
  };
  setFilterOption: (
    value: number | FilterRollOff | BiquadFilterType,
    target: "type" | "rolloff" | "Q" | "frequency" | "gain"
  ) => void;
}

const FilterControls = ({
  filterOptions,
  setFilterOption,
}: FilterControlsProps) => {
  return (
    <div className="control-container filter-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">FILTER</label>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <FilterDisplay filterOptions={filterOptions} />
        </div>
      </div>
      <div className="column">
        <div className="row filter-type-buttons">
          <RadioButtonGroup
            items={FILTER_TYPES}
            id={"filter types"}
            comparator={filterOptions.type}
            buttonWidth={28}
            buttonHeight={28}
            onValueChange={(e) => {
              setFilterOption(e.target.value as BiquadFilterType, "type");
            }}
          />
        </div>
      </div>
      <div className="row justify-between">
        <div className="column">
          <div style={{ display: "grid", gridTemplateColumns: `36px 36px` }}>
            <RadioButtonGroup
              items={ROLLOFFS}
              id={"filter rolloffs"}
              comparator={filterOptions.rolloff.toString()}
              buttonWidth={26}
              buttonHeight={12}
              onValueChange={(e) => {
                setFilterOption(e.target.value as FilterRollOff, "rolloff");
              }}
            />
          </div>
          <label className="unselectable title-small">Rolloff</label>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={filterOptions.Q}
            width={50}
            height={50}
            onValueChange={(value) => {
              setFilterOption(value, "Q");
            }}
            min={0}
            max={20}
            step={1}
          />
          <label className="unselectable title-small">Res</label>
          <span className="tooltip unselectable value">{`${filterOptions.Q}`}</span>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={filterOptions.frequency}
            width={50}
            height={50}
            onValueChange={(value) => {
              setFilterOption(value, "frequency");
            }}
            min={20}
            max={20000}
            step={100}
          />
          <label className="unselectable title-small">Cutoff</label>
          <span className="tooltip unselectable value">{`${filterOptions.frequency}Hz`}</span>
        </div>
        <div className="column filter-knob hasTooltip">
          <Knob
            value={filterOptions.gain}
            width={50}
            height={50}
            onValueChange={(value) => {
              setFilterOption(value, "gain");
            }}
            min={0}
            max={5}
            step={1}
          />
          <label className="unselectable title-small">Gain</label>
          <span className="tooltip unselectable value">{`${filterOptions.gain}`}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilterControls);
