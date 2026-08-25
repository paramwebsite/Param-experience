import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';

const Circle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let constellation = [];
      let n;
      let d;

      function setup() {
        p.createCanvas(500, 500).parent(canvasRef.current);
        p.pixelDensity(1); // Set 1 because it's too slow on Firefox
        n = 200;

        for (let i = 0; i <= n; i++) {
          constellation.push(new Star());
        }
        p.strokeWeight(0.75);
        p.stroke('#1ABC9C');
      }

      function draw() {
        p.background('#0D0D0D');

        for (let i = 0; i < constellation.length; i++) {
          constellation[i].update();
          for (let j = 0; j < constellation.length; j++) {
            if (i > j) { // "if (i > j)" => to check one time distance between two stars
              d = constellation[i].loc.dist(constellation[j].loc); // Distance between two stars
              if (d <= p.width / 8) { // if d is less than width/10 px, we draw a line between the two stars
                p.line(constellation[i].loc.x, constellation[i].loc.y, constellation[j].loc.x, constellation[j].loc.y);
              }
            }
          }
        }
      }

      class Star {
        constructor() {
          this.a = p.random(5 * p.TAU); // "5*TAU" => render will be more homogeneous
          this.r = p.random(p.width * 0.4, p.width * 0.25); // first position will look like a donut
          this.loc = p.createVector(p.width / 2 + p.sin(this.a) * this.r, p.height / 2 + p.cos(this.a) * this.r);
          this.speed = p.createVector();
          this.speed = p5.Vector.random2D();
          this.bam = p.createVector();
          this.m = 0; // Initialize the 'm' property to 0
        }

        update() {
          this.bam = p5.Vector.random2D(); // movement of star will be a bit erratic
          this.bam.mult(0.45);
          this.speed.add(this.bam);
          // speed is done according to the distance between loc and the mouse:
          this.m = p.constrain(p.map(p.dist(this.loc.x, this.loc.y, p.mouseX, p.mouseY), 0, p.width, 8, 0.05), 0.05, 8); // constrain => avoid returning "not a number"
          this.speed.normalize().mult(this.m);

          // No collision detection, instead, loc is out of bounds,
          // it reappears on the opposite side:
          if (p.dist(this.loc.x, this.loc.y, p.width / 2, p.height / 2) > (p.width / 2) * 0.98) {
            if (this.loc.x < p.width / 2) {
              this.loc.x = p.width - this.loc.x - 4; // "-4" => avoid blinking stuff
            } else if (this.loc.x > p.width / 2) {
              this.loc.x = p.width - this.loc.x + 4; // "+4"  => avoid blinking stuff
            }
            if (this.loc.y < p.height / 2) {
              this.loc.y = p.height - this.loc.y - 4;
            } else if (this.loc.x > p.height / 2) {
              this.loc.y = p.height - this.loc.y + 4;
            }
          }
          this.loc = this.loc.add(this.speed);
        }
      } // End of Star class

      p.setup = setup;
      p.draw = draw;
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
      <DialogBox value={"Web sphere - Move cursor/touch to see effect"}/>
    </div>
  );
};

export default Circle;
