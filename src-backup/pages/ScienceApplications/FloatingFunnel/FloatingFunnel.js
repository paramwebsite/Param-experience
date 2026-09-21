import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';
const FloatingFunnel = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(canvasRef.current);
        p.angleMode(p.DEGREES);
      };

      p.draw = () => {
        p.background(0);
        p.rotateX(66);
        p.noFill();
        p.stroke(255);

        for (var i = 0; i < 20; i++) {
          var r = p.map(p.sin(p.frameCount / 2), -1, 1, 0, 255);
          var g = p.map(i, 0, 20, 0, 255);
          var b = p.map(p.cos(p.frameCount), -1, 1, 255, 0);

          p.beginShape();

          for (var j = 0; j < 360; j += 10) {
            var rad = i * 17;
            var x = rad * p.cos(j);
            var y = rad * p.sin(j);
            var z = p.sin(p.frameCount * 2 + i * 12) * 50;

            p.vertex(x, y, z);
          }

          p.endShape(p.CLOSE);
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
      <div ref={canvasRef} className='ScienceAplicationblock'></div>
      <DialogBox value={"Floating Funnel - Static animation"}/>
    </div>
  );
};

export default FloatingFunnel;
