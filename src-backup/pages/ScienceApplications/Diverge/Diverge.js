import React, { useEffect, useRef,useState } from 'react';
import p5 from 'p5';
import '../scienceAplication.css';
import DialogBox from '../DialogBox/DialogBox';
import ScienceAplicationNavBar from '../ScienceApplicationNavBar';

const Diverge = () => {
  const canvasRef = useRef(null);
  let theShader;
  let WebGL;
  let Canvas;
  let interact = 0.0;
  let stop = false;
  const [isTouching, setIsTouching] = useState(false);
  const displace = `
  vec2 displace(vec2 uv, vec2 duv, float off, float wei) {
    //uv.x *= iResolution.x/iResolution.y; // square
    duv -= off;
    return uv-duv*wei;
}

vec4 displace(vec2 uv, sampler2D img, vec2 duv, float off, float wei) {
    duv -= off;
    return texture2D(img, uv-duv*wei);
}
  `;

  const vert = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  varying vec2 vTexCoord;

  void main() {
      vTexCoord = aTexCoord;
      vec4 positionVec4 = vec4(aPosition, 1.0);
      positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
      gl_Position = positionVec4;
  }
  `;
  const Palette = `
  float pulse(float start, float end) {
    return step(0., start) * step(end, 0.);
}

vec4 grad(float area, vec4 startCol, vec4 endCol, float startPos, float endPos) {
    float u = pulse(area-startPos, area-endPos);
    vec4 gradientCol = mix(startCol, endCol, (area-startPos)/(endPos-startPos))*u;
    return gradientCol;
}

vec4 Palette(vec2 puv) {
    // define your colors
    vec4 cols[3];
    cols[0] = vec4(1., 1., 1., 1.);
    cols[1] = vec4(0., 0., 0., 1.);
    cols[2] = vec4(1., 1., 1., 1.);

    // define positions of your colors (0.0 - 1.0)
    float pos[3];
    pos[0] = 0.0;
    pos[1] = 0.5;
    pos[2] = 1.0;

    vec4 result_color = vec4(0.);
    for (int i = 0; i < 2; i++) {
        result_color += grad(puv.x, cols[i], cols[i+1], pos[i], pos[i+1]);
    }

    return result_color;
}
  `;

    const gradient = `

  #define PI 3.141592653589793
  #define TWO_PI 6.283185307179586

  vec2 conical(vec2 uv, vec2 pos, float tile, float ofst) {
      uv -= pos;
      //uv.x *= iResolution.x/iResolution.y;  // square
      vec2 radialUv = vec2(atan(uv.y, uv.x)/TWO_PI+0.5, length(uv));
      //radialUv.x += radialUv.y*1.; // Swirl
      radialUv = radialUv*tile-fract(ofst);
      return fract(radialUv);
  }

  float horizontal(vec2 uv, float tile, float ofst) {
      return fract( (uv*tile)-ofst ).x;
  }

  float radial(vec2 uv, vec2 pos, float tile, float ofst) {
      uv -= pos;
      //uv.x *= iResolution.x/iResolution.y;  // square
      float d = length(uv);
      d = d*tile-fract(ofst);
      return fract(d);
  }

  float vertical(vec2 uv, float tile, float ofst) {
      return fract( (uv*tile)-ofst ).y;
  }
  `;

  const frag = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  uniform vec2 iResolution;
  uniform float iPixelDensity;
  uniform sampler2D iCanvas;
  uniform vec2 iMouse;
  uniform float iTime;
  uniform float iInteract;
  
  ${ displace }
  ${ gradient }
  ${ Palette }
  
  float random(vec2 uv) {
      uv = fract(uv*vec2(314.159, 271.828));
      uv += dot(uv, uv+vec2(27.1828, 31.4159));
      return fract(uv.x*uv.y);
  }
  
  float circle(vec2 uv, vec2 pos) {
      return smoothstep(.5, .1, length(uv-pos));
  }

  varying vec2 vTexCoord;
  void main() {
      vec2 uv = .5*(vTexCoord-.5);
      vec2 mouse = .5*(iMouse.xy/iResolution.xy-.5);
      uv.x *= iResolution.x/iResolution.y;
      mouse.x *= iResolution.x/iResolution.y;
      
      vec2 iuv = floor(uv.xx*80.);
      vec4 dimg = vec4(random(iuv));
      
      float wei = mouse.x*iInteract;
      vec2 duv = vec2(uv.x, displace(uv, dimg.rg, 0.5, wei).y);
      
      vec2 puv = vec2(radial(duv, vec2(.0), 5., iTime*0.005));
      puv += random(uv);
      vec4 cir = Palette(puv);
      
      gl_FragColor = cir*circle(uv, vec2(0.));
  }
  `;

  



 

  useEffect(() => {
    // Setup p5.js sketch
    const sketch = new p5((p) => {
      p.preload = () => {
        theShader = new p5.Shader(p.renderer, vert, frag);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(canvasRef.current);
        p.pixelDensity(1);
        WebGL = p.createGraphics(p.width, p.height, p.WEBGL);
        Canvas = p.createGraphics(p.width, p.height);
        p.noStroke();
        WebGL.noStroke();
        Canvas.noStroke();
      };

      p.draw = () => {
        WebGL.background(0);
        WebGL.shader(theShader);

        theShader.setUniform('iResolution', [p.width, p.height]);
        theShader.setUniform('iPixelDensity', p.pixelDensity());
        theShader.setUniform('iCanvas', Canvas);
        theShader.setUniform('iMouse', [p.mouseX, p.mouseY]);
        theShader.setUniform('iTime', p.frameCount);
        theShader.setUniform('iInteract', interact);

        WebGL.rect(0, 0, p.width, p.height);

        p.image(WebGL, 0, 0);
      };

      p.keyPressed = () => {
        switch (p.key) {
          case 'd':
            interact = interact === 0.0 ? 1.0 : 0.0;
            break;
          case ' ':
            stop = !stop;
            stop ? p.noLoop() : p.loop();
            break;
          default:
            break;
        }
      };
      p.touchStarted = () => {
        interact = interact === 0.0 ? 1.0 : 0.0;
        setIsTouching(true);
      };

      p.touchEnded = () => {
        setIsTouching(false);
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
      <div ref={canvasRef} className='ScienceAplicationblock'></div>
      <DialogBox value={"Diverge - Touch and move cursor  to see the effect"}/>
    </div>
  );
};

export default Diverge;
