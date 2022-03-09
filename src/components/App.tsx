import SynthController from "./SynthController";
import Footer from "./Footer";
import "../fonts/PressStart2P.ttf";
import "../styles/App.css";

const App = () => {
  return (
    <div className="App">
      <div className="warning">
        <h3>Please switch to landscape mode</h3>
      </div>
      <SynthController />
      <Footer />
    </div>
  );
};

export default App;
