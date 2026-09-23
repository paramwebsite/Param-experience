import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';

const OilWaterPhaseSeparation = () => {
  const canvasRef = useRef(null);
  let atoms;
  const R = 6;

  const STRONG_FORCE_RANGE = 10 * R;
  const MEDIUM_FORCE_RANGE = 3 * R;

  const STRONG_FORCE_MAGNITUDE = 0.02;
  const MEDIUM_FORCE_MAGNITUDE = 0.1;

  const WATER = 0;
  const HYDROPHOBIC = 1;

  const MAX_SPEED = 0.3 * R;

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let N_ATOMS;

      p.setup = () => {
        p.createCanvas(500, 500).parent(canvasRef.current);
        N_ATOMS = p.int(p.width * p.height / (R * 70)); // Corrected calculation
        atoms = new Array(N_ATOMS);
        for (let i = 0; i < N_ATOMS; i++) {
          switch (i % 5) {
            default:
              atoms[i] = new Atom(WATER);
              break;
            case 0:
              atoms[i] = new Atom(HYDROPHOBIC);
              break;
          }
        }
        p.noStroke();
      };

      p.draw = () => {
        // update the positions
        recomputeAccelerations();
        recomputeVelocities();
        recomputePositions();
        // draw
        p.background(255, 255, 255);
        for (let i = 0; i < N_ATOMS; i++) {
          atoms[i].drawAtom();
        }
        // draw the mouse-controlled water atom
        p.fill(p.color(0, 0, 255));
        p.ellipse(p.mouseX, p.mouseY, p.max(4, R), p.max(4, R));
      };

      const recomputeAccelerations = () => {
        for (let i = 0; i < N_ATOMS; i++) {
          atoms[i].acceleration.x = atoms[i].acceleration.y = 0;
        }

        let d, f;
        let force, to;
        for (let i = 0; i < N_ATOMS; i++) {
          for (let j = i + 1; j < N_ATOMS; j++) {
            to = p5.Vector.sub(atoms[i].position, atoms[j].position);
            d = to.mag();

            // apply repulsion forces between this pair of atoms
            if (d < STRONG_FORCE_RANGE) {
              if (
                (atoms[i].type === WATER && atoms[j].type === HYDROPHOBIC) ||
                (atoms[i].type === HYDROPHOBIC && atoms[j].type === WATER)
              ) {
                // strong repulsion
                f = repulsion_force(STRONG_FORCE_RANGE, d, STRONG_FORCE_MAGNITUDE);
              } else {
                // medium repulsion
                f = repulsion_force(MEDIUM_FORCE_RANGE, d, MEDIUM_FORCE_MAGNITUDE);
              }
              force = p5.Vector.mult(to, f);
              atoms[i].acceleration.add(force);
              atoms[j].acceleration.sub(force);
            }
          }

          // atoms are repelled by the walls
          for (let wall_test = 0; wall_test < 4; wall_test++) {
            // pretend there's a water atom at the nearby wall, repelling us
            let wall;
            switch (wall_test) {
              default:
              case 0:
                wall = new p5.Vector(0, atoms[i].position.y);
                break;
              case 1:
                wall = new p5.Vector(p.width, atoms[i].position.y);
                break;
              case 2:
                wall = new p5.Vector(atoms[i].position.x, 0);
                break;
              case 3:
                wall = new p5.Vector(atoms[i].position.x, p.height);
                break;
            }
            to = p5.Vector.sub(atoms[i].position, wall);
            switch (atoms[i].type) {
              case WATER:
                f = repulsion_force(MEDIUM_FORCE_RANGE, to.mag(), MEDIUM_FORCE_MAGNITUDE);
                break;
              default:
                f = repulsion_force(STRONG_FORCE_RANGE, to.mag(), STRONG_FORCE_MAGNITUDE);
                break;
            }
            atoms[i].acceleration.add(p5.Vector.mult(to, f));
          }

          // the mouse cursor acts as another water molecule
          to = p5.Vector.sub(atoms[i].position, new p5.Vector(p.mouseX, p.mouseY));
          d = to.mag();
          if (d < STRONG_FORCE_RANGE) {
            if (atoms[i].type === HYDROPHOBIC) {
              // strong repulsion
              f = repulsion_force(STRONG_FORCE_RANGE, d, STRONG_FORCE_MAGNITUDE);
            } else {
              // medium repulsion
              f = repulsion_force(MEDIUM_FORCE_RANGE, d, MEDIUM_FORCE_MAGNITUDE);
            }
            force = p5.Vector.mult(to, f);
            atoms[i].acceleration.add(force);
          }
        }
      };

      const recomputeVelocities = () => {
        for (let i = 0; i < N_ATOMS; i++) {
          atoms[i].velocity.add(atoms[i].acceleration);
          atoms[i].velocity.limit(MAX_SPEED);
        }
      };

      const recomputePositions = () => {
        for (let i = 0; i < N_ATOMS; i++) {
          atoms[i].position.add(atoms[i].velocity);
          if (atoms[i].position.x < 0) atoms[i].position.x = MEDIUM_FORCE_RANGE;
          if (atoms[i].position.x > p.width) atoms[i].position.x = p.width - MEDIUM_FORCE_RANGE;
          if (atoms[i].position.y < 0) atoms[i].position.y = MEDIUM_FORCE_RANGE;
          if (atoms[i].position.y > p.height) atoms[i].position.y = p.height - MEDIUM_FORCE_RANGE;
        }
      };

      const repulsion_force = (range, d, magnitude) => {
        d = p.max(d, 0.1);
        if (d < range) return magnitude * (range / d - 1);
        else return 0;
      };

      // Atom class definition...
      class Atom {
        constructor(t) {
          this.position = p.createVector(p.random(p.width), p.random(p.height));
          this.velocity = p.createVector(p.random(-3, 3), p.random(-3, 3));
          this.acceleration = p.createVector();
          this.type = t;
        }

        drawAtom() {
          switch (this.type) {
            case WATER:
              p.fill(p.color(0, 0, 255));
              break;
            case HYDROPHOBIC:
              p.fill(p.color(255, 0, 0));
              break;
            default:
              p.fill(p.color(255, 0, 255));
              break;
          }
          p.ellipse(this.position.x, this.position.y, p.max(4, R), p.max(4, R));
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
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>
      <DialogBox value={"Oil water phase separation - Move the cursor/touch to see effect"}/>
    </div>
  );
};

export default OilWaterPhaseSeparation;
