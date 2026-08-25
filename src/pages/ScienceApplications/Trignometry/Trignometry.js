import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Trignometry = () => {
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
        p.stroke(255);
        p.angleMode(p.DEGREES);

        rad = 200;
        mouse = p.createVector();
      };

      p.draw = () => {
        mouse.x = p.map(p.mouseX, 0, p.width, -10, 10);
        mouse.y = p.map(p.mouseY, 0, p.width, -50, 50);

        p.translate(p.width / 2, p.height / 2);
        // rotate(mouse.y);
        p.background(0);
        p.beginShape();
        for (ang = 0; ang <= 360; ang += 0.1) {
          let xOffsetRad = p.cos(ang) + 1;
          let yOffsetRad = p.sin(ang) + 1;
          let x = (rad * p.cos(ang * 2) * (p.cos(xOffsetRad * mouse.x))) * p.cos(ang) + p.cos(ang * mouse.y) * 100;
          let y = (rad * p.cos(ang * 2) * (p.cos(xOffsetRad * mouse.x))) * p.sin(ang) + p.sin(ang * mouse.y) * 100;
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
  
      <DialogBox value={"Trignometry - Move cursor and touch to see the effect"}/>
    </div>
  );
};

export default Trignometry;
