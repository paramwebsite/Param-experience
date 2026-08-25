import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const FactralLand = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let oldB, newB;
      let levels, old_levels;
      let scaleRange, old_scaleRange;
      let xb, yb;

      class Cell {
        // A cell object knows about its location in the grid as well as its size with the variables x,y,w,h.
        constructor(tempX, tempY) {
          this.x = tempX;
          this.y = tempY;
        }
      }

      p.setup = () => {
        p.createCanvas(800, 800).parent(canvasRef.current);
        p.angleMode(p.DEGREES);
        levels = 8;
        scaleRange = 0.12;
        old_levels = levels;
        old_scaleRange = scaleRange;
      };

      p.draw = () => {
        xb = p.mouseX;
        yb = p.mouseY;
        levels = p.round((xb / 800) * 8);
        scaleRange = yb * 10 / (8 * 5);
        scaleRange = scaleRange / 1000;

        if ((old_levels !== levels) || (old_scaleRange !== scaleRange)) {
          p.background(255);
          let level = 0;
          let n = 2;
          oldB = new Array(n).fill(0).map(() => new Array(n).fill(0));

          oldB[0][0] = new Cell(100, 100);
          oldB[0][1] = new Cell(100, 700);
          oldB[1][0] = new Cell(700, 100);
          oldB[1][1] = new Cell(700, 800);

          while (level < levels) {
            n = 2 * n - 1;
            newB = new Array(n).fill(0).map(() => new Array(n).fill(0));

            for (let i = 0; i < n; i++) {
              for (let j = 0; j < n; j++) {
                if (((i % 2) === 0) && ((j % 2) === 0)) {
                  const ii = i / 2;
                  const jj = j / 2;
                  newB[i][j] = new Cell(oldB[ii][jj].x, oldB[ii][jj].y);
                } else if (((i % 2) === 0) && ((j % 2) === 1)) {
                  const ii = i / 2;
                  const jj = (j - 1) / 2;
                  const x = (oldB[ii][jj].x + oldB[ii][jj + 1].x) / 2;
                  const y = (oldB[ii][jj].y + oldB[ii][jj + 1].y) / 2;
                  const d = p.sqrt(p.sq(oldB[ii][jj].x - oldB[ii][jj + 1].x) + p.sq(oldB[ii][jj].y - oldB[ii][jj + 1].y));
                  const rng = d * scaleRange;
                  const xu = p.random(-rng, rng);
                  const yu = p.random(-rng, rng);
                  newB[i][j] = new Cell(x + xu, y + yu);
                } else if (((i % 2) === 1) && ((j % 2) === 0)) {
                  const ii = (i - 1) / 2;
                  const jj = j / 2;
                  const x = (oldB[ii][jj].x + oldB[ii + 1][jj].x) / 2;
                  const y = (oldB[ii][jj].y + oldB[ii + 1][jj].y) / 2;
                  const d = p.sqrt(p.sq(oldB[ii][jj].x - oldB[ii + 1][jj].x) + p.sq(oldB[ii][jj].y - oldB[ii + 1][jj].y));
                  const rng = d * scaleRange;
                  const xu = p.random(-rng, rng);
                  const yu = p.random(-rng, rng);
                  newB[i][j] = new Cell(x + xu, y + yu);
                } else if (((i % 2) === 1) && ((j % 2) === 1)) {
                  const ii = (i - 1) / 2;
                  const jj = (j - 1) / 2;
                  const x = (oldB[ii][jj].x + oldB[ii + 1][jj + 1].x) / 2;
                  const y = (oldB[ii][jj].y + oldB[ii + 1][jj + 1].y) / 2;
                  const d = p.sqrt(p.sq(oldB[ii][jj].x - oldB[ii + 1][jj + 1].x) + p.sq(oldB[ii][jj].y - oldB[ii + 1][jj + 1].y));
                  const rng = d * scaleRange * 0.7;
                  const xu = p.random(-rng, rng);
                  const yu = p.random(-rng, rng);
                  newB[i][j] = new Cell(x + xu, y + yu);
                }
              }
            }
            level++;
            oldB = newB;
          }

          p.stroke(0);
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
              if ((i < n - 1) && (j < n - 1)) {
                p.line(oldB[i][j].x, oldB[i][j].y, oldB[i][j + 1].x, oldB[i][j + 1].y);
                p.line(oldB[i][j].x, oldB[i][j].y, oldB[i + 1][j].x, oldB[i + 1][j].y);
              } else if ((i === (n - 1)) && (j < n - 1)) {
                p.line(oldB[i][j].x, oldB[i][j].y, oldB[i][j + 1].x, oldB[i][j + 1].y);
              } else if ((i < n - 1) && (j === (n - 1))) {
                p.line(oldB[i][j].x, oldB[i][j].y, oldB[i + 1][j].x, oldB[i + 1][j].y);
              }
            }
          }
          old_levels = levels;
          old_scaleRange = scaleRange;
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
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>
      <DialogBox value={"Fractal land - Move cursor/touch to see fractal effects on frame."}/>
    </div>
  );
};

export default FactralLand;
