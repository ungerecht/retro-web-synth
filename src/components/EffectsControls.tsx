import { useCallback, memo, useContext } from "react";
import Knob from "./Knob";
import { EffectsControlsProps } from "../types";
import "../styles/EffectsControls.css";
import { OptionsContext } from "../contexts/OptionsContext";

const EffectsControls = ({
  reverb,
  distortion,
  delay,
  bitCrusher,
}: EffectsControlsProps) => {
  const delayWet = delay.get().wet;
  const delayTime = Number(delay.get().delayTime);
  const delayFeedback = delay.get().feedback;
  const reverbWet = reverb.get().wet;
  const reverbDecay = reverb.get().decay;
  const distortionWet = distortion.get().wet;
  const distortionAmount = distortion.get().distortion;
  const bitCrusherWet = bitCrusher.get().wet;
  const bitCrusherBits = bitCrusher.get().bits;

  const optionsContext = useContext(OptionsContext);

  const handleDelayWetChange = useCallback(
    (value: number) => {
      delay.set({ wet: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.delay.wet = value;
      optionsContext.setOptions(optionsCopy);
    },
    [delay, optionsContext]
  );

  const handleDelayTimeChange = useCallback(
    (value: number) => {
      delay.set({ delayTime: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.delay.delayTime = value;
      optionsContext.setOptions(optionsCopy);
    },
    [delay, optionsContext]
  );

  const handleDelayFeedbackChange = useCallback(
    (value: number) => {
      delay.set({ feedback: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.delay.feedback = value;
      optionsContext.setOptions(optionsCopy);
    },
    [delay, optionsContext]
  );

  const handleReverbWetChange = useCallback(
    (value: number) => {
      reverb.set({ wet: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.reverb.wet = value;
      optionsContext.setOptions(optionsCopy);
    },
    [reverb, optionsContext]
  );

  const handleReverbDecayChange = useCallback(
    (value: number) => {
      reverb.set({ decay: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.reverb.decay = value;
      optionsContext.setOptions(optionsCopy);
    },
    [reverb, optionsContext]
  );

  const handleDistortionWetChange = useCallback(
    (value: number) => {
      distortion.set({ wet: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.distortion.wet = value;
      optionsContext.setOptions(optionsCopy);
    },
    [distortion, optionsContext]
  );

  const handleDistortionChange = useCallback(
    (value: number) => {
      distortion.set({ distortion: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.distortion.distortion = value;
      optionsContext.setOptions(optionsCopy);
    },
    [distortion, optionsContext]
  );

  const handleBitCrusherWetChange = useCallback(
    (value: number) => {
      bitCrusher.set({ wet: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.bitCrusher.wet = value;
      optionsContext.setOptions(optionsCopy);
    },
    [bitCrusher, optionsContext]
  );

  const handleBitCrusherBitsChange = useCallback(
    (value: number) => {
      bitCrusher.set({ bits: value });

      const optionsCopy = Object.assign({}, optionsContext.options);
      optionsCopy.bitCrusher.bits = value;
      optionsContext.setOptions(optionsCopy);
    },
    [bitCrusher, optionsContext]
  );

  return (
    <div className="control-container effects-container">
      <div className="row justify-center">
        <div className="title-container">
          <label className="unselectable title-big">EFFECTS</label>
        </div>
      </div>
      <div className="row justify-between">
        <div className="delay-container">
          <label className="unselectable title-medium">DELAY</label>
          <div className="row">
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={delayWet}
                onValueChange={handleDelayWetChange}
                width={45.5}
                height={45.5}
                step={0.01}
              />
              <label className="unselectable title-small">Wet</label>
              <span className="tooltip unselectable value">{`${(
                delayWet * 100
              ).toFixed(0)}%`}</span>
            </div>
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={delayTime}
                onValueChange={handleDelayTimeChange}
                width={45.5}
                height={45.5}
                step={0.001}
              />
              <label className="unselectable title-small">Time</label>
              <span className="tooltip unselectable value">{`${Math.round(
                delayTime * 1000
              )}ms`}</span>
            </div>
          </div>
          <div className="row">
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={delayFeedback}
                onValueChange={handleDelayFeedbackChange}
                width={45.5}
                height={45.5}
                step={0.01}
              />
              <label className="unselectable title-small">Feedbk</label>
              <span className="tooltip unselectable value">{`${(
                delayFeedback * 100
              ).toFixed(0)}%`}</span>
            </div>
          </div>
        </div>
        <div className="bitcrusher-container">
          <label className="unselectable title-medium">BITCRUSH</label>
          <div className="row">
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={bitCrusherWet}
                onValueChange={handleBitCrusherWetChange}
                width={45.5}
                height={45.5}
                step={0.01}
              />
              <label className="unselectable title-small">Wet</label>
              <span className="tooltip unselectable value">{`${(
                bitCrusherWet * 100
              ).toFixed(0)}%`}</span>
            </div>
          </div>
          <div className="row">
            <div className="column hasTooltip">
              <Knob
                min={1}
                max={16}
                value={bitCrusherBits}
                onValueChange={handleBitCrusherBitsChange}
                width={45.5}
                height={45.5}
                step={1}
              />
              <label className="unselectable title-small">Bits</label>
              <span className="tooltip unselectable value">{`${Math.round(
                bitCrusherBits
              )}`}</span>
            </div>
          </div>
        </div>
        <div className="distortion-container">
          <label className="unselectable title-medium">DISTORT</label>
          <div className="row">
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={distortionWet}
                onValueChange={handleDistortionWetChange}
                width={45.5}
                height={45.5}
                step={0.01}
              />
              <label className="unselectable title-small">Wet</label>
              <span className="tooltip unselectable value">{`${(
                distortionWet * 100
              ).toFixed(0)}%`}</span>
            </div>
          </div>
          <div className="row">
            <div className="column hasTooltip">
              <Knob
                min={0}
                max={1}
                value={distortionAmount}
                onValueChange={handleDistortionChange}
                width={45.5}
                height={45.5}
                step={0.01}
              />
              <label className="unselectable title-small">Amount</label>
              <span className="tooltip unselectable value">{`${(
                distortionAmount * 100
              ).toFixed(0)}%`}</span>
            </div>
          </div>
        </div>
        <div className="reverb-container">
          <label className="unselectable title-medium">REVERB</label>
          <div className="column hasTooltip">
            <Knob
              min={0}
              max={1}
              value={reverbWet}
              onValueChange={handleReverbWetChange}
              width={45.5}
              height={45.5}
              step={0.01}
            />
            <label className="unselectable title-small">Wet</label>
            <span className="tooltip unselectable value">{`${(
              reverbWet * 100
            ).toFixed(0)}%`}</span>
          </div>
          <div className="column hasTooltip">
            <Knob
              min={1}
              max={30}
              value={reverbDecay}
              onValueChange={handleReverbDecayChange}
              width={45.5}
              height={45.5}
              step={1}
            />
            <label className="unselectable title-small">Decay</label>
            <span className="tooltip unselectable value">{`${Math.round(
              reverbDecay
            )}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(EffectsControls);
