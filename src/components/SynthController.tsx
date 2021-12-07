import React from "react";

import WaveformSwitch from "./WaveformSwitch";
import EnvelopeSliders from "./EnvelopeSliders";
import OctaveSwitch from "./OctaveSwitch";
import Keyboard from "./Keyboard";

import * as Tone from "tone";

import { KEY_TO_NOTE, VALID_KEYS } from "../globals/constants";
import { Envelope } from "../types";
import "../styles/SynthController.css";

type SynthState = {
  waveform: OscillatorType;
  envelope: Envelope;
  octave: number;
  pressedKeys: string[];
};

class SynthController extends React.Component<{}, SynthState> {
  synth: Tone.PolySynth;
  state: SynthState;
  constructor(props: any) {
    super(props);

    this.synth = new Tone.PolySynth(Tone.MonoSynth).toDestination();

    this.state = {
      waveform: "sine",
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
      octave: 4,
      pressedKeys: [],
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  onKeyDown = (event: any) => {
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
      this.synth.triggerAttack(KEY_TO_NOTE[key] + "4");
    }
  };

  onKeyUp = (event: any) => {
    const key = event.key;
    if (VALID_KEYS.includes(key)) {
      //remove key from pressedKeys
      this.setState((prevState) => ({
        pressedKeys: this.state.pressedKeys.filter((k) => k !== key),
      }));

      //trigger release of note
      this.synth.triggerRelease(KEY_TO_NOTE[key] + "4");
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

  setEnvelope = (value: number, label: string) => {
    switch (label) {
      case "ATK":
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
        return;
      case "DCY":
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
        return;
      case "SUS":
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
        return;
      case "REL":
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
        return;
    }
  };

  setOctave = (octave: number) => {
    this.setState({
      octave,
    });
  };

  render() {
    console.log(this.synth.get());
    return (
      <div className="container">
        <div className="top-container">
          <WaveformSwitch
            waveform={this.state.waveform}
            setWaveform={this.setWaveform}
          />
          <EnvelopeSliders
            envelope={this.state.envelope}
            setEnvelope={this.setEnvelope}
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
