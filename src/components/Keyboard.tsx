import React from "react";
import Key from "./Key";
import _ from "lodash";
import { NOTES } from "../globals/constants";

import "../styles/Keyboard.css";

interface KeyboardProps {
  pressedKeys: string[];
}

const Keyboard = ({ pressedKeys }: KeyboardProps) => {
  const keys = _.map(NOTES, (note, index) => {
    return <Key key={index} note={note} pressedKeys={pressedKeys} />;
  });

  return <div className="keyboard">{keys}</div>;
};

export default Keyboard;
