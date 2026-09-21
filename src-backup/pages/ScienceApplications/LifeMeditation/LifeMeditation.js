import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const LifeMeditation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let rules = 0;
      let cnt = 0;
      let n;
      let dArray = [];
      let r = 20;
      let co;
      let ro;

      function setup() {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        co = p.floor(p.width / (2 * r));
        ro = co;
        randomDead();
        p.background(20);
        p.noStroke();
        p.frameRate(5);
      }

      function draw() {
        p.background(20);
        p.translate(p.width / 2, p.height / 2);
        let s = 0.28;
        if (p.width > 1000) {
          s = 0.2;
        }
        p.scale(s, s);
        let v = 12;
        for (let m = 0; m < v; m++) {
          p.push();
          p.rotate(m * p.TWO_PI / v);
          cnt = 0;
          for (let j = 0; j <= co; j++) {
            for (let i = ro; i >= 0; i--) {
              let x = r * j * 1.5;
              let y = -r * 12 + r * p.sqrt(3) * i + r * j / 1.15;
              if (dArray[cnt] === 0) {
                p.noFill();
                p.noStroke();
              }
              if (dArray[cnt] === 1) {
                p.fill(j * 4 + i * 5, 200 + i * 5, 255 - j * 2, 200 - m * 7);
                p.stroke(j * 4 + i * 5, 200 + i * 5, 255 - j * 2, 200 - m * 7);
              }
              p.circle(x, y, r * 1.4);
              p.fill(20);
              cnt = cnt + 1;
            }
          }
          p.pop();
        }
        switchDead();
      }

      function randomDead() {
        let co = p.floor(p.width / (2 * r));
        let ro = co;
        n = (co + 1) * (ro + 1);
        dArray = [];
        for (let i = 0; i < n; i++) {
          let tmp = p.random(-1, 1);
          if (tmp <= 0) {
            dArray[i] = 1;
          }
          if (tmp > 0) {
            dArray[i] = 0;
          }
        }
      }

      function switchDead() {
        let co = p.floor(p.width / (2 * r));
        let ro = co;
        let cnt1 = 0;
        for (let j = 0; j <= co; j++) {
          for (let i = ro; i >= 0; i--) {
            let sumd;
            if (j != 0 && i != 0 && i != ro && j != co) {
              sumd = dArray[cnt1 + co + 1] + dArray[cnt1 + co + 2] + dArray[cnt1 - co - 1] + dArray[cnt1 - co - 2] + dArray[cnt1 + 1] + dArray[cnt1 - 1];
            }
            if (i === 0 && j != 0 && j != co) {
              sumd = dArray[cnt1 + co + 1] + dArray[cnt1 - co - 1] + dArray[cnt1 - co - 2] + dArray[cnt1 - 1];
            }
            if (i === ro && j != 0 && j != co) {
              sumd = dArray[cnt1 + co + 1] + dArray[cnt1 - co - 1] + dArray[cnt1 + co + 2] + dArray[cnt1 + 1];
            }
            if (j === co && i != 0 && i != ro) {
              sumd = dArray[cnt1 - co - 1] + dArray[cnt1 - co - 2] + dArray[cnt1 + 1] + dArray[cnt1 - 1];
            }
            if (j === 0 && i != 0 && i != ro) {
              sumd = dArray[cnt1 + co + 1] + dArray[cnt1 + co + 2] + dArray[cnt1 + 1] + dArray[cnt1 - 1];
            }
            if (i === 0 && j === 0) {
              sumd = dArray[cnt1 + co + 1] + dArray[cnt1 + 1];
            }
            if (i === 0 && j === co) {
              sumd = dArray[cnt1 - 1] + dArray[cnt1 - co - 1] + dArray[cnt1 - co - 2];
            }
            if (i === ro && j === 0) {
              sumd = dArray[cnt1 + 1] + dArray[cnt1 + co + 1] + dArray[cnt1 + co + 2];
            }
            if (i === ro && j === co) {
              sumd = dArray[cnt1 + 1] + dArray[cnt1 - co - 1];
            }

            // Rule descriptions can be found here: https://fractalkitty.com/101-days-of-creative-coding-docc/day-91-of-101-docc/
            // The following applies the rules and changes dead/alive state of the cell
            if (rules === 0) {
              if (dArray[cnt1] === 1 && (sumd === 6 || sumd === 5 || sumd === 1 || sumd === 0)) {
                dArray[cnt1] = 0;
              } else if (dArray[cnt1] === 0 && (sumd === 4)) {
                dArray[cnt1] = 1;
              }
            }
            if (rules === 1) {
              if (dArray[cnt1] === 1 && (sumd === 6 || sumd === 5 || sumd === 2 || sumd === 1 || sumd === 0)) {
                dArray[cnt1] = 0;
              } else if (dArray[cnt1] === 0 && (sumd === 3 || sumd === 4 || sumd === 5)) {
                dArray[cnt1] = 1;
              }
            }
            if (rules === 2) {
              if (dArray[cnt1] === 1 && (sumd === 6 || sumd === 5)) {
                dArray[cnt1] = 0;
              } else if (dArray[cnt1] === 0 && (sumd === 3)) {
                dArray[cnt1] = 1;
              }
            }
            if (rules === 3) {
              if (dArray[cnt1] === 1 && (sumd === 1 || sumd === 2 || sumd === 3)) {
                dArray[cnt1] = 0;
              } else if (dArray[cnt1] === 0 && (sumd === 3 || sumd === 4)) {
                dArray[cnt1] = 1;
              }
            }
            if (rules === 4) {
              if (dArray[cnt1] === 1 && (sumd === 3 || sumd === 4 || sumd === 5 || sumd === 6)) {
                dArray[cnt1] = 0;
              } else if (dArray[cnt1] === 0 && (sumd === 0 || sumd === 1 || sumd === 2)) {
                dArray[cnt1] = 1;
              }
            }
            if (rules === 5) {
              if (dArray[cnt1] === 1 && (sumd === 2 || sumd === 3 || sumd === 4 || sumd === 5 || sumd === 6)) {
                dArray[cnt1] = 0;
              } else if (dArray[cnt1] === 0 && (sumd === 0 || sumd === 1 || sumd === 2)) {
                dArray[cnt1] = 1;
              }
            }
            if (rules === 6) {
              if (dArray[cnt1] === 1 && (sumd === 4 || sumd === 5 || sumd === 6)) {
                dArray[cnt1] = 0;
              } else if (dArray[cnt1] === 0 && (sumd === 3 || sumd === 4)) {
                dArray[cnt1] = 1;
              }
            }
            cnt1 = cnt1 + 1;
          }
        }
        p.stroke(255);
        p.noFill();
        p.push();
        p.scale(3, 3);
        for (let i = 0; i <= 6; i++) {
          p.circle(-p.width / 2 + 20, -p.height / 2 + 30 * i + 5, 20);
        }
        p.fill(100);
        p.circle(-p.width / 2 + 20, -p.height / 2 + 30 * rules + 5, 20);
        p.pop();
      }

      function mousePressed() {
        randomDead();
      }

      function keyPressed() {
        if (p.keyCode === 32 || p.keyCode === 40) {
          rules = rules + 1;
          if (rules > 6) {
            rules = 0;
          }
          randomDead();
        }
        if (p.keyCode === 38) {
          rules = rules - 1;
          if (rules < 0) {
            rules = 6;
          }
          randomDead();
        }
      }

      p.setup = setup;
      p.draw = draw;
      p.mousePressed = mousePressed;
      p.keyPressed = keyPressed;
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication'>
      <ScienceAplicationNavBar />
  
        <div ref={canvasRef} className='ScienceAplicationblock'></div>

      <DialogBox value={"Click to randomize a new game of life. Arrow will change the rules of the game."} />
    </div>
  );
};

export default LifeMeditation;
