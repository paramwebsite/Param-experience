import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const SquarePattern = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(640, 640).parent(canvasRef.current);
        p.noFill();
      };

      p.draw = () => {
        p.noCursor();
        p.background(0);

        let maxX = (180 / p.width) * p.mouseX;
        let maxY = (180 / p.height) * p.mouseX;

        p.translate(p.width / 2, p.height / 2);
        for (let i = 0; i < 360; i += 5) {
          let x = p.sin(p.radians(i)) * maxX;
          let y = p.cos(p.radians(i)) * maxY;

          p.push();
          p.translate(x, y);
          p.rotate(p.radians(i - p.frameCount));
          p.noFill();
          p.stroke(255);
          p.rect(0, 0, 100, 100);
          p.pop();

          p.push();
          p.translate(-x, -y);
          p.rotate(p.radians(i - p.frameCount));
          p.rect(0, 0, 100, 100);
          p.pop();
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
     <ScienceAplicationNavBar/>
     <div className='ScienceAplicationblockB'>
     <div ref={canvasRef} className='ScienceAplicationblockA'></div>
     </div>
     
      <DialogBox value={"Square pattern - Move cursor/touch to see unique geometric patterns."}/>
    </div>
  );
};

export default SquarePattern;
