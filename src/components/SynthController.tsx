import React from "react";

import OscillatorControls from "./OscillatorControls";
import MasterControls from "./MasterControls";
import EnvelopeControls from "./EnvelopeControls";
import FilterControls from "./FilterControls";
import Keyboard from "./Keyboard";

import * as Tone from "tone";

import { KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS } from "../globals/constants";
import "../styles/SynthController.css";
import EQ3Controls from "./EQ3Controls";

import EffectsControls from "./EffectsControls";
import { FilterRollOff } from "tone";

type SynthState = {
  baseOctave: number;
  pressedKeys: string[];
  masterVolume: number;
  synth1Options: {
    volume: number;
    detune: number;
    type: OscillatorType;
    phase: number;
  };
  synth2Options: {
    volume: number;
    detune: number;
    type: OscillatorType;
    phase: number;
  };
  envelopeOptions: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  filterOptions: {
    Q: number;
    frequency: number;
    gain: number;
    rolloff: Tone.FilterRollOff;
    type: BiquadFilterType;
  };
  reverbOptions: { wet: number; decay: number };
  eq3Options: {
    low: number;
    mid: number;
    high: number;
    lowFrequency: number;
    highFrequency: number;
  };
  distortionOptions: { distortion: number; wet: number };
};

class SynthController extends React.Component<{}, SynthState> {
  synth1: Tone.PolySynth;
  synth2: Tone.PolySynth;
  node1: Tone.Gain;
  node2: Tone.Gain;
  filter: Tone.Filter;
  masterVolume: Tone.Volume;
  reverb: Tone.Reverb;
  EQ3: Tone.EQ3;
  distortion: Tone.Distortion;
  state: SynthState;
  constructor(props: any) {
    super(props);
    this.state = {
      baseOctave: 2,
      pressedKeys: [],
      masterVolume: -10, // -60 - 0
      synth1Options: {
        volume: 0,
        detune: 0,
        type: "sine",
        phase: 0,
      },
      synth2Options: {
        volume: -10,
        detune: 0,
        type: "square",
        phase: 0,
      },
      envelopeOptions: {
        attack: 0.01, // 0 - 2
        decay: 1, // 0 - 2
        sustain: 0.1, // 0 - 1
        release: 1, // 0 - 5
      },
      filterOptions: {
        Q: 2, // 0 - 20
        frequency: 400, // 20 - 20k
        gain: 0, // 0 - 5
        rolloff: -12, // -12 | -24 | -48 | -96
        type: "allpass", // lowpass | highpass | lowshelf | highshelf | notch | allpass | bandpass
      },
      reverbOptions: {
        decay: 1, // 1 - 30
        wet: 0, // 0 - 1
      },
      eq3Options: {
        low: 0,
        mid: 0,
        high: 0,
        lowFrequency: 400,
        highFrequency: 2500,
      },
      distortionOptions: {
        distortion: 0,
        wet: 0,
      },
    };
    this.synth1 = new Tone.PolySynth();
    this.synth2 = new Tone.PolySynth();
    this.node1 = new Tone.Gain(0.5);
    this.node2 = new Tone.Gain(0.5);
    this.filter = new Tone.Filter(this.state.filterOptions);
    this.masterVolume = new Tone.Volume(this.state.masterVolume);
    this.reverb = new Tone.Reverb(this.state.reverbOptions);
    this.EQ3 = new Tone.EQ3(this.state.eq3Options);
    this.distortion = new Tone.Distortion(this.state.distortionOptions);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);

    this.initSynths();

    //send each synth through a Gain node to prevent clipping
    this.synth1.connect(this.node1);
    this.synth2.connect(this.node2);

    //connect both Gain nodes to the filter
    this.node1.connect(this.filter);
    this.node2.connect(this.filter);

    //connect the filter -> EQ3 -> distortion -> reverb -> masterVolume -> SPEAKERS

    this.filter.chain(
      this.EQ3,
      this.distortion,
      this.reverb,
      this.masterVolume,
      Tone.Destination
    );
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  initSynths = () => {
    //set default values for synth1
    this.synth1.set({
      volume: this.state.synth1Options.volume,
      detune: this.state.synth1Options.detune,
      oscillator: {
        type: this.state.synth1Options.type,
        phase: this.state.synth1Options.phase,
      },
      envelope: {
        attack: this.state.envelopeOptions.attack,
        decay: this.state.envelopeOptions.decay,
        sustain: this.state.envelopeOptions.sustain,
        release: this.state.envelopeOptions.release,
      },
    });

    // set default values for synth2
    this.synth2.set({
      volume: this.state.synth2Options.volume,
      detune: this.state.synth2Options.detune,
      oscillator: {
        type: this.state.synth2Options.type,
        phase: this.state.synth2Options.phase,
      },
      envelope: {
        attack: this.state.envelopeOptions.attack,
        decay: this.state.envelopeOptions.decay,
        sustain: this.state.envelopeOptions.sustain,
        release: this.state.envelopeOptions.release,
      },
    });
  };

  onKeyDown = (event: KeyboardEvent) => {
    // if key held down
    if (event.repeat) {
      return;
    }

    const key = event.key.toLowerCase();

    if (VALID_KEYS.includes(key) && !this.state.pressedKeys.includes(key)) {
      this.playNote(KEY_TO_NOTE[key], this.state.baseOctave);
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    if (VALID_KEYS.includes(key)) {
      this.stopNote(KEY_TO_NOTE[key], this.state.baseOctave);
    }
  };

  playNote = (note: string, octave: number) => {
    //add key to pressedKeys
    this.setState((prevState) => ({
      pressedKeys: [...prevState.pressedKeys, `${note}${octave}`],
    }));

    //play atack of note
    this.synth1.triggerAttack(note + octave);
    this.synth2.triggerAttack(note + octave);
  };

  stopNote = (note: string, octave: number) => {
    //remove key from pressedKeys
    this.setState({
      pressedKeys: this.state.pressedKeys.filter(
        (k) => k !== `${note}${octave}`
      ),
    });

    //trigger release of note
    this.synth1.triggerRelease(note + octave);
    this.synth2.triggerRelease(note + octave);
  };

  setSynthOption = (
    value: OscillatorType | number,
    target: "type" | "phase" | "volume" | "detune",
    synthNum: 1 | 2
  ) => {
    if (target === "phase" || target === "volume" || target === "detune") {
      value = Math.round(value as number);
    }

    if (target === "detune" || target === "volume") {
      this[`synth${synthNum}`].set({
        [target]: value,
      });
    } else {
      this[`synth${synthNum}`].set({
        oscillator: { [target]: value },
      });
    }

    if (synthNum === 1) {
      this.setState((prevState) => ({
        synth1Options: {
          ...prevState.synth1Options,
          [target]: value,
        },
      }));
    } else {
      this.setState((prevState) => ({
        synth2Options: {
          ...prevState.synth2Options,
          [target]: value,
        },
      }));
    }
  };

  setEnvelopeOption = (
    value: number,
    target: "attack" | "decay" | "sustain" | "release"
  ) => {
    value = Number(parseFloat(value.toString()).toFixed(2));
    this.synth1.set({
      envelope: { [target]: value },
    });
    this.synth2.set({
      envelope: { [target]: value },
    });
    this.setState((prevState) => ({
      envelopeOptions: {
        ...prevState.envelopeOptions,
        [target]: value,
      },
    }));
  };

  setFilterOption = (
    value: number | FilterRollOff | BiquadFilterType,
    target: "type" | "rolloff" | "Q" | "frequency" | "gain"
  ) => {
    if (target === "Q" || target === "frequency" || target === "gain") {
      value = Math.round(value as number);
    }
    this.filter.set({
      [target]: value,
    });

    this.setState((prevState) => ({
      filterOptions: {
        ...prevState.filterOptions,
        [target]: value,
      },
    }));
  };

  setReverbOption = (value: number, target: "wet" | "decay") => {
    if (target === "decay") {
      value = Math.round(value as number);
    }

    this.reverb.set({
      [target]: value,
    });

    this.setState((prevState) => ({
      reverbOptions: {
        ...prevState.reverbOptions,
        [target]: value,
      },
    }));
  };

  setDistortionOption = (value: number, target: "wet" | "distortion") => {
    this.distortion.set({
      [target]: value,
    });

    this.setState((prevState) => ({
      distortionOptions: {
        ...prevState.distortionOptions,
        [target]: value,
      },
    }));
  };

  setEQ3Option = (
    value: number,
    target: "low" | "mid" | "high" | "lowFrequency" | "highFrequency"
  ) => {
    value = Math.round(value as number);
    this.EQ3.set({
      [target]: value,
    });
    this.setState((prevState) => ({
      eq3Options: {
        ...prevState.eq3Options,
        [target]: value,
      },
    }));
  };

  setBaseOctave = (value: number) => {
    this.setState({ baseOctave: value });
  };

  setMasterVolume = (value: number) => {
    value = Math.round(value as number);
    this.masterVolume.set({ volume: value });
    this.setState({ masterVolume: value });
  };

  render() {
    return (
      <div className="container">
        <div className="top-container">
          <OscillatorControls
            synthNum={1}
            synthOptions={this.state.synth1Options}
            setSynthOption={this.setSynthOption}
          />
          <OscillatorControls
            synthNum={2}
            synthOptions={this.state.synth2Options}
            setSynthOption={this.setSynthOption}
          />
          <EnvelopeControls
            envelopeOptions={this.state.envelopeOptions}
            setEnvelopeOption={this.setEnvelopeOption}
          />
          <FilterControls
            filterOptions={this.state.filterOptions}
            setFilterOption={this.setFilterOption}
          />
          <EQ3Controls
            eq3Options={this.state.eq3Options}
            setEQ3Option={this.setEQ3Option}
          />
          <EffectsControls
            reverbOptions={this.state.reverbOptions}
            setReverbOption={this.setReverbOption}
            distortionOptions={this.state.distortionOptions}
            setDistortionOption={this.setDistortionOption}
          />
        </div>
        <div className="bottom-container">
          <MasterControls
            volume={this.state.masterVolume}
            setVolume={this.setMasterVolume}
            octave={this.state.baseOctave}
            setOctave={this.setBaseOctave}
          />
          <Keyboard
            pressedKeys={this.state.pressedKeys}
            baseOctave={this.state.baseOctave}
            playNote={this.playNote}
            stopNote={this.stopNote}
          />
        </div>
      </div>
    );
  }
}

export default SynthController;
