import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const TunnelVision = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let t;
      let numberOfLines = 40;
      let a = 10;
      let b = 10;
      let c = 20;
      let d = 20;

      p.setup = () => {
        p.createCanvas(1112, 834).parent(canvasRef.current);
        p.fill(255, 255, 255);
        t = 0;
      };

      p.draw = () => {
        p.background(0, 0, 0);
        p.strokeWeight(2);
        p.stroke(t % 255, 200, 255 - (t % 255));
        for (let i = 0; i < numberOfLines; i++) {
          p.line(x(t + i), y(t + i), p.width / numberOfLines * (i + 1), 0);
          p.line(x(t + i), y(t + i), p.width / numberOfLines * i, p.height);
          p.line(x(t + i), y(t + i), 0, p.height / numberOfLines * i);
          p.line(x(t + i), y(t + i), p.width, p.height / numberOfLines * (i + 1));
        }
        t++;
      };

      p.mousePressed = () => {
        a = p.int(p.random(6, 20));
        b = p.int(p.random(6, 20));
        c = p.int(p.random(6, 20));
        d = p.int(p.random(6, 20));
      };

      const x = (t) => {
        return p.cos(t / a) * 200 + p.width / 2;
      };

      const y = (t) => {
        return p.sin(t / b) * 200 + p.height / 2;
      };

      const x2 = (t) => {
        return p.cos(t / c) * 400;
      };

      const y2 = (t) => {
        return p.sin(t / d) * 400;
      };
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication'>
     <ScienceAplicationNavBar/>
      <div ref={canvasRef} className='ScienceAplicationblock'></div>
      <DialogBox value={"Tunnel vision - Touch  to change tunnel view structure"}/>
    </div>
  );
};

export default  TunnelVision;
