import { useCallback, useState, memo, ChangeEvent, useEffect } from "react";
import FilterDisplay from "./FilterDisplay";
import Knob from "./Knob";
import RadioButtonGroup from "./RadioButtonGroup";
import { FILTER_TYPES, ROLLOFFS } from "../globals/constants";
import { FilterControlsProps } from "../types";
import "../styles/FilterControls.css";
import { FilterRollOff } from "tone";

const FilterControls = ({
  filter,
  isPlaying,
  fft,
  update,
}: FilterControlsProps) => {
  const [type, setType] = useState(filter.type);
  const [rolloff, setRolloff] = useState(filter.rolloff);
  const [q, setQ] = useState(filter.get().Q);
  const [freq, setFreq] = useState(
    filter.frequency.toFrequency(filter.frequency.value)
  );
  const [gain, setGain] = useState(filter.get().gain);

  useEffect(() => {
    setType(filter.type);
    setRolloff(filter.rolloff);
    setQ(filter.get().Q);
    setFreq(filter.frequency.toFrequency(filter.frequency.value));
  }, [update, filter]);

  const handleFilterTypeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as BiquadFilterType;
      filter.set({ type: value });
      setType(value);
    },
    [filter]
  );

  const handleFilterRolloffChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value) as FilterRollOff;
      filter.set({ rolloff: value });
      setRolloff(value);
    },
    [filter]
  );

  const handleFilterQChange = useCallback(
    (value: number) => {
      filter.set({ Q: value });
      setQ(value);
    },
    [filter]
  );

  const handleFilterFrequencyChange = useCallback(
    (value: number) => {
      filter.set({ frequency: value });
      setFreq(value);
    },
    [filter]
  );

  const handleFilterGainChange = useCallback(
    (value: number) => {
      filter.set({ gain: value });
      setGain(value);
    },
    [filter]
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
            update={update}
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
