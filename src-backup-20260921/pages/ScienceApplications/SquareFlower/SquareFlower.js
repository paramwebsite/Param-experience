import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const SquareFlower = () => {
  const canvasRef = useRef(null);
  let sketch = null;

  useEffect(() => {
    // Setup p5.js sketch
    sketch = new p5((p) => {
      let graphics = [];
      let colors = ['#D44D5C', '#3D5A6C'];
      let dot;
      let recurring;
      let rotation;
      let rotationDir;

      const setup = () => {
        dot = p.floor(p.random(2));
        recurring = p.floor(p.random(56)) + 8;
        rotation = (p.floor(p.random(10)) + 1) * 6;
        rotationDir = (p.floor(p.random(2)) - 0.5) * 2;

        graphics = [];

        p.createCanvas(600, 600).parent(canvasRef.current);
        p.background('#F5E9E2');

        for (let i = 0; i < 2; i++) {
          let g = p.createGraphics(600, 600);
          g.background('#F5E9E2');

          g.noFill();
          g.stroke(colors[p.floor(p.random(colors.length))]);
          g.strokeWeight(20);

          g.rect(0, 0, g.width, g.height);

          if (dot === 1) {
            g.noStroke();
            g.fill(colors[p.floor(p.random(colors.length))]);
            g.circle(40, 40, 30);
            g.fill(colors[p.floor(p.random(colors.length))]);
            g.circle(g.width - 40, g.height - 40, 30);
          }

          g.translate(g.width / 2, g.height / 2);

          graphics.push(g);
        }

        for (let i = 0; i < recurring; i++) {
          let a, b;
          if (i % 2 === 0) {
            a = 1;
            b = 0;
          } else {
            a = 0;
            b = 1;
          }

          graphics[b].drawingContext.shadowOffsetX = 20 / i;
          graphics[b].drawingContext.shadowOffsetY = 20 / i;
          graphics[b].drawingContext.shadowBlur = 0;
          graphics[b].drawingContext.shadowColor = '#3D5A6C' + '55';

          graphics[b].scale(0.8);

          graphics[b].push();
          graphics[b].rotate(p.PI / rotation * i * rotationDir);
          graphics[b].scale(1);

          graphics[b].image(graphics[a], -graphics[b].width / 2, -graphics[b].height / 2, graphics[b].width, graphics[b].height);
          graphics[b].pop();
        }

        p.image(graphics[graphics.length - 1], 0, 0);
      };

      const touchStarted = () => {
        p.setup();
      };

      p.setup = setup;
      p.touchStarted = touchStarted;
    });
  }, []);

  return (
    <div className='ScienceAplication'>
      <ScienceAplicationNavBar/>
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>

      <DialogBox value={"Square flower - Touch to change patterns."}/>
    </div>
  );
};

export default SquareFlower;
