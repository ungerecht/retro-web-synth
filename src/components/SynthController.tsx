import React, { Component } from "react";

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
  FFT,
  Synth,
} from "tone";

import { OptionsContext } from "../contexts/OptionsContext";

import OscillatorControls from "./OscillatorControls";
import MasterControls from "./MasterControls";
import EnvelopeControls from "./EnvelopeControls";
import FilterControls from "./FilterControls";
import Keyboard from "./Keyboard";
import EffectsControls from "./EffectsControls";
import EQ3Controls from "./EQ3Controls";
import Midi from "./Midi";
import Presets from "./Presets";

import { KEY_TO_FULLNOTE, VALID_KEYS } from "../globals/constants";

import { options, SynthControllerState } from "../types";

import { defaults } from "../presets";

import "../styles/SynthController.css";

class SynthController extends Component<{}, SynthControllerState> {
  synth1: PolySynth;
  synth2: PolySynth;
  node1: Gain;
  node2: Gain;
  filter: Filter;
  masterVolume: Volume;
  reverb: Reverb;
  eq3: EQ3;
  distortion: Distortion;
  delay: FeedbackDelay;
  bitCrusher: BitCrusher;
  fft: FFT;
  state: SynthControllerState;
  constructor(props: any) {
    super(props);
    this.state = {
      baseOctave: 3,
      notesPlaying: [],
      dragging: false,
      options: defaults,
    };
    this.synth1 = new PolySynth(Synth, defaults.synth1);
    this.synth2 = new PolySynth(Synth, defaults.synth2);
    this.node1 = new Gain(0.5);
    this.node2 = new Gain(0.5);
    this.filter = new Filter(defaults.filter);
    this.masterVolume = new Volume(defaults.masterVolume);
    this.reverb = new Reverb(defaults.reverb);
    this.eq3 = new EQ3(defaults.eq3);
    this.distortion = new Distortion(defaults.distortion);
    this.delay = new FeedbackDelay(defaults.delay);
    this.bitCrusher = new BitCrusher(defaults.bitCrusher);
    this.fft = new FFT(512);
    this.init();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  initEnvelopes = () => {
    //set envelopes values for synth1
    this.synth1.set({
      envelope: defaults.envelope,
    });
    // set envelopes values for synth2
    this.synth2.set({
      envelope: defaults.envelope,
    });
  };

  init = () => {
    this.initEnvelopes();

    //send each synth through a Gain node to prevent clipping
    this.synth1.connect(this.node1);
    this.synth2.connect(this.node2);

    //connect both Gain nodes to the filter
    this.node1.connect(this.filter);
    this.node2.connect(this.filter);

    //connect the filter -> EQ3 -> distortion -> bitCrusher -> delay -> reverb -> masterVolume -> fft
    this.filter.chain(
      this.eq3,
      this.distortion,
      this.bitCrusher,
      this.delay,
      this.reverb,
      this.masterVolume,
      this.fft,
      Destination
    );
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

      this.playNote(fullNote, false, true);
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

  playNote = (
    fullNote: string,
    startDrag: boolean = false,
    isKeyPress: boolean = false
  ) => {
    if (!this.state.notesPlaying.includes(fullNote)) {
      //play attack of note
      if (startDrag || this.state.dragging || isKeyPress) {
        this.synth1.triggerAttack(fullNote);
        this.synth2.triggerAttack(fullNote);

        //add note to notesPlaying
        this.setState((prevState) => ({
          notesPlaying: [...prevState.notesPlaying, fullNote],
          dragging: startDrag ? true : prevState.dragging,
        }));
      }
    }
  };

  stopNote = (fullNote: string, stopDrag: boolean = false) => {
    if (this.state.notesPlaying.includes(fullNote)) {
      //trigger release of note
      this.synth1.triggerRelease(fullNote);
      this.synth2.triggerRelease(fullNote);

      //remove note from notesPlaying
      this.setState((prevState) => ({
        notesPlaying: this.state.notesPlaying.filter((n) => n !== fullNote),
        dragging: stopDrag ? false : prevState.dragging,
      }));
    } else if (!fullNote) {
      // stop drag on empty note
      this.setState({
        dragging: false,
      });
    }
  };

  setBaseOctave = (value: number) => {
    this.setState({ baseOctave: value });
    //stop all notes in notesPlaying
    this.state.notesPlaying.forEach((note) => {
      this.stopNote(note);
    });
  };

  changePreset = (preset: options) => {
    this.synth1.set(preset.synth1);
    this.synth2.set(preset.synth2);
    this.synth1.set({ envelope: preset.envelope });
    this.synth2.set({ envelope: preset.envelope });
    this.filter.set(preset.filter);
    this.masterVolume.set({ volume: preset.masterVolume });
    this.reverb.set(preset.reverb);
    this.eq3.set(preset.eq3);
    this.distortion.set(preset.distortion);
    this.delay.set(preset.delay);
    this.bitCrusher.set(preset.bitCrusher);
    this.setState({ options: preset });
  };

  setOptions = (options: options) => {
    this.setState({ options: options });
  };

  render() {
    return (
      <div className="container">
        <div className="top-bar">
          <Midi playNote={this.playNote} stopNote={this.stopNote} />
          <Presets changePreset={this.changePreset} />
        </div>
        <OptionsContext.Provider
          value={{ options: this.state.options, setOptions: this.setOptions }}
        >
          <div className="top-container">
            <OscillatorControls synthNum={1} synth={this.synth1} />
            <OscillatorControls synthNum={2} synth={this.synth2} />
            <EnvelopeControls synth1={this.synth1} synth2={this.synth2} />
            <FilterControls
              filter={this.filter}
              isPlaying={this.state.notesPlaying.length > 0}
              fft={this.fft}
            />
            <EQ3Controls eq3={this.eq3} />
            <EffectsControls
              reverb={this.reverb}
              distortion={this.distortion}
              delay={this.delay}
              bitCrusher={this.bitCrusher}
            />
          </div>
          <div className="bottom-container">
            <MasterControls
              masterVolume={this.masterVolume}
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
        </OptionsContext.Provider>
      </div>
    );
  }
}

export default SynthController;
