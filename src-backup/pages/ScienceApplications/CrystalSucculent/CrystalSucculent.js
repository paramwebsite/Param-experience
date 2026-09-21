import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const CrystalSucculent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let PHI = (1 + Math.sqrt(5)) / 2;

      let dSlider;
      let nSlider;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent(canvasRef.current);
        p.angleMode(p.DEGREES);
        p.colorMode(p.HSB);
        p.background('#fffbe6');
      };

      function drawLeaf(w, h, d) {
        p.beginShape();
        p.vertex(w / 2, 0, d);
        p.vertex(w / 2, h / 2, 0);
        p.vertex(0, h / 2, d / 2);
        p.endShape(p.CLOSE);
        p.beginShape();
        p.vertex(w / 2, 0, d);
        p.vertex(w, h / 2, d / 2);
        p.vertex(w / 2, h / 2, 0);
        p.endShape(p.CLOSE);
        p.beginShape();
        p.vertex(0, h / 2, d / 2);
        p.vertex(w / 2, h / 2, 0);
        p.vertex(w / 2, (3 * h) / 4, d);
        p.endShape(p.CLOSE);
        p.beginShape();
        p.vertex(w / 2, h / 2, 0);
        p.vertex(w, h / 2, d / 2);
        p.vertex(w / 2, (3 * h) / 4, d);
        p.endShape(p.CLOSE);
      }

      p.draw = () => {
        p.background(0);
        let w = Math.min(p.width, p.height);
        p.orbitControl();
        let s = 30; // Initial point
        let t = 100; // Number of steps (leaves)
        let d = 0.5; // Distance multiplier
        let leafWidth = w / 15;
        let leafHeight = leafWidth * 2;
        let leafDepth = leafWidth / 2;

        p.specularMaterial(p.color('#4b8a5f'));
        p.pointLight(p.color('#c5d419'), -p.width / 3, -p.height, 0);
        p.pointLight(p.color('#563d7c'), 0, -leafHeight * 1.5, 0);
        p.rotateX(-45);
        p.translate(0, -w / 8, 0);
        p.rotateY(0.2 * p.frameCount);
        for (let i = s; i < s + t; i = i + 1) {
          let a = (i * 5 * PHI) % 360;
          p.fill(p.map(a, 0, 360, 100, 140), p.map(a, 0, 360, 50, 90), p.map(a, 0, 360, 40, 80), 0.3);
          p.stroke(p.map(a, 0, 360, 140, 100), p.map(a, 0, 360, 30, 10), p.map(a, 0, 360, 100, 80));
          p.strokeWeight(p.map(i, s, s + t, 1, 5));
          p.rotateY(360 * PHI);
          p.push();
          p.translate(s + i * d, p.map(i, s, s + t, 0, 0.5 * leafHeight, 0), 0);
          p.scale(
            p.map(i, s, s + t, 1, p.map(p.mouseX, 0, p.width, 3, 5, true)),
            p.map(i, s, s + t, 0.5, 5),
            p.map(i, s, s + t, 1, 6)
          );
          p.rotateY(-90);
          p.rotateX(p.map(i, s, s + t, 0, p.map(p.mouseY, 0, p.height, 90, 115, true)));
          drawLeaf(leafWidth, leafHeight, leafDepth);
          p.pop();
        }

        p.ambientMaterial('white');
        p.fill(0, 0, 100, 0.2);
        p.noStroke();
        let potWidth = (leafHeight * 3 / 8) * 5;
        let potHeight = potWidth * 3 / 4;
        let potY = leafHeight * 3 / 4 + leafDepth / 2;
        p.push();
        p.translate(0, potY + (potHeight / 5) / 2, 0);
        p.cylinder(potWidth, potHeight / 5);
        p.pop();
        p.push();
        p.translate(0, potY + potHeight / 2, 0);
        p.cylinder(potWidth * 5 / 6, potHeight);
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
   
     
      <DialogBox value={"Crystal Succulent - Move cursor to see the effect."}/>
    </div>
  );
};

export default CrystalSucculent;
