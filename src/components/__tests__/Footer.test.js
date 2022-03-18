import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "../Footer";

describe("Footer component", () => {
  test("it contains the title", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("RETRO SYNTH")).toBeInTheDocument();
  });

  test("it contains the tagline", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("An open-source web synthesizer")).toBeInTheDocument();
  });

  test("it contains a link to my github", () => {
    const { getAllByRole } = render(<Footer />);
    expect(getAllByRole("link")[0]).toHaveAttribute(
      "href",
      "https://github.com/ungerecht"
    );
  });

  test("it contains a link to the github repo", () => {
    const { getAllByRole } = render(<Footer />);
    expect(getAllByRole("link")[1]).toHaveAttribute(
      "href",
      "https://github.com/ungerecht/retro-web-synth"
    );
  });
});
