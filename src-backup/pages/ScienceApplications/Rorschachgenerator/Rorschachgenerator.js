import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
const Rorschachgenerator = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let points = [];
      let pos;
      let npos;
      let pg;
      let maxPoints;
      let maxDist;
      let maxSize;
      let font;
      let showFont = true;
      let selector;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);

        pg = p.createGraphics(p.width, p.height);

        p.reset();

        if (Math.random() < 0.1) {
          selector = 0;
        } else {
          selector = 1;
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        pg = p.createGraphics(p.windowWidth, p.windowHeight);
        p.reset();
      };

      p.draw = () => {
        p.background(0);

        if (selector === 0) {
          p.randomGenerator();
        } else {
          p.noiseGenerator();
        }

        p.image(pg, 0, 0, p.width, p.height);

        p.push();
        p.scale(-1, 1);
        p.translate(-p.width, 0);
        p.image(pg, 0, 0, p.width, p.height);
        p.pop();

        p.push();
        p.scale(-1, -1);
        p.translate(-p.width, -p.height);
        p.image(pg, 0, 0, p.width, p.height);
        p.pop();

        p.push();
        p.scale(1, -1);
        p.translate(0, -p.height);
        p.image(pg, 0, 0, p.width, p.height);
        p.pop();
      };

      p.reset = () => {
        p.background(0);

        pg.clear();

        points = [];

        pos = p.createVector(p.width / 2, p.height / 2);
        npos = p.createVector(p.random(10), p.random(10));

        maxPoints = p.floor(p.random(128, 1024));
        maxDist = p.floor(p.random(50, 250));
        maxSize = p.floor(p.random(p.width / 40, p.width / 80));
      };

      p.randomGenerator = () => {
        if (points.length < maxPoints) {
          for (let i = 0; i < points.length; i++) {
            if (p.dist(pos.x, pos.y, points[i].x, points[i].y) < maxDist) {
              pg.stroke(255);
              pg.line(pos.x, pos.y, points[i].x, points[i].y);
            }
          }

          points.push(p.createVector(pos.x, pos.y));

          pos.x += p.random(-maxSize, maxSize);
          pos.y += p.random(-maxSize, maxSize);

          if (pos.x < p.width * 0.1 || pos.x > p.width * 0.9) {
            pos.x = p.width / 2;
          }

          if (pos.y < p.height * 0.1 || pos.y > p.height * 0.9) {
            pos.y = p.height / 2;
          }
        }
      };

      p.noiseGenerator = () => {
        if (points.length < maxPoints) {
          for (let i = 0; i < points.length; i++) {
            if (p.dist(pos.x, pos.y, points[i].x, points[i].y) < maxDist) {
              pg.stroke(255);
              pg.line(pos.x, pos.y, points[i].x, points[i].y);
            }
          }

          points.push(p.createVector(pos.x, pos.y));

          pos.x += p.map(p.noise(npos.x), 0, 1, -maxSize, maxSize);
          pos.y += p.map(p.noise(npos.y), 0, 1, -maxSize, maxSize);

          if (pos.x < p.width * 0.1 || pos.x > p.width * 0.9) {
            pos.x = p.width / 2;
          }

          if (pos.y < p.height * 0.1 || pos.y > p.height * 0.9) {
            pos.y = p.height / 2;
          }

          npos.x += 0.1;
          npos.y += 0.1;
        }
      };

      p.mousePressed = () => {
        p.reset();
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
   
        <div ref={canvasRef} className='ScienceAplicationblock' style={{
          // Apply mobile styles using media queries
          width: '100%', // Adjust width as needed
          height: '100vh', // Adjust height as needed
          // Add other mobile-specific styles here
        }}></div>
   
      <DialogBox value={"Rorschach generator - Touch/Click to Generate"}/>
    </div>
  );
};

export default Rorschachgenerator;
