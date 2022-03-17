import {
  render,
  screen,
  fireEvent,
  getByRole,
  findByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import RadioButtonGroup from "../RadioButtonGroup";
import { WAVEFORMS } from "../../globals/constants";

describe("RadioButtonGroup component", () => {
  const props = {
    items: WAVEFORMS,
    id: "waveforms",
    comparator: "sine",
    buttonWidth: 40,
    buttonHeight: 40,
    onValueChange: () => {},
  };

  test("it renders radio buttons each with a value from WAVEFORMS and a label", () => {
    const { getAllByRole } = render(<RadioButtonGroup {...props} />);
    for (let i = 0; i < WAVEFORMS.length; i = i + 1) {
      expect(getAllByRole("radio")[i]).toHaveAttribute("value", WAVEFORMS[i]);
    }
  });

  test("only the default radio button is checked", () => {
    const { getAllByRole } = render(<RadioButtonGroup {...props} />);
    for (let i = 0; i < WAVEFORMS.length; i = i + 1) {
      if (i === 0) {
        expect(getAllByRole("radio")[i]).toBeChecked();
      } else {
        expect(getAllByRole("radio")[i]).not.toBeChecked();
      }
    }
  });

  test("every radio button's label has an svg icon with the correct width and height", () => {
    const { getByTestId } = render(<RadioButtonGroup {...props} />);
    for (let i = 0; i < WAVEFORMS.length; i = i + 1) {
      expect(getByTestId(`${WAVEFORMS[i]}label`).firstChild.nodeName).toBe(
        "svg"
      );
      expect(getByTestId(`${WAVEFORMS[i]}label`).firstChild).toHaveStyle(
        `width: ${props.buttonWidth} height: ${props.buttonHeight}`
      );
    }
  });
});
