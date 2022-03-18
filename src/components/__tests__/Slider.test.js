import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Slider from "../Slider";

const props = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  width: 50,
  height: 100,
};

describe("Slider component", () => {
  test("it renders slider parent svg with width and height props", () => {
    const { getByTestId } = render(<Slider {...props} />);
    expect(getByTestId(`slider`).nodeName).toBe("svg");
    expect(getByTestId(`slider`)).toHaveStyle(
      `width: ${props.width} height: ${props.height}`
    );
  });

  test("it renders the slider's ticklines", () => {
    const { getByTestId } = render(<Slider {...props} />);
    expect(getByTestId("slider").firstElementChild.nodeName).toEqual("path");
    expect(getByTestId("slider").firstElementChild).toHaveAttribute("d");
    expect(
      getByTestId("slider").firstElementChild.getAttribute("d").length
    ).toBeGreaterThan(0);
  });

  test("it renders the track line correctly", () => {
    const { getByTestId } = render(<Slider {...props} />);
    const x = `${props.width / 2 - 5}`;
    const y = `0`;
    expect(
      getByTestId("slider").firstElementChild.nextSibling.nodeName
    ).toEqual("rect");
    expect(
      getByTestId("slider").firstElementChild.nextSibling.getAttribute("x")
    ).toEqual(x);
    expect(
      getByTestId("slider").firstElementChild.nextSibling.getAttribute("y")
    ).toEqual(y);
    expect(
      getByTestId("slider").firstElementChild.nextSibling.getAttribute("height")
    ).toEqual(`${props.height}`);
  });

  test("it renders the slider's bar", () => {
    const { getByTestId } = render(<Slider {...props} />);
    expect(
      getByTestId("slider").firstElementChild.nextSibling.nextSibling.nodeName
    ).toEqual("rect");
  });

  test("it renders the slider's bar's line, and it's in the center of the bar", () => {
    const { getByTestId } = render(<Slider {...props} />);
    const barHeight = Number(
      getByTestId(
        "slider"
      ).firstElementChild.nextSibling.nextSibling.getAttribute("height")
    );
    const barY = Number(
      getByTestId(
        "slider"
      ).firstElementChild.nextSibling.nextSibling.getAttribute("y")
    );
    expect(
      getByTestId("slider").firstElementChild.nextSibling.nextSibling
        .nextSibling.nodeName
    ).toEqual("line");
    expect(
      getByTestId(
        "slider"
      ).firstElementChild.nextSibling.nextSibling.nextSibling.getAttribute("y1")
    ).toEqual(`${barHeight / 2 + barY}`);
  });
});
