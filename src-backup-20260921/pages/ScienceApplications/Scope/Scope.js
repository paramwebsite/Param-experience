import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Scope = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let mouse;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.background(0);
        p.noFill();
        p.stroke(255);

        mouse = p.createVector();
      };

      p.draw = () => {
        p.background(0);
        mouse.x = p.width / 2 - p.mouseX;
        mouse.y = p.height / 2 - p.mouseY;

        p.push();
        p.translate(p.width / 2, p.height / 2);
        for (let i = 0; i < 10; i++) {
          p.rotate(p.TWO_PI / 10);
          scope_circle(p.noise(p.frameCount / 1000) * 400);
        }

        for (let i = 0; i < 8; i++) {
          p.rotate(p.TWO_PI / 8);
          scope_rect(p.noise(p.frameCount / 2000) * 300);
        }

        for (let i = 0; i < 15; i++) {
          p.rotate(p.TWO_PI / 15);
          scope_line(p.noise(p.frameCount / 2000) * 300);
        }
        p.pop();
      };

      function scope_circle(circleSize) {
        p.circle(mouse.x, mouse.y, circleSize);
      }

      function scope_rect(rectSize) {
        p.push();
        p.rotate(p.frameCount / 100);
        p.translate(mouse.x, mouse.y);
        p.rect(0, 0, rectSize, rectSize);
        p.pop();
      }

      function scope_line(rectSize) {
        p.push();
        p.line(0, 0, mouse.x, mouse.y);
        p.pop();
      }
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
   
      
      <DialogBox value={"Scope- Move cursor or touch to see the effect"}/>
    </div>
  );
};

export default Scope;
