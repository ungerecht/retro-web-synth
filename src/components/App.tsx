import React from "react";
import Keyboard from "./Keyboard";
import "../fonts/PressStart2P.ttf";
import "../styles/App.css";
import OctaveSwitch from "./OctaveSwitch";
import WaveformSwitch from "./WaveformSwitch";
import Slider from "./Slider";

const App = () => {
  return (
    <div className="container">
      <div className="top-container">
        <WaveformSwitch />
        <div className="envelopes">
          <Slider label="ATK" />
          <Slider label="DEC" />
          <Slider label="SUS" />
          <Slider label="REL" />
        </div>
        <OctaveSwitch />
      </div>
      <div className="bottom-container">
        <Keyboard />
      </div>
    </div>
  );
};

export default App;
