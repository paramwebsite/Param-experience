import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import '../ScienceApplication.css';
import "../DialogBox/DialogBox.css";
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const DoubleDip = () => {
  const canvasRef = useRef(null);
  let squares;

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(p.windowHeight, p.windowHeight).parent(canvasRef.current);
        p.pixelDensity(10.0);
        p.fill(0);
        p.noLoop();

        squares = [];
        squares.push(new Square(p, 0, 0, p.height, true));
      };

      p.draw = () => {
        p.background(255);
        for (let i = 0; i < squares.length; i++) {
          squares[i].display();
        }
      };

      p.mousePressed = () => {
        let whichOne = -1;
        for (let i = 0; i < squares.length; i++) {
          if (squares[i].containsPoint(p.mouseX, p.mouseY)) {
            whichOne = i;
          }
        }
        // modifying the clicked square
        // outside of the for loop for security
        let s = squares.splice(whichOne, 1);
        squares = squares.concat(s[0].subdivide());
        p.redraw();
      };

      p.keyPressed = () => {
        if (p.key === ' ') {
          // subdivide everything
          let newSquares = [];
          for (let i = 0; i < squares.length; i++) {
            newSquares = newSquares.concat(squares[i].subdivide());
          }
          squares = newSquares;
          p.redraw();
        }
        if (p.key === 'r') {
          // reset
          squares = [];
          squares.push(new Square(p, 0, 0, p.height, true));
          p.redraw();
        }
      };
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
  //   <div className='ScienceAplication'>
  //  <ScienceAplicationNavBar/>
    
  //       <div ref={canvasRef} className='ScienceAplicationblock'></div>
      
  //     <DialogBox value={"Click a square (black or white) to subdivide. Press [space] to subdivide every square. Press [r] to reset."}/>
  //   </div>
  <div className='ScienceAplication'>
  <ScienceAplicationNavBar/>
  <div className='ScienceAplicationblockB'>
    <div ref={canvasRef} className='ScienceAplicationblockA'></div>
  </div>
  <DialogBox value={"Double dip - Touch to generate"}/>
</div>
  );
};

export default DoubleDip;

// Helper class for Square
function Square(p, x_, y_, size_, isBlack_) {
  this.x = x_;
  this.y = y_;
  this.size = size_;
  this.isBlack = isBlack_;

  this.display = function () {
    if (this.isBlack) {
      p.square(this.x, this.y, this.size);
    }
  };

  this.containsPoint = function (a, b) {
    return a > this.x && a < this.x + this.size && b > this.y && b < this.y + this.size;
  };

  this.subdivide = function () {
    let newSquares = [];
    let newSize = this.size / 3;
    newSquares.push(new Square(p, this.x + newSize, this.y + newSize, newSize, !this.isBlack));
    newSquares.push(new Square(p, this.x, this.y, newSize, this.isBlack));
    newSquares.push(new Square(p, this.x + newSize, this.y, newSize, this.isBlack));
    newSquares.push(new Square(p, this.x, this.y + newSize, newSize, this.isBlack));
    newSquares.push(new Square(p, this.x + 2 * newSize, this.y, newSize, this.isBlack));
    newSquares.push(new Square(p, this.x, this.y + 2 * newSize, newSize, this.isBlack));
    newSquares.push(new Square(p, this.x + newSize, this.y + 2 * newSize, newSize, this.isBlack));
    newSquares.push(new Square(p, this.x + 2 * newSize, this.y + newSize, newSize, this.isBlack));
    newSquares.push(new Square(p, this.x + 2 * newSize, this.y + 2 * newSize, newSize, this.isBlack));
    return newSquares;
  };
}
