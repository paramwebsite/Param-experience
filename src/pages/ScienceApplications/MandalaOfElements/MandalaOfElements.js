import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const MandalaOfElements= () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let cX;
      let cY;
      let angle;
      let x;
      let y;
      let i;
      let nSegment = 60;
      let mode = 1;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        cX = p.width / 2.0;
        cY = p.height / 2.0;
        p.stroke(200);
        p.noFill();
        p.background(0);
        p.canvas.addEventListener('touchstart', () => {
          mode = (mode % 4) + 1; // Cycle through modes 1, 2, 3, 4
        });

        p.canvas.addEventListener('click', () => {
          mode = (mode % 4) + 1; // Cycle through modes 1, 2, 3, 4
        });
      };

      p.draw = () => {
        p.fill(0, 20);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);
        if (mode === 1) {
          drawWind();
        }
        if (mode === 2) {
          drawEarth();
        }
        if (mode === 3) {
          drawWater();
        }
        if (mode === 4) {
          drawFire();
        }
      };

      

      function drawWind() {
        for (i = 0; i < 3; i++) {
          drawAir(9 * (i + 1), 50 * i + p.sin(p.frameCount / 20.0) * 30.0);
          drawLine(18 * (i + 1), 50 * i + p.sin(p.frameCount / 20.0) * 30.0);
          drawParticle(18 * (i + 1), 80 * i + p.sin(p.frameCount / 20.0) * 30.0);
        }
      }

      function drawAir(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle + p.sin(p.frameCount / 50.0));
          p.fill(40 + 40 * p.sin(p.frameCount / 25.0), 10);
          p.strokeWeight(1);
          p.stroke(
            100,
            100,
            120,
            255 * p.sin(p.frameCount / 25.0)
          );
          p.rect(0, 0, 100 * p.sin(p.frameCount / 25.0), 100 + 75 * p.sin(p.frameCount / 25.0));
          p.pop();
        }
      }

      function drawParticle(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle + i * p.sin(p.frameCount / 25.0));
          p.stroke(150);
          p.strokeWeight(1 + 1 * p.sin(p.frameCount / 25.0));
          p.point(150 * p.sin(p.frameCount / 50.0), 100 * p.sin(p.frameCount / 50.0));
          p.pop();
        }
      }

      function drawLine(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle - p.sin(p.frameCount / 50.0));
          p.stroke(
            100,
            150,
            200 + p.sin(p.frameCount / 25.0),
            50
          );
          p.strokeWeight(1);
          p.line(0, 0, 100 + 50 * -p.sin(p.frameCount / 25.0), 80 * -p.sin(p.frameCount / 25.0));
          p.pop();
        }
      }

      function drawEarth() {
        for (i = 0; i < 3; i++) {
          drawBranch(18 * (i + 1), 80 * i);
          drawLeaves(18 * (i + 1), 100 * i + 50 * p.sin(p.frameCount / 50.0));
        }
      }

      function drawBranch(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle + p.sin(p.frameCount / 25.0));
          p.fill(128, 96, 77, 10);
          p.stroke(128, 96, 77);
          p.strokeWeight(3 - 2 * p.sin(p.frameCount / 25.0));
          p.line(0, 100 * p.sin(p.frameCount / 50.0), 100 * p.sin(p.frameCount / 50.0), 50 * p.sin(p.frameCount / 50.0));
          p.stroke(150, 150, 50);
          p.point(150 * p.sin(p.frameCount / 25.0), 100 * p.sin(p.frameCount / 25.0));
          p.pop();
        }
      }

      function drawLeaves(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle + p.sin(p.frameCount / 50.0));
          p.fill(128, 150, 77, 10);
          p.stroke(150, 150, 90, 10);
          p.strokeWeight(1);
          p.ellipse(0, 0, 40 * p.sin(p.frameCount / 50.0), 100 * p.sin(p.frameCount / 50.0));
          p.pop();
        }
      }

      function drawWater() {
        for (i = 0; i < 3; i++) {
          drawSplash(18 * (i + 1), 80 * p.sin(p.frameCount / 50.0) * i + p.sin(p.frameCount / 20.0) * 50.0);
          drawWaves(18 * (i + 1), 100 * p.sin(p.frameCount / 25.0) * i + p.sin(p.frameCount / 20.0) * 25.0);
        }
      }

      function drawSplash(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle + p.sin(p.frameCount / 25.0));
          p.fill(100, 100, 200 + 50 * -p.sin(p.frameCount / 25.0), 10);
          p.strokeWeight(1);
          p.stroke(
            150,
            150,
            200 - 50 * p.sin(p.frameCount / 25.0),
            100 - 100 * p.sin(p.frameCount / 25.0)
          );
          p.ellipse(0, 0, 200 * p.sin(p.frameCount / 25.0), 50 * p.sin(p.frameCount / 25.0));
          p.stroke(130, 130, 200 + 50 * p.sin(p.frameCount / 25.0));
          p.strokeWeight(3 + 3 * p.sin(p.frameCount / 25.0));
          p.point(100 * p.sin(p.frameCount / 50.0), 100 * p.sin(p.frameCount / 50.0));
          p.pop();
        }
      }

      function drawWaves(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle + p.sin(p.frameCount / 25.0));
          p.fill(0, 80 * p.sin(p.frameCount / 25.0), 150, 10);
          p.strokeWeight(1);
          p.stroke(
            150,
            150,
            200 + 50 * p.sin(p.frameCount / 25.0),
            100 + 100 * p.sin(p.frameCount / 25.0)
          );
          p.ellipse(0, 0, 150 * p.sin(p.frameCount / 50.0), 50 * p.sin(p.frameCount / 50.0));
          p.pop();
        }
      }

      function drawFire() {
        for (let i = 0; i < 4; i++) {
          drawFlames(9 * (i + 1), 80 * p.sin(p.frameCount / 50.0) * i + p.sin(p.frameCount / 20.0) * 30.0);
          drawFade(9 * (i + 1), 100 * p.sin(p.frameCount / 50.0) * i + p.sin(p.frameCount / 20.0) * 30.0);
          drawSpark(18 * (i + 1), 70 * p.sin(p.frameCount / 50.0) * i + p.sin(p.frameCount / 20.0) * 30.0);
        }
      }

      function drawFlames(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(i + angle + p.sin(p.frameCount / 50.0));
          p.fill(150, 80 * p.sin(p.frameCount / 25.0), 0, 10);
          p.strokeWeight(0.5);
          p.stroke(150, 100 * p.sin(p.frameCount / 25.0), 0);
          p.ellipse(0, 0, 150 * p.sin(p.frameCount / 25.0), 100 + 75 * p.sin(p.frameCount / 25.0));
          p.pop();
        }
      }

      function drawSpark(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle + i * p.sin(p.frameCount / 25.0));
          p.stroke(255, 255, 0, 255 * p.sin(p.frameCount / 25.0));
          p.strokeWeight(1 + 1 * p.sin(p.frameCount / 25.0));
          p.point(150 * p.sin(p.frameCount / 50.0), 100 * p.sin(p.frameCount / 50.0));
          p.pop();
        }
      }

      function drawFade(n, r) {
        for (let i = 0; i < n; i++) {
          angle = (i * (p.PI * 2.0)) / n;
          x = cX + r * p.cos(angle);
          y = cY + r * p.sin(angle);
          p.push();
          p.translate(x, y);
          p.rotate(angle + p.sin(p.frameCount / 25.0));
          p.fill(0, 80 * -p.sin(p.frameCount / 25.0));
          p.noStroke();
          p.rect(0, 0, 100 * p.sin(p.frameCount / 25.0), 100 * p.sin(p.frameCount / 25.0));
          p.pop();
        }
      }

      p.keyPressed = () => {
        if (p.key === '1') {
          mode = 1;
        }
        if (p.key === '2') {
          mode = 2;
        }
        if (p.key === '3') {
          mode = 3;
        }
        if (p.key === '4') {
          mode = 4;
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
     
      <div ref={canvasRef} className='ScienceAplicationblock'></div>
    
      
      <DialogBox value={`Mandala of elements - Touch to switch between elements`}/>
    </div>
  );
};

export default MandalaOfElements;
