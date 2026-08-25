import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';

const RandomLissajousWebs= () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      const dotsNum = 300;
      const radius = 300;
      const distance = 100;

      p.setup = () => {
        p.createCanvas(720, 720).parent(canvasRef.current);
        p.strokeWeight(0.25);
        p.stroke("black");
      };

      p.draw = () => {
        p.background("white");
        p.translate(p.width / 2, p.height / 2);

        let dots = [];
        for (let i = 0; i < dotsNum; i++) {
          const noiseIndex = (p.frameCount * 0.75 + i) / 100;
          const a = p.noise(noiseIndex, 0) * 3;
          const b = p.noise(noiseIndex, 1) * 3;
          const theta = p.map(i, 0, dotsNum, 0, p.TWO_PI);
          const t = p.frameCount / 240;
          const x = p.cos(a * theta + t) * radius;
          const y = p.sin(b * theta + t) * radius;
          dots.push({ x, y });
        }

        // Connect the dots
        for (let i = dots.length; i--; ) {
          const current = dots[i];
          for (let j = i; j--; ) {
            const other = dots[j];
            if (
              (current.x - other.x) ** 2 + (current.y - other.y) ** 2 <
              distance ** 2
            )
              p.line(current.x, current.y, other.x, other.y);
          }
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
         
      <DialogBox value={"Random Lissajous- Static animation"}/>
      </div>
    </div>
  );
};

export default RandomLissajousWebs;
