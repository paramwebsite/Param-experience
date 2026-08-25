import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import "../scienceAplication.css"
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Chain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let y = 0;
      let w = 1024;
      let h = w / 2;
      let q = w / 4;

      p.setup = () => {
        p.createCanvas(w, w).parent(canvasRef.current);
      };

      p.draw = () => {
        if (y < w) {
          for (let x = w; x >= 0; x--) {
            let l = f((x - h) / q, (y - h) / q);
            p.stroke(l, l * 2, l * 4);
            p.line(x, y, x, y + l);
          }
          y++;
        }
      };

      const f = (x, y, n = 4) => {
        if (n === 0) {
          return (x - y) ** 2 * 24;
        } else {
          return f(Math.cos(3 * x) - Math.sin(4 * y), x * x - y * y - 2 * x * y, n - 1);
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
    </div>
  );
};

export default Chain;
