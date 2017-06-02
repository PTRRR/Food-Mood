precision mediump float;

uniform sampler2D sampler;

varying vec4 f_Color;

void main(){

	vec4 textureColor = texture2D( sampler, gl_PointCoord);
    gl_FragColor = textureColor * f_Color;

}