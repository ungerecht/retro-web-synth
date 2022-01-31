import React from "react";

import OscillatorControls from "./OscillatorControls";
import OctaveSwitch from "./OctaveSwitch";
import FilterControls from "./FilterControls";
import Keyboard from "./Keyboard";

import * as Tone from "tone";

import { KEY_TO_NOTE, NOTE_TO_KEY, VALID_KEYS } from "../globals/constants";
import "../styles/SynthController.css";
import EQ3Controls from "./EQ3Controls";

import EffectsControls from "./EffectsControls";

type SynthState = {
  waveform: OscillatorType;
  osc1volume: number;
  osc1phase: number;
  osc1detune: number;
  envelope: Partial<Tone.EnvelopeOptions>;
  filter: Partial<Tone.FilterOptions>;
  octave: number;
  pressedKeys: string[];
  masterVolume: number;
  reverb: { decay: number; wet: number };
  eq3: {
    low: number;
    mid: number;
    high: number;
    lowFrequency: number;
    highFrequency: number;
  };
  distortion: { distortion: number; wet: number };
};

class SynthController extends React.Component<{}, SynthState> {
  synth: Tone.PolySynth;
  filter: Tone.Filter;
  lfo: Tone.LFO;
  masterVolume: Tone.Volume;
  reverb: Tone.Reverb;
  EQ3: Tone.EQ3;
  distortion: Tone.Distortion;
  state: SynthState;
  constructor(props: any) {
    super(props);
    this.synth = new Tone.PolySynth();
    this.filter = new Tone.Filter();
    this.lfo = new Tone.LFO(10, 0, 10);
    this.masterVolume = new Tone.Volume(-10);
    this.reverb = new Tone.Reverb({ wet: 0, decay: 1 });
    this.EQ3 = new Tone.EQ3();
    this.distortion = new Tone.Distortion({ wet: 0, distortion: 0 });

    this.state = {
      waveform: "sine",
      osc1volume: -5,
      osc1phase: 180,
      osc1detune: 0,
      envelope: {
        attack: 0.01, // 0 - 2
        decay: 1, // 0 - 2
        sustain: 0.1, // 0 - 1
        release: 1, // 0 - 5
      },
      filter: {
        Q: 1, // 0 - 20
        detune: 0, // -200 - 200
        frequency: 350, // 20 - 20k
        gain: 0, // 0 - 5
        rolloff: -12, // -12 | -24 | -48 | -96
        type: "allpass", // lowpass | highpass | lowshelf | highshelf | notch | allpass | bandpass
      },
      octave: 4,
      pressedKeys: [],
      masterVolume: -10, // -60 - 0
      reverb: {
        decay: 1, // 1 - 30
        wet: 0, // 0 - 1
      },
      distortion: {
        distortion: 0,
        wet: 0,
      },
      eq3: {
        low: 0,
        mid: 0,
        high: 0,
        lowFrequency: 400,
        highFrequency: 2500,
      },
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);

    this.initSynth();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  initSynth = () => {
    //set synth options to default
    this.synth.set({
      oscillator: {
        type: this.state.waveform,
        phase: this.state.osc1phase,
      },
      envelope: this.state.envelope,
      detune: this.state.osc1detune,
      volume: this.state.osc1volume,
    });

    //set filter options to default
    this.filter.set(this.state.filter);

    // this.lfo.connect(this.filter.Q);
    // this.lfo.start();

    //set EQ3 options to default
    this.EQ3.set(this.state.eq3);

    //connect synth to master output
    this.synth.chain(
      this.filter,
      this.EQ3,
      this.distortion,
      this.reverb,
      this.masterVolume,
      Tone.Destination
    );
  };

  onKeyDown = (event: KeyboardEvent) => {
    // if key held down
    if (event.repeat) {
      return;
    }

    const key = event.key.toLowerCase();

    if (VALID_KEYS.includes(key) && !this.state.pressedKeys.includes(key)) {
      //add key to pressedKeys
      this.setState((prevState) => ({
        pressedKeys: [...prevState.pressedKeys, key],
      }));

      //play attack of note
      this.synth.triggerAttack(KEY_TO_NOTE[key] + this.state.octave);
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    if (VALID_KEYS.includes(key)) {
      //remove key from pressedKeys
      this.setState({
        pressedKeys: this.state.pressedKeys.filter((k) => k !== key),
      });

      //trigger release of note
      this.synth.triggerRelease(KEY_TO_NOTE[key] + this.state.octave);
    }
  };

  playNote = (note: string) => {
    //add key to pressedKeys
    this.setState((prevState) => ({
      pressedKeys: [...prevState.pressedKeys, NOTE_TO_KEY[note]],
    }));

    //play atack of note
    this.synth.triggerAttack(note + this.state.octave);
  };

  stopNote = (note: string) => {
    const key = NOTE_TO_KEY[note];

    //remove key from pressedKeys
    this.setState({
      pressedKeys: this.state.pressedKeys.filter((k) => k !== key),
    });

    //trigger release of note
    this.synth.triggerRelease(note + this.state.octave);
  };

  setWaveform = (type: OscillatorType) => {
    this.synth.set({
      oscillator: {
        type,
      },
    });
    this.setState({
      waveform: type,
    });
  };

  setEnvelopeAttack = (value: number) => {
    value = parseFloat(value.toFixed(2));
    this.synth.set({
      envelope: {
        attack: value,
      },
    });
    this.setState((prevState) => ({
      envelope: {
        ...prevState.envelope,
        attack: value,
      },
    }));
  };

  setEnvelopeDecay = (value: number) => {
    value = parseFloat(value.toFixed(2));
    this.synth.set({
      envelope: {
        decay: value,
      },
    });
    this.setState((prevState) => ({
      envelope: {
        ...prevState.envelope,
        decay: value,
      },
    }));
  };

  setEnvelopeSustain = (value: number) => {
    value = parseFloat(value.toFixed(2));
    this.synth.set({
      envelope: {
        sustain: value,
      },
    });
    this.setState((prevState) => ({
      envelope: {
        ...prevState.envelope,
        sustain: value,
      },
    }));
  };

  setEnvelopeRelease = (value: number) => {
    value = parseFloat(value.toFixed(2));
    this.synth.set({
      envelope: {
        release: value,
      },
    });
    this.setState((prevState) => ({
      envelope: {
        ...prevState.envelope,
        release: value,
      },
    }));
  };

  setOctave = (octave: number) => {
    this.setState({
      octave,
    });
  };

  setFilterType = (type: BiquadFilterType) => {
    this.filter.set({
      type,
    });
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        type,
      },
    }));
  };

  setFilterRolloff = (rolloff: number) => {
    this.filter.set({
      rolloff: rolloff as Tone.FilterRollOff,
    });
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        rolloff: rolloff as Tone.FilterRollOff,
      },
    }));
  };

  setFilterQ = (Q: number) => {
    Q = Math.round(Q);
    this.filter.set({
      Q,
    });
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        Q,
      },
    }));
  };

  setFilterFrequency = (frequency: number) => {
    frequency = Math.round(frequency);
    this.filter.set({
      frequency,
    });
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        frequency,
      },
    }));
  };

  setFilterGain = (gain: number) => {
    gain = Math.round(gain);
    this.filter.set({
      gain,
    });
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        gain,
      },
    }));
  };

  setOscVolume = (volume: number) => {
    volume = Math.round(volume);
    this.synth.set({
      volume,
    });
    this.setState({ osc1volume: volume });
    if (volume === -60) {
      volume = Number.NEGATIVE_INFINITY;
    }
  };

  setOscPhase = (phase: number) => {
    phase = Math.round(phase);
    this.synth.set({
      oscillator: {
        phase,
      },
    });
    this.setState({ osc1phase: phase });
  };

  setOscDetune = (detune: number) => {
    detune = Math.round(detune);
    this.synth.set({
      detune,
    });
    this.setState({ osc1detune: detune });
  };

  setReverbDecay = (decay: number) => {
    decay = Math.round(decay);
    this.reverb.set({ decay });
    this.setState((prevState) => ({
      reverb: {
        ...prevState.reverb,
        decay,
      },
    }));
  };

  setReverbWet = (wet: number) => {
    this.reverb.set({ wet });
    this.setState((prevState) => ({
      reverb: {
        ...prevState.reverb,
        wet,
      },
    }));
  };

  setEQ3Low = (low: number) => {
    low = Math.round(low);
    this.EQ3.set({ low });
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        low,
      },
    }));
  };

  setEQ3Mid = (mid: number) => {
    mid = Math.round(mid);
    this.EQ3.set({ mid });
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        mid,
      },
    }));
  };

  setEQ3High = (high: number) => {
    high = Math.round(high);
    this.EQ3.set({ high });
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        high,
      },
    }));
  };

  setEQ3LowFrequency = (lowFrequency: number) => {
    lowFrequency = Math.round(lowFrequency);
    this.EQ3.set({ lowFrequency });
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        lowFrequency,
      },
    }));
  };

  setEQ3HighFrequency = (highFrequency: number) => {
    highFrequency = Math.round(highFrequency);
    this.EQ3.set({ highFrequency });
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        highFrequency,
      },
    }));
  };

  setDistortion = (distortion: number) => {
    distortion = parseFloat(distortion.toFixed(2));
    this.distortion.set({ distortion });
    this.setState((prevState) => ({
      distortion: {
        ...prevState.distortion,
        distortion,
      },
    }));
  };

  setDistortionWet = (wet: number) => {
    this.distortion.set({ wet });
    this.setState((prevState) => ({
      distortion: {
        ...prevState.distortion,
        wet,
      },
    }));
  };

  render() {
    return (
      <div className="container">
        <div className="top-container">
          <OscillatorControls
            waveform={this.state.waveform}
            envelope={this.state.envelope}
            volume={this.state.osc1volume}
            phase={this.state.osc1phase}
            detune={this.state.osc1detune}
            setWaveform={this.setWaveform}
            setAttack={this.setEnvelopeAttack}
            setDecay={this.setEnvelopeDecay}
            setSustain={this.setEnvelopeSustain}
            setRelease={this.setEnvelopeRelease}
            setVolume={this.setOscVolume}
            setPhase={this.setOscPhase}
            setDetune={this.setOscDetune}
          />
          <FilterControls
            filterState={this.state.filter}
            filter={this.filter}
            setFilterType={this.setFilterType}
            setFilterRolloff={this.setFilterRolloff}
            setFilterQ={this.setFilterQ}
            setFilterGain={this.setFilterGain}
            setFilterFrequency={this.setFilterFrequency}
          />
          <EQ3Controls
            eq3={this.state.eq3}
            setEQ3Low={this.setEQ3Low}
            setEQ3Mid={this.setEQ3Mid}
            setEQ3High={this.setEQ3High}
            setEQ3LowFrequency={this.setEQ3LowFrequency}
            setEQ3HighFrequency={this.setEQ3HighFrequency}
          />
          <EffectsControls
            reverb={this.state.reverb}
            distortion={this.state.distortion}
            setReverbDecay={this.setReverbDecay}
            setReverbWet={this.setReverbWet}
            setDistortion={this.setDistortion}
            setDistortionWet={this.setDistortionWet}
          />
        </div>
        <div className="bottom-container">
          <OctaveSwitch octave={this.state.octave} setOctave={this.setOctave} />
          <Keyboard
            pressedKeys={this.state.pressedKeys}
            playNote={this.playNote}
            stopNote={this.stopNote}
          />
        </div>
      </div>
    );
  }
}

export default SynthController;
