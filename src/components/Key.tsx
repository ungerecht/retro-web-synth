import React from "react";
import "../styles/Key.css";

interface KeyProps {
  note: string;
  //isPlaying: boolean;
}

const Key = (props: KeyProps) => {
  /*
  string note
  string white/black
  boolean isPlaying
  */

  let keyClassName = "key";
  if (keyIsSharp(props.note)) keyClassName += "-sharp";

  return (
    <div className={keyClassName}>
      <span>{props.note}</span>
    </div>
  );
};

const keyIsSharp = (note: string) => {
  return note.length > 1;
};

export default Key;
