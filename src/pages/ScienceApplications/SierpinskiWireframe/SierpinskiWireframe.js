import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const SierpinskiWireframe= () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let theta = 0;
      let lapse = 0;
      let increment = 1;
      let initialSize = 200;

      p.setup = () => {
        p.createCanvas(1024, 768, p.WEBGL).parent(canvasRef.current);
        p.angleMode(p.DEGREES);
        p.background(10);
        p.strokeWeight(2);
        p.colorMode(p.HSB, 255);
        p.noFill();
      };

      p.draw = () => {
        p.background(10);
        p.translate(0, 0, 0); // Adjust this to change the view position
        p.rotateY(theta);
        // p.rotateY(p.PI / 2);
        p.rotateX(90);
        // p.rotateZ(p.PI/2);
        p.stroke((increment - 1) * 40, 255, 255);
        drawPyrFract(increment, initialSize, 0, 0, 0, 0);
        theta += 0.5;
      };

      p.mousePressed = () => {
        if (p.frameCount - lapse > 20) {
          if (p.mouseX > p.width / 2 && increment < 6) increment++;
          else if (increment > 1) increment--;
          lapse = p.frameCount;
          if (increment > 4) p.strokeWeight(1);
        }
      };

      function drawPyrFract(intcrem, size, state, x, y, z) {
        if (state < intcrem) {
          p.push();
          p.translate(x, y, z);
          pyr(size);
          p.pop();

          let nextState = state + 1;

          let off = size / 2;
          drawPyrFract(intcrem, size / 2.0, nextState, x - off, y - off, z - off);
          drawPyrFract(intcrem, size / 2.0, nextState, x + off, y - off, z - off);
          drawPyrFract(intcrem, size / 2.0, nextState, x, y, z + off);
          drawPyrFract(intcrem, size / 2.0, nextState, x + off, y + off, z - off);
          drawPyrFract(intcrem, size / 2.0, nextState, x - off, y + off, z - off);
        }
      }

      function pyr(size) {
        p.beginShape();
        p.vertex(-size, -size, -size);
        p.vertex(size, -size, -size);
        p.vertex(0, 0, size);

        p.vertex(size, -size, -size);
        p.vertex(size, size, -size);
        p.vertex(0, 0, size);

        p.vertex(size, size, -size);
        p.vertex(-size, size, -size);
        p.vertex(0, 0, size);

        p.vertex(-size, size, -size);
        p.vertex(-size, -size, -size);
        p.vertex(0, 0, size);
        p.endShape();
      }
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
      <DialogBox value={"Sierpinski Wireframe - Touch left and right of the screen  to increment and decrement the traingles"}/>
    </div>
  );
};

export default SierpinskiWireframe;
