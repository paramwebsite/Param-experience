import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Mobius= () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      const Nmax = 8000;
      const minL = 0.1;
      let ZX, ZY, FX, FY, AX, AY, BX, BY;
      let CX, CY, DX, DY, AZX, AZY, CZX, CZY;
      let nakaX, nakaY, hoppy;
      let X = new Array(Nmax);
      let Y = new Array(Nmax);
      let AZBX, AZBY, CZDX, CZDY;
      let H, N, L;

      p.setup = () => {
        p.createCanvas(600, 600).parent(canvasRef.current);
        p.background(0);
        p.noSmooth();
        p.stroke(255);
        p.fill(0, 0, 0, 80);
        AX = 1;
        AY = 0;
        BX = 1;
        BY = 0;
        DX = 1;
        DY = 0;
        H = 0.00000025;
        for (N = 0; N < Nmax; N++) {
          X[N] = p.random(-200, +200);
          Y[N] = p.random(-200, +200);
        }
      };

      p.draw = () => {
        p.rect(0, 0, 599, 599);
        for (N = 0; N < Nmax; N++) {
          ZX = X[N];
          ZY = Y[N];
          HENKAN();
          p.line(ZX + 300, ZY + 300, FX + 300, FY + 300);
          L = p.sqrt(p.pow(FX - X[N], 2) + p.pow(FY - Y[N], 2));
          if (L > minL) {
            X[N] = FX;
            Y[N] = FY;
          } else {
            X[N] = -X[N];
            Y[N] = -Y[N];
          }
        }
        CX = (p.mouseX - 300) * H;
        CY = (p.mouseY - 300) * H;
      };

      function HENKAN() {
        AZX = AX * ZX - AY * ZY;
        AZY = AX * ZY + AY * ZX;
        CZX = CX * ZX - CY * ZY;
        CZY = CX * ZY + CY * ZX;
        AZBX = AZX + BX;
        AZBY = AZY + BY;
        CZDX = CZX + DX;
        CZDY = CZY + DY;
        nakaX = AZBX * CZDX + AZBY * CZDY;
        nakaY = -(AZBX * CZDY) + AZBY * CZDX;
        hoppy = CZDX * CZDX + CZDY * CZDY;
        FX = nakaX / hoppy;
        FY = nakaY / hoppy;
      }

      p.mousePressed = () => {
        for (N = 0; N < Nmax; N++) {
          X[N] = p.random(-200, +200);
          Y[N] = p.random(-200, +200);
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
      <div className='ScienceAplicationblockB'>
      <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>
      
    </div>
  );
};

export default Mobius;
