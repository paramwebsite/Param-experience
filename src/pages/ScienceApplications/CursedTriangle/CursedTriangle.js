import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const CursedTriangle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let frac = 5;
      let radius;
      let scaleX;
      let sqrt3;
      let deg120;

      p.setup = () => {
        p.createCanvas(800, 800).parent(canvasRef.current);
        p.stroke(240, 250, 255, 80);
        p.noFill();
        radius = p.height / 3;
        scaleX = 0.8;
        sqrt3 = p.sqrt(3);
        deg120 = (p.PI / 3) * 2;
      };

      p.draw = () => {
        p.background(0);
        for (let y = 0; y < 2; y += 1) {
          for (let x = 0; x < 3; x += 1) {
            recursive_triangle(x * radius * sqrt3, radius + y * p.height / 2, radius, p.PI / 6);
            if (x !== 2)
              recursive_triangle(
                x * radius * sqrt3 + radius * sqrt3 * 0.5,
                radius - radius / 2 + y * p.height / 2,
                radius,
                p.PI / 6 + p.PI / 3
              );
          }
        }
      };

      function recursive_triangle(x, y, r, angle) {
        p.push();
        p.translate(x, y);
        p.rotate(angle);
        tri(0, p.cos(deg120) * r, p.sin(deg120) * r, p.cos(deg120 * 2) * r, p.sin(deg120 * 2) * r, p.cos(deg120 * 3) * r, p.sin(deg120 * 3) * r);
        p.pop();
      }

      function tri(n, x1, y1, x2, y2, x3, y3) {
        if (n === frac) {
          p.triangle(x1, y1, x2, y2, x3, y3);
          return;
        }
        let _x1 = (x2 - x3) * scaleX + x3;
        let _y1 = (y2 - y3) * scaleX + y3;
        let _x2 = (x3 - x1) * scaleX + x1;
        let _y2 = (y3 - y1) * scaleX + y1;
        let _x3 = (x1 - x2) * scaleX + x2;
        let _y3 = (y1 - y2) * scaleX + y2;
        tri(n + 1, x1, y1, _x3, _y3, _x2, _y2);
        tri(n + 1, x2, y2, _x1, _y1, _x3, _y3);
        tri(n + 1, x3, y3, _x2, _y2, _x1, _y1);
        tri(n + 1, _x1, _y1, _x2, _y2, _x3, _y3);
      }

      p.mouseMoved = () => {
        scaleX = p.map(p.mouseX, 0, p.width, -0.1, 0.5) + p.map(p.mouseY, 0, p.height, -0.1, 0.7);
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

      <div ref={canvasRef} className='ScienceAplicationblock'></div>

      <DialogBox value={"Cursed Triangle - Move cursor/touch to see the effect"} />

    </div>
  );
};

export default CursedTriangle;
