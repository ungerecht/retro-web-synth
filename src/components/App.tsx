import SynthController from "./SynthController";
import Footer from "./Footer";
import "../fonts/PressStart2P.ttf";
import "../styles/App.css";
import { useMobileOrientation, isMobile, isDesktop } from 'react-device-detect';

const App = () => {
  const { isLandscape } = useMobileOrientation()

  return (
    <div className="App">
      {(!isLandscape && isMobile) &&
        <div className="warning">
          <h3>Please switch to landscape mode</h3>
        </div>
      }
      {(isDesktop || (isLandscape && isMobile)) &&
        <SynthController />
      }
      <Footer />
    </div>
  );
};

export default App;
