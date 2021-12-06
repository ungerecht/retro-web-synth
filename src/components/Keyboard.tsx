import React, { useState, useEffect } from "react";
import Key from "./Key";
import _ from "lodash";
import * as Tone from "tone";
import { KEY_TO_NOTE, NOTES, VALID_KEYS } from "../globals/constants";
import "../styles/Keyboard.css";

const Keyboard = () => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const synth = new Tone.PolySynth().toDestination();

  useEffect(() => {
    const onKeyDown = (event: any) => {
      //if key held down
      if (event.repeat) {
        return;
      }
      const key = event.key;
      if (VALID_KEYS.includes(key) && !pressedKeys.includes(key)) {
        //add key to pressedKeys
        setPressedKeys((previousPressedKeys) => [...previousPressedKeys, key]);

        //play note
        console.log(KEY_TO_NOTE[key] + "4");
        synth.triggerAttackRelease(KEY_TO_NOTE[key] + "4", "8n");
      }
    };

    const onKeyUp = (event: any) => {
      const key = event.key;
      if (VALID_KEYS.includes(key)) {
        setPressedKeys((previousPressedKeys) =>
          previousPressedKeys.filter((k) => k !== key)
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keys = _.map(NOTES, (note, index) => {
    return <Key key={index} note={note} pressedKeys={pressedKeys} />;
  });

  return <div className="keyboard">{keys}</div>;
};

export default Keyboard;
