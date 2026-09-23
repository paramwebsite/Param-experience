import React, { useEffect, useRef } from 'react';
import '../scienceAplication.css';
import p5 from 'p5';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

function Penrose() {
    const canvasRef = useRef(null);


    useEffect(() => {
        function penroseTiling(p) {
            let triangles = [];
            let dividing = false;
            let zooming = false;
            let divideStep = 0;
            let zoomStep = 0;
            let strokeSize = 4;

            const c1 = p.color(0, 0, 0);
            const c2 = p.color(255, 255, 255);
            const c3 = p.color(124, 124, 124);

            class Triangle {
                constructor(red, a, b, c) {
                    this.red = red;
                    this.vert = [a, b, c];
                }

                redraw() {
                    if (this.red) {
                        p.fill(c2);
                        p.stroke(c2);
                    } else {
                        p.fill(c1);
                        p.stroke(c1);
                    }
                    p.strokeWeight(1);
                    p.triangle(this.vert[1].x, this.vert[1].y, this.vert[0].x, this.vert[0].y, this.vert[2].x, this.vert[2].y);
                    p.stroke(c3);
                    p.strokeWeight(strokeSize);
                    p.line(this.vert[1].x, this.vert[1].y, this.vert[0].x, this.vert[0].y);
                    p.line(this.vert[0].x, this.vert[0].y, this.vert[2].x, this.vert[2].y);
                    p.noStroke();
                }
            }

            p.setup = function () {
                p.createCanvas(700, 700).parent(canvasRef.current);
                p.noStroke();
                makeWheel();
                redrawAll(triangles);
                p.textAlign(p.CENTER, p.CENTER);
                p.textSize(18);
                showMessage("Click with mouse to subdivide triangles!\n \nPress space bar to zoom!");
            }

            p.draw = function () {
                let triangleSize =
                    p.dist(
                        triangles[0].vert[0].x,
                        triangles[0].vert[0].y,
                        triangles[0].vert[1].x,
                        triangles[0].vert[1].y
                    );

                strokeSize = triangleSize / 50;
                let ds = 0.6 * p.exp(-0.009 * triangleSize);
                if (dividing) {
                    if (divideStep < 1) {
                        redrawAll(subdivide(triangles, divideStep));
                        divideStep += ds;
                    } else {
                        triangles = subdivide(triangles, 1);
                        dividing = false;
                        redrawAll(triangles);
                    }
                }
                if (zooming) {
                    if (zoomStep < 10) {
                        triangles = zoom(1.0493);
                        redrawAll(triangles);
                        zoomStep++;
                    } else {
                        zooming = false;
                        zoomStep = 0;
                    }
                }
            }

            p.mouseClicked = function () {
                if (!dividing && !zooming) {
                    if (triangles.length < 5000) {
                        dividing = true;
                        divideStep = 0;
                    } else {
                        showMessage("Zoom before subdiving!\n \nPress space bar!");
                    }
                }
            }

            p.keyPressed = function () {
                if (!dividing && !zooming && p.key == ' ') {
                    let triangleSize =
                        p.dist(
                            triangles[0].vert[0].x,
                            triangles[0].vert[0].y,
                            triangles[0].vert[1].x,
                            triangles[0].vert[1].y
                        );
                    if (triangleSize < p.width / 4) {
                        zooming = true;
                    } else {
                        showMessage("Subdivide before zooming!\n \nClick with mouse!");
                    }
                }
            }

            function showMessage(msg) {
                p.fill(0);
                p.rect(p.width / 2 - 200, p.height / 2 - 50, 400, 100);
                p.fill(224, 224, 224);
                p.text(msg, p.width / 2, p.height / 2);
                setTimeout(() => redrawAll(triangles), 5000);
            }

            function makeWheel() {
                let origin = new p5.Vector(p.width / 2, p.height / 2);
                let r = 0.5 * p.width;
                for (let i = 0; i < 10; i++) {
                    let b = new p5.Vector(
                        origin.x + r * p.cos((2 * i - 1) * p.PI / 10),
                        origin.y + r * p.sin((2 * i - 1) * p.PI / 10)
                    );
                    let c = new p5.Vector(
                        origin.x + r * p.cos((2 * i + 1) * p.PI / 10),
                        origin.y + r * p.sin((2 * i + 1) * p.PI / 10)
                    );
                    if (i % 2 == 0) { //mirror every second triangle
                        let temp = b;
                        b = c;
                        c = temp;
                    }

                    triangles.push(new Triangle(true, origin, b, c));
                }
            }

            const phi = (1 + p.sqrt(5)) / 2;

            function subdivide(tList, s) {
                let result = [];
                for (let i = 0; i < tList.length; i++) {
                    let t = tList[i];
                    let t1, t2, t3;
                    if (t.red) {
                        let p = new p5.Vector(t.vert[0].x + s * (t.vert[1].x - t.vert[0].x) / phi, t.vert[0].y + s * (t.vert[1].y - t.vert[0].y) / phi);
                        addToList(result, new Triangle(true, t.vert[2], p, t.vert[1]));
                        addToList(result, new Triangle(false, p, t.vert[2], t.vert[0]));
                    } else {
                        let q = new p5.Vector(t.vert[0].x - (1 - 1 / phi) * s * (t.vert[0].x - t.vert[1].x), t.vert[0].y - (1 - 1 / phi) * s * (t.vert[0].y - t.vert[1].y));
                        let r = new p5.Vector(t.vert[1].x + (t.vert[2].x - t.vert[1].x) / phi, t.vert[1].y + (t.vert[2].y - t.vert[1].y) / phi);
                        addToList(result, new Triangle(false, r, t.vert[2], t.vert[0]));
                        addToList(result, new Triangle(false, q, r, t.vert[1]));
                        addToList(result, new Triangle(true, r, q, t.vert[0]));
                    }
                }
                return result;
            }

            function redrawAll(tList) {
                p.background(0);
                for (let i = 0; i < tList.length; i++) {
                    tList[i].redraw();
                }
            }

            function addToList(tList, t) {
                if ((t.vert[0].x >= 0 && t.vert[0].x <= p.width && t.vert[0].y >= 0 && t.vert[0].y <= p.height) ||
                    (t.vert[1].x >= 0 && t.vert[1].x <= p.width && t.vert[1].y >= 0 && t.vert[1].y <= p.height) ||
                    (t.vert[2].x >= 0 && t.vert[2].x <= p.width && t.vert[2].y >= 0 && t.vert[2].y <= p.height)) {
                    tList.push(t);
                }
            }

            function zoom(factor) {
                let origin = new p5.Vector(p.width / 2, p.height / 2);
                let result = [];
                let v = [];
                for (let i = 0; i < triangles.length; i++) {
                    for (let j = 0; j < 3; j++) {
                        let r = p.dist(origin.x, origin.y, triangles[i].vert[j].x, triangles[i].vert[j].y);
                        let angle = p.atan2(triangles[i].vert[j].y - origin.y, triangles[i].vert[j].x - origin.x);
                        v[j] = new p5.Vector(origin.x + r * factor * p.cos(angle), origin.y + r * factor * p.sin(angle));
                    }
                    addToList(result, new Triangle(triangles[i].red, v[0], v[1], v[2]));
                }
                return result;
            }
        }

        var sketch = new p5(penroseTiling);


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
            <DialogBox value={"Penrose - Click to subdivide tiles and spacebar to zoom in."} />
        </div>
    );
}

export default Penrose;
