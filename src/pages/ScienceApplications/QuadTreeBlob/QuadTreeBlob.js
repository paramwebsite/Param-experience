import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';
const QuadTreeBlob= () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let w, h;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        w = p.min(p.width, p.height);
        h = w / 2;
        p.noStroke();
        p.colorMode(p.HSB);
        p.rectMode(p.CENTER);
      };

      p.draw = () => {
        p.translate(p.width / 2, p.height / 2);
        p.background(240, 180, 30);
        DrawRect(h, 0, 0);
      };

      const DrawRect = (size, x, y) => {
        if (size / h < p.abs(p.noise(x / h + 1, y / h + p.frameCount / 99, p.mag(x, y) / w) - 0.46)) {
          p.fill(size, w, w);
          p.rect(x, y, size, size);
        } else {
          size = size / 2;
          if (size > 1) {
            DrawRect(size, x - size, y - size);
            DrawRect(size, x + size, y - size);
            DrawRect(size, x - size, y + size);
            DrawRect(size, x + size, y + size);
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
  
        <div ref={canvasRef} className='ScienceAplicationblock'></div>
        <DialogBox value={"Quad Tree Blob- Static animation"}/>
    </div>
  );
};

export default QuadTreeBlob;
