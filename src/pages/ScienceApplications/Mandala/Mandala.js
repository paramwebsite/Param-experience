import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Mandala = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let particles = [];
      let mvalue = 360;
      let pvalue = 7;
      let size = 5;

      p.setup = () => {
        p.createCanvas(800, 800).parent(canvasRef.current);
        p.angleMode(p.DEGREES);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();

        for (let i = 0; i < 3; i++) {
          particles.push(new Particle(0, 0, i));
        }
      };

      p.draw = () => {
        // p.background(0);
        p.fill(0, 5);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);

        for (let i = 0; i < particles.length; i++) {
          particles[i].display();
        }
      };

      p.mousePressed = () => {
        mvalue = 50 + p.random(500);
        pvalue = 1 + p.random(10);
      };

      class Particle {
        constructor(x, y, i) {
          this.x = x;
          this.y = y;
          this.i = i * 101;
          this.s = pvalue * 40;
        }

        display() {
          this.i += 0.1;
          p.push();

          p.translate(p.width / 2, p.height / 2);

          for (let i = 0; i < 360; i += mvalue / 10) {
            p.stroke(
              1 + i / 2 + p.floor(200 * p.sin(p.millis() / 100) ** 2),
              55,
              90
            );
            size = 1 + 8 * (p.sin(p.millis() / 5) / 2) ** 4;
            p.ellipse(
              p.cos(i) *
              p.map(
                p.abs(p.sin(this.i * 2 + p.millis() / 120)),
                0,
                1,
                50,
                150 * size
              ),
              p.sin(i) *
              p.map(
                p.abs(p.sin(this.i * 2 + p.millis() / 120)),
                0,
                1,
                50,
                150 * size
              ),
              this.s,
              this.s
            );
          }
          p.pop();
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
      <ScienceAplicationNavBar />
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>
      <DialogBox value={"Mandala - Touch to change the pattern"} />
    </div>
  );
};

export default Mandala;
