import React, { useEffect, useRef } from 'react';
import '../scienceAplication.css';
import p5 from 'p5';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';
import DialogBox from '../DialogBox/DialogBox';

function ElectricSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let pathPoints = [];

    const setupSketch = (p) => {
      p.createCanvas(800,800).parent(canvasRef.current);
      p.background(0);
    };

    const drawSketch = (p) => {
      // Create the path
      pathPoints = circlePoints(p);

      for (let j = 0; j < 10; j++) {
        pathPoints = complexifyPath(p, pathPoints);
      }

      // Draw the path
      p.stroke(255, 20);
      for (let i = 0; i < pathPoints.length - 1; i++) {
        let v1 = pathPoints[i];
        let v2 = pathPoints[i + 1];
        p.line(v1.x, v1.y, v2.x, v2.y);
      }
    };

    const complexifyPath = (p, pathPoints) => {
      // Create a new path array from the old one by adding new points in between the old points
      let newPath = [];

      for (let i = 0; i < pathPoints.length - 1; i++) {
        let v1 = pathPoints[i];
        let v2 = pathPoints[i + 1];
        let midPoint = p5.Vector.add(v1, v2).mult(0.5);
        let distance = v1.dist(v2);

        // The new point is halfway between the old points, with some gaussian variation
        let standardDeviation = 0.125 * distance;
        let v = p.createVector(
          p.randomGaussian(midPoint.x, standardDeviation),
          p.randomGaussian(midPoint.y, standardDeviation)
        );
        newPath.push(v1);
        newPath.push(v);
      }

      // Don't forget the last point!
      newPath.push(pathPoints[pathPoints.length - 1]);
      return newPath;
    };

    const circlePoints = (p) => {
      // Two points somewhere on a circle
      let r = 800 / 3;
      let theta1 = p.randomGaussian(0, p.PI / 4);
      let theta2 = theta1 + p.randomGaussian(0, p.PI / 3);
      let v1 = p.createVector(800 / 2 + r * p.cos(theta1), 800 / 2 + r * p.sin(theta1));
      let v2 = p.createVector(800 / 2 + r * p.cos(theta2), 800 / 2 + r * p.sin(theta2));

      return [v1, v2];
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
    <div className='ScienceAplication'>
      <ScienceAplicationNavBar/>
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
        
      </div>
      <DialogBox value={"Electric Sphere - Earth"}/>
    </div>
  );
}

export default ElectricSphere;
