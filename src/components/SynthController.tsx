import React from "react";

import WaveformSwitch from "./WaveformSwitch";
import EnvelopeSliders from "./EnvelopeSliders";
import OctaveSwitch from "./OctaveSwitch";
import FilterControls from "./FilterControls";
import Keyboard from "./Keyboard";
import Knob from "./Knob";

import * as Tone from "tone";

import { KEY_TO_NOTE, VALID_KEYS } from "../globals/constants";
import "../styles/SynthController.css";

type SynthState = {
  waveform: OscillatorType;
  envelope: Partial<Tone.EnvelopeOptions>;
  filter: Partial<Tone.FilterOptions>;
  octave: number;
  pressedKeys: string[];
  volume: number;
};

class SynthController extends React.Component<{}, SynthState> {
  synth: Tone.PolySynth;
  filter: Tone.Filter;
  masterVolume: Tone.Volume;
  state: SynthState;
  constructor(props: any) {
    super(props);

    this.synth = new Tone.PolySynth();
    this.filter = new Tone.Filter();
    this.masterVolume = new Tone.Volume(-10);

    this.state = {
      waveform: "sine",
      envelope: {
        attack: 0.01, //0 - 2
        decay: 1, //0 - 2
        sustain: 0.1, //0 - 1
        release: 1, //0 - 5
      },
      filter: {
        Q: 0, //0 - 20
        frequency: 440, // 20 - 20k
        gain: 0, // 0 - 5
        rolloff: -12, //-12 | -24 | -48 | -96
        type: "allpass", //lowpass | highpass | lowshelf | highshelf | notch | allpass | bandpass
      },
      octave: 4,
      pressedKeys: [],
      volume: -10,
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
      },
      envelope: this.state.envelope,
    });

    //set filter options to default
    this.filter.set(this.state.filter);

    //connect synth -> filter -> master volume -> output
    this.synth.chain(this.filter, this.masterVolume, Tone.Destination);
  };

  onKeyDown = (event: KeyboardEvent) => {
    // if key held down
    if (event.repeat) {
      return;
    }

    const key = event.key;

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
    const key = event.key;
    if (VALID_KEYS.includes(key)) {
      //remove key from pressedKeys
      this.setState({
        pressedKeys: this.state.pressedKeys.filter((k) => k !== key),
      });

      //trigger release of note
      this.synth.triggerRelease(KEY_TO_NOTE[key] + this.state.octave);
    }
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

  onVolumeChange = (volume: number) => {
    this.setState({ volume });
    if (volume === -60) {
      this.masterVolume.volume.value = Number.NEGATIVE_INFINITY;
    } else {
      this.masterVolume.volume.value = volume;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="top-container">
          <div className="volume-knob-container">
            <label className="volume-knob-label">VOLUME</label>
            <Knob
              min={-60}
              max={0}
              value={this.state.volume}
              onValueChange={this.onVolumeChange}
              width={50}
              height={50}
              step={1}
            />
            <p>{`${this.state.volume}db`}</p>
          </div>
          <WaveformSwitch
            waveform={this.state.waveform}
            setWaveform={this.setWaveform}
          />
          <EnvelopeSliders
            envelope={this.state.envelope}
            setAttack={this.setEnvelopeAttack}
            setDecay={this.setEnvelopeDecay}
            setSustain={this.setEnvelopeSustain}
            setRelease={this.setEnvelopeRelease}
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
          <OctaveSwitch octave={this.state.octave} setOctave={this.setOctave} />
        </div>
        <div className="bottom-container">
          <Keyboard pressedKeys={this.state.pressedKeys} />
        </div>
      </div>
    );
  }
}

export default SynthController;
