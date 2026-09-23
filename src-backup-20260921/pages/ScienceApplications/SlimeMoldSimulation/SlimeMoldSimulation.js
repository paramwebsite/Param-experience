import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const SlimeMoldSimulation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      const OPC = { button: () => {} };
      const agentColor = new Uint8Array([0, 0, 0]);
      const agentsNum = 1000;
      const sensorOffset = 10;
      const sensorAngle = p.PI / 7;
      const turnAngle = p.PI / 5;
      let agents;

      p.setup = () => {
        p.createCanvas(720, 720).parent(canvasRef.current);
        p.pixelDensity(1);
        p.background(0);
        agents = new Agents();
        OPC.button("btoButton", "back to origin");
      };

      function buttonPressed() {
        agents = new Agents();
      }

      p.draw = () => {
        p.background(255, 10);

        p.stroke("blue");
        p.strokeWeight(3);
        p.mouseIsPressed && p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);

        p.loadPixels();
        for (let i = 10; i--; ) {
          agents.update();
        }
        p.updatePixels();
      };

      class Agent {
        constructor() {
          this.x = p.width / 2;
          this.y = p.height / 2;
          this.dir = p.random(p.TWO_PI);
        }

        updateDirection() {
          const right = this.sense(+sensorAngle);
          const center = this.sense(0);
          const left = this.sense(-sensorAngle);

          const threeWays = [left, center - 1, right];
          const minIndex = threeWays.indexOf(Math.min(...threeWays));
          this.dir += turnAngle * (minIndex - 1);
        }

        sense(dirOffset) {
          const angle = this.dir + dirOffset;
          let x = p.floor(this.x + sensorOffset * p.cos(angle));
          let y = p.floor(this.y + sensorOffset * p.sin(angle));
          x = (x + p.width) % p.width;
          y = (y + p.height) % p.height;

          const index = (x + y * p.width) * 4;
          return p.pixels[index];
        }

        updatePosition() {
          this.x += p.cos(this.dir);
          this.y += p.sin(this.dir);
          this.x = (this.x + p.width) % p.width;
          this.y = (this.y + p.height) % p.height;

          const index = p.floor(this.x) + p.floor(this.y) * p.width;
          p.pixels.set(agentColor, index * 4);
        }
      }

      class Agents {
        constructor() {
          this.agents = Array(agentsNum)
            .fill()
            .map((e) => new Agent());
        }
        update() {
          this.agents.forEach((e) => e.updateDirection());
          this.agents.forEach((e) => e.updatePosition());
        }
      }
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
      <DialogBox value={"Slime mold simulations - Touch to create new pathways and links."}/>
      
    </div>
  );
};

export default SlimeMoldSimulation;
