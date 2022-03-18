import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import MasterControls from "../MasterControls";

describe("MasterControls component", () => {
  test("it renders two octave buttons", () => {
    render(<MasterControls octave={1} volume={0} />);
    expect(document.getElementsByTagName("button")).toHaveLength(2);
  });

  test("it shows the current octave", () => {
    const { getByText } = render(<MasterControls octave={1} volume={0} />);
    expect(getByText(1)).toBeInTheDocument();
  });

  test("decrement octave button is disabled when octave = 0", () => {
    render(<MasterControls octave={0} volume={0} />);
    expect(document.getElementsByTagName("button")[0]).toHaveAttribute(
      "disabled"
    );
  });

  test("increment octave button is disabled when octave = 6", () => {
    render(<MasterControls octave={6} volume={0} />);
    expect(document.getElementsByTagName("button")[1]).toHaveAttribute(
      "disabled"
    );
  });
});
