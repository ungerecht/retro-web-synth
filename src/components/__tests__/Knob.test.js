import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Knob from "../Knob";

const props = {
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  width: 50,
  height: 50,
};

describe("Knob component", () => {
  test("it renders knob parent svg with width and height props", () => {
    const { getByTestId } = render(<Knob {...props} />);
    expect(getByTestId(`knob`).nodeName).toBe("svg");
    expect(getByTestId(`knob`)).toHaveStyle(
      `width: ${props.width} height: ${props.height}`
    );
  });

  test("it renders the knob's outer circle", () => {
    const radius = (props.height / 2) * 0.85;
    const { getByTestId } = render(<Knob {...props} />);
    expect(getByTestId("knob").firstElementChild.nodeName).toEqual("circle");
    expect(getByTestId("knob").firstElementChild.getAttribute("r")).toEqual(
      `${radius + 1}`
    );
  });

  test("it renders the knob's ticklines", () => {
    const { getByTestId } = render(<Knob {...props} />);
    expect(getByTestId("knob").firstElementChild.nextSibling.nodeName).toEqual(
      "path"
    );
    expect(getByTestId("knob").firstElementChild.nextSibling).toHaveAttribute(
      "d"
    );
    expect(
      getByTestId("knob").firstElementChild.nextSibling.getAttribute("d").length
    ).toBeGreaterThan(0);
  });

  test("it renders the knob's inner circle", () => {
    const radius = (props.height / 2) * 0.85;
    const { getByTestId } = render(<Knob {...props} />);
    expect(
      getByTestId("knob").firstElementChild.nextSibling.nextSibling.nodeName
    ).toEqual("circle");
    expect(
      getByTestId(
        "knob"
      ).firstElementChild.nextSibling.nextSibling.getAttribute("r")
    ).toEqual(`${radius - 5}`);
  });

  test("it renders the knob's bar, and it starts in the center", () => {
    const { getByTestId } = render(<Knob {...props} />);
    expect(
      getByTestId("knob").firstElementChild.nextSibling.nextSibling.nextSibling
        .nodeName
    ).toEqual("line");
    expect(
      getByTestId(
        "knob"
      ).firstElementChild.nextSibling.nextSibling.nextSibling.getAttribute("x1")
    ).toEqual(`${props.height / 2}`);
    expect(
      getByTestId(
        "knob"
      ).firstElementChild.nextSibling.nextSibling.nextSibling.getAttribute("y1")
    ).toEqual(`${props.height / 2}`);
  });

  test("it renders the knob's bar's line, and it starts in the center", () => {
    const { getByTestId } = render(<Knob {...props} />);
    expect(
      getByTestId("knob").firstElementChild.nextSibling.nextSibling.nextSibling
        .nextSibling.nodeName
    ).toEqual("line");
    expect(
      getByTestId(
        "knob"
      ).firstElementChild.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute(
        "x1"
      )
    ).toEqual(`${props.height / 2}`);
    expect(
      getByTestId(
        "knob"
      ).firstElementChild.nextSibling.nextSibling.nextSibling.nextSibling.getAttribute(
        "y1"
      )
    ).toEqual(`${props.height / 2}`);
  });
});
