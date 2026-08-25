import React, { useEffect, useRef } from 'react';
import '../scienceAplication.css';
import p5 from 'p5';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const agentsNum = 200;
const range = 640;

const PolarMystery = (p) => {
  const agent = () => ({
    angle: p.random(p.TWO_PI),
    distance: 0,
    x: 0,
    y: 0,
  });

  const Agents = {
    agents: [],

    init() {
      this.agents.length = 0;
    },

    addAgents() {
      if (this.agents.length < agentsNum) {
        this.agents.push(agent());
      }
    },

    updateAgents() {
      for (const a of this.agents) {
        a.distance += 5;
        a.x = p.cos(a.angle) * a.distance;
        a.y = p.sin(a.angle) * a.distance;
      }
      this.agents = this.agents.filter((a) => a.distance < window.innerWidth);
    },

    render() {
      p.translate(0,0, -200);

      for (let i = this.agents.length; i--;) {
        const current = this.agents[i];
        for (let j = i; j--;) {
          const other = this.agents[j];
          const dis2 = (current.x - other.x) ** 2 + (current.y - other.y) ** 2;

          if (
            !this.agents.some(
              (any) =>
                dis2 > (any.x - current.x) ** 2 + (any.y - current.y) ** 2 &&
                dis2 > (any.x - other.x) ** 2 + (any.y - other.y) ** 2
            )
          ) {
            const ave = (current.distance + other.distance) / 2;
            const z = 1.017 ** (p.width / 2 - ave);
            const s = ave / 8;
            p.stroke(p.map(ave, 0, range, 0, 255));
            p.push();
            p.scale(0.5);
            p.translate(
              (current.x + other.x) / 2,
              (current.y + other.y) / 2,
              z / 2
            );
            const r = p.atan2(current.y - other.y, current.x - other.x);
            p.rotate(r);
            const dis3 = (current.x - other.x) ** 2 + (current.y - other.y) ** 2;
            p.box(dis3 ** 0.5, 2, z);
            p.pop();
          }
        }
      }

      for (const a of this.agents) {
        const z = 1.017 ** (p.width / 2 - a.distance);
        const s = a.distance / 8;
        p.stroke(p.map(a.distance, 0, range, 0, 255));
        p.push();
        p.scale(0.6)
        p.translate(a.x, a.y, z / 2);
        p.rotate(a.angle);
        p.box(s / 3, s / 3, z / 3);
        p.pop();
      }
    },
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    Agents.init();
    p.ortho();
  };

  p.draw = () => {
    p.background("white");
    p.rotateX(1);
    p.rotateZ(p.frameCount * 0.01);
    Agents.addAgents();
    Agents.updateAgents();
    Agents.render();
  };
};

const Networking = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const p5Sketch = new p5(PolarMystery, canvasRef.current);

    return () => {
      p5Sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication'>
      <ScienceAplicationNavBar />
   
        <div ref={canvasRef} className='ScienceAplicationblock'></div>
     
      
    </div>
  );
};

export default Networking;
