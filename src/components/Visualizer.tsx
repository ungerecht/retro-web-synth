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
  const middle = height / 2;

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
        context.lineWidth = 2;
        context.strokeStyle = "white";
        context.clearRect(0, 0, width, height);
        context.beginPath();
        // const barWidth = (width / audioData.length) * 2;
        // const barWidth = 1;
        // let posX = 0;
        for (let i = 0; i < audioData.length; i++) {
          // const barHeight = audioData[x] + 140;
          // context.fillStyle = "rgb(" + Math.floor(barHeight + 100) + ",10,50)";
          // context.fillRect(posX, height - barHeight, barWidth, barHeight / 2);
          // posX += barWidth;
          // const y = Math.abs(audioData[x]);
          const freq = Math.abs(audioData[i]);
          const x = getXofFrequency(fft.getFrequencyOfIndex(i), width);
          context.lineTo(!x ? 0 : x, freq);
        }
        context.stroke();
      }
    };
    draw();
  }, [audioData]);

  return <canvas ref={canvas} width={width} height={height} />;
};

const getIndexOfFrequency = (freq: number) => {
  return freq / 93.75;
};

export default Visualizer;
