import { useEffect, useRef, useState } from "react";
import { FFT } from "tone";

type props = {
  isPlaying: boolean;
  fft: FFT;
};

const Visualizer = ({ isPlaying, fft }: props) => {
  const [audioData, setAudioData] = useState<Float32Array>();
  const canvas = useRef<HTMLCanvasElement>(null);
  const rafId = useRef<number>(0);
  const width = 256;
  const height = 256;
  const middle = height / 2;

  useEffect(() => {
    const tick = () => {
      const data = fft.getValue();
      console.log(fft);
      console.log(data);
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
        context.lineWidth = 2;
        context.strokeStyle = "white";
        context.clearRect(0, 0, width, height);
        context.beginPath();
        for (let x = 0; x < audioData.length; x++) {
          const y = Math.abs(audioData[x]);
          context.lineTo(x, y);
          context.lineTo(x, height);
        }
        context.stroke();
      }
    };
    draw();
  }, [audioData]);

  return <canvas ref={canvas} width={width} height={height} />;
};

export default Visualizer;
