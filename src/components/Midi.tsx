import React, { useState, useEffect } from "react";
import { Input, WebMidi } from "webmidi";
import { MidiProps } from "../types";
import "../styles/Midi.css";

const Midi = ({ playNote, stopNote }: MidiProps) => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [selectedMidi, setSelectedMidi] = useState<Input>();

  const onEnabled = () => {
    const newInputs = WebMidi.inputs.map((input) => {
      return input.name;
    });

    setInputs((prev) => {
      return [...new Set([...prev, ...newInputs])];
    });
  };

  const findMidi = () => {
    WebMidi.enable()
      .then(onEnabled)
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (selectedMidi) {
      selectedMidi.addListener("noteon", (e) => {
        playNote(e.note.identifier, true);
      });
      selectedMidi.addListener("noteoff", (e) => {
        stopNote(e.note.identifier, true);
      });
    }
  }, [selectedMidi, playNote, stopNote]);

  const handleSelect = (name: string) => {
    if (selectedMidi) selectedMidi.removeListener();
    setSelectedMidi(WebMidi.getInputByName(name));
  };

  return (
    <div className="midi-container">
      <div
        className={`${"lightbulb"} ${
          selectedMidi?.connection ? "green" : "red"
        }`}
      />
      <label htmlFor="midiSelect">MIDI</label>
      <select
        className="midi-select"
        name="midiSelect"
        onClick={findMidi}
        onChange={(event) => handleSelect(event.target.value)}
      >
        <option value="">None</option>
        {inputs.map((input) => {
          return (
            <option key={input} value={input}>
              {input}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Midi;
