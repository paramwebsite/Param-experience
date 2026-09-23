import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const ExplodingMouse = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let t = 0;
      let x = 0;
      let circles = 24;
      let explodeIndex = 0;
      let explode = false;

      function draw_mouse(x, y, size = 1, angle = 0) {
        p.push();
        p.beginShape();
        p.translate(x, y);
        p.rotate(angle);
        p.vertex(0, 0);
        p.vertex(0, 0 + 17 * size);
        p.vertex(0 + 4 * size, 0 + 13 * size);
        p.vertex(0 + 7 * size, 0 + 20 * size);
        p.vertex(0 + 10 * size, 0 + 19 * size);
        p.vertex(0 + 7 * size, 0 + 12 * size);
        p.vertex(0 + 12 * size, 0 + 12 * size);
        p.endShape(p.CLOSE);
        p.pop();
      }

      function draw_mouse_circle(radius, count) {
        x = p.noise(radius / 100 + t);
        for (let i = x; i < p.TWO_PI + x; i += p.PI / count) {
          let x = p.cos(i) * radius * (1 + p.sin(explodeIndex) * p.sin(radius + explodeIndex * 2));
          let y = p.sin(i) * radius * (1 + p.sin(explodeIndex) * p.sin(radius + explodeIndex * 2));
          draw_mouse(p.width / 2 + x, p.height / 2 + y, 1, 3.25 * p.PI / 2 + i);
        }
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.fill(0);
        p.stroke(255);
        p.strokeWeight(1.2);
        p.noiseDetail(2, 0.2);
        p.angleMode(p.RADIANS);
        p.noCursor();
      };

      p.draw = () => {
        p.background(0);
        if (explode) {
          explodeIndex += p.PI / 60;
          if (explodeIndex >= p.PI) {
            explodeIndex = 0;
            explode = false;
          }
        }
        p.translate(p.mouseX - p.width / 2, p.mouseY - p.height / 2);
        draw_mouse(p.width / 2 - 5, p.height / 2 - 10);
        for (let i = 1; i < circles; i++) {
          draw_mouse_circle(p.width / (circles / i), i * 3);
        }
        t += 0.01;
        p.translate(-p.mouseX + p.width / 2, -p.mouseY + p.height / 2);
      };

      p.mousePressed = () => {
        explodeIndex = 0;
        explode = true;
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
      <DialogBox value={"Explodinng Mouse - Move cursor/touch to see effect."}/>
    </div>
  );
};

export default ExplodingMouse;
