precision mediump float; 

uniform mat4 mv_Matrix;
uniform mat4 p_Matrix;

attribute vec3 position;
attribute vec2 texCoord;
attribute vec3 normal;	
attribute vec4 color;	

varying vec4 f_Color;

void main(){

	f_Color = color;
	
	gl_Position = p_Matrix * mv_Matrix * vec4( position.xyz, 1.0 );

}