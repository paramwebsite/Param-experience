import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const FlowerDonut = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      var rad = 0;
      var mysize = 200;
      var count = 500;
      var mytime = 0;

      var pressingCount = 0;
      var mapRadiusHole = 0;

      const myPI = (1 + Math.sqrt(5)) / 2;
      var mouse;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.background(0);

        rad = p.width;
        mouse = p.createVector(p.mouseX, p.mouseY);
        p.noStroke();
      };

      p.draw = () => {
        mytime = p.frameCount / 100;
        mouse.x = p.map(p.mouseX, 0, p.width, 0, 50);
        mouse.y = p.map(p.mouseY, 0, p.width, 0, 20);
        count = p.abs(p.cos(mytime / 8) * 1000);

        p.background(0);
        p.push();
        p.translate(p.width / 2, p.height / 2);
        for (let i = 0; i <= count; i++) {
          var x = p.cos(i * myPI * p.TWO_PI) * (i / count) * rad;
          var y = p.sin(i * myPI * p.TWO_PI) * (i / count) * rad;
          p.fill(255);
          p.circle(x, y, p.abs(p.cos(i * mouse.y / count + mytime * 2) * mouse.x));
        }
        p.pop();
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
      <div ref={canvasRef} className='ScienceAplicationblock'></div>
      <DialogBox value={"Flower Donut - Move cursor/touch to see change in visuals."}/>
    </div>
  );
};

export default FlowerDonut;
