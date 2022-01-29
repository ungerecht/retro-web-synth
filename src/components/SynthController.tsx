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
  masterVolume: Tone.Volume;
  reverb: Tone.Reverb;
  EQ3: Tone.EQ3;
  distortion: Tone.Distortion;
  state: SynthState;
  constructor(props: any) {
    super(props);
    this.synth = new Tone.PolySynth();
    this.filter = new Tone.Filter();
    this.masterVolume = new Tone.Volume(-10);
    this.reverb = new Tone.Reverb();
    this.EQ3 = new Tone.EQ3();
    this.distortion = new Tone.Distortion(0);

    this.state = {
      waveform: "sine",
      osc1volume: 0,
      osc1phase: 0,
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
        frequency: 440, // 20 - 20k
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
    });

    //set filter options to default
    this.filter.set(this.state.filter);

    //set reverb options to default
    this.reverb.set(this.state.reverb);

    //set EQ3 options to default
    this.EQ3.set(this.state.eq3);

    //set distortion options to default
    this.distortion.set(this.state.distortion);

    console.log(this.synth);

    //connect synth -> filter -> EQ3 -> distortion -> reverb -> master volume -> output
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
    this.setState({
      waveform: type,
    });
    this.synth.set({
      oscillator: {
        type,
      },
    });
  };

  setEnvelopeAttack = (value: number) => {
    value = parseFloat(value.toFixed(2));
    this.setState((prevState) => ({
      envelope: {
        ...prevState.envelope,
        attack: value,
      },
    }));
    this.synth.set({
      envelope: {
        attack: value,
      },
    });
  };

  setEnvelopeDecay = (value: number) => {
    value = parseFloat(value.toFixed(2));
    this.setState((prevState) => ({
      envelope: {
        ...prevState.envelope,
        decay: value,
      },
    }));
    this.synth.set({
      envelope: {
        decay: value,
      },
    });
  };

  setEnvelopeSustain = (value: number) => {
    value = parseFloat(value.toFixed(2));
    this.setState((prevState) => ({
      envelope: {
        ...prevState.envelope,
        sustain: value,
      },
    }));
    this.synth.set({
      envelope: {
        sustain: value,
      },
    });
  };

  setEnvelopeRelease = (value: number) => {
    value = parseFloat(value.toFixed(2));
    this.setState((prevState) => ({
      envelope: {
        ...prevState.envelope,
        release: value,
      },
    }));
    this.synth.set({
      envelope: {
        release: value,
      },
    });
  };

  setOctave = (octave: number) => {
    this.setState({
      octave,
    });
  };

  setFilterType = (type: BiquadFilterType) => {
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        type,
      },
    }));
    this.filter.set({
      type,
    });
  };

  setFilterRolloff = (rolloff: number) => {
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        rolloff: rolloff as Tone.FilterRollOff,
      },
    }));
    this.filter.set({
      rolloff: rolloff as Tone.FilterRollOff,
    });
  };

  setFilterQ = (Q: number) => {
    Q = Math.round(Q);
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        Q,
      },
    }));
    this.filter.set({
      Q,
    });
  };

  setFilterFrequency = (frequency: number) => {
    frequency = Math.round(frequency);
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        frequency,
      },
    }));
    this.filter.set({
      frequency,
    });
  };

  setFilterGain = (gain: number) => {
    gain = Math.round(gain);
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        gain,
      },
    }));
    this.filter.set({
      gain,
    });
  };

  setOscVolume = (volume: number) => {
    volume = Math.round(volume);
    this.setState({ osc1volume: volume });
    if (volume === -60) {
      volume = Number.NEGATIVE_INFINITY;
    }
    this.synth.set({
      volume,
    });
  };

  setOscPhase = (phase: number) => {
    this.setState({ osc1phase: phase });
    this.synth.set({
      oscillator: {
        phase,
      },
    });
  };

  setOscDetune = (detune: number) => {
    this.setState({ osc1detune: detune });
    this.synth.set({
      detune,
    });
  };

  setReverbDecay = (decay: number) => {
    decay = Math.round(decay);
    this.setState((prevState) => ({
      reverb: {
        ...prevState.reverb,
        decay,
      },
    }));
    this.reverb.set({ decay });
  };

  setReverbWet = (wet: number) => {
    this.setState((prevState) => ({
      reverb: {
        ...prevState.reverb,
        wet,
      },
    }));
    this.reverb.set({ wet });
  };

  setEQ3Low = (low: number) => {
    low = Math.round(low);
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        low,
      },
    }));
    this.EQ3.set({ low });
  };

  setEQ3Mid = (mid: number) => {
    mid = Math.round(mid);
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        mid,
      },
    }));
    this.EQ3.set({ mid });
  };

  setEQ3High = (high: number) => {
    high = Math.round(high);
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        high,
      },
    }));
    this.EQ3.set({ high });
  };

  setEQ3LowFrequency = (lowFrequency: number) => {
    lowFrequency = Math.round(lowFrequency);
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        lowFrequency,
      },
    }));
    this.EQ3.set({ lowFrequency });
  };

  setEQ3HighFrequency = (highFrequency: number) => {
    highFrequency = Math.round(highFrequency);
    this.setState((prevState) => ({
      eq3: {
        ...prevState.eq3,
        highFrequency,
      },
    }));
    this.EQ3.set({ highFrequency });
  };

  setDistortion = (distortion: number) => {
    distortion = parseFloat(distortion.toFixed(2));
    this.setState((prevState) => ({
      distortion: {
        ...prevState.distortion,
        distortion,
      },
    }));
    this.distortion.set({ distortion });
  };

  setDistortionWet = (wet: number) => {
    this.setState((prevState) => ({
      distortion: {
        ...prevState.distortion,
        wet,
      },
    }));
    this.distortion.set({ wet });
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
