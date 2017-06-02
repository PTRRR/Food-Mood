precision mediump float; 

uniform mat4 mv_Matrix;
uniform mat4 p_Matrix;

attribute vec3 position;
attribute vec2 texCoord;
attribute vec3 noraml;	
attribute vec4 color;	

void main(){

	gl_PointSize = 20.0;
	
	gl_Position = p_Matrix * mv_Matrix * vec4( position.xyz, 1.0 );

}