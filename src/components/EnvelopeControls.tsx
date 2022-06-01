import { useCallback, useState, memo, useEffect } from "react";
import Slider from "./Slider";
import { EnvelopeControlsProps } from "../types";

const EnvelopeControls = ({
  synth1,
  synth2,
  update,
}: EnvelopeControlsProps) => {
  const [attack, setAttack] = useState(Number(synth1.get().envelope.attack));
  const [decay, setDecay] = useState(Number(synth1.get().envelope.decay));
  const [sustain, setSustain] = useState(synth1.get().envelope.sustain);
  const [release, setRelease] = useState(Number(synth1.get().envelope.release));

  useEffect(() => {
    setAttack(Number(synth1.get().envelope.attack));
    setDecay(Number(synth1.get().envelope.decay));
    setSustain(Number(synth1.get().envelope.sustain));
    setRelease(Number(synth1.get().envelope.release));
  }, [update, synth1]);

  const handleAttackChange = useCallback(
    (value) => {
      synth1.set({ envelope: { attack: value } });
      synth2.set({ envelope: { attack: value } });
      setAttack(value);
    },
    [synth1, synth2]
  );

  const handleDecayChange = useCallback(
    (value) => {
      synth1.set({ envelope: { decay: value } });
      synth2.set({ envelope: { decay: value } });
      setDecay(value);
    },
    [synth1, synth2]
  );

  const handleSustainChange = useCallback(
    (value) => {
      synth1.set({ envelope: { sustain: value } });
      synth2.set({ envelope: { sustain: value } });
      setSustain(value);
    },
    [synth1, synth2]
  );

  const handleReleaseChange = useCallback(
    (value) => {
      synth1.set({ envelope: { release: value } });
      synth2.set({ envelope: { release: value } });
      setRelease(value);
    },
    [synth1, synth2]
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
