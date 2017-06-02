import { P3D } from './P3D';

export class MaterialList {

	constructor ( _arguments ) {

		this._context = _arguments.context;

	}

	whiteLines () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.LINES   } );

		material.createShader ( {

			vertexHeader: `\



			`,

			vertexBody: `\


			`,


			fragmentHeader: `\


			`,

			fragmentBody: `\

				outColor = vec4 ( 1.0, 1.0, 1.0, 1.0 );

			`,

		} );

		return material;

	}

	blackLines () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.LINES } );

		material.createShader ( {

			vertexHeader: `\



			`,

			vertexBody: `\


			`,


			fragmentHeader: `\


			`,

			fragmentBody: `\

				outColor = vec4 ( 0.0, 0.0, 0.0, 1.0 );

			`,

		} );

		return material;

	}

	vertexColoredLines () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.LINES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec4 f_Color;

			`,

			fragmentBody: `\

				outColor = f_Color;

			`,

		} );

		return material;

	}

	vertexColorTriangles () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec4 f_Color;

			`,

			fragmentBody: `\

				outColor = f_Color;

			`,

		} );

		return material;

	}

	points () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\


			`,

			vertexBody: `\

				gl_PointSize = 10.0;

			`,


			fragmentHeader: `\


			`,

			fragmentBody: `\

				outColor = vec4 ( 0.0, 0.0, 0.0, 1.0 );

			`,

		} );

		return material;

	}

	pointSprites () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\


			`,

			vertexBody: `\

				gl_PointSize = normal.x;

			`,


			fragmentHeader: `\

				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, gl_PointCoord);
				outColor = textureColor;

			`,

		} );

		return material;

	}

	coloredPointSprites () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				f_Color = color;
				gl_PointSize = normal.x;// / ( ( computedPosition.z * 0.3 ) + 0.0001 );

			`,


			fragmentHeader: `\

				varying vec4 f_Color;
				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, gl_PointCoord);
				outColor = textureColor;
				outColor *= f_Color;

			`,

		} );

		return material;

	}

	vertexColorPointSprites () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.POINT } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				gl_PointSize = normal.x;
				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec4 f_Color;
				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, gl_PointCoord);
				outColor = textureColor;
				outColor *= f_Color;

			`,

		} );

		return material;

	}

	coloredTriangles () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;

			`,

			vertexBody: `\

				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec4 f_Color;

			`,

			fragmentBody: `\

				outColor = f_Color;

			`,

		} );

		return material;

	}

	texturedTriangles () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = texCoord;

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;

			`,

		} );

		return material;

	}

	coloredTexturedTriangles () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				varying vec4 f_Color;
				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = texCoord;
				f_Color = color;

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				varying vec4 f_Color;
				uniform sampler2D sampler; 

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, f_TexCoord);
				outColor = textureColor;
				outColor *= f_Color;

			`,

		} );

		return material;

	}

	screen () {

		let material = new P3D.Material ( { context: this._context, drawMode: this._context.TRIANGLES } );

		material.createShader ( {

			vertexHeader: `\

				uniform vec2 screenResolution;
				varying vec2 f_TexCoord;

			`,

			vertexBody: `\

				f_TexCoord = vec2 ( position.x / screenResolution.x, position.y / screenResolution.y );

			`,


			fragmentHeader: `\

				varying vec2 f_TexCoord;
				uniform sampler2D sampler; 
				uniform vec2 screenResolution;

			`,

			fragmentBody: `\

				vec4 textureColor = texture2D( sampler, vec2 ( gl_FragCoord.x / screenResolution.x, gl_FragCoord.y / screenResolution.y ));
				outColor = textureColor;

			`,

		} );

		return material;

	}

}