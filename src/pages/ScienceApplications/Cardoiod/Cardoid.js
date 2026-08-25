import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import "../scienceAplication.css"
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Cardoid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let n = 300;
      let delta;
      let factor;

      p.setup = () => {
        p.createCanvas(600, 600).parent(canvasRef.current);
        delta = 2 * p.PI / n;
      };

      p.draw = () => {
        factor = 8 * p.mouseX / p.width;
        p.background(50);
        p.translate(p.width / 2, p.height / 2);
        p.stroke(30);
        p.strokeWeight(3);
        p.noFill();
        p.ellipse(0, 0, 400, 400);
        p.stroke(240);
        p.strokeWeight(5);
        for (let i = 0; i < n; i++) {
          p.point(200 * p.cos(i * delta), 200 * p.sin(i * delta));
          p.strokeWeight(1);
          p.line(
            200 * p.cos(i * delta),
            200 * p.sin(i * delta),
            200 * p.cos(factor * i * delta),
            200 * p.sin(factor * i * delta)
          );
        }
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
      <DialogBox value={"Cardoiod -Move the cursor/touch to see unique patterns"} />
    </div>
  );
};

export default Cardoid;
