import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import "../scienceAplication.css";
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';

 // Replace with the actual path to the font file

const PerlinNoiseASCII = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let ascii;
      let sscale;
      let noiseScale;
      let noiseOffset;
      let t, dt, pt;
      let f;

      p.preload = () => {
        f = p.loadFont("https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf");
      };

      p.setup = () => {
        initializeFields();
        ascii = "@BR$PX0v+~.           ";
        sscale = 100;
        p.createCanvas(1112, 834, p.WEBGL).parent(canvasRef.current);
        p.colorMode(p.HSB, 255);
        p.textFont(f, 15);
      };

      p.draw = () => {
        t = p.millis();
        t /= 1000;
        dt = t - pt;
        pt = t;
        p.background(0);
        p.translate(p.width / 2, p.height / 3, 200);
        p.rotateZ(p.PI);
        p.rotateX(-p.PI / 3);
        for (let j = 0; j < sscale; j++) {
          for (let i = 0; i < sscale; i++) {
            let x = p.map(i, 0, sscale - 1, 0, p.width);
            let y = p.map(j, 0, sscale - 1, 0, p.height);
            let character =
              ascii.length -
              p.noise(i * noiseScale, j * noiseScale + noiseOffset) *
                ascii.length;
            if (character >= ascii.length / 2) {
              continue;
            }
            p.translate(
              0,
              0,
              p.noise(i * noiseScale, j * noiseScale + noiseOffset) * 250
            );
            p.fill(
              p.noise(i * noiseScale, j * noiseScale + noiseOffset) * 255 - 60,
              200,
              255
            );
            p.text(
              ascii.charAt(p.int(character)),
              x,
              y
            );
            p.translate(
              0,
              0,
              -p.noise(i * noiseScale, j * noiseScale + noiseOffset) * 250
            );
          }
        }
        noiseOffset += dt / 2;
      };

      p.keyPressed = () => {
        if (p.keyCode === p.LEFT_ARROW) {
          noiseScale -= 0.01;
        } else if (p.keyCode === p.RIGHT_ARROW) {
          noiseScale += 0.01;
        }
      };

      function initializeFields() {
        ascii = null;
        sscale = 0;
        noiseScale = 0.04;
        noiseOffset = 0;
        t = 0;
        dt = 0;
        pt = 0;
      }

      // save jpg
      let lapse = 0; // mouse timer
      // p.mousePressed = () => {
      //   if (p.millis() - lapse > 400) {
      //     p.save(
      //       "img_" +
      //         p.month() +
      //         '-' +
      //         p.day() +
      //         '_' +
      //         p.hour() +
      //         '-' +
      //         p.minute() +
      //         '-' +
      //         p.second() +
      //         ".jpg"
      //     );
      //     lapse = p.millis();
      //   }
      // };
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication'>
      <div className='ScienceAplicationnav'>
       <ScienceAplicationNavBar/>
      </div>
      <div ref={canvasRef} className='ScienceAplicationblock'></div>
      <DialogBox value={"Perlin Noise  - ASCII animation"}/>
    </div>
  );
};

export default PerlinNoiseASCII;
