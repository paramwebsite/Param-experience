import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const NodeSpring= () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let cols, rows;
      let particles = [];
      let springs = [];
      let k = 0.25;
      let spacing, baseR, maxR;

      let neigbors = [
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 1]
      ];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);

        if (p.width < p.height) {
          spacing = p.width * 0.08;
          cols = p.floor(p.width / spacing) + 1;
          rows = p.floor(p.height / spacing) + 2;
        } else {
          spacing = p.height * 0.08;
          cols = p.floor(p.width / spacing) + 2;
          rows = p.floor(p.height / spacing) + 1;
        }
        baseR = spacing * 0.2;
        maxR = spacing * 0.8;

        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            particles.push(new Particle(i * spacing, j * spacing, i, j));

            if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) {
              let index = i + j * cols;
              particles[index].locked = true;
            }

            if (i !== 0) {
              let a = particles[i + j * cols];
              let b = particles[i - 1 + j * cols];
              springs.push(new Spring(k, spacing, a, b));
              if (j !== 0) {
                let c = particles[i + j * cols];
                let d = particles[i + (j - 1) * cols];
                springs.push(new Spring(k, spacing, c, d));
              }
            }
          }
        }
      };

      p.draw = () => {
        p.background(0);

        for (let sp of springs) {
          sp.update();
          // sp.show();
        }

        for (let ptc of particles) {
          if (!ptc.locked) {
            ptc.show();
            ptc.update();

            ptc.applyAttRep();
          }
        }

        if (p.mouseIsPressed) {
          let active;
          for (let ptc of particles) {
            let distance = p.dist(ptc.pos.x, ptc.pos.y, p.mouseX, p.mouseY);
            if (distance < ptc.radius) {
              active = ptc;
              ptc.active = true;
            }
          }
          if (active) {
            // active.pos.set(mouseX, mouseY);
            active.vel.set(0, 0);
            active.targetR = maxR;
          }
        } else {
          for (let ptc of particles) {
            ptc.active = false;
            ptc.targetR = baseR;
          }
        }
      };

      class Particle {
        constructor(x, y, ix, iy) {
          this.index = {
            x: ix,
            y: iy
          };
          this.pos = p.createVector(x, y);
          this.vel = p.createVector();
          this.acc = p.createVector();
          this.mass = 1;

          this.locked = false;
          this.active = false;
          this.radius = baseR;
          this.targetR = baseR;

          this.col = p.color(0);
        }

        applyForce(force) {
          let f = force.copy();
          f.div(this.mass);
          this.acc.add(f);
        }

        update() {
          this.vel.add(this.acc);
          this.pos.add(this.vel);
          this.acc.mult(0);
          this.vel.mult(0.98); // damping

          this.radius += 0.1 * (this.targetR - this.radius);
          this.col = p.lerpColor(p.color(0), p.color(255, 30, 0), (this.radius - baseR) / (maxR - baseR));
        }

        applyAttRep() {
          for (let nei of neigbors) {
            let target = particles[this.index.x + nei[0] + (this.index.y + nei[1]) * cols];
            if (target.active === true) {
              let force = p5.Vector.sub(this.pos, target.pos);
              let d = force.mag();
              force.normalize();
              let fs = force.copy().mult((target.radius - baseR) / (d * 0.035));
              this.acc.add(fs);

              this.targetR = baseR * p.map(d, 0, spacing, 0, 0.5);
              this.col = p.lerpColor(p.color(255, 30, 0), p.color(0), this.radius / baseR);
            }
          }
        }

        show() {
          p.fill(255);
          p.noStroke();
          p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
        }
      }

      class Spring {
        constructor(k, rL, a, b) {
          this.k = k;
          this.restLength = rL; //rest length
          this.a = a;
          this.b = b;
        }

        update() {
          let force = p5.Vector.sub(this.a.pos, this.b.pos);
          let x = force.mag() - this.restLength;
          force.normalize();
          force.mult(this.k * x);
          this.b.applyForce(force);
          force.mult(-1); //two opposite direction of force, a, b order is important
          this.a.applyForce(force);
        }

        show() {
          p.stroke(200);
          p.strokeWeight(2);
          p.noFill();
          p.line(this.a.pos.x, this.a.pos.y, this.b.pos.x, this.b.pos.y);
        }
      }
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication node-spring'>
      <ScienceAplicationNavBar/>
     
        <div ref={canvasRef} className='ScienceAplicationblock'></div>
  
      <DialogBox value={"Node Spring - Touch on nodes to produce spring effect."}/>
    </div>
  );
};

export default NodeSpring;
