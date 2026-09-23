import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const TrignometryPlane= () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      var radius;
      var ang;

      var offsetXAng;
      var offsetYAng;

      var offsetX;
      var offsetY;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.background(0);
        p.stroke(255);
        p.angleMode(p.DEGREES);
        p.noFill();
        p.textSize(20);

        radius = 300;
        ang = 90;
      };

      p.draw = () => {
        offsetXAng = p.map(p.mouseX, 0, p.width, -1000, 1000);
        offsetYAng = p.map(p.mouseY, 0, p.height, -1000, 1000);

        offsetX = p.map(offsetXAng, -1000, 1000, -100, 100);
        offsetY = p.map(offsetYAng, -1000, 1000, -100, 100);

        p.background(0);
        p.translate(p.width / 2, p.height / 2);
        p.beginShape();
        for (ang = 0; ang <= 360; ang += 1) {
          var offsetXRad = p.cos(ang) + 1;
          var offsetYRad = p.sin(ang) + 1;
          var x =
            radius * p.cos(offsetXAng * offsetXRad) * p.cos(ang) + offsetX;
          var y =
            radius * p.cos(offsetYAng * offsetYRad) * p.sin(ang) + offsetY;
          p.stroke(
            255,
            p.map(p.tan(ang), -2, 2, 255, 0)
          );
          // if(ang = 0){
          // 	// text(x, x, y);
          // }
          p.line(offsetX, offsetY, x, y);
          p.circle(x, y, 5);
          p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
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
     
      <DialogBox value={"Trignometry plane - Move the mouse/touch to see unique trigonometric planes"}/>
    </div>
  );
};

export default TrignometryPlane;
