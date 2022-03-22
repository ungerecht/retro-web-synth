import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import KeyboardOctave from "../KeyboardOctave";

describe("KeyboardOctave component", () => {
  test("it renders all of the keys in an octave", () => {
    render(<KeyboardOctave octave={1} notesPlaying={[]} />);
    expect(document.getElementsByClassName("key")).toHaveLength(12);
  });
});
