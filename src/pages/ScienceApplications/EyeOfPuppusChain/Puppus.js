import React, { useEffect, useRef } from 'react';
import '../scienceAplication.css';
import p5 from 'p5';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';

function Poppus() {
  const canvasRef = useRef(null);
 

  useEffect(() => {
    let R = 0.5;
    let cSwitch = false;
    let runSwitch = true;
    let pValue = 6;

    const setupSketch = (p) => {
      p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
      p.angleMode(p.DEGREES);
      p.stroke(255);
      p.strokeWeight(0.001);
    };

    const drawSketch = (p) => {
      p.background(0);
      p.translate(p.width / 2, p.height / 2);
      p.scale(400, 400);
      for (let i = 0; i < pValue; i++) {
        p.push();
        p.rotate(360 / pValue * i);
        p.translate(0.2, 0.2);
        pChain(p);
        p.pop();
      }

      pChain(p);
      if (p.frameCount % 90 === 0) {
        cSwitch = !cSwitch;
      }
    };

    const mousePressed = () => {
      pValue++;
      if (pValue > 25) {
        pValue = 0;
      }
    };

    const pChain = (p) => {
      p.fill(255, 255, 255, 20);
      if (cSwitch) {
        p.fill(0, 100, 200, 20);
      }
      p.circle(0, 0, R);
      p.fill(0, 100, 200, 20);
      if (cSwitch) {
        p.fill(255, 255, 255, 20);
      }
      let t = p.frameCount / 10;
      p.rotate(t * 4);
      let CB = p.sin(t);
      p.circle(R / 2 - CB / 2, 0, CB);
      let AC = R - CB;
      p.circle(-R / 2 + AC / 2, 0, AC);
      let n = 0;
      let r = AC / R;
      for (let i = 1; i < 50; i++) {
        n = n + 1;
        let xn = -0.5 + (r * (1 + r)) / (2 * (n * n * (1 - r) * (1 - r) + r));
        let yn = (r * n * (1 - r)) / (n * n * p.pow(1 - r, 2) + r);
        let rn = ((1 - r) * r) / (2 * (n * n * (1 - r) * (1 - r) + r));
        p.circle(xn, yn, 2 * rn);
        p.circle(xn, -yn, 2 * rn);
      }
    };

    const p5Sketch = new p5((p) => {
      p.setup = () => setupSketch(p);
      p.draw = () => drawSketch(p);
      p.mousePressed = mousePressed;
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      p5Sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication'>
     <ScienceAplicationNavBar/>
      
        <div ref={canvasRef} className='ScienceAplicationblock'>
        <DialogBox value={"Eye of Poppus Chain - Touch/Click to change the circles"}/>
      
      </div>
    </div>
  );
}

export default Poppus;
