import React, { useState, useEffect } from "react";
import { Input, WebMidi } from "webmidi";
import { MidiProps } from "../types";

const Midi = ({ playNote, stopNote }: MidiProps) => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [selectedMidi, setSelectedMidi] = useState<Input>();

  useEffect(() => {
    const onEnabled = () => {
      setInputs((prev) => {
        return [
          ...prev,
          ...WebMidi.inputs.map((input) => {
            return input.name;
          }),
        ];
      });
    };

    if (!WebMidi.enabled) {
      WebMidi.enable()
        .then(onEnabled)
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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

  const handleSelect = async (name: string) => {
    if (selectedMidi) await selectedMidi.removeListener();
    setSelectedMidi(WebMidi.getInputByName(name));
  };

  return (
    <div>
      <label htmlFor="midiSelect">MIDI</label>
      <select
        name="midiSelect"
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
