import React from "react";
import Key from "./Key";
import "../styles/Keyboard.css";

const Keyboard = () => {
  /* 
    render 24 keys
    track input
    play notes
    */
  return (
    <div className="keyboard">
      <Key note="f" />
      <Key note="f#" />
      <Key note="g" />
      <Key note="g#" />
      <Key note="a" />
      <Key note="a#" />
      <Key note="b" />
      <Key note="c" />
      <Key note="c#" />
      <Key note="d" />
      <Key note="d#" />
      <Key note="e" />
      <Key note="f" />
      <Key note="f#" />
      <Key note="g" />
      <Key note="g#" />
      <Key note="a" />
      <Key note="a#" />
      <Key note="b" />
      <Key note="c" />
      <Key note="c#" />
      <Key note="d" />
      <Key note="d#" />
      <Key note="e" />
    </div>
  );
};

export default Keyboard;
