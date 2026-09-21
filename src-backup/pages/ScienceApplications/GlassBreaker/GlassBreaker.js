import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const GlassBreaker = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let a, b, c, d, first, mouse, polygons = [];

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.frameRate(30);

        a = p.createVector(p.width * 0.1, p.height * 0.1);
        b = p.createVector(p.width * 0.9, p.height * 0.1);
        c = p.createVector(p.width * 0.9, p.height * 0.9);
        d = p.createVector(p.width * 0.1, p.height * 0.9);

        first = [a, b, c, d];
        polygons.push(new Polygon(first));
      };

      p.draw = () => {
        p.background(0);

        for (let i = 0; i < polygons.length; i++) {
          polygons[i].draw();

          if (mouseInPolygon(polygons[i].points)) {
            p.fill(180, 72);
            p.stroke(255);
            p.strokeWeight(2);
            for (let j = 0; j < polygons[i].points.length; j++) {
              p.line(
                polygons[i].points[j].x,
                polygons[i].points[j].y,
                p.mouseX,
                p.mouseY
              );
            }

            if (mouse) {
              let rand = getRandom(polygons[i].points.length + 1);
              for (let j = 0; j < polygons[i].points.length; j++) {
                for (let k = 0; k < polygons[i].split(rand).length; k++) {
                  let m = polygons[i].split(rand)[j][k];
                  let n = polygons[i].split(rand)[j][k + 1];
                  let z = [m, n, p.createVector(p.mouseX, p.mouseY)];

                  polygons.push(new Polygon(z));
                }
              }
              polygons.splice(i, 1);
              mouse = false;
            }
          }
        }
      };

      const mouseInPolygon = (polygon) => {
        let cross = 0;

        for (let i = 0; i < polygon.length; i++) {
          let m, n;
          m = polygon[i];
          n = i === polygon.length - 1 ? polygon[0] : polygon[i + 1];

          if ((m.y > p.mouseY) !== (n.y > p.mouseY)) {
            let x =
              ((n.x - m.x) / (n.y - m.y)) * (p.mouseY - m.y) + m.x;
            if (p.mouseX < x) {
              cross++;
            }
          }
        }

        return cross % 2 === 1 ? true : false;
      };

      const getRandom = (num) => {
        let r = [0, 1];
        for (let i = 0; i < num - 2; i++) {
          r.push(p.random(1));
        }
        r.sort();
        return r;
      };

      p.mouseReleased = () => {
        mouse = true;
      };

      p.keyPressed = () => {
        if (p.keyCode === p.ENTER) {
          p.saveCanvas('img', 'png');
        }
      };

      class Polygon {
        constructor(points) {
          this.points = points;
          //this.c = color(random(255), random(255), random(255))
          this.t = p.random(12, 96);
        }

        draw() {
          if (mouseInPolygon(this.points)) p.fill(180, 128);
          else p.fill(180, this.t);
          p.stroke(128);
          p.strokeWeight(0.5);

          p.beginShape();
          for (let i = 0; i < this.points.length; i++) {
            p.vertex(this.points[i].x, this.points[i].y);
          }
          p.endShape(p.CLOSE);
        }

        split(r) {
          let splitPoint = [];

          for (let i = 0; i < this.points.length; i++) {
            let m, n, p = [];
            m = this.points[i];
            n =
              i === this.points.length - 1 ? this.points[0] : this.points[i + 1];

            for (let j = 0; j < this.points.length + 1; j++) {
              let q = this.lerpVectors(m, n, r[j]);
              p.push(q);
            }
            splitPoint.push(p);
          }
          return splitPoint;
        }

        lerpVectors(v1, v2, amt) {
          return p.createVector(
            p.lerp(v1.x, v2.x, amt),
            p.lerp(v1.y, v2.y, amt)
          );
        }
      }
    });

    return () => {
      // Cleanup function: remove the p5.js sketch when the component unmounts
      sketch.remove();
    };
  }, []);

  return (
    <div className='ScienceAplication glass-breaker'>
      <ScienceAplicationNavBar/>
      
        <div ref={canvasRef} className='ScienceAplicationblock'></div>
 
      <DialogBox value={"Glass Breaker - Touch to crack the glass"}/>
    </div>
  );
};

export default GlassBreaker;
