import React, { useEffect, useRef } from 'react'
import '../scienceAplication.css';
import p5 from 'p5';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';
function Recurssivecircle() {
    const canvasRef = useRef(null);

    useEffect(() => {

        var r;
        var a = 0;
        var numLevels = 2;


        const setupSketch = (p) => {

            p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current);
            r = window.innerHeight / 6
        };


        const drawSketch = (p) => {
            p.background(0);
            p.push();
            p.translate(p.width / 2, p.height / 2);
            p.rotate(p.PI * a / 180);
            p.noFill();
            p.stroke(0, 100);
            p.circle(0, 0, r);
            circleAround(0, 0, r, numLevels, p);
            p.pop();

            a += 0.1;
        };


        function circleAround(x, y, r, levels, p) {
            let l = p;
            let numSides = 6;
            for (let i = 0; i < 360; i += 360 / 6) {
                let circleX = r * p.cos(p.PI * i / 180);
                let circleY = r * p.sin(p.PI * i / 180);
                p.push()
                p.noFill();
                p.stroke(255);
                p.translate(circleX, circleY);
                p.rotate(p.PI * a / 180);
                if (levels > 0) {
                    circleAround(0, 0, r, levels - 1, l);
                }
                p.circle(0, 0, r);
                p.pop();
            }
        }

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
        <div className='ScienceAplication'>
            <ScienceAplicationNavBar />
          
                <div ref={canvasRef} className='ScienceAplicationblock' style={{
          width: '100%', // Adjust width as needed
          height: '100vh', // Adjust height as needed
        }}></div>
                <DialogBox value={"Recursive Circle - Static animation"}/>
            
        </div>
    )
}

export default Recurssivecircle;