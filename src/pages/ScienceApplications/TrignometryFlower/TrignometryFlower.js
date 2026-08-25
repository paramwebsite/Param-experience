import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const TrignometryFlower = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let rad;
      let ang;
      let mouse;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.background(0);
        p.noFill();
        p.stroke(255, 100);
        p.angleMode(p.DEGREES);

        rad = 200;
        mouse = p.createVector();
      };

      p.draw = () => {
        mouse.x = p.map(p.mouseX, 0, p.width, -1000, 1000);
        mouse.y = p.map(p.mouseY, 0, p.width, -50, 50);

        p.translate(p.width / 2, p.height / 2);
        // p.rotate(p.frameCount / 1000);
        p.background(0);
        p.beginShape();
        for (ang = 0; ang <= 360; ang += 0.1) {
          let xOffsetRad = p.tan(ang) + 1;
          let yOffsetRad = p.tan(ang) + 1;
          let x = rad * p.cos(xOffsetRad * mouse.x) * p.cos(xOffsetRad * mouse.x) * p.cos(ang);
          let y = rad * p.cos(yOffsetRad * mouse.y) * p.cos(xOffsetRad * mouse.x) * p.sin(ang);
          p.circle(x, y, 5);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
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

      
      <DialogBox value={"Trignometry flower - Move cursor/touch to see effect"}/>
    </div>
  );
};

export default TrignometryFlower;
