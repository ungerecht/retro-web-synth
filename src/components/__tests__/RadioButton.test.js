import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import RadioButton from "../RadioButton";

describe("RadioButton component", () => {
  test("it renders the icon if there is one", () => {
    render(<RadioButton value={"sine"} />);
    expect(document.getElementsByTagName("svg")).toHaveLength(1);
  });

  test("it renders the value if there is no icon", () => {
    const { getByText } = render(<RadioButton value={"value"} />);
    expect(getByText("value")).toBeInTheDocument();
  });
});
