import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const DreamCatcher = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      const num = 7;
      const depth = 10;
      const size = 400;
      const rotationSpeed = 1;
      let counter = 0;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.noFill();
        p.stroke(200);
      };

      p.draw = () => {
        counter++;
        p.background(50, 0, 100, 15);
        const center = p.createVector(p.width / 2, p.height / 2);
        const radius = p.createVector(size / 2, 0);
        const tension =
          p.sqrt((p.mouseX - p.width / 2) / p.width + 0.5) + p.sin(counter / 30) / 60;
        const deviation =
          (p.mouseY - p.height / 2) / p.height * 4 + 1 + p.cos(counter / 30) / 60;
        radius.rotate((counter / 400) * rotationSpeed);
        const angle = p.PI * 2 / num;
        p.ellipse(center.x, center.y, size, size);
        for (let i = 0; i < num; i++) {
          drawConnection(center, radius, angle, depth, tension, deviation);
        }
      };

      function drawConnection(center, radius, angle, i, tension, deviation) {
        if (i > 0) {
          let point1 = p.createVector(center.x + radius.x, center.y + radius.y);
          radius.rotate(angle);
          let point2 = p.createVector(center.x + radius.x, center.y + radius.y);
          let centerPoint = p.createVector(radius.x, radius.y);
          centerPoint.rotate((-angle / 2) * deviation);
          centerPoint.setMag(p.cos(angle / 2) * radius.mag() * tension);
          p.line(point1.x, point1.y, center.x + centerPoint.x, center.y + centerPoint.y);
          p.line(center.x + centerPoint.x, center.y + centerPoint.y, point2.x, point2.y);
          i--;
          drawConnection(center, centerPoint, angle, i, tension, deviation);
        } else {
          let point1 = p.createVector(center.x + radius.x, center.y + radius.y);
          radius.rotate(angle);
          let point2 = p.createVector(center.x + radius.x, center.y + radius.y);
          p.line(point1.x, point1.y, point2.x, point2.y);
        }
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
   
      
      <DialogBox value={"Dream catcher - Move cursor/touch to see unique effects."}/>
    </div>
  );
};

export default DreamCatcher;
