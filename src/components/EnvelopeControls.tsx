import { useCallback, memo, useContext } from "react";
import Slider from "./Slider";
import { EnvelopeControlsProps } from "../types";
import { OptionsContext } from "../contexts/OptionsContext";

const EnvelopeControls = ({ synth1, synth2 }: EnvelopeControlsProps) => {
  const attack = Number(synth1.get().envelope.attack);
  const decay = Number(synth1.get().envelope.decay);
  const sustain = synth1.get().envelope.sustain;
  const release = Number(synth1.get().envelope.release);

  const optionsContext = useContext(OptionsContext);

  const handleAttackChange = useCallback(
    (value) => {
      synth1.set({ envelope: { attack: value } });
      synth2.set({ envelope: { attack: value } });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.envelope.attack = value;
      optionsContext.setOptions(optionsCopy);
    },
    [synth1, synth2, optionsContext]
  );

  const handleDecayChange = useCallback(
    (value) => {
      synth1.set({ envelope: { decay: value } });
      synth2.set({ envelope: { decay: value } });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.envelope.decay = value;
      optionsContext.setOptions(optionsCopy);
    },
    [synth1, synth2, optionsContext]
  );

  const handleSustainChange = useCallback(
    (value) => {
      synth1.set({ envelope: { sustain: value } });
      synth2.set({ envelope: { sustain: value } });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.envelope.sustain = value;
      optionsContext.setOptions(optionsCopy);
    },
    [synth1, synth2, optionsContext]
  );

  const handleReleaseChange = useCallback(
    (value) => {
      synth1.set({ envelope: { release: value } });
      synth2.set({ envelope: { release: value } });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.envelope.release = value;
      optionsContext.setOptions(optionsCopy);
    },
    [synth1, synth2, optionsContext]
  );

  return (
    <div className="control-container envelope-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">ENVELOPE</label>
        </div>
      </div>
      <div className="row justify-center">
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={2}
            step={0.01}
            width={50}
            height={96}
            value={attack}
            onValueChange={handleAttackChange}
          />
          <label className="unselectable title-small">ATK</label>
          <span className="tooltip unselectable value">
            {attack.toFixed(3)}
          </span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={2}
            step={0.01}
            width={50}
            height={96}
            value={decay}
            onValueChange={handleDecayChange}
          />
          <label className="unselectable title-small">DEC</label>
          <span className="tooltip unselectable value">{decay.toFixed(3)}</span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={1}
            step={0.01}
            width={50}
            height={96}
            value={sustain}
            onValueChange={handleSustainChange}
          />
          <label className="unselectable title-small">SUS</label>
          <span className="tooltip unselectable value">
            {sustain.toFixed(3)}
          </span>
        </div>
        <div className="column hasTooltip">
          <Slider
            min={0}
            max={5}
            step={0.01}
            width={50}
            height={96}
            value={release}
            onValueChange={handleReleaseChange}
          />
          <label className="unselectable title-small">REL</label>
          <span className="tooltip unselectable value">
            {release.toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(EnvelopeControls);
