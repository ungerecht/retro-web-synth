import SynthController from "./SynthController";
import "../fonts/PressStart2P.ttf";
import "../styles/App.css";

const App = () => {
  return (
    <div className="App">
      <div className="warning">
        <h3>Please switch to landscape mode</h3>
      </div>
      <SynthController />
    </div>
  );
};

export default App;
