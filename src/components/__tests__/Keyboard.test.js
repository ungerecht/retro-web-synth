import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Keyboard from "../Keyboard";

describe("Keyboard component", () => {
  test("it renders three octaves of keys (36 keys)", () => {
    render(<Keyboard octave={1} notesPlaying={[]} />);
    expect(document.getElementsByClassName("key")).toHaveLength(36);
  });
});
