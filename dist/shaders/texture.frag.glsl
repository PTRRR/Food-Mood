precision mediump float;

uniform sampler2D sampler;

varying vec2 f_TexCoord;

void main(){

	vec4 textureColor = texture2D( sampler, f_TexCoord);
    gl_FragColor =  textureColor; //vec4(textureColor.y, f_TexCoord.x, f_TexCoord.y, 1.0);

}