import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';

const StrangeVibration = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let points = [];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.noStroke();

        for (let r = 12; r < 200; r += 12) {
          for (let i = 0; i < r / 2; i++) {
            let theta = p.map(i, 0, r / 2, 0, p.TWO_PI);
            points.push({
              r: r,
              theta: theta,
            });
          }
        }
      };

      p.draw = () => {
        let f = p.frameCount / 25;
        p.blendMode(p.BLEND);
        p.background(0);
        p.blendMode(p.ADD);
        p.translate(p.width / 2, p.height / 2);
        p.rotate(p.PI / 2);
        for (let pnt of points) {
          let disp = p.map(pnt.r, 100, 192, 70, 0);
          if (pnt.r < 100) {
            disp = p.map(pnt.r, 12, 100, 0, 70);
          }
          let cost = p.cos(pnt.theta);
          let sint = p.sin(pnt.theta);
          let t = f + pnt.r / 70;

          p.fill(255, 0, 0);
          let val = p.cos(t) / 2 + 0.5;
          let r = pnt.r + val * disp;
          p.circle(r * cost, r * sint, 5);
          p.fill(0, 255, 0);
          val = p.cos(t + 0.05) / 2 + 0.5;
          r = pnt.r + val * disp;
          p.circle(r * cost, r * sint, 5);
          p.fill(0, 0, 255);
          val = p.cos(t + 0.1) / 2 + 0.5;
          r = pnt.r + val * disp;
          p.circle(r * cost, r * sint, 5);
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
      <div ref={canvasRef} className='ScienceAplicationblock' style={{
          width: '100%', // Adjust width as needed
          height: '100vh', // Adjust height as needed
        }}></div>
      <DialogBox value={"Strange vibration - Sphere"}/>
    </div>
  );
};

export default StrangeVibration;
