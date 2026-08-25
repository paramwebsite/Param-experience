import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const QardTree = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let thickness = 2;
      let colors;
      let probColors;
      let qtree;

      p.setup = () => {
        if (p.windowHeight < p.windowWidth) {
          p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current);
        } else {
          p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current);
        }
        let boundary = new Rectangle(p.width / 2, p.height / 2, p.width / 2, p.height / 2);
        qtree = new QuadTree(boundary, 4);
        p.background(100);
        qtree.show();
      };

      p.mouseDragged = () => {
        for (let i = 0; i < 5; i++) {
          let m = new Point(p.mouseX + p.random(-5, 5), p.mouseY + p.random(-5, 5));
          qtree.insert(m);
        }
        qtree.show();
      };

      p.mousePressed = () => {
        for (let i = 0; i < 5; i++) {
          let m = new Point(p.mouseX + p.random(-5, 5), p.mouseY + p.random(-5, 5));
          qtree.insert(m);
        }
        qtree.show();
      };

      p.keyTyped = () => {
        if (p.key === 's' || p.key === 'S') p.save(p.str(p.random(0, 1000)) + '.png');
      };

      function chooseColor() {
        var r = p.random(1),
          sum = 0;
        var i = 0;
        while (sum <= r) {
          sum += probColors[i++];
        }
        return i - 1;
      }

      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
      }

      class Rectangle {
        constructor(x, y, w, h) {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
        }
        contains(point) {
          return point.x >= this.x - this.w && point.x <= this.x + this.w && point.y >= this.y - this.h && point.y <= this.y + this.h;
        }
      }

      class QuadTree {
        constructor(boundary, n) {
          this.boundary = boundary;
          this.capacity = n;
          this.points = [];
          this.divided = false;

          colors = [
            [19, 22, 14],
            [235, 235, 235],
            [69, 106, 187],
            [233, 206, 49],
            [216, 64, 40],
          ];
          probColors = [0.01, 0.51, 0.16, 0.16, 0.16];

          this.color = chooseColor();
        }
        subdivide() {
          let x = this.boundary.x;
          let y = this.boundary.y;
          let w = this.boundary.w;
          let h = this.boundary.h;

          let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
          this.northeast = new QuadTree(ne, this.capacity);
          let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
          this.northwest = new QuadTree(nw, this.capacity);
          let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
          this.southeast = new QuadTree(se, this.capacity);
          let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
          this.southwest = new QuadTree(sw, this.capacity);

          this.divided = true;
        }
        insert(point) {
          if (!this.boundary.contains(point)) {
            return false;
          }

          if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
          } else {
            if (!this.divided) {
              this.subdivide();
            }

            if (this.northeast.insert(point)) {
              return true;
            } else if (this.northwest.insert(point)) {
              return true;
            } else if (this.southeast.insert(point)) {
              return true;
            } else if (this.southwest.insert(point)) {
              return true;
            }
          }
        }
        show() {
          p.stroke(0);
          p.strokeWeight(thickness);
          p.rectMode(p.CENTER);

          var color = this.color;
          p.fill(colors[color][0], colors[color][1], colors[color][2]);

          p.rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
          if (this.divided) {
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
          }
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
      <ScienceAplicationNavBar />
      <div className='ScienceAplicationblockB'>
        <div ref={canvasRef} className='ScienceAplicationblockA'></div>
      </div>
      <DialogBox value={"Quard tree - Touch to generate"} />
    </div>
    
  );
};

export default QardTree;
