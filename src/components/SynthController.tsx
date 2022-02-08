import { Component } from "react";

import {
  PolySynth,
  Gain,
  Filter,
  Volume,
  Reverb,
  Distortion,
  EQ3,
  FeedbackDelay,
  BitCrusher,
  Destination,
  FilterRollOff,
} from "tone";

import OscillatorControls from "./OscillatorControls";
import MasterControls from "./MasterControls";
import EnvelopeControls from "./EnvelopeControls";
import FilterControls from "./FilterControls";
import Keyboard from "./Keyboard";
import EffectsControls from "./EffectsControls";
import EQ3Controls from "./EQ3Controls";

import { KEY_TO_FULLNOTE, VALID_KEYS } from "../globals/constants";

import { SynthControllerState } from "../types";

import "../styles/SynthController.css";

class SynthController extends Component<{}, SynthControllerState> {
  synth1: PolySynth;
  synth2: PolySynth;
  node1: Gain;
  node2: Gain;
  filter: Filter;
  masterVolume: Volume;
  reverb: Reverb;
  EQ3: EQ3;
  distortion: Distortion;
  delay: FeedbackDelay;
  bitCrusher: BitCrusher;
  state: SynthControllerState;
  constructor(props: any) {
    super(props);
    this.state = {
      baseOctave: 2,
      notesPlaying: [],
      masterVolume: -4, // -60 - 0
      synth1Options: {
        volume: 0, // -60 - 0
        detune: 0, //-1200 - 1200
        type: "sine", //sine | square | triangle | saw
        phase: 0, //-180 - 180
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
        lowFrequency: 250,
        highFrequency: 2500,
      },
      distortionOptions: {
        distortion: 0,
        wet: 0,
      },
      delayOptions: {
        wet: 0,
        delayTime: 0,
        feedback: 0.2,
      },
      bitCrusherOptions: {
        wet: 0,
        bits: 16,
      },
    };
    this.synth1 = new PolySynth();
    this.synth2 = new PolySynth();
    this.node1 = new Gain(0.5);
    this.node2 = new Gain(0.5);
    this.filter = new Filter(this.state.filterOptions);
    this.masterVolume = new Volume(this.state.masterVolume);
    this.reverb = new Reverb(this.state.reverbOptions);
    this.EQ3 = new EQ3(this.state.eq3Options);
    this.distortion = new Distortion(this.state.distortionOptions);
    this.delay = new FeedbackDelay(this.state.delayOptions);
    this.bitCrusher = new BitCrusher(this.state.bitCrusherOptions);
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

    //connect the filter -> distortion -> EQ3 -> bitCrusher -> delay -> reverb -> masterVolume
    this.filter.chain(
      this.EQ3,
      this.distortion,
      this.bitCrusher,
      this.delay,
      this.reverb,
      this.masterVolume,
      Destination
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
    if (VALID_KEYS.includes(key)) {
      const fullNoteObj = KEY_TO_FULLNOTE[key];
      const fullNote = `${fullNoteObj.note}${
        this.state.baseOctave + fullNoteObj.octaveMod
      }`;

      this.playNote(fullNote);
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    const key: string = event.key.toLowerCase();

    if (VALID_KEYS.includes(key)) {
      const fullNoteObj = KEY_TO_FULLNOTE[key];
      const fullNote = `${fullNoteObj.note}${
        this.state.baseOctave + fullNoteObj.octaveMod
      }`;

      this.stopNote(fullNote);
    }
  };

  playNote = (fullNote: string) => {
    if (!this.state.notesPlaying.includes(fullNote)) {
      //play atack of note
      this.synth1.triggerAttack(fullNote);
      this.synth2.triggerAttack(fullNote);

      //add note to notesPlaying
      this.setState((prevState) => ({
        notesPlaying: [...prevState.notesPlaying, fullNote],
      }));
    }
  };

  stopNote = (fullNote: string) => {
    if (this.state.notesPlaying.includes(fullNote)) {
      //trigger release of note
      this.synth1.triggerRelease(fullNote);
      this.synth2.triggerRelease(fullNote);

      //remove note from notesPlaying
      this.setState({
        notesPlaying: this.state.notesPlaying.filter((n) => n !== fullNote),
      });
    }
  };

  setSynthOption = (
    value: OscillatorType | number,
    target: "type" | "phase" | "volume" | "detune",
    synthNum: 1 | 2
  ) => {
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

  setDelayOption = (
    value: number,
    target: "wet" | "delayTime" | "feedback"
  ) => {
    this.delay.set({ [target]: value });
    this.setState((prevState) => ({
      delayOptions: {
        ...prevState.delayOptions,
        [target]: value,
      },
    }));
  };

  setBitCrusherOption = (value: number, target: "wet" | "bits") => {
    this.bitCrusher.set({ [target]: value });
    this.setState((prevState) => ({
      bitCrusherOptions: {
        ...prevState.bitCrusherOptions,
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

  setReverbOption = (value: number, target: "wet" | "decay") => {
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

  setEQ3Option = (
    value: number,
    target: "low" | "mid" | "high" | "lowFrequency" | "highFrequency"
  ) => {
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
    //stop all notes in notesPlaying
    this.state.notesPlaying.forEach((note) => {
      this.stopNote(note);
    });
    //empty notesPlaying array
    this.setState({ notesPlaying: [] });
  };

  setMasterVolume = (value: number) => {
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
            delayOptions={this.state.delayOptions}
            setDelayOption={this.setDelayOption}
            bitCrusherOptions={this.state.bitCrusherOptions}
            setBitCrusherOption={this.setBitCrusherOption}
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
            notesPlaying={this.state.notesPlaying}
            octave={this.state.baseOctave}
            playNote={this.playNote}
            stopNote={this.stopNote}
          />
        </div>
      </div>
    );
  }
}

export default SynthController;
