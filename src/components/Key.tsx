import _ from "lodash";
import React from "react";
import { NOTE_TO_KEY } from "../globals/constants";
import "../styles/Key.css";

interface KeyProps {
  note: string;
  pressedKeys: string[];
  //isPlaying: boolean;
}

const Key = (props: KeyProps) => {
  let keyClassName = "key";
  if (keyIsSharp(props.note)) keyClassName += " sharp";
  if (keyIsPressed(props.note, props.pressedKeys)) keyClassName += " pressed";

  return (
    <div className={keyClassName}>
      <span>{props.note}</span>
    </div>
  );
};

const keyIsPressed = (note: string, pressedKeys: string[]) => {
  return _.includes(pressedKeys, NOTE_TO_KEY[note]);
};

const keyIsSharp = (note: string) => {
  return note.length > 1;
};

export default Key;
