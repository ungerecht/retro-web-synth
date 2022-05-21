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
  FFT,
} from "tone";

import OscillatorControls from "./OscillatorControls";
import MasterControls from "./MasterControls";
import EnvelopeControls from "./EnvelopeControls";
import FilterControls from "./FilterControls";
import Keyboard from "./Keyboard";
import EffectsControls from "./EffectsControls";
import EQ3Controls from "./EQ3Controls";
import Midi from "./Midi";

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
  eq3: EQ3;
  distortion: Distortion;
  delay: FeedbackDelay;
  bitCrusher: BitCrusher;
  fft: FFT;
  state: SynthControllerState;
  constructor(props: any) {
    super(props);
    this.state = {
      baseOctave: 2,
      notesPlaying: [],
      masterVolume: -4, // -60 - 0
      dragging: false,
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
    this.masterVolume = new Volume();
    this.reverb = new Reverb(this.state.reverbOptions);
    this.eq3 = new EQ3(this.state.eq3Options);
    this.distortion = new Distortion(this.state.distortionOptions);
    this.delay = new FeedbackDelay(this.state.delayOptions);
    this.bitCrusher = new BitCrusher(this.state.bitCrusherOptions);
    this.fft = new FFT({ size: 512 });
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

    //connect the filter -> distortion -> EQ3 -> bitCrusher -> delay -> reverb -> masterVolume -> fft
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

  render() {
    return (
      <div className="container">
        <div className="top-bar">
          <Midi playNote={this.playNote} stopNote={this.stopNote} />
        </div>
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
      </div>
    );
  }
}

export default SynthController;
