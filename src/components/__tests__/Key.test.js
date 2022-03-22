import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Key from "../Key";

describe("Key component", () => {
  test("Key className is `key` when not flat or playing", () => {
    render(<Key note="A" octave={0} notesPlaying={[]} />);
    expect(document.getElementsByClassName("key")).toHaveLength(1);
  });

  test("Key className is `key flat` when flat but not playing", () => {
    render(<Key note="Ab" octave={0} notesPlaying={[]} />);
    expect(document.getElementsByClassName("key flat")).toHaveLength(1);
  });

  test("Key className is `key pressed` when not flat but is playing", () => {
    render(<Key note="A" octave={0} notesPlaying={["A0"]} />);
    expect(document.getElementsByClassName("key pressed")).toHaveLength(1);
  });

  test("Key className is `key flat pressed` when flat and is playing", () => {
    render(<Key note="Ab" octave={0} notesPlaying={["Ab0"]} />);
    expect(document.getElementsByClassName("key flat pressed")).toHaveLength(1);
  });
});
