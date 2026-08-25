import React, { useEffect ,useRef} from 'react'
import '../scienceAplication.css';
import p5 from 'p5';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
function Pysarun() {
    const canvasRef = useRef(null);
    let colors = ['#DE183C', '#F2B541', '#0C79BB', '#ec4e20', '#067bc2', '#00916e', '#ff9f1c', '#a4459f', '#f654a9'];
    let SEED = Math.floor(Math.random() * 1000);
  
    useEffect(() => {
      const setupSketch = (p) => {
        p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current);
      };
  
      const drawSketch = (p) => {
        p.randomSeed(SEED);
        p.background('#ffffff');
        let c = 21;
        let w = p.width / c;
        p.strokeWeight(0);
        p.translate(p.width / 2, p.height / 1.7);
        p.scale(0.8);
        p.translate(-p.width / 2, -p.height /1.4);
        for (let i = 0; i < c; i++) {
          for (let j = 0; j < c; j++) {
            let x = i * w + w / 2;
            let y = j * w + w / 2;
  
            if ((i + j) % 2 === 0) {
              form(p, x, y, w * 0.9);
            }
          }
        }
      };
  
      const form = (p, x, y, w) => {
        let a = p.sin(p.frameCount * 0.005 + (y * 0.01) + (x * 0.001)) * 10;
        let r = (((p.cos(((p.frameCount / 60) * p.PI * 1.25) + (p.PI / 2) + ((x + y) * 0.002)) + 1) / 2) ** 3) * w * 0.25;
        let offx = r * p.cos(a);
        let offy = r * p.sin(a);
        let col1, col2, col3;
        while (col1 === col2 || col2 === col3 || col3 === col1) {
          col1 = p.random(colors);
          col2 = p.random(colors);
          col3 = p.random(colors);
        }
  
        p.push();
        p.translate(x, y/.5);
        p.fill(col1);
        p.circle(offx, offy, w);
        p.fill(col2);
        p.circle(0, 0, w);
        p.drawingContext.clip();
        p.fill('#000000');
        p.circle(offx, offy, w);
        p.pop();
      };
  
      const p5Sketch = new p5((p) => {
        p.setup = () => setupSketch(p);
        p.draw = () => drawSketch(p);
      });
  
      return () => {
        // Cleanup function: remove the p5.js sketch when the component unmounts
        p5Sketch.remove();
      };
    }, []);
    return (
        <div className='ScienceAplication ball-anime'>
            
                <ScienceAplicationNavBar />
                
          
            <div ref={canvasRef} className='ScienceAplicationblock '></div>
            <DialogBox value={" Ball Animation - Colourfull"}/>
        </div>
        
    )
}

export default Pysarun;