import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const SnowFlake = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let TY = 400;

      let K = new Array(TY).fill(null).map(() => new Array(TY).fill(0));
      let NK = new Array(TY).fill(null).map(() => new Array(TY).fill(0));
      let X, Y, I, II;
      let W, C, M, P, HP, T, S;

      p.setup = () => {
        p.createCanvas(800, 692).parent(canvasRef.current);
        p.background(0, 0, 0);
        p.noSmooth();
        p.noStroke();

        for (I = 0; I < TY; I++) {
          for (II = 0; II < TY; II++) {
            K[I][II] = 0;
          }
        }
        HP = 250;
        S = p.int(p.random(0, 4));
        W = p.random(-0.5, +0.8);
        K[TY / 2][TY / 2 - 1] = HP * 10 + 1;
        K[TY / 2 + 1][TY / 2 - 1] = HP * 10 + 2;
        K[TY / 2 - 1][TY / 2] = HP * 10 + 3;
        K[TY / 2 + 1][TY / 2] = HP * 10 + 3;
        K[TY / 2 - 1][TY / 2 + 1] = HP * 10 + 2;
        K[TY / 2][TY / 2 + 1] = HP * 10 + 1;
        K[TY / 2][TY / 2] = HP * 10 + 3;
        T = 0;
      };

      p.draw = () => {
        T = 0;

        for (X = 1; X < TY - 1; X++) {
          for (Y = 1; Y < TY - 1; Y++) {
            C = 0;
            M = 0;
            P = 0;
            NK[X][Y] = K[X][Y];
            if (K[X][Y - 1] > 0) {
              M = M + 1;
              C = 1;
              HP = p.int(K[X][Y - 1] / 10);
            }
            if (K[X + 1][Y - 1] > 0) {
              M = M + 1;
              C = 2;
              HP = p.int(K[X + 1][Y - 1] / 10);
            }
            if (K[X + 1][Y] > 0) {
              M = M + 1;
              C = 3;
              HP = p.int(K[X + 1][Y] / 10);
            }
            if (K[X][Y + 1] > 0) {
              M = M + 1;
              C = 1;
              HP = p.int(K[X][Y + 1] / 10);
            }
            if (K[X - 1][Y + 1] > 0) {
              M = M + 1;
              C = 2;
              HP = p.int(K[X - 1][Y + 1] / 10);
            }
            if (K[X - 1][Y] > 0) {
              M = M + 1;
              C = 3;
              HP = p.int(K[X - 1][Y] / 10);
            }
            if (K[X][Y - 1] - p.int(K[X][Y - 1] / 10) * 10 == 1) {
              P = 1;
            }
            if (K[X + 1][Y - 1] - p.int(K[X + 1][Y - 1] / 10) * 10 == 2) {
              P = 1;
            }
            if (K[X + 1][Y] - p.int(K[X + 1][Y] / 10) * 10 == 3) {
              P = 1;
            }
            if (K[X][Y + 1] - p.int(K[X][Y + 1] / 10) * 10 == 1) {
              P = 1;
            }
            if (K[X - 1][Y + 1] - p.int(K[X - 1][Y + 1] / 10) * 10 == 2) {
              P = 1;
            }
            if (K[X - 1][Y] - p.int(K[X - 1][Y] / 10) * 10 == 3) {
              P = 1;
            }
            if (M == 1 && P == 1 && HP > 0) {
              NK[X][Y] = C + ((HP - S) * 10);
            }
            if (M == 1 && P == 0 && HP > 0) {
              NK[X][Y] = C + (p.int(HP * W) * 10);
            }
            if (NK[X][Y] != K[X][Y]) {
              T = 1;
              I = X * (800 / TY) + (Y * (800 / TY) / 2) - ((TY / 2) * (800 / TY) / 2);
              II = p.int(Y * (800 / TY) * p.sqrt(3) / 2);
              HP = p.int(NK[X][Y] / 10);
              p.fill(HP * 2 + 150, HP * 2 + 150, 255);
              p.ellipse(I, II, 800 / TY, 800 / TY);
            }
          }
        }

        for (X = 1; X < TY - 1; X++) {
          for (Y = 1; Y < TY - 1; Y++) {
            K[X][Y] = NK[X][Y];
          }
        }

        if (p.random(0, 100) > 90) {
          W = p.random(-0.5, +0.8);
          S = p.int(p.random(0, 4));
        }

        //if (T == 0) { setup(); }
      };

      p.mousePressed = () => {
        p.setup();
      };
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication'>
      <ScienceAplicationNavBar />
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>
      <DialogBox value={"mouse click"} />
    </div>
  );
};

export default SnowFlake;
