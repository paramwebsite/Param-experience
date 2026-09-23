import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Lunacy = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      let dSlider;
      let nSlider;
      let d = 1;
      let n = 1;
      let varying = `precision lowp float; 
			varying lowp vec2 vTextureCoord;
			varying lowp mat3 neighbor;

			varying vec2 mc;
			varying vec2 ml;
			varying vec2 mr;

			varying vec2 uc;
			varying vec2 ul;
			varying vec2 ur;

			varying vec2 lc;
			varying vec2 ll;
			varying vec2 lr;
`;

      let vs =
        varying + `
    attribute vec3 aPosition;
		attribute vec2 aTextureCoord;

		const float texelWidth = 1.0/600.;
		const float texelHeight = 1.0/600.;
    void main() { 
			gl_Position = vec4(aPosition,1.0); 
	  	vTextureCoord = (vec2(aPosition.x, aPosition.y*-1.) + 1.0) / 2.0;

			vec2 widthStep = vec2(texelWidth, 0.0);
			vec2 heightStep = vec2(0.0, texelHeight);
			vec2 widthHeightStep = vec2(texelWidth, texelHeight);
		  vec2 widthNegativeHeightStep = vec2(texelWidth, -texelHeight);
			
      mc = vTextureCoord;
      ml = vTextureCoord - widthStep;
      mr = vTextureCoord + widthStep;

      uc = vTextureCoord - heightStep;
      ul = vTextureCoord - widthHeightStep;
      ur = vTextureCoord + widthNegativeHeightStep;

      lc = vTextureCoord + heightStep;
      ll = vTextureCoord - widthNegativeHeightStep;
      lr = vTextureCoord + widthHeightStep;
		}`
      ;

      let fs =
        varying + `
		uniform sampler2D uSampler;
		const float unit = 1.0/600.; 

		mat3 boxblur = mat3(-2., -1., 0., 
												-1.,  1., 1., 
												 0.,  1., 2.);
		float r1 = 0.0;
		float r2 = 0.0;
		float r3 = 0.0;

    void main() {
			vec4 a = texture2D(uSampler, vTextureCoord);

			vec4 cmc = texture2D(uSampler, mc);
			vec4 cml = texture2D(uSampler, ml);
			vec4 cmr = texture2D(uSampler, mr);
			vec4 cuc = texture2D(uSampler, uc);
			vec4 cul = texture2D(uSampler, ul);
			vec4 cur = texture2D(uSampler, ur);
			vec4 clc = texture2D(uSampler, lc);
			vec4 cll = texture2D(uSampler, ll);
			vec4 clr = texture2D(uSampler, lr);

			mat3 coord1 = mat3(cul.r,cuc.r,cur.r,
												cml.r,cmc.r,cmr.r,
												cll.r,clc.r,clr.r);

			mat3 coord2 = mat3(cul.g,cuc.g,cur.g,
												 cml.g,cmc.g,cmr.g,
												 cll.g,clc.g,clr.g);

			mat3 coord3 = mat3(cul.b,cuc.b,cur.b,
												 cml.b,cmc.b,cmr.b,
												 cll.b,clc.b,clr.b);

			mat3 temp1 = matrixCompMult(boxblur, coord1);
			mat3 temp2 = matrixCompMult(boxblur, coord2);
			mat3 temp3 = matrixCompMult(boxblur, coord3);

			for(int i = 0; i < 3; i++){
				for(int j = 0; j < 3; j++){
					r1 = r1 + temp1[i][j];
					r2 = r2 + temp2[i][j];
					r3 = r3 + temp3[i][j];
				}
			}
			
			// r1 = r1 / 9.;
			// r2 = r2 / 9.;
			// r3 = r3 / 9.;
			
			// add cyan hue for the moon!
			r2 = r2*1.03;
			r3 = r3*1.06;
   		gl_FragColor = (vec4(vec3(r1, r2, r3),1.0));
    }`;

      let myShader;
      let pg;  // pGraphic
      let img; // image from the pGraphic used to feed the shader.

      let ts = 5;  //target size
      let pressed = false;    // mouse held down
      let auto = false;       //entered auto impact mode
      let lastimpact;         // timer

      let autodelay = 5000; //ms with no impacts to start auto impact

      p.setup = () => {
        p.pixelDensity(1);
        p.createCanvas(800, 800, p.WEBGL).parent(canvasRef.current);
        pg = p.createGraphics(p.width, p.height);
        img = p.createImage(p.width, p.height);
        pg.background(128);  //50% grey
        pg.loadPixels();
        p.noiseDetail(8, 0.65);   // create noise-filled lunar base surface
        for (let i = 0; i < pg.width; i++) {
          for (let j = 0; j < pg.height; j++) {
            let nv = p.map(p.noise(i * 0.005, j * 0.006), 0, 1, 128 - 20, 128 + 10);
            nv = nv + p.map(p.noise(i * 0.01, j * 0.01), 0, 1, -30, 15);
            nv = nv + p.randomGaussian();
            pg.set(i, j, p.color(nv, nv, nv));
          }
        }
        pg.updatePixels();
        p.frameRate(10); // crashes for higher framerates?
        myShader = p.createShader(vs, fs);
        lastimpact = p.millis();
      };


      p.draw = () => {
        p.background(128);

        // the auto-impact sequence
        if (auto == true) {
          if (p.millis() > lastimpact + p.floor(p.constrain(p.map(p.mouseY, p.height, 0, 2000, 100), 100, 2000))) {  //autoimpact speed based on mouse Y position
            impact(p.random(p.width), p.random(p.height), p.pow(p.random(), 4) * 85 + 15);
            lastimpact = p.millis();
          }
        } else {
          if (p.millis() > lastimpact + autodelay) {
            auto = true;
            impact(p.random(p.width), p.random(p.height), p.pow(p.random(), 4) * 85 + 15);
            lastimpact = p.millis();
          }
        }

        // do the shader thing
        img = pg.get(0, 0, p.width, p.height);
        myShader.setUniform('uSampler', img);
        p.shader(myShader);
        p.noStroke();
        p.quad(-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1);
        p.resetShader();

        //render the crosshair and target "UI" (pretty generous to call it a UI.....)
        p.push();
        p.fill(255, 255, 255);
        p.noStroke();
        p.translate(p.mouseX - p.width / 2, p.mouseY - p.height / 2);
        p.cylinder(0.5, p.height * 4);  //y axis
        p.rotateZ(p.PI / 2);
        p.cylinder(0.5, p.height * 4);  //x axis
        if (pressed) {  //currently targetting
          lastimpact = p.millis();  //delay auto mode while targetting
          if (ts < 50) {
            p.fill(0, 255, 0);
          } else if (ts < 100) {
            p.fill(255, 255, 0);
          } else {
            p.fill(255, 0, 0);
          }
          ts = p.min(150, ts + 20.0 / p.frameRate());  //make target size increase at the same speed regardless of framerate
          p.torus(ts, 0.5);   // targetting "circle"
        }
        p.pop();

      };

      p.mousePressed = () => {
        pressed = true;
        auto = false;
      }

      p.mouseReleased = () => {
        impact(p.mouseX, p.mouseY, ts * 2);
        pressed = false;
        ts = 5;
        lastimpact = p.millis();
      }

      // draw another crater heightmap on the existing pGraphic
      function impact(x, y, ts) {
        let d = ts;
        let light = p.constrain(p.map(d, 10, 100, 180, 230), 180, 230);
        let dark = p.constrain(p.map(d, 10, 100, 115, 105), 105, 115);
        //crater lip
        pg.stroke(light, light, light, 64);
        pg.strokeWeight(2);
        let baseColor = p.color(pg.get(x, y));  // flatten it out based on the target location height
        baseColor.setAlpha(128);
        pg.fill(baseColor); // flatten
        squircle(x, y, d / 2, 5);
        squircle(x, y, d / 2, 5);
        squircle(x, y, d / 2, 10);
        //crater mound
        pg.noStroke();
        pg.fill(light, light, light, 32);
        squircle(x, y, 1.05 * d / 2, 20);
        //crater
        pg.fill(dark, dark, dark, 25);
        for (let i = 0; i < 20; i++) {
          squircle(x + p.randomGaussian(), y + p.randomGaussian(), p.sqrt(i / 20) * (d / 2), 40);
        }
        //central peak
        if ((d > 50) && (p.random(1) < 0.3)) {
          pg.fill(light, light, light, 10);
          for (let i = 0.3 * d / 2; i > 0.01 * d; i *= 0.8) {
            squircle(x + p.randomGaussian(), y + p.randomGaussian(), i, 80);
          }
        }
      }

      //squiggly circle
      function squircle(x, y, r, distortion) {
        let points = p.floor(r * 2);
        pg.beginShape();
        for (let i = 0; i < points; i++) {
          pg.vertex(x + r * p.cos(p.TWO_PI * i / points) * (1 + p.random(distortion / 100)), y + r * p.sin(p.TWO_PI * i / points) * (1 + p.random(distortion / 100)));
        }
        pg.endShape(p.CLOSE)
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
      <div ref={canvasRef} className='ScienceAplicationblock'></div>
      <DialogBox value={"Auto-impacts start after 5 seconds of no user impacts. Mouse Y position changes the auto-impact speed. Hold the mouse button down to `charge` the impact size and let go to make your very own crater"}/>
    </div>
  );
};

export default Lunacy;
