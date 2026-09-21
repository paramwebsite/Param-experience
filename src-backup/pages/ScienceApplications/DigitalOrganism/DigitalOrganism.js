import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const DigitalOrganism = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      const DEAD = 0;
      const ALIVE = 1;
      const n = 500;
      const brushThickness = 50;
      let cells;
      let zoom;
      let g;
      let STYLE = 0; // Add the STYLE variable and set its initial value

      const conditions = {
        0: (status, hood0, hood1) => {
          return status ? hood0 < 19 : hood0 * 2.6 > hood1;
        },
        1: (status, hood0, hood1) => {
          return status ? hood0 < 19 && hood1 < 36 : hood0 * 2.6 > hood1;
        },
        2: (status, hood0, hood1) => {
          return status ? hood0 !== hood1 : hood0 * 2.6 > hood1;
        },
      };

      p.setup = () => {
        p5.disableFriendlyErrors = true;
        const m = p.min(p.windowWidth, p.windowHeight);
        p.createCanvas(m, m).parent(canvasRef.current).parent(canvasRef.current);
        zoom = n / m;

        cells = new Uint8Array(n * n).fill(DEAD);
        g = p.createGraphics(n, n);
        g.background(0).pixelDensity(1).loadPixels();
      };

      p.draw = () => {
        p.background('white');

        const mx = p.int(p.constrain(p.mouseX * zoom, 0, n - 1));
        const my = p.int(p.constrain(p.mouseY * zoom, 0, n - 1));

        const b = brushThickness;
        for (let dy = -b; dy <= b; dy++) {
          for (let dx = -b; dx <= b; dx++) {
            let d = p.sqrt(dx ** 2 + dy ** 2);
            if (d > b) continue;
            let x = mx + dx;
            let y = my + dy;
            if (x < 0 || x >= n || y < 0 || y >= n) continue;
            cells[x + y * n] = p.random(5000) < 1 && b - d < 1 ? ALIVE : DEAD;
          }
        }

        const getNextState = conditions[STYLE];
        let next = new Uint8Array(cells);
        for (let y = 4; y < n - 4; y++) {
          for (let x = 4; x < n - 4; x++) {
            const i = x + y * n;

            const hood0 =
              cells[i + 1] +
              cells[i - 1] +
              cells[i - n] +
              cells[i + n] +
              cells[i - 1 - n] +
              cells[i - 1 + n] +
              cells[i + 1 - n] +
              cells[i + 1 + n] +
              cells[i + 2] +
              cells[i + 2 + n] +
              cells[i + 2 - n] +
              cells[i - 2] +
              cells[i - 2 + n] +
              cells[i - 2 - n] +
              cells[i + 2 * n] +
              cells[i + 2 * n - 1] +
              cells[i + 2 * n + 1] +
              cells[i - 2 * n] +
              cells[i - 2 * n + 1] +
              cells[i - 2 * n - 1];

            const hood1 =
              cells[i + 1] +
              cells[i + 2] +
              cells[i + 3] +
              cells[i + 4] +
              cells[i - 1] +
              cells[i - 2] +
              cells[i - 3] +
              cells[i - 4] +
              cells[i - n] +
              cells[i - 2 * n] +
              cells[i - 3 * n] +
              cells[i - 4 * n] +
              cells[i + n] +
              cells[i + 2 * n] +
              cells[i + 3 * n] +
              cells[i + 4 * n] +
              cells[i - n + 1] +
              cells[i - n + 2] +
              cells[i - n + 3] +
              cells[i - n + 4] +
              cells[i - 2 * n + 1] +
              cells[i - 2 * n + 2] +
              cells[i - 2 * n + 3] +
              cells[i - 3 * n + 1] +
              cells[i - 3 * n + 2] +
              cells[i - 4 * n + 1] +
              cells[i + n + 1] +
              cells[i + n + 2] +
              cells[i + n + 3] +
              cells[i + n + 4] +
              cells[i + 2 * n + 1] +
              cells[i + 2 * n + 2] +
              cells[i + 2 * n + 3] +
              cells[i + 3 * n + 1] +
              cells[i + 3 * n + 2] +
              cells[i + 4 * n + 1] +
              cells[i - n - 1] +
              cells[i - n - 2] +
              cells[i - n - 3] +
              cells[i - n - 4] +
              cells[i - 2 * n - 1] +
              cells[i - 2 * n - 2] +
              cells[i - 2 * n - 3] +
              cells[i - 3 * n - 1] +
              cells[i - 3 * n - 2] +
              cells[i - 4 * n - 1] +
              cells[i + n - 1] +
              cells[i + n - 2] +
              cells[i + n - 3] +
              cells[i + n - 4] +
              cells[i + 2 * n - 1] +
              cells[i + 2 * n - 2] +
              cells[i + 2 * n - 3] +
              cells[i + 3 * n - 1] +
              cells[i + 3 * n - 2] +
              cells[i + 4 * n - 1];

            let state = getNextState(cells[i], hood0, hood1); // Fix: state was not defined
            next[i] = state;
            g.pixels[i * 4 + 3] = state ? 255 : 0;
          }
        }
        cells = next;
        g.updatePixels();
        p.image(g, 0, 0, p.width, p.height);
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
      <div className='ScienceAplicationblockB'><div ref={canvasRef} className='ScienceAplicationblockA'></div></div>
      <DialogBox value={"Digital organism -  Move cursor/touch to see the effect."}/>
    </div>
  );
};

export default DigitalOrganism;
