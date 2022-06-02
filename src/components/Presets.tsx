import React, { useState, ChangeEvent } from "react";

import { PresetsProps } from "../types";
import { defaults, supersaw, waterTemple } from "../presets";

const Presets = ({ changePreset }: PresetsProps) => {
  const [selected, setSelected] = useState(defaults.name);
  const presets = [defaults, supersaw, waterTemple];

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.value;
    const preset = presets.find((preset) => preset.name === name);
    if (preset) changePreset(preset);
    setSelected(name);
  };

  return (
    <div className="presets-container">
      <select className="preset-select unselectable" onChange={handleSelect}>
        {presets.map((preset) => {
          return (
            <option key={preset.name} value={preset.name}>
              {preset.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Presets;
