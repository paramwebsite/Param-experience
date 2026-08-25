import React, { useEffect, useRef, useState } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const ImageMatrix = () => {
  const canvasRef = useRef(null);
  const [imageResized, setImageResized] = useState(false);

  useEffect(() => {
    let cellsize; // Dimensions of each cell in the grid
    let columns, rows; // Number of columns and rows in our system
    let x, y;
    let loc;
    let whiteLimit = 240; // default brightness white limit
    let blackLimit = 90; // default brightness black limit
    let type;

    // This function is needed to set up the p5.js sketch
    const setupP5 = (p) => {
      let img; // Declare the img variable inside the setup function

      p.preload = () => {
        // Load the image using p5's loadImage function
        img = p.loadImage('./monalisa.png');
       
      };

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current);
        cellsize = 5;
        p.frameRate(12);
        type = 'Circle';
        p.rectMode(p.CENTER);
        p.noStroke();
        // img.resize(p.width, p.height);
        if (!imageResized) {
          img.resize(p.width, p.height);
          setImageResized(true);
        }
      };

      p.draw = () => {
        p.background(60);
        let factor = p.map(p.mouseX, 0, p.width, 2, 120);
        if (p.mouseX >= 0) {
          if (p.mouseX < p.width) {
            if (p.mouseY >= 0) {
              if (p.mouseY < p.height) {
                whiteLimit = p.floor(p.map(p.mouseX, 0, p.width, 100, 50));
                blackLimit = p.floor(p.map(p.mouseY, 0, p.height, 50, 0));
              }
            }
          }
        }

        // Begin loop for columns
        columns = p.floor(img.width / cellsize); // Calculate # of columns
        rows = p.floor(img.height / cellsize); // Calculate # of rows

        for (let i = 0; i < columns; i++) {
          // Begin loop for rows
          for (let j = 0; j < rows; j++) {
            x = i * cellsize + cellsize / 2; // x position
            y = j * cellsize + cellsize / 2; // y position
            let c = img.get(x, y); // Grab the color

            //draw matrix
            p.push();
            p.translate(x, y);
            //choose color according to white and black limits
            if (p.brightness(c) > whiteLimit) {
              p.fill(255);
            } else if (p.brightness(c) < blackLimit) {
              p.fill(0);
            } else {
              p.fill(125);
            }

            //type of shape for the grid
            if (type === 'Circle') {
              p.ellipse(0, 0, cellsize, cellsize);
            } else if (type === 'Square') {
              p.rect(0, 0, cellsize, cellsize);
            } else if (type === 'Triangle') {
              p.triangle(0 - cellsize / 2, 0 + cellsize, 0 + cellsize / 2, 0 + cellsize, 0, 0);
            }
            p.pop();
            // end of matrix
          }
        }
      };

      // control type of shape
      p.mousePressed = () => {
        if (p.mouseButton === p.LEFT) {
          if (type === 'Triangle') {
            type = 'Circle';
          } else if (type === 'Square') {
            type = 'Triangle';
          } else if (type === 'Circle') {
            type = 'Square';
          }
        }
        if (p.mouseButton === p.RIGHT) {
          // reset
          cellsize = 5;
          type = 'Circle';
        }
      };

      // control the cell size
      p.mouseWheel = (event) => {
        if (event.delta > -614) {
          if (event.delta < 614) {
            let e = p.map(event.delta, -614, 614, 3, 30);

            cellsize = p.int(e);
          }
        }
        return false; // Prevent default behavior (page scrolling)
      };

      // Once the image is loaded, call the p5.js sketch setup
      p.preload();
    };

    // Create a new p5.js instance
    const sketch = new p5(setupP5);

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

      <DialogBox value={'Mouse position , mouse wheel and mouse click'} />
    </div>
  );
};

export default ImageMatrix;
