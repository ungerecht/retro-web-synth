import React from "react";
import { defaults } from "../presets";
import { options } from "../types";

export const OptionsContext = React.createContext({
  options: defaults,
  setOptions: (options: options) => {},
});
