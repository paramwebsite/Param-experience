let projectionVert = `
attribute vec3 aPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform mat4 uModelMatrix;
uniform mat4 uTexVMatrix;
uniform mat4 uTexPMatrix;

varying vec2 vTexCoord;
varying vec3 vDiffuseColor;
varying vec3 vSpecularColor;

void main(void) {
  vec4 positionVec4 = vec4(aPosition, 1.0);
	vec4 viewModelPosition = uModelViewMatrix * positionVec4; 
  gl_Position = uProjectionMatrix * viewModelPosition;

	vec4 texPosition = uTexPMatrix * uTexVMatrix * uModelMatrix * positionVec4;
	vTexCoord = texPosition.xy / texPosition.w * vec2(0.5, -0.5) + 0.5;		// ? : zで割るのかwで割るのか
}
`;


let projectionFrag = `
precision highp float;

uniform vec4 uMaterialColor;
uniform sampler2D uTexture;		

varying vec2 vTexCoord;
varying vec3 vDiffuseColor;
varying vec3 vSpecularColor;

void main(void) {
	if (min(vTexCoord.x, vTexCoord.y) > 0.0 && max(vTexCoord.x, vTexCoord.y) < 1.0) {
		gl_FragColor = texture2D(uTexture, vTexCoord);
	} else {
  	gl_FragColor = uMaterialColor;
	}
}
`;


export default {projectionFrag,projectionVert}