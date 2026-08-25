import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const OilSplill = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let particles = [];
      let fade = 0;
      let fadeAmount = 1;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        for (let i = 0; i < p.width; i += 20) {
          for (let o = 0; o < p.height; o += 5) {
            particles.push({
              x: i,
              y: o,
              clr: p.color(p.mouseX * 0.1, p.mouseY * 0.4 + p.frameCount, 250, 250),
            });
          }
        }
      };

      p.draw = () => {
        p.background(0);
        for (let i = 0; i < particles.length; i++) {
          let ptc = particles[i];
          p.stroke(255)
          p.fill(p.mouseX * 0.5, p.mouseY * 0.5 + p.frameCount, fade);
          if (fade < 0) fadeAmount = 1;
          if (fade > 255) fadeAmount = -10;
          fade += fadeAmount;
          p.ellipse(ptc.x + 30, ptc.y + 30, 1);
          ptc.x += (p.noise(ptc.x / 200, ptc.y / 200, 3000) - 0.6) * 3;
          ptc.y += (p.noise(ptc.x / 200, ptc.y / 200, 30000) - 0.5) * 3;
        }
      };
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication oil-spill'>
  <ScienceAplicationNavBar/>
     
      <div ref={canvasRef} className='ScienceAplicationblock ScienceAplicationBlack'></div>
      <DialogBox value={"Oil Spill - Static animation"}/>
    </div>
  );
};

export default OilSplill;
