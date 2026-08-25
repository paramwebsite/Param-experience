import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Factral = () => {
  const canvasRef = useRef(null);
  let count = 5000;
  let step = 0.01;
  let a0, a1, a2, a3;
  let scal = 200;
  let min = -3;
  let max = 3;

  const generateDots = (p) => {
    p.background(0);
    a0 = p.random(min, max) * step;
    a1 = p.random(min, max) * step;
    a2 = p.random(min, max) * step;
    a3 = p.random(min, max) * step;
    for (let i = 0; i < count; i++) {
      dott[i] = createDot(p, a0, a1, a2, a3);
    }
  };

  const createDot = (p, a0, a1, a2, a3) => {
    let dot = {};
    dot.nx = 0;
    dot.ny = 0;
    dot.ox = p.random(a0, a1);
    dot.oy = p.random(a2, a3);
    dot.update = () => {
      dot.nx = (p.sin(a0 * dot.oy) - p.cos(a1 * dot.ox)) * scal;
      dot.ny = (p.sin(a2 * dot.ox) - p.cos(a3 * dot.oy)) * scal;
      let col = p.color(dot.nx + dot.ny + 300, p.height / 2, p.height, 200);
      p.stroke(col);
      p.point(dot.nx, dot.ny);
      dot.ox = dot.nx;
      dot.oy = dot.ny;
    };
    return dot;
  };

  let dott = new Array(count);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(1000, 1000, p.P3D).parent(canvasRef.current);
        p.colorMode(p.HSB, p.height);
        generateDots(p);
      };

      p.draw = () => {
        p.translate(p.width / 2, p.height / 2);
        for (let i = 0; i < count; i++) {
          dott[i].update();
        }
      };

      p.mouseReleased = () => {
        generateDots(p);
      };
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication'>
      <ScienceAplicationNavBar />
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>
      <DialogBox value={"Factral - Touch to generate new fractal."} />
    </div>
  );
};

export default Factral;
