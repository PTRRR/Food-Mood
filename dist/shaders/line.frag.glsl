precision mediump float;

varying vec4 f_Color;

void main(){
	
    gl_FragColor = vec4 ( f_Color.rgb, 0.3 );

}