import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';

const MobiusTransformation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = new p5((p) => {
      let Nmax = 1000;
      let Tmax = 10;
      let X;
      let Y;
      let N;
      let L;
      let T;
      let Zx = new Array(4);
      let Wx = new Array(4);
      let Zy = new Array(4);
      let Wy = new Array(4);
      let NAKAx;
      let HOPPYx;
      let NAKAy;
      let HOPPYy;
      let Ax;
      let Ay;
      let Bx;
      let By;
      let Cx;
      let Cy;
      let Dx;
      let Dy;
      let Ex;
      let Ey;
      let Fx;
      let Fy;
      let LUx;
      let LUy;
      let RUx;
      let RUy;
      let LDx;
      let LDy;
      let RDx;
      let RDy;
      let Kx;
      let Ky;
      let MODE;
      let Sx;
      let Sy;
      let Gx;
      let Gy;

      p.setup = () => {
        p.createCanvas(600, 600).parent(canvasRef.current);
        p.background(0);
        p.noSmooth();
        p.stroke(255);

        for (N = 1; N < 4; N++) {
          Zx[N] = 50 * p.cos(p.TWO_PI * N / 3);
          Zy[N] = 50 * p.sin(p.TWO_PI * N / 3);
          Wx[N] = 47 * p.cos(p.TWO_PI * (N + 0.5) / 3);
          Wy[N] = 47 * p.sin(p.TWO_PI * (N + 0.5) / 3);
        }

        MODE = 0;
        T = Tmax;
        HEN();
      };

      p.draw = () => {
        if (p.mouseIsPressed && MODE == 0) {
          X = p.mouseX - 300;
          Y = p.mouseY - 300;
          p.noStroke();
          p.fill(255, 255, 0);
          for (N = 0; N < Nmax; N++) {
            Zx[0] = X;
            Zy[0] = Y;
            KAN();
            p.ellipse(Zx[0] + 300, Zy[0] + 300, 4, 4);
            X = Wx[0];
            Y = Wy[0];
          }
          if (T < Tmax) {
            p.background(0);
            T = T + 1;
          }
        }
        if (MODE > 0) {
          Zx[MODE] = p.mouseX - 300;
          Zy[MODE] = p.mouseY - 300;
          HEN();
          p.background(0);
        }
        if (MODE < 0) {
          Wx[-MODE] = p.mouseX - 300;
          Wy[-MODE] = p.mouseY - 300;
          HEN();
          p.background(0);
        }
        for (N = 1; N < 4; N++) {
          p.stroke(255);
          if (MODE == N) {
            p.strokeWeight(4);
          } else {
            p.strokeWeight(1);
          }
          p.fill(255, 0, 0);
          p.ellipse(Zx[N] + 300, Zy[N] + 300, 20, 20);
          if (MODE == -N) {
            p.strokeWeight(4);
          } else {
            p.strokeWeight(1);
          }
          p.fill(0, 0, 255);
          p.ellipse(Wx[N] + 300, Wy[N] + 300, 20, 20);
          L = p.sqrt(p.pow(Zx[N] - Wx[N], 2) + p.pow(Zy[N] - Wy[N], 2));
          Sx = (Wx[N] - Zx[N]) * 10 / L + Zx[N];
          Sy = (Wy[N] - Zy[N]) * 10 / L + Zy[N];
          Gx = (Wx[N] - Zx[N]) * (L - 10) / L + Zx[N];
          Gy = (Wy[N] - Zy[N]) * (L - 10) / L + Zy[N];
          p.strokeWeight(2);
          p.line(Sx + 300, Sy + 300, Gx + 300, Gy + 300);
          Kx =
            (Sx - Gx) * p.cos(p.PI / 4) -
            (Sy - Gy) * p.sin(p.PI / 4) +
            Gx;
          Ky =
            (Sx - Gx) * p.sin(p.PI / 4) +
            (Sy - Gy) * p.cos(p.PI / 4) +
            Gy;
          p.line(Kx + 300, Ky + 300, Gx + 300, Gy + 300);
          Kx =
            (Sx - Gx) * p.cos(-p.PI / 4) -
            (Sy - Gy) * p.sin(-p.PI / 4) +
            Gx;
          Ky =
            (Sx - Gx) * p.sin(-p.PI / 4) +
            (Sy - Gy) * p.cos(-p.PI / 4) +
            Gy;
          p.line(Kx + 300, Ky + 300, Gx + 300, Gy + 300);
        }
        p.noFill();
        p.rect(0, 0, 600, 600);
      };

      function HEN() {
        Ax = Wx[3] - Wx[2];
        Ay = Wy[3] - Wy[2];
        Bx = Zx[3] - Zx[1];
        By = Zy[3] - Zy[1];
        Dx = Wx[3] - Wx[1];
        Dy = Wy[3] - Wy[1];
        Ex = Zx[3] - Zx[2];
        Ey = Zy[3] - Zy[2];
      }

      function KAN() {
        Cx = Zx[0] - Zx[2];
        Cy = Zy[0] - Zy[2];
        Fx = Zx[0] - Zx[1];
        Fy = Zy[0] - Zy[1];
        Kx = Ax * Bx - Ay * By;
        Ky = Ax * By + Ay * Bx;
        LDx = Kx;
        LDy = Ky;
        Kx = LDx * Cx - LDy * Cy;
        Ky = LDx * Cy + LDy * Cx;
        LDx = Kx;
        LDy = Ky;
        Kx = Dx * Ex - Dy * Ey;
        Ky = Dx * Ey + Dy * Ex;
        RDx = Kx;
        RDy = Ky;
        Kx = RDx * Fx - RDy * Fy;
        Ky = RDx * Fy + RDy * Fx;
        RDx = Kx;
        RDy = Ky;
        Kx = Wx[1] * LDx - Wy[1] * LDy;
        Ky = Wx[1] * LDy + Wy[1] * LDx;
        LUx = Kx;
        LUy = Ky;
        Kx = Wx[2] * RDx - Wy[2] * RDy;
        Ky = Wx[2] * RDy + Wy[2] * RDx;
        RUx = Kx;
        RUy = Ky;
        NAKAx = LUx - RUx;
        NAKAy = LUy - RUy;
        HOPPYx = LDx - RDx;
        HOPPYy = LDy - RDy;
        Wx[0] = (NAKAx * HOPPYx + NAKAy * HOPPYy) / 4 + RUx;
        Wy[0] = (NAKAx * HOPPYy - NAKAy * HOPPYx) / 4 + RUy;
        Wx[0] /= HOPPYx * HOPPYx + HOPPYy * HOPPYy;
        Wy[0] /= HOPPYx * HOPPYx + HOPPYy * HOPPYy;
      }

      p.mousePressed = () => {
        if (MODE == 0) {
          for (N = 1; N < 4; N++) {
            L = p.sqrt(
              p.pow(p.mouseX - 300 - Zx[N], 2) + p.pow(p.mouseY - 300 - Zy[N], 2)
            );
            if (L < 10) {
              MODE = N;
            }
            L = p.sqrt(
              p.pow(p.mouseX - 300 - Wx[N], 2) + p.pow(p.mouseY - 300 - Wy[N], 2)
            );
            if (L < 10) {
              MODE = -N;
            }
          }
        } else {
          MODE = 0;
          T = 0;
          p.background(0);
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
      <ScienceAplicationNavBar />
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>

      <DialogBox value={"mouse move"} />
    </div>
  );
};

export default MobiusTransformation;
