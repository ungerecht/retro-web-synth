import App from "../App";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../SynthController");

describe("App component", () => {
  test("it renders a div with className `App`", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass("App");
  });
});
