import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const TrippyTriangle = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      var rad = 0;
      var mysize = 1;
      var count = 5000;
      var mytime = 0;
      var ang = 1;

      var pressingCount = 0;
      var mapRadiusHole = 0;

      const myPI = (1 + Math.sqrt(5)) / 2;
      var mouse;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.background(0);
        p.angleMode(p.DEGREES);

        rad = p.width;
        mouse = p.createVector(p.mouseX, p.mouseY);
        p.noStroke();
        ang = -p.TWO_PI / count;
      };

      p.draw = () => {
        mytime = p.frameCount / 100;
        mouse.x = p.map(p.mouseX, 0, p.width, -100, 100);
        mouse.y = p.map(p.mouseY, 0, p.width, -3, 3);

        p.background(0);
        p.push();
        p.translate(p.width / 2, p.height / 2);
        for (let i = 0; i <= count; i++) {
          p.rotate(p.cos(mouse.x) * i / count * mouse.y + mouse.y);
          var x = p.cos(i * myPI * p.TWO_PI) * (i / count) * rad;
          var y = p.sin(i * myPI * p.TWO_PI) * (i / count) * rad;
          p.fill(255);
          p.triangle(x + -mysize, y + -mysize, x + mysize + 10, y + mysize + 10, x + mysize, y + -mysize);
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
     
      <DialogBox value={"Tripy triangle - Move cursor/touch to see effect"} />
    </div>
  );
};

export default TrippyTriangle;
