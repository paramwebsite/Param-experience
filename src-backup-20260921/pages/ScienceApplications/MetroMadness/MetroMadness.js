import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const MetroMadness = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let numPoints = 10;
      let points = [];
      let central = [];
      let metroLines = [];
      let connectedOuterPoints = new Set();
      let cityComplexitySlider;

      p.setup = () => {
        p.createCanvas(800, 800).parent(canvasRef.current);
        p.strokeCap(p.ROUND);

        // Create the slider
        cityComplexitySlider = p.createSlider(7, 100, 7); // Minimum value: 7, Maximum value: 100
        cityComplexitySlider.position(100,100); // Adjust position as needed

        p.generateCity();

        // Attach an event listener to the slider
        cityComplexitySlider.input(p.generateCity);
      };

      p.generateCity = () => {
        let cityComplexity = cityComplexitySlider.value();
        points = [];
        central = [];
        metroLines = [];
        connectedOuterPoints = new Set();

        p.generateOuter(cityComplexity - 1);
        p.generateCentral(cityComplexity - 2);
        while (connectedOuterPoints.size < points.length) {
          p.generateMetroLine();
        }

        p.redraw(); // Redraw the canvas with the new city
      };

      p.generateOuter = (lineAmount) => {
        // Generate outer city ring
        let centerX = p.width / 2;
        let centerY = p.height / 2;
        let radius = p.random(p.width / 2, p.width / 2);

        for (let i = 0; i < lineAmount; i++) {
          let angle = p.TAU / lineAmount;
          let x = centerX + p.cos(angle * i) * p.random(p.width / 4, radius);
          let y = centerY + p.sin(angle * i) * p.random(p.width / 4, radius);
          points.push(p.createVector(x, y));
        }
      };

      p.generateCentral = (numCentralPoints) => {
        // Generate stations in the city centre
        let centerX = p.width / 2;
        let centerY = p.height / 2;
        let radius = p.random(p.width / 6, p.width / 5);

        for (let i = 0; i < numCentralPoints; i++) {
          let angle = p.TAU / numCentralPoints;
          let x = centerX + p.cos(angle * i) * p.random(radius);
          let y = centerY + p.sin(angle * i) * p.random(radius);
          central.push(p.createVector(x, y));
        }
      };

      p.generateMetroLine = () => {
        // Generating a metro line that starts from the outer ring,
        // going through two points in the city centre (the closest and the farthest one)
        // and then choosing another outer ring station that is at least a few points away
        let startIndex = p.floor(p.random(points.length - 3));
        let outerStartPoint = points[startIndex];

        // Find the closest and furthest central points
        let closestIndex = 0;
        let furthestIndex = 0;
        let closestDistance = Infinity;
        let furthestDistance = 0;

        for (let i = 0; i < central.length; i++) {
          let distance = p.dist(outerStartPoint.x, outerStartPoint.y, central[i].x, central[i].y);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
          if (distance > furthestDistance) {
            furthestDistance = distance;
            furthestIndex = i;
          }
        }

        let closestPoint = central[closestIndex];
        let furthestPoint = central[furthestIndex];

        // Find an outer ring point at least two positions away from the starting point
        let outerFinishPoint;
        let finishIndex = (startIndex + 2 + p.floor(p.random(points.length - 4))) % points.length;
        outerFinishPoint = points[finishIndex];

        metroLines.push([outerStartPoint, closestPoint, furthestPoint, outerFinishPoint]);
        connectedOuterPoints.add(outerStartPoint);
        connectedOuterPoints.add(outerFinishPoint);
      };

      p.draw = () => {
        // Drawing all the stations and metro lines in the right order
        p.background(220);
        p.drawMetroLines();
        p.drawCentral();
        p.drawStations();
        p.noLoop();
      };

      p.drawStations = () => {
        p.noStroke();
        p.fill(255, 0, 0);
        for (let i = 0; i < points.length; i++) {
          let point = points[i];
          p.ellipse(point.x, point.y, 10, 10);
        }
      };

      p.drawCentral = () => {
        p.noStroke();
        p.fill(0, 0, 255);
        for (let i = 0; i < central.length; i++) {
          let centralStation = central[i];
          p.ellipse(centralStation.x, centralStation.y, 10, 10);
        }
      };

      p.drawMetroLines = () => {
        for (let i = 0; i < metroLines.length; i++) {
          let linePoints = metroLines[i];
          let metroColor = p.color(p.random(255), p.random(255), p.random(255));
          p.drawMetroLine(linePoints, metroColor);
        }
      };

      p.drawMetroLine = (linePoints, metroColor) => {
        // Making sure that the lines will go diagonally and vertically and horizontally towards their destination.
        p.stroke(metroColor);
        p.strokeWeight(5);

        for (let i = 0; i < linePoints.length - 1; i++) {
          let currentPoint = linePoints[i];
          let nextPoint = linePoints[i + 1];
          let dx = nextPoint.x - currentPoint.x;
          let dy = nextPoint.y - currentPoint.y;

          // Calculate the absolute differences in x and y coordinates
          let absDX = p.abs(dx);
          let absDY = p.abs(dy);

          // Determine the direction (sign) of movement
          let dirX = dx > 0 ? 1 : -1;
          let dirY = dy > 0 ? 1 : -1;

          // Adjust the line coordinates to move efficiently
          let startX = currentPoint.x;
          let startY = currentPoint.y;
          let endX = startX + dirX * p.min(absDX, absDY);
          let endY = startY + dirY * p.min(absDX, absDY);

          p.line(startX, startY, endX, endY);

          // Draw the remaining segments to the destination point
          if (absDX > absDY) {
            p.line(endX, endY, endX + dirX * (absDX - absDY), endY);
            p.line(endX + dirX * (absDX - absDY), endY, endX + dirX * (absDX - absDY), nextPoint.y);
            p.line(endX + dirX * (absDX - absDY), nextPoint.y, nextPoint.x, nextPoint.y);
          } else if (absDY > absDX) {
            p.line(endX, endY, endX, endY + dirY * (absDY - absDX));
            p.line(endX, endY + dirY * (absDY - absDX), nextPoint.x, endY + dirY * (absDY - absDX));
            p.line(nextPoint.x, endY + dirY * (absDY - absDX), nextPoint.x, nextPoint.y);
          }
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
      <DialogBox value={"Use the slider to change the city's Complexity and generate the new map"}/>
    </div>
  );
};

export default MetroMadness;
