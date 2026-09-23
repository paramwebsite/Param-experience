import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const WavesOnSphere = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      const Nmax = 1000;
      const M = 50;
      const H = 0.99;
      const HH = 0.01;
      const X = new Array(Nmax + 1).fill(0);
      const Y = new Array(Nmax + 1).fill(0);
      const Z = new Array(Nmax + 1).fill(0);
      const V = new Array(Nmax + 1).fill(0);
      const dV = new Array(Nmax + 1).fill(0);
      let L;
      const R = 2 * p.sqrt((4 * p.PI * (200 * 200) / Nmax) / (2 * p.sqrt(3)));
      let Lmin;
      let N;
      let NN;
      let KX;
      let KY;
      let KZ;
      let KV;
      let KdV;
      let K;

      p.setup = () => {
        p.createCanvas(600, 600).parent(canvasRef.current);
        p.background(0, 0, 0);
        p.noSmooth();
        p.stroke(255, 255, 255);
        p.fill(50, 50, 50);

        for (N = 0; N <= Nmax; N++) {
          X[N] = p.random(-300, +300);
          Y[N] = p.random(-300, +300);
          Z[N] = p.random(-300, +300);
        }
      };

      p.draw = () => {
        p.background(0, 0, 0);

        for (N = 0; N <= Nmax; N++) {
          for (NN = N + 1; NN <= Nmax; NN++) {
            L = p.sqrt(
              (X[N] - X[NN]) * (X[N] - X[NN]) + (Y[N] - Y[NN]) * (Y[N] - Y[NN])
            );
            L = p.sqrt((Z[N] - Z[NN]) * (Z[N] - Z[NN]) + (L * L));
            if (L < R) {
              X[N] = X[N] - ((X[NN] - X[N]) * ((R - L) / (2 * L)));
              Y[N] = Y[N] - ((Y[NN] - Y[N]) * ((R - L) / (2 * L)));
              Z[N] = Z[N] - ((Z[NN] - Z[N]) * ((R - L) / (2 * L)));
              X[NN] = X[NN] + ((X[NN] - X[N]) * ((R - L) / (2 * L)));
              Y[NN] = Y[NN] + ((Y[NN] - Y[N]) * ((R - L) / (2 * L)));
              Z[NN] = Z[NN] + ((Z[NN] - Z[N]) * ((R - L) / (2 * L)));
              dV[N] = dV[N] + ((V[NN] - V[N]) / M);
              dV[NN] = dV[NN] - ((V[NN] - V[N]) / M);
              p.stroke(125 + Z[N] / 2, 125 + Z[N] / 2, 125 + Z[N] / 2);
              p.line(
                X[N] * 1.2 * (200 + V[N]) / 200 + 300,
                Y[N] * 1.2 * (200 + V[N]) / 200 + 300,
                X[NN] * 1.2 * (200 + V[NN]) / 200 + 300,
                Y[NN] * 1.2 * (200 + V[NN]) / 200 + 300
              );
            }
            if (Z[N] > Z[NN]) {
              KX = X[N];
              KY = Y[N];
              KZ = Z[N];
              KV = V[N];
              KdV = dV[N];
              X[N] = X[NN];
              Y[N] = Y[NN];
              Z[N] = Z[NN];
              V[N] = V[NN];
              dV[N] = dV[NN];
              X[NN] = KX;
              Y[NN] = KY;
              Z[NN] = KZ;
              V[NN] = KV;
              dV[NN] = KdV;
            }
          }
          L = p.sqrt(X[N] * X[N] + Y[N] * Y[N]);
          L = p.sqrt(Z[N] * Z[N] + L * L);
          X[N] = X[N] + (X[N] * (200 - L) / (2 * L));
          Y[N] = Y[N] + (Y[N] * (200 - L) / (2 * L));
          Z[N] = Z[N] + (Z[N] * (200 - L) / (2 * L));
          KZ = Z[N];
          KX = X[N];
          Z[N] = KZ * p.cos(p.float(300 - p.mouseX) / 10000) - KX * p.sin(p.float(300 - p.mouseX) / 10000);
          X[N] = KZ * p.sin(p.float(300 - p.mouseX) / 10000) + KX * p.cos(p.float(300 - p.mouseX) / 10000);
          KZ = Z[N];
          KY = Y[N];
          Z[N] = KZ * p.cos(p.float(300 - p.mouseY) / 10000) - KY * p.sin(p.float(300 - p.mouseY) / 10000);
          Y[N] = KZ * p.sin(p.float(300 - p.mouseY) / 10000) + KY * p.cos(p.float(300 - p.mouseY) / 10000);
          dV[N] = dV[N] - (V[N] * HH);
          V[N] = V[N] + dV[N];
          dV[N] = dV[N] * H;
        }
      };

      p.mousePressed = () => {
        Lmin = 600;
        NN = 0;
        for (N = 0; N <= Nmax; N++) {
          L = p.sqrt(
            (p.mouseX - (300 + X[N])) * (p.mouseX - (300 + X[N])) +
            (p.mouseY - (300 + Y[N])) * (p.mouseY - (300 + Y[N]))
          );
          if (Z[N] > 0 && L < Lmin) {
            NN = N;
            Lmin = L;
          }
        }
        if (K === 0) {
          dV[NN] = -200;
          K = 1;
        } else {
          dV[NN] = +200;
          K = 0;
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

      <DialogBox value={"Waves on sphere - Hover over the sphere to rotate and touch to generate wave effect on the sphere."} />
    </div>
  );
};

export default WavesOnSphere;
