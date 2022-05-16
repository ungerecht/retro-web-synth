import { useEffect, useRef, useState } from "react";
import { FFT } from "tone";
import { getXofFrequency } from "../utils";

type props = {
  isPlaying: boolean;
  fft: FFT;
};

const Visualizer = ({ isPlaying, fft }: props) => {
  const [audioData, setAudioData] = useState<Float32Array>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const rafId = useRef<number>(0);
  const width = 256;
  const height = 200;

  useEffect(() => {
    const tick = () => {
      const data = fft.getValue();
      setAudioData(data);
      rafId.current = requestAnimationFrame(tick);
    };
    if (isPlaying) rafId.current = requestAnimationFrame(tick);
    else {
      const context = canvas.current?.getContext("2d");
      if (context) {
        context.clearRect(0, 0, width, height);
      }
    }
    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [fft, isPlaying]);

  useEffect(() => {
    const draw = () => {
      const context = canvas.current?.getContext("2d");
      if (context && audioData) {
        context.lineWidth = 1;
        context.clearRect(0, 0, width, height);
        let path = new Path2D();
        path.moveTo(0, height);
        for (let i = 0; i < audioData.length; i++) {
          const freq = height - (audioData[i] + 140);
          let x = getXofFrequency(fft.getFrequencyOfIndex(i), width);
          if (x < 0) {
            x = 0;
          }
          path.lineTo(x, freq);
        }
        path.lineTo(width, height);
        path.lineTo(0, height);
        path.closePath();
        const gradient = context.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "darkblue");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(0.95, "deepskyblue");
        context.fillStyle = gradient;
        context.fill(path);
      }
    };
    draw();
  }, [audioData, fft]);

  return <canvas ref={canvas} width={width} height={height} />;
};

export default Visualizer;
