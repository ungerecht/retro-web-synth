import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

jest.mock("../SynthController");

describe("App component", () => {
  test("it renders without crashing", () => {
    render(<App />);
  });

  test("it renders the warning message", () => {
    const { getByText } = render(<App />);
    expect(getByText("Please switch to landscape mode")).toBeInTheDocument();
  });
});
