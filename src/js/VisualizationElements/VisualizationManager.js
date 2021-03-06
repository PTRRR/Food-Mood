// Utils

import { clamp, contains, map_range, hslToRgb, addEvent, removeEvent, ajax } from "../utils";

// Visualization

import { Particle } from "./Particle";

let THREE = require ( 'three' );
let buffer = require( 'three-buffer-vertex-data' );

export class VisualizationManager {

	constructor ( _canvas, _data ) {

		//
		//	Top words
		//

		this._topWordsButton = document.querySelector('#top-word-button');

		this._highlightedWord = null;
		this._topWordsOverlay = document.querySelector('#top-words-overlay');
		this._wordsContainer = document.querySelector('#words-container');
		this._topWords = [ 'tea', 'kitchen', 'salad', 'corn', 'honey', 'hot', 'milk', 'pie', 'ice cream', 'nut', 'cheese', 'cook', 'cake', 'fat','cream', 'chocolate', 'breakfast', 'pizza', 'coffee', 'lunch', 'hungry', 'chicken', 'drink', 'ice', 'dinner' ];

		addEvent ( this._topWordsButton, 'click', function () {

			this._topWordsOverlay.style.opacity = 1;
			this._topWordsOverlay.style.pointerEvents = 'auto';

		}.bind ( this ) );

		//
		// Fill the overlay with top words.
		//

		for ( let i = 0; i < this._topWords.length; i ++ ) {

			let newWord = document.createElement('div');
			newWord.className = 'word';
			let newContent = document.createElement('p');
			newContent.innerHTML = this._topWords[ i ];

			let self = this;

			addEvent ( newContent, 'click', function () {

				self._highlightedWord = this.innerHTML;
				self._topWordsOverlay.style.opacity = 0;
				self._topWordsOverlay.style.pointerEvents = 'none';

				let wordsButton = document.querySelectorAll('.word p');

				for ( let j = 0; j < wordsButton.length; j ++ ) {

					wordsButton[ j ].className = wordsButton[ j ].className.replace('active-word','');

				}

				content.className = '';

				document.querySelector('selector');

				this.className += 'active-word';

			} );

			newWord.appendChild ( newContent );

			this._wordsContainer.appendChild ( newWord );

		}

		this._wordsContainer.appendChild ( document.createElement('br') );

		let nullButton = document.createElement('div');
		nullButton.className = 'word';
		let content = document.createElement('p');
		content.className = 'active-word';
		content.innerHTML = 'reset';
		nullButton.appendChild ( content );

		addEvent ( content, 'click', function () {

			let wordsButton = document.querySelectorAll('.word p');

			for ( let j = 0; j < wordsButton.length; j ++ ) {

				wordsButton[ j ].className = wordsButton[ j ].className.replace('active-word','');

			}

			this._topWordsOverlay.style.opacity = 0;
			this._topWordsOverlay.style.pointerEvents = 'none';
			content.className = 'active-word';

			this._highlightedWord = null;

		}.bind ( this ) );

		this._wordsContainer.appendChild ( nullButton );

		addEvent ( this._wordsContainer, 'click', function () {


		}.bind ( this ) );

		//
		// Emojis classification
		//

		this._emotions = {

			anger: [ '🙅','👹','👺','👊','😈','👿','😡','😠','😤','😒','😾' ],
			anticipation: [ '🙋', '💁', '🙌', '🙏', '💪', '👀', '🙇', '✋', '✊', '😏', '😼' ],
			joy: [ '😎','😛','😝','😜','😺','😹','😸','😄','😌','😃','😂','😁','😀','😆','😋','😊','😉','💃','👅','👯','🎊','🎉','👑' ],
			trust: [ '👼','👐','👍','👌','👏','👋','😎','😍','💙','💘','💛','💚','💝','💜','💟','💞','💑','💐','💓','💒','💕','💗','💖','💋','💌','💏','👄','😚','😙','😘','😻','♡','♥','👪','👫','👬','👭','😽','😇' ],
			fear: [ '🙀','💀','😟','😲','😱','😰','😶','😵','😨','😧','😦','😥','🙎' ],
			surprise: [ '😳','🙈','🙉','🙊','😛','😝','😜','😅','😮','😬','😯','🙆' ],
			sadness: [ '💔','😞','😖','😔','😕','😿','😫','😩','😭','😣','😢','😟','🙍' ],
			disgust: [ '👻','💩','😓','😑','😐','😪','😷','😴','👎'],

		};

		this._emotionsKeys = Object.keys( this._emotions );

		//
		// Data
		//

		this._data = _data;

		//
		// WebGl settings
		//

		this._enableRendering = true;
		this._enableUpdating = true;
		this._mainResolution = 1; // 1 = max, 0.5 = mid, etc...

		this._renderer = new THREE.WebGLRenderer( {

			canvas: _canvas,
			depth: false,
			stencil: false,

		} );

		this._renderer.setPixelRatio ( window.getDevicePixelRatio() );
		this._renderer.setSize ( window.innerWidth, window.innerHeight );

		this._mainScene = new THREE.Scene();
		this._mainScene.background = new THREE.Color( 230 / 255, 230 / 255, 230 / 255 );
		// this._mainCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this._mainCamera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
		this._mainCamera.position.z = -4;
		this._mainCamera.lookAt ( new THREE.Vector3 () );

		//
		// Visualizations values.
		//

		this._play = true;
		this._minDate = 0;
		this._maxDate = 0;
		this._time = 0;
		this._timeRange = 80000000;
		this._epochContainer = document.querySelector( '#epoch' );
		this._timeContainer = document.querySelector( '#time' );
		this._timeLine = document.querySelector( '#timeline' );
		this._cursor = document.querySelector( '#cursor' );
		this._cursorLocked = false;
		this._mouse = vec3.create();

		this._notFound = {};

		// Hover

		this._hoverTime = null;
		this._hoverParticle = null;

		for ( let i = 0; i < _data.length; i ++ ) {

			let content = _data[ i ];

			if ( !content.foodWords2 ) content.foodWords2 = [];

			if ( contains.call ( content.foodWords, 'honey' ) || contains.call ( content.foodWords2, 'honey' ) ) {

				// console.log(content.text);

			}

		}

	}

	set enableUpdating ( _enableUpdating ) {

		this._enableUpdating = _enableUpdating;

	}

	get enableUpdating () {

		return this._enableUpdating;

	}

	set enableRendering ( _enableRendering ) {

		this._enableRendering = _enableRendering;

	}

	get enableRendering () {

		return this._enableRendering;

	}

	set play ( _play ) {

		this._play = _play;

	}

	get play () {

		return this._play;

	}

	onMouseDown ( _position ) {



	}

	onMouseUp ( _position ) {

		this._cursorLocked = false;

	}

	onClick ( _position ) {


	}

	onMouseMove ( _position ) {

		this._mouse = vec3.fromValues ( ( _position[ 0 ] / window.innerWidth ) * this._renderer.getSize().width * this._renderer.getPixelRatio(), ( _position[ 1 ] / window.innerHeight ) * this._renderer.getSize().height * this._renderer.getPixelRatio(), 0 );

		this._mouse[ 0 ] = ( _position[ 0 ] - this._renderer.getSize().width * 0.5 ) * -1;
		this._mouse[ 1 ] = ( _position[ 1 ] - this._renderer.getSize().height * 0.5 ) * -1;

		if ( this._cursorLocked ) {

			let percent = ( _position[ 0 ] - this._timeLine.offsetLeft ) / this._timeLine.offsetWidth;
			this._cursor.style.left = clamp ( ( percent * 100 ), 0, 100 ) + '%';
			this._time = clamp ( this._minDate + percent * ( this._maxDate - this._minDate ), this._minDate, this._maxDate );

		}

		for ( let i = 0; i < this._currentParticles.length; i ++ ) {

			let currentPosition = this._currentParticles[ i ].position;
			let distance = vec3.create();
			vec3.subtract ( distance, this._mouse, currentPosition );
			distance = vec3.length ( distance );

			if ( distance < 10 ) {

				// console.log('hover');

			}

		}

	}

	onResize () {

		// Update the renderer's size.

		// this._renderer.width = window.innerWidth;
		// this._renderer.height = window.innerHeight;

		// Update the cameras.

		//this._mainCamera.position = vec3.fromValues ( 0.0, 0.0, -4 );
		//mat4.ortho ( this._mainCamera.pMatrix, 0, - this._renderer.realWidth, this._renderer.realHeight, 0, -400, 400 );

		// Update the viewport

		//this._gl.viewport ( 0, 0, this._renderer.realWidth, this._renderer.realHeight );

		this.background.position = vec3.fromValues ( this._renderer.realWidth * 0.5, this._renderer.realHeight * 0.48, 0.0 );
		let minRadius = this._renderer.realHeight < this._renderer.realWidth ? this._renderer.realHeight : this._renderer.realWidth;
		this.background.scale = vec3.fromValues ( minRadius * 0.9, minRadius * 0.9, 1.0 );

	}

	setup () {

		this.planeBufferGeometry = new THREE.PlaneBufferGeometry( 1, 1, 1, 1 );

		this.backgroundTexture = new THREE.TextureLoader().load("./resources/textures/background.png", function ( texture ) {

			this.backgroundMaterial = new THREE.MeshBasicMaterial ( {

				map: texture,
				side: THREE.DoubleSide,
				transparent: true,

			} );

			this.background = new THREE.Mesh ( this.planeBufferGeometry, this.backgroundMaterial );
			this.background.scale.x = window.innerHeight;
			this.background.scale.y = window.innerHeight;
			this.background.rotation.y = Math.PI;
			this._mainScene.add ( this.background );

		}.bind ( this ) );

		

		// Set time line event

		let self = this;

		addEvent ( this._timeLine, 'mousedown', function () {

			this._cursorLocked = true;

		}.bind ( this ) );

		addEvent ( this._timeLine, 'mousemove', function ( event ) {

		} );

		addEvent ( this._timeLine, 'mouseup', function () {


		}.bind ( this ) );

		// Get the time of the first tweet.

		this._minDate = this._data[ 0 ].timeSinceEpoch - this._timeRange * 0.5;
		this._maxDate = this._data[ this._data.length - 1 ].timeSinceEpoch + this._timeRange * 0.5; 

		console.log( 'Min date: ', new Date ( this._minDate ), this._minDate );
		console.log( 'Max date: ', new Date ( this._maxDate ), this._maxDate );

		this._time = this._minDate;

		let d = new Date ( this._time );

		// Create the main array containing all the particles.

		this._particles = [];

		for ( let i = this._data.length - 1; i >= 0; i -- ) {

		// for ( let i = 0; i >= 0; i -- ) {

			let maxRadius = window.innerWidth / 2 < window.innerHeight / 2 ? window.innerWidth / 2 : window.innerHeight / 2;
			let center = vec3.fromValues ( 0, 0, 0 );

			let emotionsNum = 8;
			let emotionAverage = 0;
			let numFound = 0;
			let notFound = [];
			let found = [];
			let foodWords = [];

			if ( this._data[ i ].foodWords2 ) {

				foodWords = foodWords.concat( this._data[ i ].foodWords, this._data[ i ].foodWords2 );

			} else {

				foodWords = this._data[ i ].foodWords;
				
			}

			for ( let j = 0; j < this._data[ i ].emojis.length; j ++ ) {

				let f = false;
				let emotionIndex = 0;

				for ( let e in this._emotions ) {

					if ( contains.call ( this._emotions[ e ], this._data[ i ].emojis[ j ] ) ) {

						emotionAverage += emotionIndex;
						numFound ++;
						found.push ( this._data[ i ].emojis[ j ] );
						f = true;

					}

					emotionIndex ++;

				}

				if ( !f ) {

					notFound.push ( this._data[ i ].emojis[ j ] );
					if ( !this._notFound[ this._data[ i ].emojis[ j ] ] ) {

						this._notFound[ this._data[ i ].emojis[ j ] ] = { used: 1 };

					} else {

						this._notFound[ this._data[ i ].emojis[ j ] ].used ++;

					}

				}

			}

			emotionAverage /= numFound;
			// console.log('-----');
			// console.log(this._data[ i ].emojis.join());
			// console.log('found: ' + found.join() + ' not found: ' + notFound.join());
			// console.log(emotionAverage , this._emotionsKeys[ Math.floor ( emotionAverage ) ]);

			let step = ( Math.PI * 2 ) / 8;
			let angle = step * emotionAverage;
			angle += step * ( Math.random() - 0.5 ) ;
			angle += Math.PI;
			let distanceFromCenter = Math.random() * maxRadius;

			let position = vec3.fromValues ( 0, 0, 0 );
			let direction = vec3.fromValues ( Math.cos ( angle + Math.PI ), Math.sin ( angle + Math.PI ), 0 );
			// vec3.subtract ( direction, center, direction );
			// vec3.normalize ( direction, direction );

			let particle = new Particle ();
			particle.direction = vec3.clone ( direction );
			particle.position = vec3.clone ( position );
			particle.originalPosition = vec3.clone ( position );
			particle.damping = 0.8;
			particle.mass = Math.random() + 4;
			particle.radiusMultiplier = Math.random();
			particle.dataIndex = i;
			this._data[ i ][ 'emotionAverage' ] = emotionAverage;
			particle.foodWords = foodWords;

			let randomGreyValue = Math.random() * 0.10 + 0.53;

			let h = ( angle / ( Math.PI * 2.0 ) ) - 1.55;
			let s = 0.68;
			let l = randomGreyValue;

			let color = {

				r: hslToRgb( h, s, l )[ 0 ],
				g: hslToRgb( h, s, l )[ 1 ],
				b: hslToRgb( h, s, l )[ 2 ],
				a: 1.0,

			}

			particle.color = color;
			let si =  Math.random() * 35 + 25;
			particle.size = [ si, 0, 0 ];

			if ( this._particles.length < 10000 && numFound > 0 ) this._particles.push ( particle );

		}

		for ( let i = 0; i < 12; i ++ ) {

			let angle = ( ( ( Math.PI * 2 ) / 12 ) * i ) / ( Math.PI * 2 );
			let s = 0.78;
			let l = 0.73;

		}

		//
		// Data set analysis
		//

		let sortable = [];

		for ( let e in this._notFound ) {

			sortable.push ( { emoji: e, used: this._notFound[ e ].used } );

		}

		sortable.sort ( function ( a, b ) {

			return b.used - a.used;

		} );

		let jsonNotFound = {};

		for ( let i = 0; i < sortable.length; i ++ ) {

			jsonNotFound[ sortable[ i ].emoji ] = sortable[ i ].used;

		}

		//
		// -----------------------------
		//

		this._particlesGeometry = new THREE.BufferGeometry();
		this._particlesGeometry.addAttribute ( 'position', new THREE.BufferAttribute ( new Float32Array ( [] ), 3 ) );
		this._particlesGeometry.addAttribute ( 'rgbaColor', new THREE.BufferAttribute ( new Float32Array ( [] ), 4 ) );
		this._particlesGeometry.addAttribute ( 'normal', new THREE.BufferAttribute ( new Float32Array ( [] ), 3 ) );

		this._highlightedParticlesGeometry = new THREE.BufferGeometry();
		this._highlightedParticlesGeometry.addAttribute ( 'position', new THREE.BufferAttribute ( new Float32Array ( [] ), 3 ) );
		this._highlightedParticlesGeometry.addAttribute ( 'rgbaColor', new THREE.BufferAttribute ( new Float32Array ( [] ), 4 ) );
		this._highlightedParticlesGeometry.addAttribute ( 'normal', new THREE.BufferAttribute ( new Float32Array ( [] ), 3 ) );

		this._particlesTexture = new THREE.TextureLoader().load ( "./resources/textures/sprite.png", function ( texture ) {

			this._particlesMaterial = new THREE.ShaderMaterial ( {

				vertexShader: `

					attribute vec4 rgbaColor;
					varying vec4 f_Color;

					void main () {

						f_Color = rgbaColor;
						gl_PointSize = normal.x;
						gl_Position = projectionMatrix * modelViewMatrix * vec4 ( position, 1.0 );

					}

				`,

				fragmentShader: `

					varying vec4 f_Color;
					uniform sampler2D texture;

					void main () {

						gl_FragColor = f_Color * texture2D( texture, gl_PointCoord.xy );

					}

				`,

				uniforms: {

					texture: { value: texture },

				},

				transparent: true,

			} );

			this._particlesPoints = new THREE.Points ( this._particlesGeometry, this._particlesMaterial );
			this._particlesPoints.renderOrder = 10;
			this._mainScene.add ( this._particlesPoints );

			this._highlightedParticlesPoints = new THREE.Points ( this._highlightedParticlesGeometry, this._particlesMaterial );
			this._highlightedParticlesPoints.renderOrder = 20;
			this._mainScene.add ( this._highlightedParticlesPoints );

		}.bind ( this ) );

	}

	update ( _delta ) {

		if ( !this._enableUpdating ) return;

		// Update particles

		this._currentParticles = [];

		let newPositions = [];

		let numCurrentTweets = 0;

		let drawnParticles = [];
		let drawnNormals = [];
		let drawnColors = [];

		let highlightedDrawnParticles = [];
		let highlightedDrawnNormals = [];
		let highlightedDrawnColors = [];

		let hoverParticle = false;

		// let center = vec3.fromValues ( this._renderer.getSize().width * this._renderer.getPixelRatio() * 0.5, this._renderer.getSize().height * this._renderer.getPixelRatio() * 0.5, 0 );
		let center = vec3.fromValues ( 0, 0, 0 );
		let mouseTime = 0;
		let distanceToCenter = vec3.create();
		vec3.subtract ( distanceToCenter, this._mouse, center );
		distanceToCenter = vec3.length ( distanceToCenter );
		mouseTime = distanceToCenter / ( this._renderer.realHeight * 0.5 );
		mouseTime = this._time + mouseTime * this._timeRange;

		let minRadius =  this._renderer.getSize().height < this._renderer.getSize().width ? this._renderer.getSize().height * this._renderer.getPixelRatio() : this._renderer.getSize().width * this.render.getPixelRatio();

		for ( let i = 0; i < this._particles.length; i ++ ) {

			// console.log(this._particles[i].position);

			let di = this._particles[ i ].dataIndex;

			let t = this._time;
			let pT = this._data[ di ].timeSinceEpoch;

			let pMin = pT - this._timeRange * 0.5;
			let pMax = pT + this._timeRange * 0.5;

			let d = 0;

			// Check wich ones are in the actual time range.

			if ( t >= pMin && t <= pMax ) {

				let currentParticle = this._particles[ i ];
				this._currentParticles.push ( currentParticle );
				let currentPosition = vec3.clone ( currentParticle.position );
	
				// Mouse force.

				let direction = vec3.create();
				vec3.subtract ( direction, currentPosition, this._mouse );
				let distance = vec3.length ( direction );
				vec3.normalize ( direction, direction );
	
				let mouseForce = vec3.clone ( direction );
				vec3.multiply ( mouseForce, mouseForce, vec3.fromValues ( 20000, 20000, 0 ) );
	
				// The force decrease according to the distance between the mouse and the particle.
	
				vec3.divide ( mouseForce, mouseForce, vec3.fromValues ( distance, distance, distance ) );

				d = (t - pMin) / (pMax - pMin);
				d *= 1000 * 0.41;

				let p = vec3.create ();
				vec3.multiply ( p, currentParticle.direction, vec3.fromValues ( d, d, 1 ) );
				vec3.add ( p, p, center );

				let mousePDistance = vec3.create();
				vec3.subtract ( mousePDistance, p, this._mouse );
				mousePDistance = vec3.length ( mousePDistance );

				let x = noise.simplex2( p[ 0 ] * 0.002 + this._time * 0.00000001, p[ 1 ] * 0.002 + this._time * 0.00000001 );
				let y = noise.simplex2( ( p[ 0 ] + 10 ) * 0.002 + this._time * 0.00000001, ( p[ 1 ] + 20 ) * 0.002 + this._time * 0.00000001 );
				let noiseForce = vec3.fromValues ( x, y, 0 );
				vec3.scale ( noiseForce, noiseForce, 10 );

				if ( mousePDistance < 40 && !hoverParticle ) {

					hoverParticle = true;
					p = this._mouse;

					document.querySelector('#info').innerHTML = '';

					let usedFoodWords = [];

					for ( let j = 0; j < currentParticle.foodWords.length; j ++ ) {

						if ( !contains.call ( usedFoodWords, currentParticle.foodWords[ j ] ) ) {

							document.querySelector('#info').innerHTML += '#' + currentParticle.foodWords[ j ] + '<br>';
							usedFoodWords.push ( currentParticle.foodWords[ j ] );

						}

					}

					let usedEmojis = [];

					for ( let j = 0; j < this._data[ di ].emojis.length; j ++ ) {

						if ( !contains.call ( usedEmojis, this._data[ di ].emojis[ j ] ) ) {

							document.querySelector('#info').innerHTML += this._data[ di ].emojis[ j ];
							usedEmojis.push ( this._data[ di ].emojis[ j ] );

						}

					}

				} else {

					this._particles.offsetTime = 0;
					this._particles[ i ].applyForce ( mouseForce );
					this._particles[ i ].applyForce ( noiseForce );
					
				}

				let staticForce = vec3.create();
				vec3.subtract ( staticForce, p, currentPosition );
				vec3.multiply ( staticForce, staticForce, vec3.fromValues ( 1, 1, 0 ) );
				this._particles[ i ].applyForce ( staticForce );
				this._particles[ i ].update( _delta );

				drawnParticles.push ( this._particles[ i ].position[ 0 ] );
				drawnParticles.push ( this._particles[ i ].position[ 1 ] );
				drawnParticles.push ( this._particles[ i ].position[ 2 ] );

				let pC = Math.pow( ( t - pMin ) / ( pMax - pMin ), 10 );
				let iPc = 1 - pC;
				let iPc2 = Math.pow( 1 - ( t - pMin ) / ( pMax - pMin ), 10 );
				let colorPercent = 1 - ( pC + iPc2 );

				if ( this._highlightedWord && contains.call ( currentParticle.foodWords, this._highlightedWord ) ) {

					highlightedDrawnParticles.push ( this._particles[ i ].position[ 0 ] );
					highlightedDrawnParticles.push ( this._particles[ i ].position[ 1 ] );
					highlightedDrawnParticles.push ( this._particles[ i ].position[ 2 ] );

					highlightedDrawnColors.push ( this._particles[ i ].color.r * colorPercent + 0.9 * ( 1 - colorPercent ) );
					highlightedDrawnColors.push ( this._particles[ i ].color.g * colorPercent + 0.9 * ( 1 - colorPercent ) );
					highlightedDrawnColors.push ( this._particles[ i ].color.b * colorPercent + 0.9 * ( 1 - colorPercent ) );
					highlightedDrawnColors.push ( colorPercent );

					highlightedDrawnNormals.push ( this._particles[ i ].size[ 0 ] * this._renderer.getPixelRatio() * ( colorPercent * 0.5 + 0.5 ) );
					highlightedDrawnNormals.push ( this._particles[ i ].size[ 1 ] );
					highlightedDrawnNormals.push ( this._particles[ i ].size[ 2 ] );

				}

				if ( !this._highlightedWord ) {

					drawnColors.push ( this._particles[ i ].color.r * colorPercent + 0.9 * ( 1 - colorPercent ) );
					drawnColors.push ( this._particles[ i ].color.g * colorPercent + 0.9 * ( 1 - colorPercent ) );
					drawnColors.push ( this._particles[ i ].color.b * colorPercent + 0.9 * ( 1 - colorPercent ) );
					drawnColors.push ( colorPercent );

				} else {

					let greyValue = this._particles[ i ].color.r * this._particles[ i ].color.g * this._particles[ i ].color.b + 0.6;

					drawnColors.push ( greyValue * colorPercent + 0.9 * ( 1 - colorPercent ) );
					drawnColors.push ( greyValue * colorPercent + 0.9 * ( 1 - colorPercent ) );
					drawnColors.push ( greyValue * colorPercent + 0.9 * ( 1 - colorPercent ) );
					drawnColors.push ( colorPercent );

				}
	
				// drawnNormals.push ( ( this._particles[ i ].size[ 0 ] / window.innerWidth ) * this._renderer.realWidth * ( colorPercent * 0.5 + 0.5 ) );
				drawnNormals.push ( this._particles[ i ].size[ 0 ] * this._renderer.getPixelRatio() * ( colorPercent * 0.5 + 0.5 ) );
				drawnNormals.push ( this._particles[ i ].size[ 1 ] );
				drawnNormals.push ( this._particles[ i ].size[ 2 ] );

				numCurrentTweets ++;

			}			

		}

		// Update the main geometry & highlignt geometry.

		buffer.attr ( this._particlesGeometry, 'position', new Float32Array ( drawnParticles ), 3 );
		buffer.attr ( this._particlesGeometry, 'rgbaColor', new Float32Array ( drawnColors ), 4 );
		buffer.attr ( this._particlesGeometry, 'normal', new Float32Array ( drawnNormals ), 3 );

		buffer.attr ( this._highlightedParticlesGeometry, 'position', new Float32Array ( highlightedDrawnParticles ), 3 );
		buffer.attr ( this._highlightedParticlesGeometry, 'rgbaColor', new Float32Array ( highlightedDrawnColors ), 4 );
		buffer.attr ( this._highlightedParticlesGeometry, 'normal', new Float32Array ( highlightedDrawnNormals ), 3 );

		if ( !hoverParticle ) {

			document.querySelector('#info').innerHTML = '';

			this._hoverTime = this._time;
			
			// Update time

			let days = [ 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday', 'Sunday' ];
			let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

			if ( this._time >= this._minDate && this._time <= this._maxDate ) {

				if ( this._play && !this._cursorLocked ) this._time += _delta * 60 * 60;
				let newTime = new Date ( this._time );
				this._epochContainer.innerHTML = newTime.getHours() + ':' + newTime.getMinutes();
				this._timeContainer.innerHTML = newTime.getDate() + ' ' + months[ newTime.getMonth() ] + ' ' + newTime.getFullYear();
				this._cursor.style.left = ( ( this._time - this._minDate ) / ( this._maxDate - this._minDate ) ) * 100 + '%';

			}

		} else {

		

		}

	}

	render () {

		if ( !this._enableRendering ) return;
		this._renderer.render ( this._mainScene, this._mainCamera );

	}

}