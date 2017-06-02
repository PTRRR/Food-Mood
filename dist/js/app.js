(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Axis = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

var _Geometry = require("./Geometry");

var _Material = require("./Material");

var _Mesh = require("./Mesh");

var _BufferAttribute = require("./BufferAttribute");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Axis = exports.Axis = function (_WebGlElement) {
		_inherits(Axis, _WebGlElement);

		function Axis(_options) {
				_classCallCheck(this, Axis);

				var _this = _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).call(this, _options));

				var vertices = [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1];

				var indices = [0, 1, 2, 3, 4, 5];

				var colors = [1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0];

				_this._material = new _Material.Material({

						context: _this._context,
						shaderUrl: './shaders/line',
						transparent: false,
						drawMode: _this._context.LINES,
						zIndex: 1

				});

				_this._geometry = new _Geometry.Geometry({ context: _this._context });

				var vAttribute = new _BufferAttribute.BufferAttribute({ context: _this._context, name: 'position', data: new Float32Array(vertices) });
				var cAttribute = new _BufferAttribute.BufferAttribute({ context: _this._context, name: 'color', data: new Float32Array(colors) });
				var iAttribute = new _BufferAttribute.BufferAttribute({ context: _this._context, name: 'index', data: new Uint16Array(indices) });

				_this._geometry.addBufferAttribute(vAttribute);
				_this._geometry.addBufferAttribute(cAttribute);
				_this._geometry.addBufferAttribute(iAttribute);

				_this._mesh = new _Mesh.Mesh({ context: _this._context, geometry: _this._geometry, material: _this._material, name: _options.name });

				return _this;
		}

		_createClass(Axis, [{
				key: "mesh",
				get: function get() {

						return this._mesh;
				}
		}]);

		return Axis;
}(_WebGlElement2.WebGlElement);

},{"./BufferAttribute":3,"./Geometry":6,"./Material":9,"./Mesh":11,"./WebGlElement":24}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Buffer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Buffer = exports.Buffer = function (_WebGlElement) {
	_inherits(Buffer, _WebGlElement);

	function Buffer(_options) {
		_classCallCheck(this, Buffer);

		var _this = _possibleConstructorReturn(this, (Buffer.__proto__ || Object.getPrototypeOf(Buffer)).call(this, _options));

		_this._type = 'Buffer';

		_this.bufferType = _options.bufferType || _this._context.ARRAY_BUFFER;
		_this.buffer = _this._context.createBuffer();

		return _this;
	}

	_createClass(Buffer, [{
		key: "bind",
		value: function bind() {

			this._context.bindBuffer(this.bufferType, this.buffer);
		}
	}, {
		key: "unbind",
		value: function unbind() {

			this._context.bindBuffer(this.bufferType, null);
		}
	}, {
		key: "setData",
		value: function setData(_data, _usageParameter) {

			this._context.bufferData(this.bufferType, _data, _usageParameter);
		}
	}, {
		key: "bufferType",
		set: function set(_bufferType) {

			this._bufferType = _bufferType;
		},
		get: function get() {

			return this._bufferType;
		}
	}]);

	return Buffer;
}(_WebGlElement2.WebGlElement);

},{"./WebGlElement":24}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.BufferAttribute = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

var _Buffer = require("./Buffer");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BufferAttribute = exports.BufferAttribute = function (_WebGlElement) {
		_inherits(BufferAttribute, _WebGlElement);

		function BufferAttribute(_options) {
				_classCallCheck(this, BufferAttribute);

				var _this = _possibleConstructorReturn(this, (BufferAttribute.__proto__ || Object.getPrototypeOf(BufferAttribute)).call(this, _options));

				_this.name = _options.name;

				_this.buffer = _options.buffer || new _Buffer.Buffer(_options);
				_this.bufferType = _options.bufferType;
				_this.usageParameter = _options.usageParameter;

				// Attribute variables.

				_this.attributeLocation = _options.attributeLocation;
				_this.numberOfElements = _options.numberOfElements;
				_this.dataType = _options.dataType;
				_this.normalisedElements = _options.normalisedElements;
				_this.sizeOfIndividualVertex = _options.sizeOfIndividualVertex;
				_this.offsetFromBeginingVertex = _options.offsetFromBeginingVertex;

				// Set data

				_this.dataUpdated = false;
				_this.data = _options.data || null;

				return _this;
		}

		_createClass(BufferAttribute, [{
				key: "getDefaultAttributeVariables",
				value: function getDefaultAttributeVariables() {

						var defaultVariables = {};

						switch (this._name) {

								case 'position':

										defaultVariables.bufferType = this._context.ARRAY_BUFFER;
										defaultVariables.attributeLocation = 0;
										defaultVariables.numberOfElements = 3;
										defaultVariables.normalisedElements = this._context.FALSE;
										defaultVariables.sizeOfIndividualVertex = 3;
										defaultVariables.offsetFromBeginingVertex = 0;

										break;

								case 'texCoord':

										defaultVariables.bufferType = this._context.ARRAY_BUFFER;
										defaultVariables.attributeLocation = 1;
										defaultVariables.numberOfElements = 2;
										defaultVariables.normalisedElements = this._context.FALSE;
										defaultVariables.sizeOfIndividualVertex = 2;
										defaultVariables.offsetFromBeginingVertex = 0;

										break;

								case 'normal':

										defaultVariables.bufferType = this._context.ARRAY_BUFFER;
										defaultVariables.attributeLocation = 2;
										defaultVariables.numberOfElements = 3;
										defaultVariables.normalisedElements = this._context.TRUE;
										defaultVariables.sizeOfIndividualVertex = 3;
										defaultVariables.offsetFromBeginingVertex = 0;

										break;

								case 'color':

										defaultVariables.bufferType = this._context.ARRAY_BUFFER;
										defaultVariables.attributeLocation = 3;
										defaultVariables.numberOfElements = 4;
										defaultVariables.normalisedElements = this._context.FALSE;
										defaultVariables.sizeOfIndividualVertex = 4;
										defaultVariables.offsetFromBeginingVertex = 0;

										break;

								case 'index':

										this.buffer.bufferType = this._context.ELEMENT_ARRAY_BUFFER;

										break;

								default:

										this.buffer.bufferType = this._context.ARRAY_BUFFER;

										break;

						}

						if (this._data instanceof Float32Array) {

								defaultVariables.dataType = this._context.FLOAT;
						} else if (this._data instanceof Uint16Array) {

								defaultVariables.dataType = this._context.INT;
						}

						return defaultVariables;
				}
		}, {
				key: "setData",
				value: function setData(_data, _usageParameter) {

						this._usageParameter = _usageParameter;
						this.data = _data;
				}
		}, {
				key: "bind",
				value: function bind() {

						if (!this._context.boundProgram) {

								console.error(this.constructor.name + ' ERROR: no program is bound yet, can\'t find the attribute location for: ' + this.name);
								return;
						}

						if (this._attributeLocation === undefined) {

								this._attributeLocation = this._context.getAttribLocation(this._context.boundProgram, this.name);
								return;
						}

						var sizePerElement = null;

						if (this._data instanceof Float32Array) {

								sizePerElement = Float32Array.BYTES_PER_ELEMENT;
						} else if (this._data instanceof Uint16Array) {

								sizePerElement = Uint16Array.BYTES_PER_ELEMENT;
						}

						this.buffer.bind();

						this._context.enableVertexAttribArray(this._attributeLocation);

						this._context.vertexAttribPointer(this._attributeLocation, this._numberOfElements, this._dataType, this._normalisedElements, this._sizeOfIndividualVertex * sizePerElement, this._offsetFromBeginingVertex * sizePerElement);

						this.buffer.unbind();
				}
		}, {
				key: "name",
				set: function set(_name) {

						this._name = _name;
				},
				get: function get() {

						return this._name;
				}
		}, {
				key: "buffer",
				set: function set(_buffer) {

						if (_buffer.type != 'Buffer') {

								console.error('You must pass a valid buffer object!');
								return;
						}

						this._buffer = _buffer;
				},
				get: function get() {

						return this._buffer;
				}
		}, {
				key: "bufferType",
				set: function set(_bufferType) {

						this._bufferType = _bufferType;
				},
				get: function get() {

						return this._bufferType;
				}
		}, {
				key: "usageParameter",
				set: function set(_usageParameter) {

						this._usageParameter = _usageParameter;
				},
				get: function get() {

						return this._usageParameter;
				}
		}, {
				key: "attributeLocation",
				set: function set(_attributeLocation) {

						this._attributeLocation = _attributeLocation;
				},
				get: function get() {

						return this._attributeLocation;
				}
		}, {
				key: "numberOfElements",
				set: function set(_numberOfElements) {

						this._numberOfElements = _numberOfElements;
				},
				get: function get() {

						return this._numberOfElements;
				}
		}, {
				key: "dataType",
				set: function set(_dataType) {

						this._dataType = _dataType;
				},
				get: function get() {

						return this._dataType;
				}
		}, {
				key: "normalisedElements",
				set: function set(_normalisedElements) {

						this._normalisedElements = _normalisedElements;
				},
				get: function get() {

						return this._normalisedElements;
				}
		}, {
				key: "sizeOfIndividualVertex",
				set: function set(_sizeOfIndividualVertex) {

						this._sizeOfIndividualVertex = _sizeOfIndividualVertex;
				},
				get: function get() {

						return this._sizeOfIndividualVertex;
				}
		}, {
				key: "offsetFromBeginingVertex",
				set: function set(_offsetFromBeginingVertex) {

						this._offsetFromBeginingVertex = _offsetFromBeginingVertex;
				},
				get: function get() {

						return this._offsetFromBeginingVertex;
				}
		}, {
				key: "data",
				set: function set(_data) {

						// Verify data & name

						if (_data == null) return;

						if (!(_data instanceof Float32Array || _data instanceof Uint16Array)) {

								console.error(this.constructor.name + ' ERROR: the data must be a Float32Array of Uint16Array! ');
								return;
						} else if (!this._name) {

								console.error(this.constructor.name + ' ERROR: you must specify a name! ');
								return;
						}

						this.dataUpdated = true;

						this._data = _data;

						// Set some default variables in case not all are defined.

						var defaultAttributeVariables = this.getDefaultAttributeVariables();

						// Set buffer variables

						if (!this._bufferType) this._bufferType = defaultAttributeVariables.bufferType;
						if (!this._dataType) this._dataType = defaultAttributeVariables.dataType;
						if (!this._usageParameter) this._usageParameter = this._context.STATIC_DRAW;

						// Set attributes variables

						if (!this._attributeLocation) this._attributeLocation = defaultAttributeVariables.attributeLocation;
						if (!this._numberOfElements) this._numberOfElements = defaultAttributeVariables.numberOfElements;
						if (!this._normalisedElements) this._normalisedElements = defaultAttributeVariables.normalisedElements;
						if (!this._sizeOfIndividualVertex) this._sizeOfIndividualVertex = defaultAttributeVariables.sizeOfIndividualVertex;
						if (!this._offsetFromBeginingVertex) this._offsetFromBeginingVertex = defaultAttributeVariables.offsetFromBeginingVertex;

						// Create a buffer if needed, bind it and upload data to the GPU.

						this.buffer.bind();
						this.buffer.setData(this._data, this._usageParameter);
						this.buffer.unbind();
				},
				get: function get() {

						return this._data;
				}
		}]);

		return BufferAttribute;
}(_WebGlElement2.WebGlElement);

},{"./Buffer":2,"./WebGlElement":24}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Camera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _Transform2 = require("./Transform");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Camera = exports.Camera = function (_Transform) {
	_inherits(Camera, _Transform);

	function Camera(_options) {
		_classCallCheck(this, Camera);

		var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, _options));

		_this._direction = [0, 0, 1];

		_this._vMatrix = mat4.create();
		mat4.identity(_this._vMatrix);

		_this._pMatrix = mat4.create();
		mat4.identity(_this._pMatrix);

		_this.farClipPlane = _options.farClipPlane;
		_this.nearClipPlane = _options.nearClipPlane;

		return _this;
	}

	_createClass(Camera, [{
		key: "lookAt",
		value: function lookAt(_point) {

			mat4.lookAt(this._vMatrix, _get(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), "position", this), _point, [0, 1, 0]);

			vec3.subtract(this._direction, _point, _get(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), "position", this));
			vec3.normalize(this._direction, this._direction);
		}
	}, {
		key: "update",
		value: function update() {

			var point = vec3.create();
			vec3.add(point, _get(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), "position", this), this._direction);

			this.lookAt(point);
		}
	}, {
		key: "get2DPoint",
		value: function get2DPoint(_point) {

			var viewProjectionMatrix = mat4.mul(mat4.create(), this.pMatrix, this.vMatrix);
			var p = vec3.transformMat4(vec3.create(), _point, viewProjectionMatrix);

			var newPoint = vec2.create();

			newPoint[0] = (p[0] + 1) / 2 * this._context.renderer.realWidth;
			newPoint[1] = (1 - p[1]) / 2 * this._context.renderer.realHeight;

			return newPoint;
		}
	}, {
		key: "position",
		set: function set(_position) {

			if (!_position) return;

			_set(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), "position", _position, this);
		},
		get: function get() {

			return _get(Camera.prototype.__proto__ || Object.getPrototypeOf(Camera.prototype), "position", this);
		}
	}, {
		key: "vMatrix",
		set: function set(_vMatrix) {

			this._vMatrix = _vMatrix;
		},
		get: function get() {

			return this._vMatrix;
		}
	}, {
		key: "pMatrix",
		set: function set(_pMatrix) {

			this._pMatrix = _pMatrix;
		},
		get: function get() {

			return this._pMatrix;
		}
	}, {
		key: "nearClipPlane",
		set: function set(_nearClipPlane) {

			this._nearClipPlane = _nearClipPlane;
		},
		get: function get() {

			return this._nearClipPlane;
		}
	}, {
		key: "farClipPlane",
		set: function set(_farClipPlane) {

			this._farClipPlane = _farClipPlane;
		},
		get: function get() {

			return this._farClipPlane;
		}
	}]);

	return Camera;
}(_Transform2.Transform);

},{"./Transform":23}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Fbo = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

var _Texture = require("./Texture");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fbo = exports.Fbo = function (_WebGlElement) {
		_inherits(Fbo, _WebGlElement);

		function Fbo(_options) {
				_classCallCheck(this, Fbo);

				var _this = _possibleConstructorReturn(this, (Fbo.__proto__ || Object.getPrototypeOf(Fbo)).call(this, _options));

				_this._width = _options.width || 512;
				_this._height = _options.height || 512;

				_this._lastViewPort = null;

				_this._frameTexture = new _Texture.Texture({ context: _this._context, width: _this._width, height: _this._height, minFilter: _options.minFilter, maxFilter: _options.maxFilter });
				// this._frameTexture.bind();
				_this._renderBuffer = _this._context.createRenderbuffer();
				_this._context.bindRenderbuffer(_this._context.RENDERBUFFER, _this._renderBuffer);
				// this._context.renderbufferStorageMultisample( this._context.RENDERBUFFER, 4, this._context.RGBA8, this._width, this._height );
				_this._context.renderbufferStorage(_this._context.RENDERBUFFER, _this._context.DEPTH_COMPONENT16, _this._width, _this._height);

				_this._frameBuffer = _this._context.createFramebuffer();
				_this._context.bindFramebuffer(_this._context.FRAMEBUFFER, _this._frameBuffer);
				_this._context.framebufferTexture2D(_this._context.FRAMEBUFFER, _this._context.COLOR_ATTACHMENT0, _this._context.TEXTURE_2D, _this._frameTexture.texture, 0);
				_this._context.framebufferRenderbuffer(_this._context.FRAMEBUFFER, _this._context.DEPTH_ATTACHMENT, _this._context.RENDERBUFFER, _this._renderBuffer);

				// this._frameTexture.unbind();
				_this._context.bindRenderbuffer(_this._context.RENDERBUFFER, null);
				_this._context.bindFramebuffer(_this._context.FRAMEBUFFER, null);

				return _this;
		}

		_createClass(Fbo, [{
				key: "bind",
				value: function bind() {

						// this._lastViewPort = this._context.getParameter ( this._context.VIEWPORT );
						this._lastViewPort = this._context.renderer.viewport;
						this._context.viewport(0, 0, this._width, this._height);
						this._context.bindFramebuffer(this._context.FRAMEBUFFER, this._frameBuffer);
				}
		}, {
				key: "unbind",
				value: function unbind() {

						// this._context.bindFramebuffer( this._context.READ_FRAMEBUFFER, this._frameBuffer[ this._frameBuffer.RENDERBUFFER ] );
						// this._context.bindFramebuffer( this._context.DRAW_FRAMEBUFFER, this._frameBuffer[ this._frameBuffer.COLORBUFFER ] );
						// this._context.clearBufferfv( this._context.COLOR, 0, [ 0.0, 0.0, 0.0, 1.0 ] );
						// this._context.blitFramebuffer( 0, 0, this._width, this._height, 0, 0, this._width, this._height, this._context.COLOR_BUFFER_BIT, this._context.NEAREST );

						this._context.viewport(this._lastViewPort.x, this._lastViewPort.y, this._lastViewPort.width, this._lastViewPort.height);
						this._context.bindFramebuffer(this._context.FRAMEBUFFER, null);
				}
		}, {
				key: "texture",
				get: function get() {

						return this._frameTexture;
				}
		}]);

		return Fbo;
}(_WebGlElement2.WebGlElement);

},{"./Texture":22,"./WebGlElement":24}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Geometry = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

var _BufferAttribute = require("./BufferAttribute");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Geometry = exports.Geometry = function (_WebGlElement) {
		_inherits(Geometry, _WebGlElement);

		function Geometry(_options) {
				_classCallCheck(this, Geometry);

				var _this = _possibleConstructorReturn(this, (Geometry.__proto__ || Object.getPrototypeOf(Geometry)).call(this, _options));

				_this._bufferAttributes = {};
				_this._vao = null;

				return _this;
		}

		_createClass(Geometry, [{
				key: "addBufferAttribute",
				value: function addBufferAttribute(_bufferAttribute) {

						if (_bufferAttribute.type != 'BufferAttribute') {

								console.error(this.constructor.name + ' Geometry ERROR: You must pass a valid attribute to the geometry.');
								return;
						}

						this._bufferAttributes[_bufferAttribute.name] = _bufferAttribute;
				}
		}, {
				key: "deleteBufferAttribute",
				value: function deleteBufferAttribute(_bufferAttribute) {

						if (_bufferAttribute.type != 'BufferAttribute') {

								console.error(this.constructor.name + ' Geometry ERROR: You must pass a valid attribute to the geometry.');
								return;
						}

						console.log(_bufferAttribute.name + ' deleted');

						this._context.deleteBuffer(_bufferAttribute.buffer);
				}
		}, {
				key: "clone",
				value: function clone() {

						var geometry = new Geometry({ context: this._context });

						if (this.bufferAttributes.position) geometry.addBufferAttribute(this.bufferAttributes.position);
						if (this.bufferAttributes.color) geometry.addBufferAttribute(this.bufferAttributes.color);
						if (this.bufferAttributes.texCoord) geometry.addBufferAttribute(this.bufferAttributes.texCoord);
						if (this.bufferAttributes.normal) geometry.addBufferAttribute(this.bufferAttributes.normal);
						if (this.bufferAttributes.index) geometry.addBufferAttribute(this.bufferAttributes.index);

						return geometry;
				}
		}, {
				key: "bind",
				value: function bind() {

						if (this._context.boundGeometry != this) {

								this._context.boundGeometry = this;
						} else {

								return;
						}

						// if ( !this._vao ) {

						// 	this._vao = this._context.vao.createVertexArrayOES ();
						// 	this._context.vao.bindVertexArrayOES ( this._vao );


						// } else {

						// 	this._context.vao.bindVertexArrayOES ( this._vao );

						// }

						for (var name in this._bufferAttributes) {

								if (name != 'index') {

										this._bufferAttributes[name].bind();
								}
						}
				}

				// Draw methods.

		}, {
				key: "drawElements",
				value: function drawElements(_drawMode, _indicesLength, _indicesOffset) {

						if (!this._bufferAttributes.index) {

								console.error(this.constructor.name + ' ERROR: you can not draw elements without an index attribute!');
								return;
						}

						this._bufferAttributes['index'].buffer.bind();
						this._context.drawElements(_drawMode, _indicesLength, this._context.UNSIGNED_SHORT, _indicesOffset);
						this._bufferAttributes['index'].buffer.unbind();
				}
		}, {
				key: "drawArrays",
				value: function drawArrays(_drawMode, _offsetElement, _numElements) {

						this._context.drawArrays(_drawMode, _offsetElement, _numElements);
				}
		}, {
				key: "bufferAttributes",
				get: function get() {

						return this._bufferAttributes;
				}
		}]);

		return Geometry;
}(_WebGlElement2.WebGlElement);

},{"./BufferAttribute":3,"./WebGlElement":24}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GlyphAtlas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Atlas = require('font-atlas');

var GlyphAtlas = exports.GlyphAtlas = function (_WebGlElement) {
	_inherits(GlyphAtlas, _WebGlElement);

	function GlyphAtlas(_options) {
		_classCallCheck(this, GlyphAtlas);

		var _this = _possibleConstructorReturn(this, (GlyphAtlas.__proto__ || Object.getPrototypeOf(GlyphAtlas)).call(this, _options));

		_this._atlas = new Atlas(_options);
		_this._textureContext = _this._atlas.context;

		return _this;
	}

	_createClass(GlyphAtlas, [{
		key: "canvas",
		get: function get() {

			return this._atlas.canvas;
		}
	}, {
		key: "elements",
		get: function get() {

			return this._atlas.elements;
		}
	}]);

	return GlyphAtlas;
}(_WebGlElement2.WebGlElement);

},{"./WebGlElement":24,"font-atlas":27}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Image = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mesh2 = require("./Mesh");

var _Primitives = require("./Primitives");

var _Geometry = require("./Geometry");

var _BufferAttribute = require("./BufferAttribute");

var _MaterialHelper = require("./MaterialHelper");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Image = exports.Image = function (_Mesh) {
	_inherits(Image, _Mesh);

	function Image(_options) {
		_classCallCheck(this, Image);

		var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, _options));

		_this._quad = (0, _Primitives.Quad)([0, 0, 0], [1, 1, 1]);

		_this.geometry = new _Geometry.Geometry({ context: _this._context });
		_this.geometry.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: _this._context, name: 'position', data: new Float32Array(_this._quad.vertices) }));
		_this.geometry.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: _this._context, name: 'texCoord', data: new Float32Array(_this._quad.uvs) }));
		_this.geometry.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: _this._context, name: 'index', data: new Uint16Array(_this._quad.indices) }));
		_this.material = new _MaterialHelper.MaterialHelper({ context: _this._context }).uColoredTexturedTriangles();
		_this.color = [1.0, 1.01, 1.0, 1.0];

		return _this;
	}

	_createClass(Image, [{
		key: "imageUrl",
		set: function set(_imageUrl) {

			this._material.imageUrl = _imageUrl;
		},
		get: function get() {

			return this._material.imageUrl;
		}
	}, {
		key: "color",
		set: function set(_color) {

			this._material.uniforms.solidColor = {

				type: 'vec4',
				data: _color

			};
		},
		get: function get() {

			return this._material.uniforms.solidColor.data;
		}
	}]);

	return Image;
}(_Mesh2.Mesh);

},{"./BufferAttribute":3,"./Geometry":6,"./MaterialHelper":10,"./Mesh":11,"./Primitives":15}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Material = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _ShaderProgram = require("./ShaderProgram");

var _Shader = require("./Shader");

var _Texture = require("./Texture");

var _WebGlElement2 = require("./WebGlElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Material = exports.Material = function (_WebGlElement) {
		_inherits(Material, _WebGlElement);

		function Material(_options) {
				_classCallCheck(this, Material);

				// Store the material status.

				var _this = _possibleConstructorReturn(this, (Material.__proto__ || Object.getPrototypeOf(Material)).call(this, _options));

				_this._ready = false;

				// Store how the geometry will be drawn.

				_this.drawMode = _options.drawMode;

				// Shader

				_this.shaderProgram = _options.shaderProgram;
				_this.shaderUrl = _options.shaderUrl;

				// Uniform

				_this.uniforms = _options.uniforms || {};

				if (!_this.uniforms.time) {

						_this.uniforms.time = {

								type: 'float',
								data: 0

						};
				}

				// Image

				_this.image = _options.image;
				_this.imageUrl = _options.imageUrl;

				// Texture

				_this.texture = _options.texture;
				_this.multipleTextures = _options.multipleTextures || [];
				_this.rawTexture = _options.texture;
				_this.multipleRawTextures = _options.multipleRawTextures || [];

				// Transparent
				// Useful for forting geomatries at rendering.

				_this.transparent = _options.transparent || false;
				_this.depthTest = _options.depthTest || true;
				_this.enableBlending = true;
				_this.sourceBlendingMode = _options.sourceBlendingMode || _this._context.SRC_ALPHA;
				_this.destinationBlendingMode = _options.destinationBlendingMode || _this._context.ONE_MINUS_SRC_ALPHA;

				_this._zIndex = _options.zIndex || 0;

				// Color

				_this._color = {

						r: 1.0,
						g: 1.0,
						b: 1.0,
						a: 1.0

				};

				// Info to change

				_this.logWarn('Diploma Hack: need to change multiple textures handling for further develeopement!');

				return _this;
		}

		_createClass(Material, [{
				key: "createShader",
				value: function createShader(_options) {

						var vertexHeader = "\n\t\t\tprecision mediump float;\n\n\t\t\t// Present in all shader\n\t\t\tuniform float time;\n\t\t\tuniform vec2 resolution;\n\n\t\t\tuniform mat4 mv_Matrix;\n\t\t\tuniform mat4 p_Matrix;\n\n\t\t\tattribute vec3 position;\n\t\t\tattribute vec2 texCoord;\n\t\t\tattribute vec3 normal;\n\t\t\tattribute vec4 color;\n\n\t\t\tvec4 outPosition;\n\n\t\t";

						var vertexBody = "\n\t\t\tvoid main () {\n\n\t\t\t\toutPosition = vec4 ( position.xyz, 1.0 );\n\n\t\t";

						var vertexFooter = "\n\t\t\t\toutPosition = p_Matrix * mv_Matrix * vec4( outPosition.xyz, 1.0 );\n\n\t\t";

						var vertexEnd = "\n\n\t\t\t\tgl_Position = outPosition;\n\t\t\t}\n\n\t\t";

						var fragmentExtensions = "\n\t\t";

						var fragmentHeader = "\n\t\t\tprecision mediump float;\n\t\t\tuniform float time;\n\n\t\t";

						var fragmentBody = "\n\t\t\tvoid main () {\n\n\t\t\t\tvec4 outColor;\n\n\t\t";

						var fragmentFooter = "\n\t\t\t\tgl_FragColor = outColor;\n\n\t\t\t}\n\n\t\t";

						var vertexShader = new _Shader.Shader({ context: this._context, shaderType: this._context.VERTEX_SHADER });
						vertexShader.text = vertexHeader + _options.vertexHeader + vertexBody + _options.vertexBody + vertexFooter + (_options.vertexEnd || '') + vertexEnd;

						var fragmentShader = new _Shader.Shader({ context: this._context, shaderType: this._context.FRAGMENT_SHADER });
						fragmentShader.text = (_options.fragmentExtensions || '') + fragmentHeader + _options.fragmentHeader + fragmentBody + _options.fragmentBody + fragmentFooter;

						var shaderProgram = new _ShaderProgram.ShaderProgram({ context: this._context, vertexShader: vertexShader.shader, fragmentShader: fragmentShader.shader });

						this._shaderProgram = shaderProgram;
				}
		}, {
				key: "bind",
				value: function bind() {

						//
						// Hack for diploma need to change this.
						//

						if (this.multipleRawTextures.length > 0) {

								for (var i = this.multipleRawTextures.length - 1; i >= 0; i--) {

										this._context.activeTexture(this._context.TEXTURE0 + i);
										this._context.bindTexture(this._context.TEXTURE_2D, this.multipleRawTextures[i]);
								}
						}

						if (this.multipleTextures.length > 0 && this.multipleRawTextures.length == 0) {

								for (var _i = 0; _i < this.multipleTextures.length; _i++) {

										this._context.activeTexture(this._context['TEXTURE' + _i]);
										this._context.bindTexture(this._context.TEXTURE_2D, this.multipleTextures[_i]);
								}
						}

						if (this.rawTexture && this.multipleTextures.length == 0 && this.multipleRawTextures.length == 0) {

								this._context.activeTexture(this._context.TEXTURE0);
								this._context.bindTexture(this._context.TEXTURE_2D, this.rawTexture);
						}

						if (this.texture && !this.rawTexture && this.multipleTextures.length == 0 && this.multipleRawTextures.length == 0) {

								this.texture.activeTexture(this._context.TEXTURE0);
								this.texture.bind();
						}

						if (this.shaderProgram) {

								this.shaderProgram.bind();
						}
				}
		}, {
				key: "unbind",
				value: function unbind() {

						if (this.texture && !this.rawTexture) {

								this.texture.unbind();
								this.texture.activeTexture(null);
						}

						if (this.rawTexture) {

								this._context.activeTexture(null);
								this._context.bindTexture(this._context.TEXTURE_2D, null);
						}

						if (this.shaderProgram) {

								this.shaderProgram.unbind();
						}
				}
		}, {
				key: "clone",
				value: function clone() {

						var newMaterial = new Material({ context: this._context });
				}
		}, {
				key: "type",
				get: function get() {

						return this._type;
				}
		}, {
				key: "drawMode",
				set: function set(_drawMode) {

						this._drawMode = _drawMode;
				},
				get: function get() {

						return this._drawMode;
				}
		}, {
				key: "depthTest",
				set: function set(_depthTest) {

						this._depthTest = _depthTest;
				},
				get: function get() {

						return this._depthTest;
				}
		}, {
				key: "zIndex",
				set: function set(_zIndex) {

						this._zIndex = _zIndex;
				},
				get: function get() {

						return this._zIndex;
				}

				// Load methods

		}, {
				key: "shaderUrl",
				set: function set(_shaderUrl) {

						if (!_shaderUrl) return;

						this._shaderUrl = _shaderUrl;

						// Create a shader program.

						var shaderProgram = new _ShaderProgram.ShaderProgram({ context: this._context });

						// Load vertex shader.

						(0, _utils.ajax)(_shaderUrl + '.vert.glsl', function (error, response) {

								if (error) {

										console.error(error);
								} else {

										var vertexShader = new _Shader.Shader({ context: this._context, shaderType: this._context.VERTEX_SHADER });
										vertexShader.text = response.responseText;
										shaderProgram.vertexShader = vertexShader.shader;

										// If the two shaders are loaded then it will return a shader program if not it will return null.

										this._shaderProgram = shaderProgram;
								}
						}.bind(this));

						// Load fragment shader.

						(0, _utils.ajax)(_shaderUrl + '.frag.glsl', function (error, response) {

								if (error) {

										console.error(error);
								} else {

										var fragmentShader = new _Shader.Shader({ context: this._context, shaderType: this._context.FRAGMENT_SHADER });
										fragmentShader.text = response.responseText;
										shaderProgram.fragmentShader = fragmentShader.shader;

										// If the two shaders are loaded then it will return a shader program if not it will return null.

										this._shaderProgram = shaderProgram;
								}
						}.bind(this));
				},
				get: function get() {

						return this._shaderUrl;
				}
		}, {
				key: "imageUrl",
				set: function set(_imageUrl) {

						if (!_imageUrl) return;

						this._imageUrl = _imageUrl;

						// Load the image.

						var image = new Image();
						image.src = _imageUrl;

						(0, _utils.addEvent)(image, 'load', function () {

								this._image = image;
								var texture = new _Texture.Texture({ context: this._context, image: image });
								this._texture = texture;
						}.bind(this));
				},
				get: function get() {

						return this._imageUrl;
				}
		}, {
				key: "image",
				set: function set(_image) {

						this._image = _image;

						if (!this._texture) this._texture = new _Texture.Texture({ context: this._context, image: _image });

						this._texture.image = _image;
				},
				get: function get() {

						return this._image;
				}
		}, {
				key: "color",
				set: function set(_color) {

						this._color = _color;
				},
				get: function get() {

						return this._color;
				}
		}, {
				key: "shaderProgram",
				set: function set(_shaderProgram) {

						this._shaderProgram = _shaderProgram;
				},
				get: function get() {

						return this._shaderProgram;
				}
		}, {
				key: "uniforms",
				set: function set(_uniforms) {

						if (!_uniforms) return;

						this._uniforms = _uniforms;
				},
				get: function get() {

						return this._uniforms;
				}
		}, {
				key: "texture",
				set: function set(_texture) {

						this._texture = _texture;
				},
				get: function get() {

						return this._texture;
				}
		}, {
				key: "transparent",
				set: function set(_transparent) {

						this._transparent = _transparent;
				},
				get: function get() {

						return this._transparent;
				}
		}, {
				key: "ready",
				get: function get() {

						if (!this._shaderProgram) return false;
						if (this._imageUrl && !this._texture) return false;

						return true;
				}
		}]);

		return Material;
}(_WebGlElement2.WebGlElement);

},{"./Shader":19,"./ShaderProgram":20,"./Texture":22,"./WebGlElement":24,"./utils":41}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
			value: true
});
exports.MaterialHelper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require('./WebGlElement');

var _Material = require('./Material');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MaterialHelper = exports.MaterialHelper = function (_WebGlElement) {
			_inherits(MaterialHelper, _WebGlElement);

			function MaterialHelper(_options) {
						_classCallCheck(this, MaterialHelper);

						return _possibleConstructorReturn(this, (MaterialHelper.__proto__ || Object.getPrototypeOf(MaterialHelper)).call(this, _options));
			}

			_createClass(MaterialHelper, [{
						key: 'whiteLines',
						value: function whiteLines() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.LINES });

									material.createShader({

												vertexHeader: '\n\n\n\t\t\t',

												vertexBody: '\n\n\t\t\t',

												fragmentHeader: '\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = vec4 ( 1.0, 1.0, 1.0, 1.0 );\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'blackLines',
						value: function blackLines() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.LINES });

									material.createShader({

												vertexHeader: '\n\n\n\t\t\t',

												vertexBody: '\n\n\t\t\t',

												fragmentHeader: '\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = vec4 ( 0.0, 0.0, 0.0, 1.0 );\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'points',
						value: function points() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.POINT });

									material.createShader({

												vertexHeader: '\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tgl_PointSize = 2.0;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = vec4 ( 0.5, 0.5, 0.5, 1.0 );\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'debugTriangles',
						value: function debugTriangles() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t',

												vertexBody: '\n\t\t\t',

												fragmentHeader: '\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = vec4 ( 1.0, 0.0, 1.0, 1.0 );\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'vertexColoredLines',
						value: function vertexColoredLines() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.LINES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_Color = color;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = f_Color;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'vertexColorTriangles',
						value: function vertexColorTriangles() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_Color = color;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = f_Color;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'pointSprites',
						value: function pointSprites() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.POINT });

									material.createShader({

												vertexHeader: '\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tgl_PointSize = normal.x;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tuniform sampler2D sampler; \n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, gl_PointCoord);\n\t\t\t\toutColor = textureColor;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'coloredPointSprites',
						value: function coloredPointSprites() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.POINT });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_Color = color;\n\t\t\t\tgl_PointSize = normal.x;// / ( ( computedPosition.z * 0.3 ) + 0.0001 );\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tuniform sampler2D sampler; \n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, gl_PointCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor *= f_Color;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'vertexColorPointSprites',
						value: function vertexColorPointSprites() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.POINT });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tgl_PointSize = normal.x;\n\t\t\t\tf_Color = color;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tuniform sampler2D sampler; \n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, gl_PointCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor *= f_Color;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'uColoredTriangles',
						value: function uColoredTriangles() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t',

												vertexBody: '\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tuniform vec4 solidColor;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = solidColor;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'coloredTriangles',
						value: function coloredTriangles() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_Color = color;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = f_Color;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'texturedTriangles',
						value: function texturedTriangles() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_TexCoord = texCoord;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tuniform sampler2D sampler; \n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\toutColor = textureColor;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'uColoredTexturedTriangles',
						value: function uColoredTexturedTriangles() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });
									material.uniforms.solidColor = {

												type: 'vec4',
												data: vec4.fromValues(1, 1, 1, 1)

									};

									material.createShader({

												vertexHeader: '\n\t\t\t\t// varying vec4 f_Color;\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\t// f_Color = color;\n\t\t\t\tf_TexCoord = texCoord;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tuniform sampler2D sampler; \n\t\t\t\tuniform vec4 solidColor;\n\t\t\t\t// varying vec4 f_Color;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor *= solidColor;\n\t\t\t\t// outColor *= f_Color;\n\n\t\t\t\tif ( outColor.a <= 0.01 ) discard;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'coloredTexturedTriangles',
						value: function coloredTexturedTriangles() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\tf_Color = color;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tuniform sampler2D sampler; \n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor *= f_Color;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'triangleTest',
						value: function triangleTest() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\tf_Color = color;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = vec4 ( f_TexCoord.x, 0.0, 1.0, 1.0 );\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'glyphs',
						value: function glyphs() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tuniform float alignMode;\n\t\t\t\tuniform float verticalAlignMode;\n\n\t\t\t\tuniform float letterSpacing;\n\t\t\t\tuniform float lineHeight;\n\t\t\t\tuniform float numLines;\n\n\t\t\t\tattribute vec4 textInfo;\n\n\t\t\t\t// textInfo.x : line length\n\t\t\t\t// textInfo.y : line index\n\t\t\t\t// textInfo.z : char index\n\t\t\t\t// textInfo.w : char num\n\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\t// Compute align offset\n\n\t\t\t\tfloat offset = 0.0;\n\n\t\t\t\tif ( alignMode == 0.0 ) {\n\n\t\t\t\t\toffset = 0.0;\n\n\t\t\t\t} else if ( alignMode == 1.0 ) {\n\n\t\t\t\t\toffset = -( textInfo.w - 1.0 ) * letterSpacing * 0.5 - textInfo.x * 0.5;\n\n\t\t\t\t} else if ( alignMode == 2.0 ) {\n\n\t\t\t\t\toffset = -( textInfo.w - 1.0 ) * letterSpacing * 0.5 - textInfo.x;\n\n\t\t\t\t}\n\n\t\t\t\t// Compute vertical align offset\n\n\t\t\t\tfloat verticalOffset = 0.0;\n\n\t\t\t\tif ( verticalAlignMode == 0.0 ) {\n\n\t\t\t\t\tverticalOffset = -0.5;\n\n\t\t\t\t} else if ( verticalAlignMode == 1.0 ) {\n\n\t\t\t\t\tverticalOffset = ( numLines - 1.0 ) * lineHeight * 0.5;\t\t\t\t\t\n\n\t\t\t\t} else if ( verticalAlignMode == 2.0 ) {\n\n\t\t\t\t\tverticalOffset = ( numLines - 1.0 ) * lineHeight + lineHeight * 0.5;\t\n\n\t\t\t\t}\n\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\t\n\t\t\t\toutPosition.x += letterSpacing * textInfo.z + offset;\n\t\t\t\toutPosition.y -= textInfo.y * lineHeight - verticalOffset;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tuniform sampler2D sampler; \n\t\t\t\tuniform vec4 solidColor;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor.r = solidColor.r;\n\t\t\t\toutColor.g = solidColor.g;\n\t\t\t\toutColor.b = solidColor.b;\n\t\t\t\toutColor.a = textureColor.a * textureColor.g * textureColor.b * solidColor.a;\n\n\t\t\t\t// if ( outColor.a < 0.001 ) discard;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'sdfGlyphs',
						value: function sdfGlyphs() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tuniform float alignMode;\n\t\t\t\tuniform float verticalAlignMode;\n\n\t\t\t\tuniform float letterSpacing;\n\t\t\t\tuniform float lineHeight;\n\t\t\t\tuniform float numLines;\n\n\t\t\t\tattribute vec4 textInfo;\n\n\t\t\t\t// textInfo.x : line length\n\t\t\t\t// textInfo.y : line index\n\t\t\t\t// textInfo.z : char index\n\t\t\t\t// textInfo.w : char num\n\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\t// Compute align offset\n\n\t\t\t\tfloat offset = 0.0;\n\n\t\t\t\tif ( alignMode == 0.0 ) {\n\n\t\t\t\t\toffset = 0.0;\n\n\t\t\t\t} else if ( alignMode == 1.0 ) {\n\n\t\t\t\t\toffset = -( textInfo.w - 1.0 ) * letterSpacing * 0.5 - textInfo.x * 0.5;\n\n\t\t\t\t} else if ( alignMode == 2.0 ) {\n\n\t\t\t\t\toffset = -( textInfo.w - 1.0 ) * letterSpacing * 0.5 - textInfo.x;\n\n\t\t\t\t}\n\n\t\t\t\t// Compute vertical align offset\n\n\t\t\t\tfloat verticalOffset = 0.0;\n\n\t\t\t\tif ( verticalAlignMode == 0.0 ) {\n\n\t\t\t\t\tverticalOffset = -0.5;\n\n\t\t\t\t} else if ( verticalAlignMode == 1.0 ) {\n\n\t\t\t\t\tverticalOffset = ( numLines - 1.0 ) * lineHeight * 0.5;\t\t\t\t\t\n\n\t\t\t\t} else if ( verticalAlignMode == 2.0 ) {\n\n\t\t\t\t\tverticalOffset = ( numLines - 1.0 ) * lineHeight + lineHeight * 0.5;\t\n\n\t\t\t\t}\n\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\t\n\t\t\t\toutPosition.x += letterSpacing * textInfo.z + offset;\n\t\t\t\toutPosition.y -= textInfo.y * lineHeight - verticalOffset;\n\t\t\t\t\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tuniform sampler2D sampler; \n\t\t\t\tuniform vec4 solidColor;\n\t\t\t\tfloat target = 0.70;\n\t\t\t\tfloat smoothing = 1.0/5.0;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor.r = 0.0;\n\t\t\t\toutColor.g = 0.0;\n\t\t\t\toutColor.b = 0.0;\n\t\t\t\t// outColor.a = textureColor.r * textureColor.g * textureColor.b;\n\t\t\t\tfloat alpha = smoothstep( target - smoothing, target + smoothing, textureColor.r);\n\t\t\t\toutColor.a = alpha;\n\t\t\t\t// if ( outColor.a < 0.1 ) discard;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'screen',
						value: function screen() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tuniform vec2 screenResolution;\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_TexCoord = vec2 ( position.x / screenResolution.x, position.y / screenResolution.y );\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tuniform sampler2D sampler; \n\t\t\t\tuniform vec2 screenResolution;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, vec2 ( gl_FragCoord.x / screenResolution.x, gl_FragCoord.y / screenResolution.y ));\n\t\t\t\toutColor = textureColor;\n\n\t\t\t\toutColor.a -= 0.25;\n\t\t\t\toutColor.a /= 0.75;\n\n\t\t\t\t// if ( outColor.a < 0.3 ) discard;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'screenButton',
						value: function screenButton() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tuniform vec2 screenResolution;\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tvarying vec2 f_Uv;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_Uv = texCoord;\n\t\t\t\tf_TexCoord = vec2 ( position.x / screenResolution.x, position.y / screenResolution.y );\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_Uv;\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tuniform sampler2D sampler; \n\t\t\t\tuniform vec2 screenResolution;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, vec2 ( gl_FragCoord.x / screenResolution.x, gl_FragCoord.y / screenResolution.y ));\n\t\t\t\toutColor = textureColor;\n\n\t\t\t\toutColor.a -= 0.25;\n\t\t\t\toutColor.a /= 0.75;\n\n\t\t\t\tfloat cDist = length ( f_Uv - 0.5 ) * 2.0;\n\t\t\t\toutColor.a = smoothstep ( 1.0, 0.95, cDist );\n\n\t\t\t\t// if ( outColor.a < 0.001 ) discard;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'sdfTexture',
						value: function sdfTexture() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.uniforms = {

												solidColor: {

															type: 'vec4',
															data: vec4.fromValues(0.0, 0.0, 0.0, 1.0)

												},

												sdfSmoothing: {

															type: 'float',
															data: 0.003144

												},

												sdfTarget: {

															type: 'float',
															data: 0.2

												}

									};

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\t\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tuniform sampler2D sampler; \n\t\t\t\tuniform vec4 solidColor;\n\t\t\t\tuniform float sdfTarget;\n\t\t\t\tuniform float sdfSmoothing;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\tfloat fragGreyValue = textureColor.r * textureColor.g * textureColor.b;\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor.r = solidColor.r;\n\t\t\t\toutColor.g = solidColor.g;\n\t\t\t\toutColor.b = solidColor.b;\n\t\t\t\t\n\t\t\t\tfloat alpha = smoothstep( sdfTarget - sdfSmoothing, sdfTarget + sdfSmoothing, fragGreyValue);\n\t\t\t\toutColor.a = ( 1.0 - alpha ) * solidColor.a;\n\t\t\t\tif ( outColor.a < 0.01 ) discard;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'field',
						value: function field() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.LINES });

									material.depthTest = true;

									material.uniforms.solidColor = {

												type: 'vec4',
												data: vec4.fromValues(0.0, 0.0, 0.0, 1.0)

									};

									material.uniforms.sdfSmoothing = {

												type: 'float',
												data: 0.05

									};

									material.uniforms.sdfTarget = {

												type: 'float',
												data: 0.1

									};

									material.createShader({

												vertexHeader: '\n\t\t\t\tconst int MAX_ATTRACTORS = 100;\n\t\t\t\tuniform vec3 mouse;\n\t\t\t\tuniform float numAttractors;\n\t\t\t\tuniform vec3 attractors[ MAX_ATTRACTORS ];\n\t\t\t\tuniform float initTimes[ MAX_ATTRACTORS ];\n\n\t\t\t\tfloat animationDuration = 4.0;\n\t\t\t\tfloat maxRadius = 2.0;\n\n\t\t\t',

												vertexBody: '\n\n\t\t\t\tvec3 vertexPosition = outPosition.xyz;\n\t\t\t\tfloat maxDistance = 1.5;\n\n\t\t\t\tfor ( int i = 0; i < MAX_ATTRACTORS; i ++ ) {\n\n\t\t\t\t\tif ( i < int ( numAttractors ) ) {\n\n\t\t\t\t\t\tvec3 force = attractors[ i ] - vertexPosition;\n\n\t\t\t\t\t\tfloat distance = length ( force );\n\n\t\t\t\t\t\tif ( distance > maxDistance ) {\n\n\t\t\t\t\t\t\tdistance = maxDistance;\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tfloat animationMultiplier = ( time - initTimes[ i ] ) / animationDuration;\n\n\t\t\t\t\t\tif ( animationMultiplier > 1.0 ) {\n\n\t\t\t\t\t\t\tanimationMultiplier = 1.0;\n\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\toutPosition.xyz += force * ( 1.0 - ( distance / maxDistance ) * ( distance / maxDistance ) ) * animationMultiplier;\n\n\t\t\t\t\t}\t\n\n\t\t\t\t}\n\n\t\t\t\tfor ( int i = 0; i < MAX_ATTRACTORS; i ++ ) {\n\n\t\t\t\t\tif ( i < int ( numAttractors ) ) {\n\n\t\t\t\t\t\tvec3 inverseForce = vertexPosition - outPosition.xyz;\n\t\t\t\t\t\t// outPosition.xyz += inverseForce * length ( inverseForce );\n\n\t\t\t\t\t}\n\n\t\t\t\t}\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tuniform vec4 solidColor;\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor.r = solidColor.r;\n\t\t\t\toutColor.g = solidColor.g;\n\t\t\t\toutColor.b = solidColor.b;\n\t\t\t\toutColor.a = 1.0;\n\t\t\t\t// if ( outColor.a < 0.01 ) discard;\n\n\t\t\t'

									});

									return material;
						}

						// Gravity elements

			}, {
						key: 'gridSimulation',
						value: function gridSimulation() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec2 f_Uv;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_Uv = texCoord.xy;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\t#extension GL_OES_standard_derivatives : enable\n\t\t\t\t// uniform vec3 mouse;\n\t\t\t\tuniform float numAttractors;\n\t\t\t\tconst int MAX_ATTRACTORS = 100;\n\t\t\t\tuniform vec3 attractors[ MAX_ATTRACTORS ];\n\n\t\t\t\tvarying vec2 f_Uv;\n\t\t\t\t// uniform vec4 masses;\n\t\t\t\tuniform sampler2D positions;\n\t\t\t\tuniform sampler2D ssk;\n\t\t\t\tuniform sampler2D baseGrid;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec3 pos = texture2D ( positions, f_Uv ).rgb;\n\t\t\t\tvec3 ginPos = texture2D ( ssk, f_Uv ).rgb;\t\n\t\t\t\tvec3 originPos = texture2D ( baseGrid, f_Uv ).rgb;\t\n\n\t\t\t\tvec3 oForce = originPos - pos;\n\t\t\t\tfloat oDist = length ( oForce ) * 30.0;\t\n\n\t\t\t\tfor ( int i = 0; i < MAX_ATTRACTORS; i ++ ) {\n\n\t\t\t\t\tif ( i >= int ( numAttractors ) ) break;\n\n\t\t\t\t\tvec3 center = attractors[ i ];\n\n\t\t\t\t\tvec3 dir = center - pos;\n\t\t\t\t\tfloat maxDist = 1.0;\n\t\t\t\t\tfloat dist = length ( dir );\n\t\t\t\t\tfloat dM = dist / maxDist;\n\n\t\t\t\t\tpos += (dir / ( dist * dist ) * dM * 0.01) * (1.0 - oDist);\n\t\t\t\t\t\n\n\t\t\t\t}\t\t\n\t\t\t\t\n\t\t\t\toutColor = vec4 ( pos, 1.0 );\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'gridDestination',
						value: function gridDestination() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.LINES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tuniform sampler2D positions;\n\t\t\t\tvarying float f_Dist;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\toutPosition = vec4 ( texture2D ( positions, position.xy ).xyz, 1.0 );\n\t\t\t\tf_Dist = length ( vec3 ( 0.0, 0.0, 0.0 ) - outPosition.xyz ) + 0.5; \n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying float f_Dist;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tfloat greyValue = ( 1.0 / f_Dist ) * 0.7;\n\t\t\t\toutColor = vec4 ( greyValue, greyValue, greyValue, 1.0);\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'basicGravityElement',
						value: function basicGravityElement() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tattribute vec3 transforms;\n\t\t\t\tattribute vec3 scale;\n\t\t\t\tattribute vec3 rotation;\n\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t\tmat4 scaleMatrix ( vec3 scale ) {\n\n\t\t\t\t\treturn mat4(scale.x, 0.0, 0.0, 0.0,\n\t\t\t\t                0.0, scale.y, 0.0, 0.0,\n\t\t\t\t                0.0, 0.0, scale.z, 0.0,\n\t\t\t\t                0.0, 0.0, 0.0, 1.0);\n\n\t\t\t\t}\n\n\t\t\t\tmat4 rotationMatrix(vec3 axis, float angle) {\n\n\t\t\t\t    axis = normalize(axis);\n\t\t\t\t    float s = sin(angle);\n\t\t\t\t    float c = cos(angle);\n\t\t\t\t    float oc = 1.0 - c;\n\t\t\t\t    \n\t\t\t\t    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n\t\t\t\t                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n\t\t\t\t                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n\t\t\t\t                0.0,                                0.0,                                0.0,                                1.0);\n\t\t\t\t}\n\n\t\t\t',

												vertexBody: '\n\n\t\t\t\toutPosition *= scaleMatrix ( scale );\n\t\t\t\t\n\t\t\t\toutPosition *= rotationMatrix ( vec3(0, 0, 1), rotation.z );\n\t\t\t\toutPosition *= rotationMatrix ( vec3(0, 1, 0), rotation.y );\n\t\t\t\toutPosition *= rotationMatrix ( vec3(1, 0, 0), rotation.x );\n\n\t\t\t\toutPosition.x += transforms.x;\n\t\t\t\toutPosition.y += transforms.y;\n\t\t\t\toutPosition.z += transforms.z;\n\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\tf_Color = color;\n\n\t\t\t',

												vertexEnd: '\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tuniform sampler2D sampler; \n\t\t\t\tuniform float colorMode;\n\n\t\t\t',

												fragmentBody: '\n\n\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\toutColor = textureColor;\n\n\t\t\t\tif ( colorMode == 0.0 ) {\n\n\t\t\t\t\toutColor *= f_Color;\n\n\t\t\t\t} else if ( colorMode == 1.0 ) {\n\n\t\t\t\t\toutColor *= 1.0;\n\n\t\t\t\t} else if ( colorMode == 2.0 ) {\n\n\t\t\t\t\toutColor.rbg *= 0.0;\n\t\t\t\t\t// outColor.a = 1.0;\n\n\t\t\t\t}\n\n\t\t\t\t\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'basicGravityElementInfo',
						value: function basicGravityElementInfo() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tattribute vec3 transforms;\n\t\t\t\tattribute vec3 scale;\n\t\t\t\tattribute vec3 rotation;\n\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tvarying vec3 f_Scale;\n\n\t\t\t\tmat4 scaleMatrix ( vec3 scale ) {\n\n\t\t\t\t\treturn mat4(scale.x, 0.0, 0.0, 0.0,\n\t\t\t\t                0.0, scale.y, 0.0, 0.0,\n\t\t\t\t                0.0, 0.0, scale.z, 0.0,\n\t\t\t\t                0.0, 0.0, 0.0, 1.0);\n\n\t\t\t\t}\n\n\t\t\t\tmat4 rotationMatrix(vec3 axis, float angle) {\n\n\t\t\t\t    axis = normalize(axis);\n\t\t\t\t    float s = sin(angle);\n\t\t\t\t    float c = cos(angle);\n\t\t\t\t    float oc = 1.0 - c;\n\t\t\t\t    \n\t\t\t\t    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n\t\t\t\t                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n\t\t\t\t                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n\t\t\t\t                0.0,                                0.0,                                0.0,                                1.0);\n\t\t\t\t}\n\n\t\t\t',

												vertexBody: '\n\n\t\t\t\toutPosition *= scaleMatrix ( scale );\n\t\t\t\t\n\t\t\t\toutPosition *= rotationMatrix ( vec3(0, 0, 1), rotation.z );\n\t\t\t\toutPosition *= rotationMatrix ( vec3(0, 1, 0), rotation.y );\n\t\t\t\toutPosition *= rotationMatrix ( vec3(1, 0, 0), rotation.x );\n\n\t\t\t\toutPosition.x += transforms.x;\n\t\t\t\toutPosition.y += transforms.y;\n\t\t\t\toutPosition.z += transforms.z;\n\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\tf_Color = color;\n\t\t\t\tf_Scale = scale;\n\n\t\t\t',

												vertexEnd: '\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tvarying vec3 f_Scale;\n\t\t\t\tuniform sampler2D sampler; \n\t\t\t\tuniform float colorMode;\n\n\t\t\t',

												fragmentBody: '\n\n\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor.rbg *= 0.0;\n\n\t\t\t\t// VerticalLine\n\n\t\t\t\tfloat lineWidth = 0.005;\n\t\t\t\tfloat hDist = abs ( f_TexCoord.x * f_Scale.x - f_Scale.x * 0.5 ) ;\n\t\t\t\tfloat vDist = abs ( f_TexCoord.y * f_Scale.y - f_Scale.y * 0.5 ) ;\n\n\t\t\t\tif ( hDist < lineWidth && vDist < 0.05 ) {\n\n\t\t\t\t\toutColor.a = 1.0;\n\n\t\t\t\t}\n\n\t\t\t\tif ( hDist < 0.05 && vDist < lineWidth ) {\n\n\t\t\t\t\toutColor.a = 1.0;\n\n\t\t\t\t}\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'smoke',
						value: function smoke() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.POINT });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tgl_PointSize = outPosition.z;\n\t\t\t\tf_Color = color;\n\n\t\t\t\toutPosition.z = 0.0;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tuniform sampler2D sampler; \n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, gl_PointCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor *= f_Color;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'dust',
						value: function dust() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.POINT });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tvarying float f_Radius;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tgl_PointSize = outPosition.z;\n\t\t\t\tf_Radius = outPosition.z;\n\t\t\t\tf_Color = color;\n\n\t\t\t\toutPosition.z = 0.0;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tvarying float f_Radius;\n\t\t\t\t// uniform sampler2D sampler; \n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec2 center = vec2( 0.5, 0.5 );\n\t\t\t\tfloat dist = length( gl_PointCoord.xy - center );\n\n\t\t\t\toutColor = vec4 ( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\toutColor.a = f_Color.a * 0.2;\n\t\t\t\toutColor.a *= smoothstep( 0.5, 0.0, dist);\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'border',
						value: function border() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tvarying vec3 f_Normal;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\tf_Normal = normal;\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec3 f_Normal;\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tfloat hDist = ( abs ( 0.5 - f_TexCoord.x ) / 0.5 ) * f_Normal.x;\n\t\t\t\tfloat vDist = ( abs ( 0.5 - f_TexCoord.y ) / 0.5 ) * f_Normal.y;\n\n\t\t\t\toutColor = vec4 ( 0.9, 0.9, 0.9, 0.0 );\n\n\t\t\t\toutColor.a += smoothstep ( f_Normal.x - 0.15, f_Normal.x - 0.14, hDist );\n\t\t\t\toutColor.a += smoothstep ( f_Normal.y - 0.15, f_Normal.y - 0.14, vDist );\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'goal',
						value: function goal() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\n\t\t\t',

												vertexBody: '\n\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tuniform vec4 solidColor;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\toutColor = solidColor;\n\n\t\t\t'

									});

									return material;
						}

						// Elecromagnetism elements

			}, {
						key: 'basicElecromagneticElement',
						value: function basicElecromagneticElement() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tattribute vec3 transforms;\n\t\t\t\tattribute vec3 scale;\n\t\t\t\tattribute vec3 rotation;\n\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tvarying vec2 f_TexCoord;\n\n\t\t\t\tmat4 scaleMatrix ( vec3 scale ) {\n\n\t\t\t\t\treturn mat4(scale.x, 0.0, 0.0, 0.0,\n\t\t\t\t                0.0, scale.y, 0.0, 0.0,\n\t\t\t\t                0.0, 0.0, scale.z, 0.0,\n\t\t\t\t                0.0, 0.0, 0.0, 1.0);\n\n\t\t\t\t}\n\n\t\t\t\tmat4 rotationMatrix(vec3 axis, float angle) {\n\n\t\t\t\t    axis = normalize(axis);\n\t\t\t\t    float s = sin(angle);\n\t\t\t\t    float c = cos(angle);\n\t\t\t\t    float oc = 1.0 - c;\n\t\t\t\t    \n\t\t\t\t    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,\n\t\t\t\t                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,\n\t\t\t\t                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,\n\t\t\t\t                0.0,                                0.0,                                0.0,                                1.0);\n\t\t\t\t}\n\n\t\t\t',

												vertexBody: '\n\n\t\t\t\toutPosition *= scaleMatrix ( scale );\n\t\t\t\t\n\t\t\t\toutPosition *= rotationMatrix ( vec3(0, 0, 1), rotation.z );\n\t\t\t\toutPosition *= rotationMatrix ( vec3(0, 1, 0), rotation.y );\n\t\t\t\toutPosition *= rotationMatrix ( vec3(1, 0, 0), rotation.x );\n\n\t\t\t\toutPosition.x += transforms.x;\n\t\t\t\toutPosition.y += transforms.y;\n\t\t\t\toutPosition.z += transforms.z;\n\n\t\t\t\tf_TexCoord = texCoord;\n\t\t\t\tf_Color = color;\n\n\t\t\t',

												vertexEnd: '\n\t\t\t',

												fragmentHeader: '\n\t\t\t\tvarying vec2 f_TexCoord;\n\t\t\t\tvarying vec4 f_Color;\n\t\t\t\tuniform sampler2D sampler; \n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec4 textureColor = texture2D( sampler, f_TexCoord);\n\t\t\t\toutColor = textureColor;\n\t\t\t\toutColor *= f_Color;\n\n\t\t\t'

									});

									return material;
						}
			}, {
						key: 'equidistantLines',
						value: function equidistantLines() {

									var material = new _Material.Material({ context: this._context, drawMode: this._context.TRIANGLES });

									material.createShader({

												vertexHeader: '\n\t\t\t\tvarying vec2 f_Uv;\n\t\t\t\tvarying vec3 f_Pos;\n\n\t\t\t',

												vertexBody: '\n\t\t\t\tf_Uv = texCoord;\n\n\t\t\t',

												vertexEnd: '\n\t\t\t\tf_Pos = outPosition.xyz;\n\n\t\t\t',
												fragmentExtensions: '\n\t\t\t\t// #extension GL_EXT_shader_texture_lod : enable\n\t\t\t\t#extension GL_OES_standard_derivatives : enable\n\n\t\t\t',

												fragmentHeader: '\n\n\t\t\t\tconst int MAX_CHARGES = 100;\n\t\t\t\tuniform vec2 screen;\n\t\t\t\tuniform float numCharges;\n\t\t\t\tuniform vec4 charges [ MAX_CHARGES ];\n\n\t\t\t\tvarying vec2 f_Uv;\n\t\t\t\tvarying vec3 f_Pos;\n\n\t\t\t',

												fragmentBody: '\n\t\t\t\tvec2 pos = vec2 ( f_Uv * screen );\n\t\t\t\tpos.x = screen.x - pos.x;\n\n\t\t\t\toutColor = vec4 ( 0.0, 0.0, 0.0, 1.0 );\n\n\t\t\t\tfor ( int i = 0; i < MAX_CHARGES; i ++ ) {\n\n\t\t\t\t\tif ( i >= int ( numCharges ) ) break;\n\n\t\t\t\t\tvec2 cPose = charges[ i ].xy;\n\t\t\t\t\tfloat cCharge = charges[ i ].w;\n\t\t\t\t\tfloat dist = length ( cPose - pos ) * 0.1 + 1.0;\n\n\t\t\t\t\tfloat eF = 1.0 / dist;\n\n\t\t\t\t\tfor ( int j = 0; j < 5; j ++ ) {\n\n\t\t\t\t\t\tfloat step = 1.0 / 5.0;\n\t\t\t\t\t\tfloat tF = step * float ( j );\n\t\t\t\t\t\tfloat dF = abs ( tF - eF );\n\n\t\t\t\t\t\t// if ( dF < 0.1 ) outColor += vec4 ( eF, eF, eF, 1.0 );\n\n\t\t\t\t\t}\n\n\t\t\t\t\toutColor += vec4 ( eF, eF, eF, 1.0 );\n\n\t\t\t\t}\n\n\t\t\t\tvec3 P = outColor.rgb;\n\t\t\t\tfloat gsize = 50.5;\n\t\t\t\tfloat gwidth = 1.5;\n\n\t\t\t\tvec3 f  = abs(fract (P * gsize)-0.5);\n\t\t\t\tvec3 df = fwidth(P * gsize);\n\t\t\t\tvec3 g = smoothstep(-gwidth*df,gwidth*df , f);\n\t\t\t\tfloat c = g.x * g.y * g.z; \n\t\t\t\toutColor = vec4(1.0 - c, 1.0 - c, 1.0 - c, 1.0);// * gl_Color;\n\n\t\t\t\t// vec3 f  = fract (outColor.rgb * 100.0);\n\t\t\t //    vec3 df = fwidth(outColor.rgb * 100.0);\n\n\t\t\t //    vec3 g = smoothstep(df * 2.0, df * 2.5, f);\n\n\t\t\t //    float c = g.x * g.y * g.z;\n\n\t\t\t //    outColor = vec4(1.0 - c, 1.0 - c, 1.0 - c, 1.0);\n\n\t\t\t\t// float t = 0.3;\n\t\t\t\t// float w = 0.001;\n\t\t\t\t// float d = abs ( outColor.r - t ); \n\n\t\t\t\t// float std = fwidth( outColor );\n\n\t\t\t\t// if ( std < 0.001 ) {\n\n\t\t\t\t// \toutColor.r = 0.0;\n\n\t\t\t\t// }\n\n\t\t\t'

									});

									return material;
						}
			}]);

			return MaterialHelper;
}(_WebGlElement2.WebGlElement);

},{"./Material":9,"./WebGlElement":24}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Mesh = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Transform2 = require("./Transform");

var _Material = require("./Material");

var _Geometry = require("./Geometry");

var _BufferAttribute = require("./BufferAttribute");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mesh = exports.Mesh = function (_Transform) {
		_inherits(Mesh, _Transform);

		function Mesh(_options) {
				_classCallCheck(this, Mesh);

				var _this = _possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this, _options));

				_this.geometry = _options.geometry;
				_this.material = _options.material;

				// Collider type ( Points, Triangles, BoundingSphere, BoundingBox );

				_this._colliderType = 'Triangles';

				return _this;
		}

		_createClass(Mesh, [{
				key: "clone",
				value: function clone() {

						var material = new _Material.Material({ context: this._context });
						material.shaderProgram = this._material.shaderProgram;
						material.imageUrl = this._material.imageUrl;
						material.uniforms = this._material.uniforms;
						material.transparent = this._material.transparent;
						material.drawMode = this._material.drawMode;
						material.depthTest = this._material.depthTest;
						material.zIndex = this._material.zIndex;

						var geometry = new _Geometry.Geometry({ context: this._context });
						if (this._geometry.bufferAttributes.position) geometry.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: this._context, name: 'position', data: new Float32Array(this._geometry.bufferAttributes.position.data) }));
						if (this._geometry.bufferAttributes.color) geometry.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: this._context, name: 'color', data: new Float32Array(this._geometry.bufferAttributes.color.data) }));
						if (this._geometry.bufferAttributes.texCoord) geometry.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: this._context, name: 'texCoord', data: new Float32Array(this._geometry.bufferAttributes.texCoord.data) }));
						if (this._geometry.bufferAttributes.normal) geometry.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: this._context, name: 'normal', data: new Float32Array(this._geometry.bufferAttributes.normal.data) }));
						if (this._geometry.bufferAttributes.index) geometry.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: this._context, name: 'index', data: new Uint16Array(this._geometry.bufferAttributes.index.data) }));

						var mesh = new Mesh({ context: this._context, name: this._name, geometry: geometry, material: material });

						mesh.position = vec3.clone(_get(Mesh.prototype.__proto__ || Object.getPrototypeOf(Mesh.prototype), "position", this));
						mesh.rotation = vec3.clone(_get(Mesh.prototype.__proto__ || Object.getPrototypeOf(Mesh.prototype), "rotation", this));
						mesh.scale = vec3.clone(_get(Mesh.prototype.__proto__ || Object.getPrototypeOf(Mesh.prototype), "scale", this));

						return mesh;
				}
		}, {
				key: "draw",
				value: function draw() {

						this._geometry.bind();

						if (this._geometry.bufferAttributes.index) {

								this._geometry.drawElements(this._material.drawMode, this._geometry.bufferAttributes.index.data.length, 0);
						} else {

								this._geometry.drawArrays(this._material.drawMode, 0, this._geometry.bufferAttributes.position.data.length / 3);
						}
				}
		}, {
				key: "drawElements",
				value: function drawElements(_drawMode, _numIndices, _offsetIndices) {

						this._geometry.bind();
						this._geometry.drawElements(_drawMode, _numIndices, _offsetIndices);
				}
		}, {
				key: "drawArrays",
				value: function drawArrays(_drawMode, _offsetVertices, _numVertices) {

						this._geometry.bind();
						this._geometry.drawArrays(_drawMode, _offsetVertices, _numVertices);
				}
		}, {
				key: "geometry",
				set: function set(_geometry) {

						this._geometry = _geometry;
				},
				get: function get() {

						return this._geometry;
				}
		}, {
				key: "colliderType",
				set: function set(_colliderType) {

						this._colliderType = _colliderType;
				},
				get: function get() {

						return this._colliderType;
				}
		}, {
				key: "material",
				set: function set(_material) {

						if (!_material) return;
						if (_material.type != 'Material') {

								console.error(this.type + ' ERROR: not a material! ');
								return;
						}

						this._material = _material;
				},
				get: function get() {

						return this._material;
				}
		}, {
				key: "modelMatrix",
				get: function get() {

						var modelMatrix = mat4.create();
						mat4.translate(modelMatrix, modelMatrix, this.position);
						mat4.rotateX(modelMatrix, modelMatrix, this.rotation[0]);
						mat4.rotateY(modelMatrix, modelMatrix, this.rotation[1]);
						mat4.rotateZ(modelMatrix, modelMatrix, this.rotation[2]);
						mat4.scale(modelMatrix, modelMatrix, this.scale);

						return modelMatrix;
				}
		}, {
				key: "inverseModelMatrix",
				get: function get() {

						var modelMatrix = mat4.create();
						mat4.translate(modelMatrix, modelMatrix, this.position);
						mat4.rotateX(modelMatrix, modelMatrix, this.rotation[0]);
						mat4.rotateY(modelMatrix, modelMatrix, this.rotation[1]);
						mat4.rotateZ(modelMatrix, modelMatrix, this.rotation[2]);
						mat4.scale(modelMatrix, modelMatrix, this.scale);
						mat4.invert(modelMatrix, modelMatrix);

						return modelMatrix;
				}
		}]);

		return Mesh;
}(_Transform2.Transform);

},{"./BufferAttribute":3,"./Geometry":6,"./Material":9,"./Transform":23}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.OrthoCamera = undefined;

var _Camera2 = require("./Camera");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrthoCamera = exports.OrthoCamera = function (_Camera) {
		_inherits(OrthoCamera, _Camera);

		function OrthoCamera(_options) {
				_classCallCheck(this, OrthoCamera);

				// Override the type defined in the WebGlElement.

				var _this = _possibleConstructorReturn(this, (OrthoCamera.__proto__ || Object.getPrototypeOf(OrthoCamera)).call(this, _options));

				_this._type = 'Camera';

				_this.width = _options.width || _options.context.renderer.realWidth;
				_this.height = _options.height || _options.context.renderer.realHeight;
				_this.nearClipPlane = _options.nearClipPlane || -400;
				_this.farClipPlane = _options.farClipPlane || 400;

				mat4.lookAt(_this._vMatrix, [0, 0, -10], [0, 0, 0], [0, 1, 0]);
				mat4.ortho(_this._pMatrix, 0, -_this.width, _this.height, 0, _this.nearClipPlane, _this.farClipPlane);

				return _this;
		}

		return OrthoCamera;
}(_Camera2.Camera);

},{"./Camera":4}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.P3D = undefined;

var _utils = require('./utils');

var _WebGlRenderer = require('./WebGlRenderer');

var _OrthoCamera = require('./OrthoCamera');

var _PerspectiveCamera = require('./PerspectiveCamera');

var _Transform = require('./Transform');

var _Buffer = require('./Buffer');

var _BufferAttribute = require('./BufferAttribute');

var _Geometry = require('./Geometry');

var _Mesh = require('./Mesh');

var _Axis = require('./Axis');

var _Texture = require('./Texture');

var _Primitives = require('./Primitives');

var _Material = require('./Material');

var _Scene = require('./Scene');

var _Fbo = require('./Fbo');

var _Shader = require('./Shader');

var _ShaderProgram = require('./ShaderProgram');

var _Raycast = require('./Raycast');

var _MaterialHelper = require('./MaterialHelper');

var _Text = require('./Text');

var _GlyphAtlas = require('./GlyphAtlas');

var _SdfGlyphAtlas = require('./SdfGlyphAtlas');

var _Image = require('./Image');

var fs = require('fs');
var objParser = require('geom-parse-obj');

var P3D = {

		WebGlRenderer: _WebGlRenderer.WebGlRenderer,
		OrthoCamera: _OrthoCamera.OrthoCamera,
		PerspectiveCamera: _PerspectiveCamera.PerspectiveCamera,
		Transform: _Transform.Transform,
		BufferAttribute: _BufferAttribute.BufferAttribute,
		Buffer: _Buffer.Buffer,
		Geometry: _Geometry.Geometry,
		Mesh: _Mesh.Mesh,
		Axis: _Axis.Axis,
		Texture: _Texture.Texture,
		Image: _Image.Image,
		Quad: _Primitives.Quad,
		Cube: _Primitives.Cube,
		Circle: _Primitives.Circle,
		Material: _Material.Material,
		Scene: _Scene.Scene,
		Fbo: _Fbo.Fbo,
		Shader: _Shader.Shader,
		ShaderProgram: _ShaderProgram.ShaderProgram,
		Raycast: _Raycast.Raycast,
		LoadObj: function LoadObj(_url, _callback) {

				(0, _utils.ajax)(_url, function (error, response) {

						var obj = objParser(response.responseText);

						_callback({

								positions: [].concat.apply([], obj.positions),
								indices: [].concat.apply([], obj.cells),
								uvs: [].concat.apply([], obj.uvs),
								normals: [].concat.apply([], obj.normals)

						});
				});
		},
		CreateMeshFromObj: function CreateMeshFromObj(_context, _obj) {

				if (!_context) {

						console.error('CreateMeshFromObj ERROR: context not defined!');
						return;
				}

				var g = new _Geometry.Geometry({ context: _context });
				if (_obj.positions.length > 0) g.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: _context, name: 'position', data: new Float32Array(_obj.positions) }));
				if (_obj.uvs.length > 0) g.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: _context, name: 'texCoord', data: new Float32Array(_obj.uvs) }));
				if (_obj.normals.length > 0) g.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: _context, name: 'normal', data: new Float32Array(_obj.normals) }));
				if (_obj.indices.length > 0) g.addBufferAttribute(new _BufferAttribute.BufferAttribute({ context: _context, name: 'index', data: new Uint16Array(_obj.indices) }));
				var m = new _Mesh.Mesh({ context: _context, geometry: g, material: null });
				return m;
		},
		ObjParser: objParser,
		MaterialHelper: _MaterialHelper.MaterialHelper,
		Text: _Text.Text,
		GlyphAtlas: _GlyphAtlas.GlyphAtlas,
		SdfGlyphAtlas: _SdfGlyphAtlas.SdfGlyphAtlas

};

exports.P3D = P3D;

},{"./Axis":1,"./Buffer":2,"./BufferAttribute":3,"./Fbo":5,"./Geometry":6,"./GlyphAtlas":7,"./Image":8,"./Material":9,"./MaterialHelper":10,"./Mesh":11,"./OrthoCamera":12,"./PerspectiveCamera":14,"./Primitives":15,"./Raycast":16,"./Scene":17,"./SdfGlyphAtlas":18,"./Shader":19,"./ShaderProgram":20,"./Text":21,"./Texture":22,"./Transform":23,"./WebGlRenderer":25,"./utils":41,"fs":42,"geom-parse-obj":28}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PerspectiveCamera = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Camera2 = require("./Camera");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PerspectiveCamera = exports.PerspectiveCamera = function (_Camera) {
	_inherits(PerspectiveCamera, _Camera);

	function PerspectiveCamera(_options) {
		_classCallCheck(this, PerspectiveCamera);

		// Override the type defined in the WebGlElement.

		var _this = _possibleConstructorReturn(this, (PerspectiveCamera.__proto__ || Object.getPrototypeOf(PerspectiveCamera)).call(this, _options));

		_this._type = 'Camera';

		_this.fov = _options.fov || 45;
		_this.displayRatio = _options.displayRatio || _options.context.renderer.realWidth / _options.context.renderer.realHeight;
		_this.nearClipPlane = _options.nearClipPlane || 0.1;
		_this.farClipPlane = _options.farClipPlane || 1000;

		mat4.perspective(_this._pMatrix, glMatrix.toRadian(_this._fov), _this._displayRatio, _this._nearClipPlane, _this._farClipPlane);
		mat4.lookAt(_this._vMatrix, [0, 0, 0], [0, 0, 0], [0, 1, 0]);

		return _this;
	}

	_createClass(PerspectiveCamera, [{
		key: "fov",
		set: function set(_fov) {

			this._fov = _fov;
		},
		get: function get() {

			return this._fov;
		}
	}, {
		key: "displayRatio",
		set: function set(_displayRatio) {

			this._displayRatio = _displayRatio;
		},
		get: function get() {

			return this._displayRatio;
		}
	}]);

	return PerspectiveCamera;
}(_Camera2.Camera);

},{"./Camera":4}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Quad = Quad;
exports.Cube = Cube;
exports.Circle = Circle;
function Quad(_position, _scale) {

		var x = _position[0] || 0.0;
		var y = _position[1] || 0.0;
		var z = _position[2] || 0.0;

		var vertices = [-0.5, 0.5, 0.0, // 0
		0.5, 0.5, 0.0, // 1
		0.5, -0.5, 0.0, // 2
		-0.5, -0.5, 0.0];

		// Transform

		var identityMatrix = new Float32Array(16);
		mat4.identity(identityMatrix);
		var scaleMatrix = new Float32Array(16);
		mat4.identity(scaleMatrix);
		var translateMatrix = new Float32Array(16);
		mat4.identity(translateMatrix);

		// Resize

		mat4.scale(scaleMatrix, identityMatrix, _scale);
		mat4.translate(translateMatrix, identityMatrix, _position);

		// Update all vertices

		for (var i = 0; i < vertices.length; i += 3) {

				var vertex = [vertices[i + 0], vertices[i + 1], vertices[i + 2]];
				vec3.transformMat4(vertex, vertex, scaleMatrix);
				vec3.transformMat4(vertex, vertex, translateMatrix);

				vertices[i + 0] = vertex[0];
				vertices[i + 1] = vertex[1];
				vertices[i + 2] = vertex[2];
		}

		var uvs = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

		// Triangles indices.

		var indices = [0, 1, 2, 0, 2, 3];

		// Wireframe indices.

		var wIndices = [0, 2, 0, 1, 1, 2, 2, 3, 3, 0];

		// Contour indices.

		var cIndices = [0, 1, 1, 2, 2, 3, 3, 0];

		return {

				vertices: vertices,
				positions: vertices,
				uvs: uvs,
				indices: indices,
				wIndices: wIndices,
				cIndices: cIndices,
				normals: []

		};
}

function Cube(_position, _scale) {

		var vertices = [

		// Front

		-0.5, 0.5, 0.5, // 0
		0.5, 0.5, 0.5, // 1
		0.5, -0.5, 0.5, // 2
		-0.5, -0.5, 0.5, // 3

		// Back

		0.5, 0.5, -0.5, // 4
		-0.5, 0.5, -0.5, // 5
		-0.5, -0.5, -0.5, // 6
		0.5, -0.5, -0.5, // 7

		// Top

		-0.5, 0.5, -0.5, // 8
		0.5, 0.5, -0.5, // 9
		0.5, 0.5, 0.5, // 10
		-0.5, 0.5, 0.5, // 11

		// Bottom

		-0.5, -0.5, 0.5, // 12
		0.5, -0.5, 0.5, // 13
		0.5, -0.5, -0.5, // 14
		-0.5, -0.5, -0.5, // 15

		// Right

		0.5, 0.5, 0.5, // 16
		0.5, 0.5, -0.5, // 17
		0.5, -0.5, -0.5, // 18
		0.5, -0.5, 0.5, // 19

		// Left

		-0.5, 0.5, -0.5, // 20
		-0.5, 0.5, 0.5, // 21
		-0.5, -0.5, 0.5, // 22
		-0.5, -0.5, -0.5];

		// Transform

		var identityMatrix = new Float32Array(16);
		mat4.identity(identityMatrix);
		var scaleMatrix = new Float32Array(16);
		mat4.identity(scaleMatrix);
		var translateMatrix = new Float32Array(16);
		mat4.identity(translateMatrix);

		// Resize

		mat4.scale(scaleMatrix, identityMatrix, _scale);
		mat4.translate(translateMatrix, identityMatrix, _position);

		// Update all vertices

		for (var i = 0; i < vertices.length; i += 3) {

				var vertex = [vertices[i + 0], vertices[i + 1], vertices[i + 2]];
				vec3.transformMat4(vertex, vertex, scaleMatrix);
				vec3.transformMat4(vertex, vertex, translateMatrix);

				vertices[i + 0] = vertex[0];
				vertices[i + 1] = vertex[1];
				vertices[i + 2] = vertex[2];
		}

		var uvs = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];

		var indices = [

		// Front

		0, 1, 2, 0, 2, 3,

		// Back

		4, 5, 6, 4, 6, 7,

		// Top

		8, 9, 10, 8, 10, 11,

		// Bottom

		12, 13, 14, 12, 14, 15,

		// Right

		16, 17, 18, 16, 18, 19,

		// Left

		20, 21, 22, 20, 22, 23];

		var wIndices = [

		// Front

		0, 2, 0, 1, 1, 2, 2, 3, 3, 0,

		// Back

		4, 6, 4, 5, 5, 6, 6, 7, 7, 4,

		// Top

		8, 10, 8, 9, 9, 10, 10, 11, 11, 8,

		// Bottom

		12, 14, 12, 13, 13, 14, 14, 15, 15, 12,

		// Right

		16, 18, 16, 17, 17, 18, 18, 19, 19, 16,

		// Left

		20, 22, 20, 21, 21, 22, 22, 23, 23, 20];

		var cIndices = [

		// Front

		0, 1, 1, 2, 2, 3, 3, 0,

		// Back

		4, 5, 5, 6, 6, 7, 7, 4,

		// Top

		8, 9, 9, 10, 10, 11, 11, 8,

		// Bottom

		12, 13, 13, 14, 14, 15, 15, 12,

		// Right

		16, 17, 17, 18, 18, 19, 19, 16,

		// Left

		20, 21, 21, 22, 22, 23, 23, 20];

		return {

				vertices: vertices,
				uvs: uvs,
				indices: indices,
				wIndices: wIndices,
				cIndices: cIndices

		};
}

function Circle(_position, _radius, _subdivisions) {

		var vertices = [];
		var indices = [];
		var cIndices = [];
		var normals = [];
		var uvs = [];

		var step = Math.PI * 2 / _subdivisions;

		// Set vertices
		// First set middle

		vertices.push(_position[0]);
		vertices.push(_position[1]);
		vertices.push(_position[2]);

		uvs.push(0.5);
		uvs.push(0.5);

		for (var i = 0; i < _subdivisions; i++) {

				var x = _position[0] + Math.cos(step * i) * _radius;
				var y = _position[1] + Math.sin(step * i) * _radius;
				var z = _position[2];

				vertices.push(x);
				vertices.push(y);
				vertices.push(z);

				// Set uvs

				uvs.push((Math.cos(step * i) + 1) * 0.5);
				uvs.push(1 - (Math.sin(step * i) + 1) * 0.5);
		}

		for (var _i = 1; _i < vertices.length / 3 - 1; _i++) {

				cIndices.push(_i);
				cIndices.push(_i + 1);

				indices.push(0);
				indices.push(_i);
				indices.push(_i + 1);

				if (_i == vertices.length / 3 - 2) {

						cIndices.push(vertices.length / 3 - 1);
						cIndices.push(1);

						indices.push(0);
						indices.push(1);
						indices.push(vertices.length / 3 - 1);
				}
		}

		return {

				vertices: vertices,
				positions: vertices,
				normals: normals,
				indices: indices,
				cIndices: cIndices,
				uvs: uvs

		};
}

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Raycast = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require('./WebGlElement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var intersect = require('ray-sphere-intersection');
var triangleIntersect = require('ray-triangle-intersection');
var planeIntersect = require('ray-plane-intersection');

var Raycast = exports.Raycast = function (_WebGlElement) {
		_inherits(Raycast, _WebGlElement);

		function Raycast(_options) {
				_classCallCheck(this, Raycast);

				var _this = _possibleConstructorReturn(this, (Raycast.__proto__ || Object.getPrototypeOf(Raycast)).call(this, _options));

				_this._camera = null;
				_this._origin = vec3.create();
				_this._dir = vec3.create();
				_this._point = vec3.create();
				_this.length = 10;

				_this._matrixStack = [];

				return _this;
		}

		_createClass(Raycast, [{
				key: 'setFromCamera',
				value: function setFromCamera(_camera, _mouse) {

						this._camera = _camera;

						// Transform the mouse coordinates in normalized coordinates.

						var ray_clip = vec4.create();

						ray_clip[0] = _mouse[0] / (this.context.renderer.width * window.devicePixelRatio * this.context.renderer.resolution) * 2.0 - 1.0;
						ray_clip[1] = 1.0 - _mouse[1] / (this.context.renderer.height * window.devicePixelRatio * this.context.renderer.resolution) * 2.0;
						ray_clip[2] = -1.0;
						ray_clip[3] = 1.0;

						// alert ( ray_clip[ 0 ] + ' ' + ray_clip[ 1 ] );

						var ray_eye = vec4.create();

						// Get the inverted projection matrix.

						var inverseProjectionMatrix = mat4.create();
						mat4.invert(inverseProjectionMatrix, _camera.pMatrix);

						vec4.transformMat4(ray_eye, ray_clip, inverseProjectionMatrix);
						ray_eye[2] = -1.0;
						ray_eye[3] = 0.0;

						var temp_ray_wor = vec4.create();

						// Get the inverted view matrix.

						var inverseViewMatrix = mat4.create();
						mat4.invert(inverseViewMatrix, _camera.vMatrix);

						vec4.transformMat4(temp_ray_wor, ray_eye, inverseViewMatrix);

						var ray_wor = vec3.fromValues(temp_ray_wor[0], temp_ray_wor[1], temp_ray_wor[2]);
						vec3.normalize(ray_wor, ray_wor);

						this._dir = vec3.clone(ray_wor);
						this._origin = vec3.clone(_camera.position);

						// this._ray.origin = this._origin;
						// this._ray.direction = this._dir;

						vec3.multiply(ray_wor, ray_wor, vec3.fromValues(this.length, this.length, this.length));

						var point = vec3.create();
						vec3.add(point, _camera.position, ray_wor);

						this._point = vec3.clone(point);
				}
		}, {
				key: 'intersections',
				value: function intersections(_options) {

						var cType = _mesh.colliderType;

						var intersections = [];

						switch (cType) {

								case 'Points':

										for (var i = 0; i < _mesh.geometry.bufferAttributes.position.data.length; i += 3) {

												var matrix = mat4.create();

												var out = {};
												var v = vec3.fromValues(_mesh.geometry.bufferAttributes.position.data[i + 0], _mesh.geometry.bufferAttributes.position.data[i + 1], _mesh.geometry.bufferAttributes.position.data[i + 2]);

												// Intersect is a function defined in the ray-sphere-intersection module.
												// See https://www.npmjs.com/package/ray-3d

												var size = 0.1;

												if (_mesh.geometry.bufferAttributes.normal.data.length > 0) {

														size = _mesh.geometry.bufferAttributes.normal.data[i] * 0.0037;
												}

												intersect(out, this._origin, this._dir, v, size);

												if (out['0']) {

														intersections.push({

																index: i / 3,
																vertex: v

														});
												}
										}

										break;

								case 'Triangles':

										// let triangles = [];

										// for ( let i = 0; i < _mesh.geometry.bufferAttributes.index.data.length; i += 3 ) {

										// 	let out = {};

										// 	let i0 = _mesh.geometry.bufferAttributes.index.data[ i + 0 ] * 3;
										// 	let i1 = _mesh.geometry.bufferAttributes.index.data[ i + 1 ] * 3;
										// 	let i2 = _mesh.geometry.bufferAttributes.index.data[ i + 2 ] * 3;

										// 	let v0 = [ _mesh.geometry.bufferAttributes.position.data[ i0 + 0 ], _mesh.geometry.bufferAttributes.position.data[ i0 + 1 ], _mesh.geometry.bufferAttributes.position.data[ i0 + 2 ] ];
										// 	let v1 = [ _mesh.geometry.bufferAttributes.position.data[ i1 + 0 ], _mesh.geometry.bufferAttributes.position.data[ i1 + 1 ], _mesh.geometry.bufferAttributes.position.data[ i1 + 2 ] ];
										// 	let v2 = [ _mesh.geometry.bufferAttributes.position.data[ i2 + 0 ], _mesh.geometry.bufferAttributes.position.data[ i2 + 1 ], _mesh.geometry.bufferAttributes.position.data[ i2 + 2 ] ];

										// 	let face = [ v0, v1, v2 ];

										// 	triangleIntersect ( out, this._origin, this._dir, face );

										// 	if ( out ) {

										// 		// intersections.push ( {

										// 		// 	point: vec3.fromValues ( out[ '0' ][ '0' ], out[ '0' ][ '1' ], out[ '0' ][ '2' ] ),

										// 		// } );

										// 		break;

										// 	}

										// }

										break;

								case 'BoundingSphere':

										break;

								case 'BoundingBox':

										break;

								case 'CustomSphere':

										if (!_numShapes) {

												console.error('_numShapes not defined');
												return;
										}

										var numIndexPerShape = _mesh.geometry.bufferAttributes.index.data.length / _numShapes;

										// if ( !Number.isInteger ( numIndexPerShape / 3 ) ) {

										// 	console.error('not integer');
										// 	return;

										// }

										// alert ( 'sdflkjl' );


										for (var _i = _mesh.geometry.bufferAttributes.index.data.length - numIndexPerShape; _i >= 0; _i -= numIndexPerShape) {

												var _out = {};

												var indexCenter = _mesh.geometry.bufferAttributes.index.data[_i] * 3;
												var positions = _mesh.geometry.bufferAttributes.position.data;
												var _center = vec3.fromValues(positions[indexCenter + 0], positions[indexCenter + 1], positions[indexCenter + 2]);
												var border = vec3.fromValues(positions[indexCenter + 3], positions[indexCenter + 4], positions[indexCenter + 5]);

												vec3.transformMat4(_center, _center, _mesh.modelMatrix);
												vec3.transformMat4(border, border, _mesh.modelMatrix);

												var radius = vec3.create();
												radius = vec3.subtract(radius, _center, border);
												radius = vec3.length(radius);

												var inRadius = radius * Math.cos(Math.PI / 4);

												intersect(_out, this._origin, this._dir, _center, inRadius);

												if (Object.keys(_out).length > 0) {

														var distance = vec3.create();
														vec3.subtract(distance, _center, this._origin);
														distance = vec3.length(distance);

														intersections.push({

																index: _i / numIndexPerShape,
																distance: distance,
																center: _center,
																point: vec3.fromValues(_out['0'], _out['1'], _out['0'])

														});

														break;
												}
										}

										var center = vec3.fromValues(_mesh.geometry.bufferAttributes.position.data[0], _mesh.geometry.bufferAttributes.position.data[1], _mesh.geometry.bufferAttributes.position.data[2]);

										break;

						}

						// intersections.sort ( function ( a, b ) {

						// 	return a.distance - b.distance;

						// } );

						return intersections;
				}
		}, {
				key: 'planeIntersection',
				value: function planeIntersection(_normal, _distance) {

						var intersection = null;
						var out = {};

						planeIntersect(out, this._origin, this._dir, _normal, _distance);

						return vec3.fromValues(out['0'], out['1'], out['2']);
				}
		}, {
				key: 'getPointFromCamera',
				value: function getPointFromCamera(_camera, _point, distance) {

						this.setFromCamera(_camera, _point);
						return this.planeIntersection(vec3.fromValues(0, 0, -1), distance || 0);
				}
		}, {
				key: 'getPointinScreenSpace',
				value: function getPointinScreenSpace(_point) {}
		}, {
				key: 'pushMatrix',
				value: function pushMatrix() {}
		}, {
				key: 'popMatrix',
				value: function popMatrix() {}
		}, {
				key: 'renderer',
				set: function set(_renderer) {

						this._renderer = _renderer;
				},
				get: function get() {

						return this._renderer;
				}
		}, {
				key: 'camera',
				set: function set(_camera) {

						this._camera = _camera;
				},
				get: function get() {

						return this._camera;
				}
		}, {
				key: 'length',
				set: function set(_length) {

						this._length = _length;
				},
				get: function get() {

						return this._length;
				}
		}, {
				key: 'point',
				get: function get() {

						return this._point;
				}
		}]);

		return Raycast;
}(_WebGlElement2.WebGlElement);

},{"./WebGlElement":24,"ray-plane-intersection":37,"ray-sphere-intersection":38,"ray-triangle-intersection":39}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Scene = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ShaderProgram = require("./ShaderProgram");

var _Texture = require("./Texture");

var _WebGlElement2 = require("./WebGlElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene = exports.Scene = function (_WebGlElement) {
		_inherits(Scene, _WebGlElement);

		function Scene(_options) {
				_classCallCheck(this, Scene);

				// This will stor the current state of the model view matrix.

				var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, _options));

				_this._matrixStack = [];

				_this._currentCamera = null;
				_this._mvMatrix = mat4.create();

				// Childs list

				_this._childs = [];
				_this._childsByName = {};
				_this._childsById = {};

				// Elements to render.

				_this._opaqueObjects = [];
				_this._transparentObjects = [];

				// Time to pass it as uniform

				_this._lastTime = new Date().getTime();
				_this._elapsedTime = 0;

				return _this;
		}

		_createClass(Scene, [{
				key: "getChilds",
				value: function getChilds() {

						return this._childs;
				}
		}, {
				key: "getChildByName",
				value: function getChildByName(_name) {

						return this._childsByName[_name];
				}
		}, {
				key: "getChildById",
				value: function getChildById(_id) {

						return this._childsById[_id];
				}
		}, {
				key: "add",
				value: function add(_object) {

						this._childs.push(_object);
						this._childsByName[_object.name] = _object;
						this._childsById[_object.id] = _object;

						if (_object.type == 'Mesh') {

								// Check whether the mesh has a transparency or not.
								// If yes store it in another array that will be drawn last.
								// For more info about this check https://www.khronos.org/opengl/wiki/Transparency_Sorting
								// Load the material before adding the object to the rendering pipeline.

								if (_object.material.transparent) {

										// Sort objects by zIndex.

										this._transparentObjects.push(_object);

										this._transparentObjects.sort(function (a, b) {

												return a.material.zIndex - b.material.zIndex;
										});
								} else {

										// Sort objects by zIndex.

										this._opaqueObjects.push(_object);

										this._opaqueObjects.sort(function (a, b) {

												return a.material.zIndex - b.material.zIndex;
										});
								}
						}
				}
		}, {
				key: "render",
				value: function render(_camera) {

						this._elapsedTime += (new Date().getTime() - this._lastTime) / 1000;
						this._lastTime = new Date().getTime();

						// Render first opaque objects.

						for (var i = 0; i < this._opaqueObjects.length; i++) {

								if (this._opaqueObjects[i].active) {

										this.renderObject(this._opaqueObjects[i], _camera);
								}
						}

						// Then transparent ones.

						for (var _i = 0; _i < this._transparentObjects.length; _i++) {

								if (this._transparentObjects[_i].active) {

										this.renderObject(this._transparentObjects[_i], _camera);
								}
						}
				}
		}, {
				key: "renderObject",
				value: function renderObject(_object, _camera) {

						// Check if a valid camera is passed as an argument.

						if (!_camera || _camera.type != 'Camera') {

								throw 'Scene ERROR: You must pass a valid camera object as a parameter';
								return;
						}

						//
						// Check if the material attached to the mesh is ready for rendering ( shader loaded, texture loaded, etc... ).
						// If not, do nothing.
						//

						if (!_object.material.ready) return;

						//
						// Update first the camera matrix ( view matrix ).
						//

						_camera.update();

						//
						// Reset the model to view matrix.
						//

						mat4.identity(this._mvMatrix);
						mat4.multiply(this._mvMatrix, this._mvMatrix, _camera.vMatrix);

						this.pushMatrix();

						//
						// Update the model view matrix according to the object model matrix.
						//

						mat4.multiply(this._mvMatrix, this._mvMatrix, _object.modelMatrix);

						// If the mesh should look at something recompute the model view matrix.

						if (_object.lookAtPoint) {

								// mat4.lookAt( this._mvMatrix, vec3.create(), vec3.fromValues( 0, 0, 0 ), [0, 1, 0] );

								// Reset look at point for the next frame.

								_object.lookAtPoint = null;
						}

						// Bind the material to upload some uniforms.

						_object.material.bind();

						var mvMatrixUniformLocation = this._context.getUniformLocation(_object.material.shaderProgram.program, 'mv_Matrix');
						this._context.uniformMatrix4fv(mvMatrixUniformLocation, this._context.FALSE, this._mvMatrix);

						var pMatrixUniformLocation = this._context.getUniformLocation(_object.material.shaderProgram.program, 'p_Matrix');
						this._context.uniformMatrix4fv(pMatrixUniformLocation, this._context.FALSE, _camera.pMatrix);

						if (_object.material.uniforms) {

								for (var uniform in _object.material.uniforms) {

										var uniformLocation = this._context.getUniformLocation(_object.material.shaderProgram.program, uniform);

										if (!_object.material.uniforms[uniform].type) {

												console.error(this.constructor.name + ' ERROR: the uniform: ' + uniform + ' has no type defined!');
										} else {

												switch (_object.material.uniforms[uniform].type) {

														case 'float array':

																this._context.uniform1fv(uniformLocation, _object.material.uniforms[uniform].data);

																break;

														case 'float':

																this._context.uniform1f(uniformLocation, _object.material.uniforms[uniform].data);

																break;

														case 'int array':

																this._context.uniform1iv(uniformLocation, _object.material.uniforms[uniform].data);

																break;

														case 'int':

																this._context.uniform1i(uniformLocation, _object.material.uniforms[uniform].data);

																break;

														case 'vec2':

																this._context.uniform2fv(uniformLocation, _object.material.uniforms[uniform].data);

																break;

														case 'vec3':

																this._context.uniform3fv(uniformLocation, _object.material.uniforms[uniform].data);

																break;

														case 'vec4':

																this._context.uniform4fv(uniformLocation, _object.material.uniforms[uniform].data);

																break;

												}
										}
								}
						}

						//
						// Main uniforms present in all shaders.
						//

						var timsUniformLocation = this._context.getUniformLocation(_object.material.shaderProgram.program, 'time');
						this._context.uniform1f(timsUniformLocation, this._context.elapsedTime); // Time

						var resolutionUniformLocation = this._context.getUniformLocation(_object.material.shaderProgram.program, 'resolution');
						this._context.uniform2fv(resolutionUniformLocation, vec2.fromValues(window.innerWidth, window.innerHeight)); // Resolution

						//
						// Check if the material enables the debth test.
						//

						if (_object.material.depthTest) {

								this._context.enable(this._context.DEPTH_TEST);
						} else {

								this._context.disable(this._context.DEPTH_TEST);
						}

						//
						// Blending mode
						//

						if (_object.material.enableBlending) {

								this._context.enable(this._context.BLEND);
						} else {

								this._context.disable(this._context.BLEND);
						}

						this._context.blendFunc(_object.material.sourceBlendingMode, _object.material.destinationBlendingMode);

						//
						// Check if there are vertices to render.
						// If no vertices exists then don't draw.
						//

						if (_object.geometry.bufferAttributes.position.data.length != 0) {

								_object.draw();
						}

						// _object.material.unbind ();

						this.popMatrix();
				}
		}, {
				key: "pushMatrix",
				value: function pushMatrix() {

						if (this._matrixStack.length > 20) {

								throw 'Scene ERROR: Invalid pushMatrix - Call "popMatrix" after "pushMatrix".';
						}

						var copy = mat4.create();
						mat4.copy(copy, this._mvMatrix);

						this._matrixStack.push(copy);
				}
		}, {
				key: "popMatrix",
				value: function popMatrix() {

						if (this._matrixStack.length == 0) {

								throw 'Scene ERROR: Invalid popMatrix - Matrix stack is empty.';
						}

						this._mvMatrix = this._matrixStack.pop();
				}
		}]);

		return Scene;
}(_WebGlElement2.WebGlElement);

},{"./ShaderProgram":20,"./Texture":22,"./WebGlElement":24}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SdfGlyphAtlas = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SdfAtlas = require('font-atlas-sdf');

var SdfGlyphAtlas = exports.SdfGlyphAtlas = function (_WebGlElement) {
	_inherits(SdfGlyphAtlas, _WebGlElement);

	function SdfGlyphAtlas(_options) {
		_classCallCheck(this, SdfGlyphAtlas);

		var _this = _possibleConstructorReturn(this, (SdfGlyphAtlas.__proto__ || Object.getPrototypeOf(SdfGlyphAtlas)).call(this, _options));

		_this._atlas = new SdfAtlas(_options);
		_this._textureContext = _this._atlas.context;

		return _this;
	}

	_createClass(SdfGlyphAtlas, [{
		key: "canvas",
		get: function get() {

			return this._atlas.canvas;
		}
	}, {
		key: "elements",
		get: function get() {

			return this._atlas.elements;
		}
	}]);

	return SdfGlyphAtlas;
}(_WebGlElement2.WebGlElement);

},{"./WebGlElement":24,"font-atlas-sdf":26}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Shader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require('./WebGlElement');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shader = exports.Shader = function (_WebGlElement) {
		_inherits(Shader, _WebGlElement);

		function Shader(_options) {
				_classCallCheck(this, Shader);

				var _this = _possibleConstructorReturn(this, (Shader.__proto__ || Object.getPrototypeOf(Shader)).call(this, _options));

				if (!_options || !_options.shaderType) {

						console.error(_this.type + ' ERROR: a shader type must be defined! ');
						return _possibleConstructorReturn(_this);
				}

				// Main components

				_this._shader = _this._context.createShader(_options.shaderType);

				_this.text = _options.text;

				return _this;
		}

		_createClass(Shader, [{
				key: 'shader',
				get: function get() {

						return this._shader;
				}
		}, {
				key: 'text',
				set: function set(_text) {

						if (!_text) return;

						this._text = _text;

						this._context.shaderSource(this._shader, _text);
						this._context.compileShader(this._shader);

						//Check for errors

						if (!this._context.getShaderParameter(this._shader, this._context.COMPILE_STATUS)) {

								console.error('ERROR compiling vertex shader!', this._context.getShaderInfoLog(this._shader));

								//Log the error line

								console.error('LINE: ' + this._context.getShaderInfoLog(this._shader).split(':')[2] + _text.split('\n')[this._context.getShaderInfoLog(this._shader).split(':')[2] - 1]);
								return;
						}
				},
				get: function get() {

						return this._text;
				}
		}]);

		return Shader;
}(_WebGlElement2.WebGlElement);

},{"./WebGlElement":24}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.ShaderProgram = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _WebGlElement2 = require("./WebGlElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShaderProgram = exports.ShaderProgram = function (_WebGlElement) {
		_inherits(ShaderProgram, _WebGlElement);

		function ShaderProgram(_options) {
				_classCallCheck(this, ShaderProgram);

				// Main components.

				var _this = _possibleConstructorReturn(this, (ShaderProgram.__proto__ || Object.getPrototypeOf(ShaderProgram)).call(this, _options));

				_this._program = null;

				_this.vertexShader = _options.vertexShader;
				_this.fragmentShader = _options.fragmentShader;

				return _this;
		}

		_createClass(ShaderProgram, [{
				key: "link",
				value: function link(_vertexShader, _fragmentShader) {

						this._program = this._context.createProgram();

						//Assign default attributes locations

						this._context.bindAttribLocation(this._program, 0, 'position');
						this._context.bindAttribLocation(this._program, 1, 'texCoord');
						this._context.bindAttribLocation(this._program, 2, 'normal');
						this._context.bindAttribLocation(this._program, 3, 'color');
						this._context.bindAttribLocation(this._program, 4, 'customAttribute');

						// Link program

						this._context.attachShader(this._program, _vertexShader);
						this._context.attachShader(this._program, _fragmentShader);
						this._context.linkProgram(this._program);

						//Check for linking errors

						if (!this._context.getProgramParameter(this._program, this._context.LINK_STATUS)) {

								console.error('ERROR linking program!', this._context.getProgramInfoLog(this._program));
								return;
						}

						//Validate the program

						this._context.validateProgram(this._program);

						//Check for validating errors

						if (!this._context.getProgramParameter(this._program, this._context.VALIDATE_STATUS)) {

								console.error('ERROR validating program!', this._context.getProgramInfoLog(this._program));
								return;
						}
				}
		}, {
				key: "bind",
				value: function bind() {

						if (this._context.boundProgram != this._program) {

								this._context.useProgram(this._program);
								this._context.boundProgram = this._program;
						}
				}
		}, {
				key: "unbind",
				value: function unbind() {

						if (this._context.boundProgram != this._program) {

								this._context.useProgram(null);
								this._context.boundProgram = null;
						}
				}
		}, {
				key: "program",
				get: function get() {

						return this._program;
				}
		}, {
				key: "vertexShader",
				set: function set(_vertexShader) {

						if (!_vertexShader) return;

						this._vertexShader = _vertexShader;

						if (!this._fragmentShader) return;

						this.link(this._vertexShader, this._fragmentShader);
				},
				get: function get() {

						return this._vertexShader;
				}
		}, {
				key: "fragmentShader",
				set: function set(_fragmentShader) {

						if (!_fragmentShader) return;

						this._fragmentShader = _fragmentShader;

						if (!this._vertexShader) return;

						this.link(this._vertexShader, this._fragmentShader);
				},
				get: function get() {

						return this._fragmentShader;
				}
		}]);

		return ShaderProgram;
}(_WebGlElement2.WebGlElement);

},{"./WebGlElement":24,"./utils":41}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Text = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mesh2 = require("./Mesh");

var _P3D = require("./P3D");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = exports.Text = function (_Mesh) {
		_inherits(Text, _Mesh);

		function Text(_options) {
				_classCallCheck(this, Text);

				var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, _options));

				_this._type = 'Mesh';

				_this.rotation = _options.rotation || vec3.create();
				_this.position = _options.position || vec3.create();
				_this.scale = _options.scale || vec3.fromValues(1.0, 1.0, 1.0);

				// Initialize

				var textInfoBufferAttribute = new _P3D.P3D.BufferAttribute({

						context: _this._context,
						name: 'textInfo',
						data: new Float32Array([]),
						bufferType: _this._context.ARRAY_BUFFER,
						attributeLocation: null,
						numberOfElements: 4,
						dataType: _this._context.FLOAT,
						normalisedElements: _this._context.FALSE,
						sizeOfIndividualVertex: 4,
						offsetFromBeginingVertex: 0

				});

				_this.geometry = new _P3D.P3D.Geometry({ context: _this._context });
				_this.geometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: _this._context, name: 'position', data: new Float32Array([]) }));
				_this.geometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: _this._context, name: 'texCoord', data: new Float32Array([]) }));
				_this.geometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: _this._context, name: 'index', data: new Uint16Array([]) }));
				_this.geometry.addBufferAttribute(textInfoBufferAttribute);

				_this._debugGeometry = _this.geometry.clone();
				_this._debugGeometry.bufferAttributes.index = new _P3D.P3D.BufferAttribute({ context: _this._context, name: 'index', data: new Uint16Array([]) });
				_this._debugMesh = new _P3D.P3D.Mesh({ context: _this._context, name: 'debugMesh', geometry: _this._debugGeometry, material: new _P3D.P3D.MaterialHelper({ context: _this._context }).blackLines() });
				_this._debugMesh.position = _this.position;
				_this._debugMesh.rotation = _this.rotation;
				_this._debugMesh.scale = _this.scale;

				_this._content = '';
				_this.atlas = _options.atlas || null;
				_this.color = _options.color || vec4.fromValues(1.0, 0.0, 0.0, 1.0);
				_this.lineHeight = _options.lineHeight || 1;
				_this.align = _options.align || 'left';
				_this.verticalAlign = _options.verticalAlign || 'top';
				_this.letterSpacing = _options.letterSpacing || 0;

				return _this;
		}

		_createClass(Text, [{
				key: "write",
				value: function write(_string) {

						if (!this.atlas) {

								console.error(this.constructor.name + ' ERROR: You can not write without defining a GlyphAtlas ');
								return;
						}

						_string += '';

						this._content = _string;

						this.update();
				}
		}, {
				key: "update",
				value: function update() {

						var offsetX = 0;
						var offsetY = 0;
						var offsetIndex = 0;

						var positions = [];
						var textInfos = [];
						var indicesOffset = 0;
						var uvs = [];
						var indices = [];
						var cIndices = [];

						var lines = this._content.split('<br>');

						// Update the numLines uniform on the vertex shader.
						// This is used to set some align properties directly in the shader.

						this.material.uniforms.numLines = {

								type: 'float',
								data: lines.length

						};

						// Set the vertical align offset.

						var verticalAlignOffset = 0;

						switch (this.verticalAlign) {

								case 'top':

										verticalAlignOffset = 0;

										break;

								case 'center':

										verticalAlignOffset = lines.length * 0.5;

										break;

								case 'bottom':

										verticalAlignOffset = lines.length;

										break;

						}

						for (var j = 0; j < lines.length; j++) {

								// Compute first the width of the line in order to get the right align offset;

								var firstElement = this.atlas.elements[lines[j][0]];
								var lineLength = 0;

								for (var i = 0; i < lines[j].length; i++) {

										var element = this.atlas.elements[lines[j][i]];
										var ratio = element.box.width / element.box.height;

										lineLength += ratio + this.letterSpacing;
								}

								// Set the align offset.

								var alignOffset = 0;

								switch (this.align) {

										case 'left':

												alignOffset = 0;

												break;

										case 'center':

												alignOffset = lineLength * 0.5;

												break;

										case 'right':

												alignOffset = lineLength;

												break;

								}

								// Create the line geometry.

								for (var _i = 0; _i < lines[j].length; _i++) {

										var char = lines[j][_i];
										var _element = this.atlas.elements[char];
										var elementRatio = _element.box.width / _element.box.height;

										// Create a quad primitive at the right position - defined by the offsetX.

										var quad = new _P3D.P3D.Quad([offsetX + elementRatio * 0.5, 0, 0], [elementRatio, 1, 1.0]);
										// let quad = new P3D.Quad ( [ offsetX + elementRatio * 0.5 - alignOffset, offsetY - 0.5 + verticalAlignOffset, 0 ], [ elementRatio, 1, 1.0 ] );

										// Update the offset of the letter according to the length of the line.

										offsetX += elementRatio + this.letterSpacing;

										// Create array buffer for the text geometry.
										// These are custom attributes used to pass offsets to the vertex shader.

										for (var k = 0; k < 4; k++) {

												textInfos.push(lineLength); // x line length
												textInfos.push(j); // y line index
												textInfos.push(_i); // z char index
												textInfos.push(lines[j].length); // w num chars
										}

										for (var _k = 0; _k < quad.positions.length; _k++) {

												positions.push(quad.positions[_k]);
										}

										for (var _k2 = 0; _k2 < quad.indices.length; _k2++) {

												indices.push(quad.indices[_k2] + indicesOffset);
										}

										for (var _k3 = 0; _k3 < quad.cIndices.length; _k3++) {

												cIndices.push(quad.cIndices[_k3] + indicesOffset);
										}

										indicesOffset = positions.length / 3;

										var u = [_element.box.uvs.topLeft, _element.box.uvs.topRight, _element.box.uvs.bottomRight, _element.box.uvs.bottomLeft];

										// Make one array with an array of arrays.

										uvs.push(u = [].concat.apply([], u));
								}

								offsetY -= this.lineHeight;
								offsetX = 0;
						}

						// Make one array with an array of arrays.

						uvs = [].concat.apply([], uvs);

						// Upload the text geometry to the GPU.

						this.geometry.bufferAttributes.position.setData(new Float32Array(positions), this._context.STATIC_DRAW);
						this.geometry.bufferAttributes.texCoord.setData(new Float32Array(uvs), this._context.STATIC_DRAW);
						this.geometry.bufferAttributes.textInfo.setData(new Float32Array(textInfos), this._context.STATIC_DRAW);
						this.geometry.bufferAttributes.index.setData(new Uint16Array(indices), this._context.STATIC_DRAW);
						this._debugGeometry.bufferAttributes.index.setData(new Uint16Array(cIndices), this._context.STATIC_DRAW);
				}
		}, {
				key: "clone",
				value: function clone() {

						var clone = new _P3D.P3D.Text({ context: this._context });
				}
		}, {
				key: "atlas",
				set: function set(_atlas) {

						if (!_atlas) return;
						if (_atlas.type != 'GlyphAtlas' && _atlas.type != 'SdfGlyphAtlas') {

								console.error(this.constructor.name + ' ERROR: You must pass a valid GlyphAtlas ');
								return;
						}

						if (!this.material) {

								if (_atlas.type == 'GlyphAtlas') {

										this.material = new _P3D.P3D.MaterialHelper({ context: this._context }).glyphs();
										this.material.uniforms.solidColor = { type: 'vec4', data: vec4.fromValues(1.0, 1.0, 1.0, 1.0) };
								} else if (_atlas.type == 'SdfGlyphAtlas') {

										this.material = new _P3D.P3D.MaterialHelper({ context: this._context }).sdfGlyphs();
										this.material.uniforms.solidColor = { type: 'vec4', data: vec4.fromValues(1.0, 1.0, 1.0, 1.0) };
								}
						}

						this._atlas = _atlas;
						this.material.image = _atlas.canvas;
				},
				get: function get() {

						return this._atlas;
				}
		}, {
				key: "color",
				set: function set(_color) {

						this._color = _color;

						if (this.material) {

								this.material.uniforms['solidColor'].data = _color;
						}
				},
				get: function get() {

						return this._color;
				}
		}, {
				key: "lineHeight",
				set: function set(_lineHeight) {

						this._lineHeight = _lineHeight;

						this.material.uniforms.lineHeight = {

								type: 'float',
								data: _lineHeight

						};
				},
				get: function get() {

						return this._lineHeight;
				}
		}, {
				key: "align",
				set: function set(_align) {

						this._align = _align;

						switch (_align) {

								case 'left':

										this.material.uniforms.alignMode = {

												type: 'float',
												data: 0.0

										};

										break;

								case 'center':

										this.material.uniforms.alignMode = {

												type: 'float',
												data: 1.0

										};

										break;

								case 'right':

										this.material.uniforms.alignMode = {

												type: 'float',
												data: 2.0

										};

										break;

						}
				},
				get: function get() {

						return this._align;
				}
		}, {
				key: "verticalAlign",
				set: function set(_verticalAlign) {

						this._verticalAlign = _verticalAlign;

						switch (_verticalAlign) {

								case 'top':

										this.material.uniforms.verticalAlignMode = {

												type: 'float',
												data: 0.0

										};

										break;

								case 'center':

										this.material.uniforms.verticalAlignMode = {

												type: 'float',
												data: 1.0

										};

										break;

								case 'bottom':

										this.material.uniforms.verticalAlignMode = {

												type: 'float',
												data: 2.0

										};

										break;

						}
				},
				get: function get() {

						return this._verticalAlign;
				}
		}, {
				key: "letterSpacing",
				set: function set(_letterSpacing) {

						this._letterSpacing = _letterSpacing;

						this.material.uniforms.letterSpacing = {

								type: 'float',
								data: _letterSpacing

						};
				},
				get: function get() {

						return this._letterSpacing;
				}
		}, {
				key: "debugMesh",
				get: function get() {

						return this._debugMesh;
				}
		}, {
				key: "content",
				get: function get() {

						return this._content;
				}
		}]);

		return Text;
}(_Mesh2.Mesh);

},{"./Mesh":11,"./P3D":13}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
		value: true
});
exports.Texture = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Texture = exports.Texture = function (_WebGlElement) {
		_inherits(Texture, _WebGlElement);

		function Texture(_options) {
				_classCallCheck(this, Texture);

				var _this = _possibleConstructorReturn(this, (Texture.__proto__ || Object.getPrototypeOf(Texture)).call(this, _options));

				_this.filter = _options.filter || _this._context.LINEAR;
				_this.format = _options.format || _this._context.RGBA;
				_this.textureType = _options.type || _this._context.UNSIGNED_BYTE;
				_this.minFilter = _options.minFilter || _this._context.LINEAR;
				_this.maxFilter = _options.maxFilter || _this._context.LINEAR;

				// Hack
				_this.custom = _options.custom || false;
				_this.texture = _options.texture || null;
				_this.width = _options.width || null;
				_this.height = _options.height || null;
				_this.image = _options.image || null;

				return _this;
		}

		_createClass(Texture, [{
				key: "createTexture",
				value: function createTexture(_image, _width, _height) {

						// Hack need to change this.

						if (this.custom) return;

						// If a texture is already allocated just delete it.

						if (this._texture) {

								this._context.deleteTexture(this._texture);
						}

						// Create new texture.

						this._texture = this._context.createTexture();
						this.bind();

						this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_S, this._context.CLAMP_TO_EDGE); //U
						this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_WRAP_T, this._context.CLAMP_TO_EDGE); //V

						this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_MIN_FILTER, this.minFilter);
						this._context.texParameteri(this._context.TEXTURE_2D, this._context.TEXTURE_MAG_FILTER, this.maxFilter);

						if (_image) {

								this._context.texImage2D(this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, _image);
						} else {

								this._context.texImage2D(this._context.TEXTURE_2D, 0, this._context.RGBA, _width, _height, 0, this._context.RGBA, this._context.UNSIGNED_BYTE, null);
						}

						this.unbind();
				}
		}, {
				key: "bind",
				value: function bind() {

						if (this._context.boundTexture != this) {

								this._context.boundTexture = this;
								this._context.bindTexture(this._context.TEXTURE_2D, this._texture);
						} else {

								return;
						}

						// console.log('t');

						// // this._context.boundTexture = this;
						// this._context.bindTexture( this._context.TEXTURE_2D, this._texture );
				}
		}, {
				key: "unbind",
				value: function unbind() {

						this._context.boundTexture = null;
						this._context.bindTexture(this._context.TEXTURE_2D, null);
				}
		}, {
				key: "update",
				value: function update() {

						this.bind();
						this._context.texImage2D(this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, this._image);
						this.unbind();
				}
		}, {
				key: "activeTexture",
				value: function activeTexture(_textureIndex) {

						this._context.activeTexture(_textureIndex);
				}
		}, {
				key: "width",
				set: function set(_width) {

						if (!_width || _width == this._width) return;

						this._width = _width;
						if (this.height != null && this.width != null) this.createTexture(this.image, this.width, this.height);
				},
				get: function get() {

						return this._width;
				}
		}, {
				key: "height",
				set: function set(_height) {

						if (!_height || _height == this._height) return;

						this._height = _height;
						if (this.height != null && this.width != null) this.createTexture(this.image, this.width, this.height);
				},
				get: function get() {

						return this._height;
				}
		}, {
				key: "image",
				set: function set(_image) {

						if (!_image) return;

						this._image = _image;
						if (!this._texture) {

								this.createTexture(_image, this.width, this.height);
						} else {

								this.bind();
								this._context.texImage2D(this._context.TEXTURE_2D, 0, this._context.RGBA, this._context.RGBA, this._context.UNSIGNED_BYTE, _image);
								this.unbind();
						}
				},
				get: function get() {

						return this._image;
				}
		}, {
				key: "filter",
				set: function set(_filter) {

						this._filter = _filter;
				},
				get: function get() {

						return this._filter;
				}
		}, {
				key: "texture",
				set: function set(_texture) {

						this._texture = _texture;
				},
				get: function get() {

						return this._texture;
				}
		}, {
				key: "isLoaded",
				get: function get() {

						return this._isLoaded;
				}
		}]);

		return Texture;
}(_WebGlElement2.WebGlElement);

},{"./WebGlElement":24}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Transform = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WebGlElement2 = require("./WebGlElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transform = exports.Transform = function (_WebGlElement) {
	_inherits(Transform, _WebGlElement);

	function Transform(_options) {
		_classCallCheck(this, Transform);

		var _this = _possibleConstructorReturn(this, (Transform.__proto__ || Object.getPrototypeOf(Transform)).call(this, _options));

		_this._position = vec3.create();
		_this._rotation = vec3.create();
		_this._scale = vec3.fromValues(1, 1, 1);
		_this._lookAtPoint = null;

		return _this;
	}

	_createClass(Transform, [{
		key: "lookAt",
		value: function lookAt(_point) {

			this._lookAtPoint = _point;
		}
	}, {
		key: "position",
		set: function set(_position) {

			this._position = _position;
		},
		get: function get() {

			return this._position;
		}
	}, {
		key: "rotation",
		set: function set(_rotation) {

			this._rotation = _rotation;
		},
		get: function get() {

			return this._rotation;
		}
	}, {
		key: "scale",
		set: function set(_scale) {

			this._scale = _scale;
		},
		get: function get() {

			return this._scale;
		}
	}, {
		key: "lookAtPoint",
		set: function set(_lookAtPoint) {

			this._lookAtPoint = _lookAtPoint;
		},
		get: function get() {

			return this._lookAtPoint;
		}
	}]);

	return Transform;
}(_WebGlElement2.WebGlElement);

},{"./WebGlElement":24}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WebGlElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebGlElement = exports.WebGlElement = function () {
	function WebGlElement(_options) {
		_classCallCheck(this, WebGlElement);

		if (!_options || !_options.context) {

			console.error(this.constructor.name + ' ERROR: webgl context must be defined! ');
			return;
		}

		// Context

		this._context = _options.context;

		// Type

		this._type = this.constructor.name;

		// Names

		this._name = _options.name || null;

		// Id

		this._id = (0, _utils.guid)();

		// Active

		this.active = _options.active || true;
	}

	_createClass(WebGlElement, [{
		key: "log",
		value: function log(_string) {

			// console.log( this.constructor.name + ' LOG: ' + _string );

		}
	}, {
		key: "logError",
		value: function logError(_string) {

			// console.error( this.constructor.name + ' ERROR: ' + _string );

		}
	}, {
		key: "logWarn",
		value: function logWarn(_string) {

			// console.warn( this.constructor.name + ' WARNING: ' + _string );

		}
	}, {
		key: "context",
		set: function set(_context) {

			this._context = _context;
		},
		get: function get() {

			return this._context;
		}
	}, {
		key: "type",
		get: function get() {

			return this._type;
		}
	}, {
		key: "name",
		set: function set(_name) {

			this._name = _name;
		},
		get: function get() {

			return this._name;
		}
	}, {
		key: "id",
		get: function get() {

			return this._id;
		}
	}, {
		key: "active",
		set: function set(_active) {

			this._active = _active;
		},
		get: function get() {

			return this._active;
		}
	}]);

	return WebGlElement;
}();

},{"./utils":41}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WebGlRenderer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebGlRenderer = exports.WebGlRenderer = function () {
	function WebGlRenderer(_options) {
		_classCallCheck(this, WebGlRenderer);

		this._options = _options || {};

		this._type = 'WebGlRenderer';

		this.canvas = this._options.canvas || null;
		this.resolution = this._options.resolution || 1;
		this.width = this._options.width || window.innerWidth;
		this.height = this._options.height || window.innerHeight;
		this.context = this._options.context;
		this.webglVersion = this._options.webglVersion;
		this.elapsedTime = null;
		this.deltaTime = null;
	}

	_createClass(WebGlRenderer, [{
		key: 'createContext',
		value: function createContext() {

			if (this._canvas) {

				var possibleContexts = ['webgl', 'experimental-webgl'];

				for (var i = 0; i < possibleContexts.length; i++) {

					this._context = this._canvas.getContext(possibleContexts[i], {

						premultipliedAlpha: false,
						alpha: false,
						antialias: true

					});

					if (this._context) {

						this.setCustomGlFunctions();
						console.log('WebGlRenderer: ' + possibleContexts[i] + ' context created!');
						this.addExtentions();
						this.webglVersion = possibleContexts[i];
						break;
					}
				}

				if (!this._context) {

					console.error("Your browser doesn't support WebGl");
					alert("Your browser doesn't support WebGl");
					return;
				}

				return this._context;
			} else {

				console.error('WebGlRenderer ERROR: canvas is not defined!');
				return;
			}
		}
	}, {
		key: 'addExtentions',
		value: function addExtentions() {

			console.log('* EXTENTIONS *');

			var extentionsList = ['OES_vertex_array_object', 'OES_texture_float', 'OES_standard_derivatives'];
			var parametersList = ['MAX_VERTEX_TEXTURE_IMAGE_UNITS'];

			for (var i = 0; i < extentionsList.length; i++) {

				var ext = this._context.getExtension(extentionsList[i]);

				if (!ext) {

					console.error("WebGlRenderer ERROR: " + extentionsList[i] + " not supported!");
				} else {

					this._context[extentionsList[i]] = ext;
					console.log(extentionsList[i] + ' enabled!');
				}
			}

			for (var _i = 0; _i < parametersList.length; _i++) {

				if (this._context.getParameter(this._context[parametersList[_i]]) == 0) {

					console.warn("WebGlRenderer WARNING: " + parametersList[_i] + " not supported!");
				} else {

					console.log(parametersList[_i] + " supported!");
				}
			}
		}
	}, {
		key: 'setCustomGlFunctions',
		value: function setCustomGlFunctions() {

			if (!this._context) return;

			this._context.renderer = this;
			this._context.resolution = this._resolution;
			this._context.realToCSSPixels = window.devicePixelRatio;
		}
	}, {
		key: 'setViewport',
		value: function setViewport(_x, _y, _width, _height) {

			this.viewport = {

				x: _x,
				y: _y,
				width: _width,
				height: _height

			};

			this._context.viewport(_x, _y, _width, _height);
		}
	}, {
		key: 'type',
		get: function get() {

			return this._type;
		}
	}, {
		key: 'webglVersion',
		set: function set(_webglVersion) {

			if (!_webglVersion) return;

			this._webglVersion = _webglVersion;
		},
		get: function get() {

			return this._webglVersion;
		}
	}, {
		key: 'canvas',
		set: function set(_canvas) {

			if (!_canvas) return;

			this._canvas = _canvas;

			this.width = _canvas.width;
			this.height = _canvas.height;
		},
		get: function get() {

			return this._canvas;
		}
	}, {
		key: 'width',
		set: function set(_width) {

			if (!_width) return;

			this._width = _width;

			this.canvas.width = this._width * window.devicePixelRatio * this._resolution;

			this.setCustomGlFunctions();
		},
		get: function get() {

			return this._width;
		}
	}, {
		key: 'realWidth',
		get: function get() {

			return this._width * window.devicePixelRatio * this._resolution;
		}
	}, {
		key: 'height',
		set: function set(_height) {

			if (!_height) return;

			this._height = _height;

			this.canvas.height = this._height * window.devicePixelRatio * this._resolution;

			this.setCustomGlFunctions();
		},
		get: function get() {

			return this._height;
		}
	}, {
		key: 'realHeight',
		get: function get() {

			return this._height * window.devicePixelRatio * this._resolution;
		}
	}, {
		key: 'realToCSSPixels',
		set: function set(_realToCSSPixels) {

			this._realToCSSPixels = _realToCSSPixels;

			this.setCustomGlFunctions();
		},
		get: function get() {

			return this._realToCSSPixels;
		}
	}, {
		key: 'resolution',
		set: function set(_resolution) {

			this._resolution = _resolution;

			this.setCustomGlFunctions();
		},
		get: function get() {

			return this._resolution;
		}
	}, {
		key: 'elapsedTime',
		set: function set(_elapsedTime) {

			this._elapsedTime = _elapsedTime;
		},
		get: function get() {

			return this._elapsedTime;
		}
	}, {
		key: 'deltaTime',
		set: function set(_deltaTime) {

			this._deltaTime = _deltaTime;
		},
		get: function get() {

			return this._deltaTime;
		}
	}]);

	return WebGlRenderer;
}();

},{"./utils":41}],26:[function(require,module,exports){
'use strict'

var SDF = require('tiny-sdf')

module.exports = atlas

function atlas(options) {
	options = options || {}

	var canvas = options.canvas || document.createElement('canvas')
	var family = options.family || 'monospace'
	var shape = options.shape || [512, 512]
	var step = options.step || [32, 32]
	var size = options.size || 16
	var chars = options.chars || [32, 255]
	var bufferSize = Math.floor((step[0] - size)/2)
	var radius = options.radius || bufferSize*1.5
	var sdf = new SDF(size, bufferSize, radius, 0, family)
	var vAlign = options.align || true
	var i, j

	if (typeof size === 'number') {
		size = size + 'px'
	}

	if (!Array.isArray(chars)) {
		chars = String(chars).split('')
	}
	else if (
		chars.length === 2
		&& typeof chars[0] === 'number'
		&& typeof chars[1] === 'number'
	) {
		var newchars = []

		for (i = chars[0], j = 0; i <= chars[1]; i++) {
			newchars[j++] = String.fromCharCode(i)
		}

		chars = newchars
	}

	shape = shape.slice()
	canvas.width  = shape[0]
	canvas.height = shape[1]

	var ctx = canvas.getContext('2d')

	ctx.fillStyle = '#000'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.font = size + ' ' + family
	ctx.textBaseline = 'bottom'

	var x = 0
	var y = 0
	var xoffset = 0;
  	var yoffset = 0;
  	var elements = {};
	var len = Math.min(chars.length, Math.floor(shape[0]/step[0]) * Math.ceil(shape[1]/step[1]))

	// hack tiny-sdf to render centered
	//FIXME: get rif of it by [possibly] PR to tiny-sdf
	var align = sdf.ctx.textAlign
	var buffer = sdf.buffer

	sdf.ctx.textAlign = 'center'
	sdf.buffer = sdf.size/2

	for (i = 0; i < len; i++) {
		var data = sdf.draw(chars[i])

		var offY = 0
		if (vAlign) offY = getAlignOffset(data)

		ctx.putImageData(data, x, y - offY)

		var elWidth = step[0];
		var boxWidth = ctx.measureText(chars[i]).width;

		elements[chars[i]] = {

	      x: x - xoffset,
	      y: y - yoffset,
	      width: step[0],
	      height: step[1],

	      uvs: {
	        'topLeft': [x / shape[0], y / shape[1]],
	        'topRight': [(x - ctx.measureText(chars[i]).width) / shape[0], y / shape[1]],
	        'bottomRight': [(x - ctx.measureText(chars[i]).width) / shape[0], (y + step[1]) / shape[1]],
	        'bottomLeft': [x / shape[0], (y + step[1]) / shape[1]],
	      },

	      box: {

	        shape: shape,
	        x: x,
	        y: y,
	        width: ctx.measureText(chars[i]).width,
	        height: step[1],

	        uvs: {
	          'topLeft': [(x + elWidth * 0.5 - boxWidth * 0.5) / shape[0], y / shape[1]],
	          'topRight': [((x - elWidth * 0.5 + boxWidth * 0.5) + step[0]) / shape[0], y / shape[1]],
	          'bottomRight': [((x - elWidth * 0.5 + boxWidth * 0.5) + step[0]) / shape[0], (y + step[1]) / shape[1]],
	          'bottomLeft': [(x + elWidth * 0.5 - boxWidth * 0.5) / shape[0], (y + step[1]) / shape[1]],
	        },  

	      },

	    }

	    x += step[0]
		if (x > shape[0] - step[0]) {
			x = 0
			y += step[1]
		}
	}

	// unhack tiny-sdf
	sdf.ctx.textAlign = align
	sdf.buffer = buffer

	return {

		canvas: canvas,
		elements: elements,
		context: ctx,

	}


	function getAlignOffset (data) {
		var buf = data.data, w = data.width, h = data.height

		var top = 0, bottom = 0, x, y, r, line

		//find top boundary
		for (y = 0; y < h; y++) {
			line = y * w * 4
			for (x = 0; x < w; x++) {
				r = buf[line + x * 4]

				if (r > 0) {
					top = y
					break
				}
			}
			if (top) break
		}

		//find bottom boundary
		for (y = h; y--;) {
			line = y * w * 4
			for (x = 0; x < w; x++) {
				r = buf[line + x * 4]

				if (r > 0) {
					bottom = y
					break
				}
			}
			if (bottom) break
		}

		return top - .5 * (top + (h - bottom))
	}
}


},{"tiny-sdf":40}],27:[function(require,module,exports){
var defaultChars = [32, 255]

module.exports = atlas

function atlas(options) {
  options = options || {}

  var canvas = options.canvas || document.createElement('canvas')
  var family = options.family || 'monospace'
  var shape  = options.shape || [512, 512]
  var step   = options.step || [32, 32]
  var size   = options.size || 16
  var chars  = options.chars || defaultChars

  if (typeof size === 'number') {
    size = size + 'px'
  }

  if (!Array.isArray(chars)) {
    chars = String(chars).split('')
  } else
  if (chars.length === 2
    && typeof chars[0] === 'number'
    && typeof chars[1] === 'number'
  ) {
    var newchars = []

    for (var i = chars[0], j = 0; i <= chars[1]; i++) {
      newchars[j++] = String.fromCharCode(i)
    }

    chars = newchars
  }

  shape = shape.slice()
  canvas.width  = shape[0]
  canvas.height = shape[1]

  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(0.0, 0.0, 0.0, 0.0)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.font = size + ' ' + family
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#fff'

  var elements = {};

  var x = step[0] / 2
  var y = step[1] / 2
  var xoffset = x;
  var yoffset = y;
  for (var i = 0; i < chars.length; i++) {

    elements[chars[i]] = {

      x: x - xoffset,
      y: y - yoffset,
      width: step[0],
      height: step[1],

      uvs: {
        'topLeft': [( x - xoffset ) / shape[0], ( y - yoffset ) / shape[1]],
        'topRight': [(( x - xoffset ) + step[0]) / shape[0], ( y - yoffset ) / shape[1]],
        'bottomRight': [(( x - xoffset ) + step[0]) / shape[0], (( y - yoffset ) + step[1]) / shape[1]],
        'bottomLeft': [( x - xoffset ) / shape[0], (( y - yoffset ) + step[1]) / shape[1]],
      },

      box: {

        shape: shape,
        x: x - ctx.measureText(chars[i]).width * 0.5,
        y: y - step[1] * 0.5,
        width: ctx.measureText(chars[i]).width,
        height: step[1],
        uvs: {
          'topLeft': [(x - ctx.measureText(chars[i]).width * 0.5) / shape[0], (y - step[1] * 0.5) / shape[1]],
          'topRight': [((x - ctx.measureText(chars[i]).width * 0.5) + ctx.measureText(chars[i]).width) / shape[0], (y - step[1] * 0.5) / shape[1]],
          'bottomRight': [((x - ctx.measureText(chars[i]).width * 0.5) + ctx.measureText(chars[i]).width) / shape[0], ((y - step[1] * 0.5) + step[1]) / shape[1]],
          'bottomLeft': [(x - ctx.measureText(chars[i]).width * 0.5) / shape[0], ((y - step[1] * 0.5) + step[1]) / shape[1]],
        },  

      },

    }
    ctx.fillText(chars[i], x, y)
    if ((x += step[0]) > shape[0] - step[0]/2) (x = step[0]/2), (y += step[1])
  }

  return {
    canvas: canvas,
    context: ctx,
    elements: elements,
  }
}

},{}],28:[function(require,module,exports){
function emptyGroupInfo() {
    return {
        name: "",
        triangleVertices: [],
        hasUVs: false,
        hasNormals: false,
        needsReindexing: false,
        positionOffset: 0,
        uvOffset: 0,
        normalOffset: 0
    };
}
function parseObj(text) {
    var lines = text.trim().split('\n');

    var g = null;

    var groups = [];

    var positions = [];
    var uvs = [];
    var normals = [];

    for(var i=0, len=lines.length; i<len; i++) {
        var line = lines[i].replace(/[\s]+/, ' ');
        var tokens = line.trim().split(' ');

        //skip commment
        if (tokens[0][0] == '#') continue;

        //skip empty lines
        if (!tokens[0]) continue;

        switch(tokens[0]) {
            //vertices x, y, z
            case 'v':
                positions.push([ Number(tokens[1]), Number(tokens[2]), Number(tokens[3]) ]);
                break;
            //vertex tex coords s, t
            //skipping 3rd coordinate even if present
            case 'vt':
                uvs.push([ Number(tokens[1]), Number(tokens[2]) ]);
                break;
            //vertex normals
            case 'vn':
                normals.push([ Number(tokens[1]), Number(tokens[2]), Number(tokens[3]) ]);
                break;
            //face
            case 'f':
                if (!g) {
                    g = emptyGroupInfo();
                    g.positionOffset = positions.length;
                    g.uvOffset = uvs.length;
                    g.normalOffset = normals.length;
                    groups.push(g);
                }
                var vertices = [];
                for(var j=1; j<tokens.length; j++) {
                    var tokenValues = tokens[j].split('/');
                    var val0 = tokenValues[0];
                    var val1 = tokenValues[1];
                    var val2 = tokenValues[2];
                    tokenValues[0] = (val0 && val0.length > 0) ? Number(val0) : null;
                    tokenValues[1] = (val1 && val1.length > 0) ? Number(val1) : null;
                    tokenValues[2] = (val2 && val2.length > 0) ? Number(val2) : null;
                    vertices.push(tokenValues);
                }

                //make a triangle fan
                for(var v=1, vertexCount=vertices.length; v<vertexCount-1; v++) {
                    if (vertices[0][1] != undefined) g.hasUVs = true;
                    if (vertices[0][2] != undefined) g.hasNormals = true;

                    g.triangleVertices.push([ vertices[0], vertices[v], vertices[v+1]]);
                }
                break;
            //group
            case 'g':
                g = emptyGroupInfo();
                g.positionOffset = positions.length;
                g.uvOffset = uvs.length;
                g.normalOffset = normals.length;
                g.name = line.slice(1).trim();
                groups.push(g);
                break;
            //skipping material reference
            case 'usemtl':
                break;
            //skipping material reference
            case 'mtllib':
                break;
            //skipping smoothing group
            case 's':
                break;
            //skipping ???
            case 'o':
                break;
            default:
                console.log('loadObj: skipping unrecognized line', line);

        }
    }
    var geometries = [];
    for(var i=0, len=groups.length; i<len; i++) {
        var g = groups[i];
        var geom = {
            name: g.name,
            positions: [],
            uvs: g.hasUVs ? [] : undefined,
            normals: g.hasNormals ? [] : undefined,
            cells: [],
        };
        geometries.push(geom);

        var vertexIndexMap = [];

        var numVertices = 0;
        var index = 0;
        for(var t=0, triangleCount=g.triangleVertices.length; t<triangleCount; t++) {
            var triangle = g.triangleVertices[t];
            var face = [];
            for(var v=0; v<3; v++) {
                var hash = triangle[v].join('-');
                var index = vertexIndexMap[hash]
                if (index === undefined) {
                    index = numVertices;
                    vertexIndexMap[hash] = index;
                    numVertices++;
                }
                face.push(index);

                var pi = triangle[v][0];
                pi = (pi > 0) ? (pi - 1) : (g.positionOffset + pi);

                var ti = triangle[v][1];
                ti = (ti > 0) ? (ti - 1) : (g.uvOffset + ti );

                var ni = triangle[v][2];
                ni = (ni > 0) ? (ni - 1) : (g.normalOffset + ni);

                geom.positions[index] = positions[pi];
                if (g.hasUVs) geom.uvs[index] = uvs[ti];
                if (g.hasNormals) geom.normals[index] = normals[ni];
            }
            geom.cells.push(face);
        }
    }
    if (geometries.length > 1) {
        return geometries
    }
    else {
        return geometries[0];
    }
};

module.exports = parseObj;

},{}],29:[function(require,module,exports){
module.exports = add;

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0]
    out[1] = a[1] + b[1]
    out[2] = a[2] + b[2]
    return out
}
},{}],30:[function(require,module,exports){
module.exports = copy;

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
    out[0] = a[0]
    out[1] = a[1]
    out[2] = a[2]
    return out
}
},{}],31:[function(require,module,exports){
module.exports = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}
},{}],32:[function(require,module,exports){
module.exports = dot;

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}
},{}],33:[function(require,module,exports){
module.exports = scale;

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b
    out[1] = a[1] * b
    out[2] = a[2] * b
    return out
}
},{}],34:[function(require,module,exports){
module.exports = scaleAndAdd;

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale)
    out[1] = a[1] + (b[1] * scale)
    out[2] = a[2] + (b[2] * scale)
    return out
}
},{}],35:[function(require,module,exports){
module.exports = squaredDistance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2]
    return x*x + y*y + z*z
}
},{}],36:[function(require,module,exports){
module.exports = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0]
    out[1] = a[1] - b[1]
    out[2] = a[2] - b[2]
    return out
}
},{}],37:[function(require,module,exports){
var dot = require('gl-vec3/dot')
var add = require('gl-vec3/add')
var scale = require('gl-vec3/scale')
var copy = require('gl-vec3/copy')

module.exports = intersectRayPlane

var v0 = [0, 0, 0]

function intersectRayPlane(out, origin, direction, normal, dist) {
  var denom = dot(direction, normal)
  if (denom !== 0) {
    var t = -(dot(origin, normal) + dist) / denom
    if (t < 0) {
      return null
    }
    scale(v0, direction, t)
    return add(out, origin, v0)
  } else if (dot(normal, origin) + dist === 0) {
    return copy(out, origin)
  } else {
    return null
  }
}

},{"gl-vec3/add":29,"gl-vec3/copy":30,"gl-vec3/dot":32,"gl-vec3/scale":33}],38:[function(require,module,exports){
var squaredDist = require('gl-vec3/squaredDistance')
var dot = require('gl-vec3/dot')
var sub = require('gl-vec3/subtract')
var scaleAndAdd = require('gl-vec3/scaleAndAdd')
var scale = require('gl-vec3/scale')
var add = require('gl-vec3/add')

var tmp = [0, 0, 0]

module.exports = intersectRaySphere
function intersectRaySphere (out, origin, direction, center, radius) {
  sub(tmp, center, origin)
  var len = dot(direction, tmp)
  if (len < 0) { // sphere is behind ray
    return null
  }

  scaleAndAdd(tmp, origin, direction, len)
  var dSq = squaredDist(center, tmp)
  var rSq = radius * radius
  if (dSq > rSq) {
    return null
  }

  scale(out, direction, len - Math.sqrt(rSq - dSq))
  return add(out, out, origin)
}

},{"gl-vec3/add":29,"gl-vec3/dot":32,"gl-vec3/scale":33,"gl-vec3/scaleAndAdd":34,"gl-vec3/squaredDistance":35,"gl-vec3/subtract":36}],39:[function(require,module,exports){
var cross = require('gl-vec3/cross');
var dot = require('gl-vec3/dot');
var sub = require('gl-vec3/subtract');

var EPSILON = 0.000001;
var edge1 = [0,0,0];
var edge2 = [0,0,0];
var tvec = [0,0,0];
var pvec = [0,0,0];
var qvec = [0,0,0];

module.exports = intersectTriangle;

function intersectTriangle (out, pt, dir, tri) {
    sub(edge1, tri[1], tri[0]);
    sub(edge2, tri[2], tri[0]);
    
    cross(pvec, dir, edge2);
    var det = dot(edge1, pvec);
    
    if (det < EPSILON) return null;
    sub(tvec, pt, tri[0]);
    var u = dot(tvec, pvec);
    if (u < 0 || u > det) return null;
    cross(qvec, tvec, edge1);
    var v = dot(dir, qvec);
    if (v < 0 || u + v > det) return null;
    
    var t = dot(edge2, qvec) / det;
    out[0] = pt[0] + t * dir[0];
    out[1] = pt[1] + t * dir[1];
    out[2] = pt[2] + t * dir[2];
    return out;
}

},{"gl-vec3/cross":31,"gl-vec3/dot":32,"gl-vec3/subtract":36}],40:[function(require,module,exports){
'use strict';

module.exports = TinySDF;

var INF = 1e20;

function TinySDF(fontSize, buffer, radius, cutoff, fontFamily) {
    this.fontSize = fontSize || 24;
    this.buffer = buffer === undefined ? 3 : buffer;
    this.cutoff = cutoff || 0.25;
    this.fontFamily = fontFamily || 'sans-serif';
    this.radius = radius || 8;
    var size = this.size = this.fontSize + this.buffer * 2;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvas.height = size;

    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = fontSize + 'px ' + this.fontFamily;
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'black';

    // temporary arrays for the distance transform
    this.gridOuter = new Float64Array(size * size);
    this.gridInner = new Float64Array(size * size);
    this.f = new Float64Array(size);
    this.d = new Float64Array(size);
    this.z = new Float64Array(size + 1);
    this.v = new Int16Array(size);

    // hack around https://bugzilla.mozilla.org/show_bug.cgi?id=737852
    this.middle = Math.round((size / 2) * (navigator.userAgent.indexOf('Gecko/') >= 0 ? 1.2 : 1));
}

TinySDF.prototype.draw = function (char) {
    this.ctx.clearRect(0, 0, this.size, this.size);
    this.ctx.fillText(char, this.buffer, this.middle);

    var imgData = this.ctx.getImageData(0, 0, this.size, this.size);
    var data = imgData.data;

    for (var i = 0; i < this.size * this.size; i++) {
        var a = data[i * 4 + 3] / 255; // alpha value
        this.gridOuter[i] = a === 1 ? 0 : a === 0 ? INF : Math.pow(Math.max(0, 0.5 - a), 2);
        this.gridInner[i] = a === 1 ? INF : a === 0 ? 0 : Math.pow(Math.max(0, a - 0.5), 2);
    }

    edt(this.gridOuter, this.size, this.size, this.f, this.d, this.v, this.z);
    edt(this.gridInner, this.size, this.size, this.f, this.d, this.v, this.z);

    for (i = 0; i < this.size * this.size; i++) {
        var d = this.gridOuter[i] - this.gridInner[i];
        var c = Math.max(0, Math.min(255, Math.round(255 - 255 * (d / this.radius + this.cutoff))));
        data[4 * i + 0] = c;
        data[4 * i + 1] = c;
        data[4 * i + 2] = c;
        data[4 * i + 3] = 255;
    }

    return imgData;
};

// 2D Euclidean distance transform by Felzenszwalb & Huttenlocher https://cs.brown.edu/~pff/dt/
function edt(data, width, height, f, d, v, z) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            f[y] = data[y * width + x];
        }
        edt1d(f, d, v, z, height);
        for (y = 0; y < height; y++) {
            data[y * width + x] = d[y];
        }
    }
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            f[x] = data[y * width + x];
        }
        edt1d(f, d, v, z, width);
        for (x = 0; x < width; x++) {
            data[y * width + x] = Math.sqrt(d[x]);
        }
    }
}

// 1D squared distance transform
function edt1d(f, d, v, z, n) {
    v[0] = 0;
    z[0] = -INF;
    z[1] = +INF;

    for (var q = 1, k = 0; q < n; q++) {
        var s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        while (s <= z[k]) {
            k--;
            s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
        }
        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = +INF;
    }

    for (q = 0, k = 0; q < n; q++) {
        while (z[k + 1] < q) k++;
        d[q] = (q - v[k]) * (q - v[k]) + f[v[k]];
    }
}

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.ajax = ajax;
exports.guid = guid;
exports.hslToRgb = hslToRgb;
function addEvent(elem, event, fn) {

    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions

    function listenHandler(e) {

        var ret = fn.apply(this, arguments);

        if (ret === false) {

            e.stopPropagation();
            e.preventDefault();
        }

        return ret;
    }

    function attachHandler() {

        // set the this pointer same as addEventListener when fn is called
        // and make sure the event is passed to the fn also so that works the same too

        var ret = fn.call(elem, window.event);

        if (ret === false) {

            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }

        return ret;
    }

    if (elem.addEventListener) {

        elem.addEventListener(event, listenHandler, false);
        return { elem: elem, handler: listenHandler, event: event };
    } else {

        elem.attachEvent("on" + event, attachHandler);
        return { elem: elem, handler: attachHandler, event: event };
    }
}

function removeEvent(token) {

    if (token.elem.removeEventListener) {

        token.elem.removeEventListener(token.event, token.handler);
    } else {

        token.elem.detachEvent("on" + token.event, token.handler);
    }
}

function ajax(_url, _callback) {

    var request = new XMLHttpRequest();
    request.open('GET', _url, true);
    request.onload = function () {

        if (request.status < 200 || request.status > 299) {

            _callback('Error: Http status' + request.status + ' on resource ' + _url);
        } else {

            _callback(null, request);
        }
    };

    request.send();
}

// export function ajax (  _url, callback, postData ) {
//     var req = createXMLHTTPObject();
//     if (!req) return;
//     var method = (postData) ? "POST" : "GET";
//     req.open ( method, _url,true);
//     req.setRequestHeader('User-Agent','XMLHTTP/1.0');
//     if (postData)
//         req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
//     req.onreadystatechange = function () {
//         if (req.readyState != 4) return;
//         if (req.status != 200 && req.status != 304) {
// //          alert('HTTP error ' + req.status);
//             return;
//         }
//         callback(req);
//     }
//     if (req.readyState == 4) return;
//     req.send(postData);
// }

var XMLHttpFactories = [function () {
    return new XMLHttpRequest();
}, function () {
    return new ActiveXObject("Msxml2.XMLHTTP");
}, function () {
    return new ActiveXObject("Msxml3.XMLHTTP");
}, function () {
    return new ActiveXObject("Microsoft.XMLHTTP");
}];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        } catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

function guid() {

    function s4() {

        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function hslToRgb(h, s, l) {

    var r, g, b;

    if (s == 0) {

        r = g = b = l; // achromatic
    } else {

        var hue2rgb = function hue2rgb(p, q, t) {

            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b];
}

},{}],42:[function(require,module,exports){

},{}],43:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.workerTimersBroker = global.workerTimersBroker || {})));
}(this, (function (exports) { 'use strict';

var isCallNotification = function isCallNotification(message) {
    return message.method !== undefined && message.method === 'call';
};

var isClearResponse = function isClearResponse(message) {
    return message.error === null && typeof message.id === 'number';
};

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
var generateUniqueId = function generateUniqueId(map) {
    var id = Math.round(Math.random() * MAX_SAFE_INTEGER);
    while (map.has(id)) {
        id = Math.round(Math.random() * MAX_SAFE_INTEGER);
    }
    return id;
};
var load = function load(url) {
    var scheduledIntervalFunctions = new Map();
    var scheduledTimeoutFunctions = new Map();
    var unrespondedRequests = new Map();
    var worker = new Worker(url);
    worker.addEventListener('message', function (_ref) {
        var data = _ref.data;

        if (isCallNotification(data)) {
            var _data$params = data.params,
                timerId = _data$params.timerId,
                timerType = _data$params.timerType;

            if (timerType === 'interval') {
                var idOrFunc = scheduledIntervalFunctions.get(timerId);
                if (typeof idOrFunc === 'number') {
                    var timerIdAndTimerType = unrespondedRequests.get(idOrFunc);
                    if (timerIdAndTimerType === undefined || timerIdAndTimerType.timerId !== timerId || timerIdAndTimerType.timerType !== timerType) {
                        throw new Error('The timer is in an undefined state.');
                    }
                } else if (typeof idOrFunc !== 'undefined') {
                    idOrFunc();
                } else {
                    throw new Error('The timer is in an undefined state.');
                }
            } else if (timerType === 'timeout') {
                var _idOrFunc = scheduledTimeoutFunctions.get(timerId);
                if (typeof _idOrFunc === 'number') {
                    var _timerIdAndTimerType = unrespondedRequests.get(_idOrFunc);
                    if (_timerIdAndTimerType === undefined || _timerIdAndTimerType.timerId !== timerId || _timerIdAndTimerType.timerType !== timerType) {
                        throw new Error('The timer is in an undefined state.');
                    }
                } else if (typeof _idOrFunc !== 'undefined') {
                    _idOrFunc();
                    // A timeout can be savely deleted because it is only called once.
                    scheduledTimeoutFunctions.delete(timerId);
                } else {
                    throw new Error('The timer is in an undefined state.');
                }
            }
        } else if (isClearResponse(data)) {
            var id = data.id;

            var _timerIdAndTimerType2 = unrespondedRequests.get(id);
            if (_timerIdAndTimerType2 === undefined) {
                throw new Error('The timer is in an undefined state.');
            } else {
                var _timerId = _timerIdAndTimerType2.timerId,
                    _timerType = _timerIdAndTimerType2.timerType;

                unrespondedRequests.delete(id);
                if (_timerType === 'interval') {
                    scheduledIntervalFunctions.delete(_timerId);
                } else {
                    scheduledTimeoutFunctions.delete(_timerId);
                }
            }
        } else {
            console.log(data);
            var message = data.error.message;

            throw new Error(message);
        }
    });
    var clearInterval = function clearInterval(timerId) {
        var id = generateUniqueId(unrespondedRequests);
        unrespondedRequests.set(id, { timerId: timerId, timerType: 'interval' });
        scheduledIntervalFunctions.set(timerId, id);
        worker.postMessage({
            id: id,
            method: 'clear',
            params: { timerId: timerId, timerType: 'interval' }
        });
    };
    var clearTimeout = function clearTimeout(timerId) {
        var id = generateUniqueId(unrespondedRequests);
        unrespondedRequests.set(id, { timerId: timerId, timerType: 'timeout' });
        scheduledTimeoutFunctions.set(timerId, id);
        worker.postMessage({
            id: id,
            method: 'clear',
            params: { timerId: timerId, timerType: 'timeout' }
        });
    };
    var setInterval = function setInterval(func, delay) {
        var timerId = generateUniqueId(scheduledIntervalFunctions);
        scheduledIntervalFunctions.set(timerId, function () {
            func();
            // Doublecheck if the interval should still be rescheduled because it could have been cleared inside of func().
            if (typeof scheduledIntervalFunctions.get(timerId) === 'function') {
                worker.postMessage({
                    id: null,
                    method: 'set',
                    params: {
                        delay: delay,
                        now: performance.now(),
                        timerId: timerId,
                        timerType: 'interval'
                    }
                });
            }
        });
        worker.postMessage({
            id: null,
            method: 'set',
            params: {
                delay: delay,
                now: performance.now(),
                timerId: timerId,
                timerType: 'interval'
            }
        });
        return timerId;
    };
    var setTimeout = function setTimeout(func, delay) {
        var timerId = generateUniqueId(scheduledTimeoutFunctions);
        scheduledTimeoutFunctions.set(timerId, func);
        worker.postMessage({
            id: null,
            method: 'set',
            params: {
                delay: delay,
                now: performance.now(),
                timerId: timerId,
                timerType: 'timeout'
            }
        });
        return timerId;
    };
    return {
        clearInterval: clearInterval,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        setTimeout: setTimeout
    };
};

exports.load = load;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],44:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('worker-timers-broker')) :
	typeof define === 'function' && define.amd ? define(['exports', 'worker-timers-broker'], factory) :
	(factory((global.workerTimers = global.workerTimers || {}),global.workerTimersBroker));
}(this, (function (exports,workerTimersBroker) { 'use strict';

// tslint:disable-next-line:max-line-length
// tslint:disable-next-line:max-line-length
var worker = "!function(){\"use strict\";var e=new Map,t=new Map,r=function(t){var r=e.get(t);if(void 0===r)throw new Error('There is no interval scheduled with the given id \"'+t+'\".');clearTimeout(r),e.delete(t)},i=function(e){var r=t.get(e);if(void 0===r)throw new Error('There is no timeout scheduled with the given id \"'+e+'\".');clearTimeout(r),t.delete(e)},o=function(e,t){var r=void 0;if(\"performance\"in self){var i=performance.now();e-=Math.max(0,i-t),r=i}else r=Date.now();return{delay:e,expected:r+e}},n=function e(t,r,i,o){var n=\"performance\"in self?performance.now():Date.now();n>i?postMessage({id:null,method:\"call\",params:{timerId:r,timerType:o}}):t.set(r,setTimeout(e,i-n,t,r,i,o))},a=function(t,r,i){var a=void 0,s=o(t,i);t=s.delay,a=s.expected,e.set(r,setTimeout(n,t,e,r,a,\"interval\"))},s=function(e,r,i){var a=void 0,s=o(e,i);e=s.delay,a=s.expected,t.set(r,setTimeout(n,e,t,r,a,\"timeout\"))};addEventListener(\"message\",function(e){var t=e.data;try{if(\"clear\"===t.method){var o=t.id,n=t.params,d=n.timerId,l=n.timerType;if(\"interval\"===l)r(d),postMessage({error:null,id:o});else{if(\"timeout\"!==l)throw new Error('The given type \"'+l+'\" is not supported');i(d),postMessage({error:null,id:o})}}else{if(\"set\"!==t.method)throw new Error('The given method \"'+t.method+'\" is not supported');var m=t.params,u=m.delay,p=m.now,v=m.timerId,c=m.timerType;if(\"interval\"===c)a(u,v,p);else{if(\"timeout\"!==c)throw new Error('The given type \"'+c+'\" is not supported');s(u,v,p)}}}catch(e){postMessage({error:{message:e.message},id:t.id,result:null})}})}();";

var blob = new Blob([worker], { type: 'application/javascript' });
var url = URL.createObjectURL(blob);
var workerTimers = workerTimersBroker.load(url);
var clearInterval = workerTimers.clearInterval;
var clearTimeout = workerTimers.clearTimeout;
var setInterval = workerTimers.setInterval;
var setTimeout = workerTimers.setTimeout;

exports.clearInterval = clearInterval;
exports.clearTimeout = clearTimeout;
exports.setInterval = setInterval;
exports.setTimeout = setTimeout;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"worker-timers-broker":43}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseElement = exports.BaseElement = function () {
	function BaseElement() {
		_classCallCheck(this, BaseElement);

		this._position = vec3.create();
		this._velocity = vec3.create();
		this._acceleration = vec3.create();

		this._mass = 1.0;
		this._damping = 1.0;
	}

	_createClass(BaseElement, [{
		key: "applyForce",
		value: function applyForce(_vec) {

			vec3.divide(_vec, _vec, vec3.fromValues(this._mass, this._mass, this._mass));
			vec3.add(this._acceleration, this._acceleration, _vec);
		}
	}, {
		key: "update",
		value: function update(_deltaTime) {

			// if ( !_deltaTime ){

			// 	let _deltaTime = 10;

			// }

			// _deltaTime *= 60 / 1000

			vec3.multiply(this._acceleration, this._acceleration, vec3.fromValues(_deltaTime * 0.01, _deltaTime * 0.01, _deltaTime * 0.01));
			vec3.add(this._velocity, this._velocity, this._acceleration);
			vec3.multiply(this._velocity, this._velocity, vec3.fromValues(this._damping, this._damping, this._damping));
			// vec3.multiply ( this._velocity, this._velocity, vec3.fromValues ( _deltaTime * 0.01, _deltaTime * 0.01, _deltaTime * 0.01 ) )
			vec3.add(this._position, this._position, this._velocity);

			vec3.multiply(this._acceleration, this._acceleration, vec3.fromValues(0, 0, 0));
		}
	}, {
		key: "position",
		set: function set(_position) {

			this._position = _position;
		},
		get: function get() {

			return this._position;
		}
	}, {
		key: "velocity",
		get: function get() {

			return this._velocity;
		}
	}, {
		key: "acceleration",
		get: function get() {

			return this._acceleration;
		}
	}, {
		key: "mass",
		set: function set(_mass) {

			this._mass = _mass;
		},
		get: function get() {

			return this._mass;
		}
	}, {
		key: "damping",
		set: function set(_damping) {

			this._damping = Math.min(Math.max(0.0, _damping), 1.0);
		},
		get: function get() {

			return this._damping;
		}
	}]);

	return BaseElement;
}();

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Particle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseElement2 = require("./BaseElement");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Particle = exports.Particle = function (_BaseElement) {
	_inherits(Particle, _BaseElement);

	function Particle() {
		_classCallCheck(this, Particle);

		var _this = _possibleConstructorReturn(this, (Particle.__proto__ || Object.getPrototypeOf(Particle)).call(this));

		_this._radius = 10.0;

		_this.color = {

			r: 1.0,
			g: 1.0,
			b: 1.0,
			a: 1.0

		};

		_this._lifespan = 10.0;
		_this._lifeLeft = _this._lifespan;

		_this._food = null;
		_this._mood = null;
		_this._timeStamp = null;
		_this._offsetTime = 0;
		_this._staticPosition = null;
		_this._foodWords = null;

		return _this;
	}

	_createClass(Particle, [{
		key: "radius",
		set: function set(_radius) {

			this._radius = _radius;
		},
		get: function get() {

			return this._radius;
		}
	}, {
		key: "color",
		set: function set(_color) {

			this._color = {

				r: _color.r,
				g: _color.g,
				b: _color.b,
				a: _color.a

			};
		},
		get: function get() {

			return this._color;
		}
	}, {
		key: "lifespan",
		set: function set(_lifespan) {

			this._lifespan = _lifespan;
			this._lifeLeft = this._lifespan;
		},
		get: function get() {

			return this._lifespan;
		}
	}, {
		key: "offsetTime",
		set: function set(_offsetTime) {

			this._offsetTime = _offsetTime;
		},
		get: function get() {

			return this._offsetTime;
		}
	}, {
		key: "staticPosition",
		set: function set(_staticPosition) {

			this._staticPosition = _staticPosition;
		},
		get: function get() {

			return this._staticPosition;
		}
	}, {
		key: "lifeLeft",
		get: function get() {

			return this._lifeLeft;
		}
	}, {
		key: "food",
		set: function set(_food) {

			this._food = _food;
		},
		get: function get() {

			return this._food;
		}
	}, {
		key: "mood",
		set: function set(_mood) {

			this._mood = _mood;
		},
		get: function get() {

			return this._mood;
		}
	}, {
		key: "foodWords",
		set: function set(_foodWords) {

			this._foodWords = _foodWords;
		},
		get: function get() {

			return this._foodWords;
		}
	}]);

	return Particle;
}(_BaseElement2.BaseElement);

},{"./BaseElement":45}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VisualizationManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Utils

// Webgl

// Visualization

var _utils = require("../utils");

var _P3D = require("C:/Users/Pietro Alberti/Documents/Code/P3D/P3D");

var _Particle = require("./Particle");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VisualizationManager = exports.VisualizationManager = function () {
	function VisualizationManager(_canvas, _data) {
		var _this = this;

		_classCallCheck(this, VisualizationManager);

		//
		//	Top words
		//

		this._topWordsButton = document.querySelector('#top-word-button');

		this._highlightedWord = null;
		this._topWordsOverlay = document.querySelector('#top-words-overlay');
		this._wordsContainer = document.querySelector('#words-container');
		this._topWords = ['tea', 'kitchen', 'salad', 'corn', 'honey', 'hot', 'milk', 'pie', 'ice cream', 'nut', 'cheese', 'cook', 'cake', 'fat', 'cream', 'chocolate', 'breakfast', 'pizza', 'coffee', 'lunch', 'hungry', 'chicken', 'drink', 'ice', 'dinner'];

		(0, _utils.addEvent)(this._topWordsButton, 'click', function () {

			this._topWordsOverlay.style.opacity = 1;
			this._topWordsOverlay.style.pointerEvents = 'auto';
		}.bind(this));

		//
		// Fill the overlay with top words.
		//

		var _loop = function _loop(i) {

			var newWord = document.createElement('div');
			newWord.className = 'word';
			var newContent = document.createElement('p');
			newContent.innerHTML = _this._topWords[i];

			var self = _this;

			(0, _utils.addEvent)(newContent, 'click', function () {

				self._highlightedWord = this.innerHTML;
				self._topWordsOverlay.style.opacity = 0;
				self._topWordsOverlay.style.pointerEvents = 'none';

				var wordsButton = document.querySelectorAll('.word p');

				for (var j = 0; j < wordsButton.length; j++) {

					wordsButton[j].className = wordsButton[j].className.replace('active-word', '');
				}

				content.className = '';

				document.querySelector('selector');

				this.className += 'active-word';
			});

			newWord.appendChild(newContent);

			_this._wordsContainer.appendChild(newWord);
		};

		for (var i = 0; i < this._topWords.length; i++) {
			_loop(i);
		}

		this._wordsContainer.appendChild(document.createElement('br'));

		var nullButton = document.createElement('div');
		nullButton.className = 'word';
		var content = document.createElement('p');
		content.className = 'active-word';
		content.innerHTML = 'reset';
		nullButton.appendChild(content);

		(0, _utils.addEvent)(content, 'click', function () {

			var wordsButton = document.querySelectorAll('.word p');

			for (var j = 0; j < wordsButton.length; j++) {

				wordsButton[j].className = wordsButton[j].className.replace('active-word', '');
			}

			this._topWordsOverlay.style.opacity = 0;
			this._topWordsOverlay.style.pointerEvents = 'none';
			content.className = 'active-word';

			this._highlightedWord = null;
		}.bind(this));

		this._wordsContainer.appendChild(nullButton);

		(0, _utils.addEvent)(this._wordsContainer, 'click', function () {}.bind(this));

		//
		// Emojis classification
		//

		this._emotions = {

			anger: ['🙅', '👹', '👺', '👊', '😈', '👿', '😡', '😠', '😤', '😒', '😾'],
			anticipation: ['🙋', '💁', '🙌', '🙏', '💪', '👀', '🙇', '✋', '✊', '😏', '😼'],
			joy: ['😎', '😛', '😝', '😜', '😺', '😹', '😸', '😄', '😌', '😃', '😂', '😁', '😀', '😆', '😋', '😊', '😉', '💃', '👅', '👯', '🎊', '🎉', '👑'],
			trust: ['👼', '👐', '👍', '👌', '👏', '👋', '😎', '😍', '💙', '💘', '💛', '💚', '💝', '💜', '💟', '💞', '💑', '💐', '💓', '💒', '💕', '💗', '💖', '💋', '💌', '💏', '👄', '😚', '😙', '😘', '😻', '♡', '♥', '👪', '👫', '👬', '👭', '😽', '😇'],
			fear: ['🙀', '💀', '😟', '😲', '😱', '😰', '😶', '😵', '😨', '😧', '😦', '😥', '🙎'],
			surprise: ['😳', '🙈', '🙉', '🙊', '😛', '😝', '😜', '😅', '😮', '😬', '😯', '🙆'],
			sadness: ['💔', '😞', '😖', '😔', '😕', '😿', '😫', '😩', '😭', '😣', '😢', '😟', '🙍'],
			disgust: ['👻', '💩', '😓', '😑', '😐', '😪', '😷', '😴', '👎']

		};

		this._emotionsKeys = Object.keys(this._emotions);

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
		this._renderer = new _P3D.P3D.WebGlRenderer({ canvas: _canvas, resolution: 0.5, width: window.innerWidth, height: window.innerHeight });

		// Get the webgl context out of the canvas.

		this._gl = this._renderer.createContext();
		this._gl.viewport(0, 0, this._gl.drawingBufferWidth, this._gl.drawingBufferHeight);
		this._gl.clearColor(0.9, 0.9, 0.9, 1.0);
		this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
		this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
		this._gl.enable(this._gl.BLEND);

		//
		// Main variables.
		//

		this._mouse = vec3.create();
		this._particles = [];
		this._currentParticles = [];

		//
		// Scene initialization
		//

		this._mainScene = new _P3D.P3D.Scene({ context: this._gl, name: 'Main scene' });

		//
		// Rendering cameras
		//

		this._mainCamera = new _P3D.P3D.OrthoCamera({ context: this._gl, width: this._renderer.realWidth, height: this._renderer.realHeight, nearClipPlane: -400, farClipPlane: 400 });
		this._mainCamera.position[2] = -1;
		this._mainCamera.lookAt(vec3.fromValues(0, 0, 0));

		//
		// Custom object that facilitate material creation.
		//

		this._ml = new _P3D.P3D.MaterialHelper({ context: this._gl });

		//
		// Visualizations values.
		//

		this._play = true;
		this._minDate = 0;
		this._maxDate = 0;
		this._time = 0;
		this._timeRange = 80000000;
		this._epochContainer = document.querySelector('#epoch');
		this._timeContainer = document.querySelector('#time');
		this._timeLine = document.querySelector('#timeline');
		this._cursor = document.querySelector('#cursor');
		this._cursorLocked = false;

		this._notFound = {};

		// Hover

		this._hoverTime = null;
		this._hoverParticle = null;

		console.log(_data);

		for (var i = 0; i < _data.length; i++) {

			var _content = _data[i];

			if (!_content.foodWords2) _content.foodWords2 = [];

			if (_utils.contains.call(_content.foodWords, 'honey') || _utils.contains.call(_content.foodWords2, 'honey')) {

				console.log(_content.text);
			}
		}
	}

	_createClass(VisualizationManager, [{
		key: "onMouseDown",
		value: function onMouseDown(_position) {}
	}, {
		key: "onMouseUp",
		value: function onMouseUp(_position) {

			this._cursorLocked = false;
		}
	}, {
		key: "onClick",
		value: function onClick(_position) {}
	}, {
		key: "onMouseMove",
		value: function onMouseMove(_position) {

			this._mouse = vec3.fromValues(_position[0] / window.innerWidth * this._renderer.realWidth, _position[1] / window.innerHeight * this._renderer.realHeight, 0);

			if (this._cursorLocked) {

				var percent = (_position[0] - this._timeLine.offsetLeft) / this._timeLine.offsetWidth;
				this._cursor.style.left = (0, _utils.clamp)(percent * 100, 0, 100) + '%';
				this._time = (0, _utils.clamp)(this._minDate + percent * (this._maxDate - this._minDate), this._minDate, this._maxDate);
			}

			// console.log(this._currentParticles[ 0 ]);

			for (var i = 0; i < this._currentParticles.length; i++) {

				var currentPosition = this._currentParticles[i].position;
				var distance = vec3.create();
				vec3.subtract(distance, this._mouse, currentPosition);
				distance = vec3.length(distance);

				if (distance < 10) {

					// console.log('hover');

				}
			}
		}
	}, {
		key: "onResize",
		value: function onResize() {

			// Update the renderer's size.

			this._renderer.width = window.innerWidth;
			this._renderer.height = window.innerHeight;

			// Update the cameras.

			this._mainCamera.position = vec3.fromValues(0.0, 0.0, -4);
			mat4.ortho(this._mainCamera.pMatrix, 0, -this._renderer.realWidth, this._renderer.realHeight, 0, -400, 400);

			// Update the viewport

			this._gl.viewport(0, 0, this._renderer.realWidth, this._renderer.realHeight);

			this.background.position = vec3.fromValues(this._renderer.realWidth * 0.5, this._renderer.realHeight * 0.48, 0.0);
			var minRadius = this._renderer.realHeight < this._renderer.realWidth ? this._renderer.realHeight : this._renderer.realWidth;
			this.background.scale = vec3.fromValues(minRadius * 0.9, minRadius * 0.9, 1.0);
		}
	}, {
		key: "setup",
		value: function setup() {

			this.background = _P3D.P3D.CreateMeshFromObj(this._gl, _P3D.P3D.Quad([0, 0, 0], [1, 1, 1]));
			this.background.position = vec3.fromValues(this._renderer.realWidth * 0.5, this._renderer.realHeight * 0.48, 0.0);
			var minRadius = this._renderer.realHeight < this._renderer.realWidth ? this._renderer.realHeight : this._renderer.realWidth;
			this.background.scale = vec3.fromValues(minRadius * 0.9, minRadius * 0.9, 1.0);
			this.background.rotation[1] = Math.PI;
			this.background.rotation[2] = Math.PI;
			this.background.material = this._ml.uColoredTexturedTriangles();
			this.background.material.uniforms.solidColor = {

				type: 'vec4',
				data: vec4.fromValues(1.0, 1.0, 1.0, 1.0)

			};
			this.background.material.imageUrl = "./resources/textures/background.png";

			this._mainScene.add(this.background);

			// Set time line event

			var self = this;

			(0, _utils.addEvent)(this._timeLine, 'mousedown', function () {

				this._cursorLocked = true;
			}.bind(this));

			(0, _utils.addEvent)(this._timeLine, 'mousemove', function (event) {});

			(0, _utils.addEvent)(this._timeLine, 'mouseup', function () {}.bind(this));

			// Get the time of the first tweet.

			this._minDate = this._data[0].timeSinceEpoch - this._timeRange * 0.5;
			this._maxDate = this._data[this._data.length - 1].timeSinceEpoch + this._timeRange * 0.5;

			console.log('Min date: ', new Date(this._minDate), this._minDate);
			console.log('Max date: ', new Date(this._maxDate), this._maxDate);

			this._time = this._minDate;

			var d = new Date(this._time);

			// Create the main mesh containing all the particles.

			for (var i = this._data.length - 1; i >= 0; i--) {
				// for ( let i = 0; i >= 0; i -- ) {

				var maxRadius = window.innerWidth / 2 < window.innerHeight / 2 ? window.innerWidth / 2 : window.innerHeight / 2;
				var center = vec3.fromValues(window.innerWidth / 2, window.innerHeight / 2, 0);

				var emotionsNum = 8;
				var emotionAverage = 0;
				var numFound = 0;
				var notFound = [];
				var found = [];
				var foodWords = [];

				if (this._data[i].foodWords2) {

					foodWords = foodWords.concat(this._data[i].foodWords, this._data[i].foodWords2);
				} else {

					foodWords = this._data[i].foodWords;
				}

				for (var j = 0; j < this._data[i].emojis.length; j++) {

					var f = false;
					var emotionIndex = 0;

					for (var e in this._emotions) {

						if (_utils.contains.call(this._emotions[e], this._data[i].emojis[j])) {

							emotionAverage += emotionIndex;
							numFound++;
							found.push(this._data[i].emojis[j]);
							f = true;
						}

						emotionIndex++;
					}

					if (!f) {

						notFound.push(this._data[i].emojis[j]);
						if (!this._notFound[this._data[i].emojis[j]]) {

							this._notFound[this._data[i].emojis[j]] = { used: 1 };
						} else {

							this._notFound[this._data[i].emojis[j]].used++;
						}
					}
				}

				emotionAverage /= numFound;
				// console.log('-----');
				// console.log(this._data[ i ].emojis.join());
				// console.log('found: ' + found.join() + ' not found: ' + notFound.join());
				// console.log(emotionAverage , this._emotionsKeys[ Math.floor ( emotionAverage ) ]);

				var step = Math.PI * 2 / 8;
				var angle = step * emotionAverage;
				angle += step * (Math.random() - 0.5);
				angle += Math.PI;
				var distanceFromCenter = Math.random() * maxRadius;

				var position = vec3.fromValues(this._renderer.realWidth * 0.5, this._renderer.realHeight * 0.5, 0);
				var direction = vec3.fromValues(Math.cos(angle), Math.sin(angle), 0);
				// vec3.subtract ( direction, center, direction );
				// vec3.normalize ( direction, direction );

				var particle = new _Particle.Particle();
				particle.direction = vec3.clone(direction);
				particle.position = vec3.clone(position);
				particle.originalPosition = vec3.clone(position);
				particle.damping = 0.8;
				particle.mass = Math.random() + 4;
				particle.radiusMultiplier = Math.random();
				particle.dataIndex = i;
				this._data[i]['emotionAverage'] = emotionAverage;
				particle.foodWords = foodWords;

				var randomGreyValue = Math.random() * 0.10 + 0.53;

				var h = angle / (Math.PI * 2.0) - 1.55;
				var s = 0.68;
				var l = randomGreyValue;

				var color = {

					r: (0, _utils.hslToRgb)(h, s, l)[0],
					g: (0, _utils.hslToRgb)(h, s, l)[1],
					b: (0, _utils.hslToRgb)(h, s, l)[2],
					a: 1.0

				};

				particle.color = color;
				var si = Math.random() * 35 + 25;
				particle.size = [si, 0, 0];

				if (this._particles.length < 10000 && numFound > 0) this._particles.push(particle);
			}

			for (var _i = 0; _i < 12; _i++) {

				var _angle = Math.PI * 2 / 12 * _i / (Math.PI * 2);
				var _s = 0.78;
				var _l = 0.73;
			}

			//
			// Data set analysis
			//

			var sortable = [];

			for (var _e in this._notFound) {

				sortable.push({ emoji: _e, used: this._notFound[_e].used });
			}

			sortable.sort(function (a, b) {

				return b.used - a.used;
			});

			var jsonNotFound = {};

			for (var _i2 = 0; _i2 < sortable.length; _i2++) {

				jsonNotFound[sortable[_i2].emoji] = sortable[_i2].used;
			}

			//
			// -----------------------------
			//

			var particlesGeometry = new _P3D.P3D.Geometry({ context: this._gl });
			particlesGeometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: this._gl, name: 'position', data: new Float32Array([]) }));
			particlesGeometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: this._gl, name: 'color', data: new Float32Array([]) }));
			particlesGeometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: this._gl, name: 'normal', data: new Float32Array([]) }));

			var m = this._ml.vertexColorPointSprites();
			// m = this._ml.points();

			var particlesMesh = new _P3D.P3D.Mesh({ context: this._gl, name: 'particles', geometry: particlesGeometry, material: m });
			particlesMesh.material.imageUrl = './resources/textures/sprite.png';
			particlesMesh.material.depthTest = false;

			this._mainScene.add(particlesMesh);

			var highlightedParticlesGeometry = new _P3D.P3D.Geometry({ context: this._gl });
			highlightedParticlesGeometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: this._gl, name: 'position', data: new Float32Array([]) }));
			highlightedParticlesGeometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: this._gl, name: 'color', data: new Float32Array([]) }));
			highlightedParticlesGeometry.addBufferAttribute(new _P3D.P3D.BufferAttribute({ context: this._gl, name: 'normal', data: new Float32Array([]) }));

			var highlightedParticlesMesh = new _P3D.P3D.Mesh({ context: this._gl, name: 'highlightedParticles', geometry: highlightedParticlesGeometry, material: this._ml.vertexColorPointSprites() });
			highlightedParticlesMesh.material.imageUrl = './resources/textures/sprite.png';
			highlightedParticlesMesh.material.depthTest = false;

			this._mainScene.add(highlightedParticlesMesh);
		}
	}, {
		key: "update",
		value: function update(_delta) {

			if (!this._enableUpdating) return;

			// Update particles

			this._currentParticles = [];
			var particlesMesh = this._mainScene.getChildByName('particles');
			var particlesGeometry = particlesMesh.geometry;

			var highlightedParticlesGeometry = null;

			if (this._mainScene.getChildByName('highlightedParticles')) {

				highlightedParticlesGeometry = this._mainScene.getChildByName('highlightedParticles').geometry;
			}

			var newPositions = [];

			var numCurrentTweets = 0;

			var drawnParticles = [];
			var drawnNormals = [];
			var drawnColors = [];

			var highlightedDrawnParticles = [];
			var highlightedDrawnNormals = [];
			var highlightedDrawnColors = [];

			var hoverParticle = false;

			var center = vec3.fromValues(this._renderer.realWidth * 0.5, this._renderer.realHeight * 0.5, 0);
			var mouseTime = 0;
			var distanceToCenter = vec3.create();
			vec3.subtract(distanceToCenter, this._mouse, center);
			distanceToCenter = vec3.length(distanceToCenter);
			mouseTime = distanceToCenter / (this._renderer.realHeight * 0.5);
			mouseTime = this._time + mouseTime * this._timeRange;

			var minRadius = this._renderer.realHeight < this._renderer.realWidth ? this._renderer.realHeight : this._renderer.realWidth;

			for (var i = 0; i < this._particles.length; i++) {

				var di = this._particles[i].dataIndex;

				var t = this._time;
				var pT = this._data[di].timeSinceEpoch;

				var pMin = pT - this._timeRange * 0.5;
				var pMax = pT + this._timeRange * 0.5;

				var d = 0;

				if (t >= pMin && t <= pMax) {

					var currentParticle = this._particles[i];
					this._currentParticles.push(currentParticle);
					var currentPosition = vec3.clone(currentParticle.position);

					var direction = vec3.create();
					vec3.subtract(direction, currentPosition, this._mouse);
					var distance = vec3.length(direction);
					vec3.normalize(direction, direction);

					var mouseForce = vec3.clone(direction);
					vec3.multiply(mouseForce, mouseForce, vec3.fromValues(20000, 20000, 0));

					var centerForce = vec3.create();
					vec3.subtract(centerForce, center, currentPosition);
					vec3.multiply(centerForce, centerForce, vec3.fromValues(0.1, 0.1, 0.1));

					// The force decrease according to the distance between the mouse and the particle.

					vec3.divide(mouseForce, mouseForce, vec3.fromValues(distance, distance, distance));

					d = (t - pMin) / (pMax - pMin);
					d *= minRadius * 0.41;

					var p = vec3.create();
					vec3.multiply(p, currentParticle.direction, vec3.fromValues(d, d, 1));
					vec3.add(p, p, center);

					var mousePDistance = vec3.create();
					vec3.subtract(mousePDistance, p, this._mouse);
					mousePDistance = vec3.length(mousePDistance);

					var x = noise.simplex2(p[0] * 0.002 + this._time * 0.00000001, p[1] * 0.002 + this._time * 0.00000001);
					var y = noise.simplex2((p[0] + 10) * 0.002 + this._time * 0.00000001, (p[1] + 20) * 0.002 + this._time * 0.00000001);
					var noiseForce = vec3.fromValues(x, y, 0);
					vec3.scale(noiseForce, noiseForce, 10);

					if (mousePDistance < 40 && !hoverParticle) {

						hoverParticle = true;
						p = this._mouse;

						document.querySelector('#info').innerHTML = '';

						var usedFoodWords = [];

						for (var j = 0; j < currentParticle.foodWords.length; j++) {

							if (!_utils.contains.call(usedFoodWords, currentParticle.foodWords[j])) {

								document.querySelector('#info').innerHTML += '#' + currentParticle.foodWords[j] + '<br>';
								usedFoodWords.push(currentParticle.foodWords[j]);
							}
						}

						var usedEmojis = [];

						for (var _j = 0; _j < this._data[di].emojis.length; _j++) {

							if (!_utils.contains.call(usedEmojis, this._data[di].emojis[_j])) {

								document.querySelector('#info').innerHTML += this._data[di].emojis[_j];
								usedEmojis.push(this._data[di].emojis[_j]);
							}
						}
					} else {

						this._particles.offsetTime = 0;
						this._particles[i].applyForce(mouseForce);
						this._particles[i].applyForce(noiseForce);
					}

					var staticForce = vec3.create();
					vec3.subtract(staticForce, p, currentPosition);
					vec3.multiply(staticForce, staticForce, vec3.fromValues(1, 1, 0));
					this._particles[i].applyForce(staticForce);

					this._particles[i].update(_delta);

					drawnParticles.push(this._particles[i].position[0]);
					drawnParticles.push(this._particles[i].position[1]);
					drawnParticles.push(this._particles[i].position[2]);

					var pC = Math.pow((t - pMin) / (pMax - pMin), 10);
					var iPc = 1 - pC;
					var iPc2 = Math.pow(1 - (t - pMin) / (pMax - pMin), 10);
					var colorPercent = 1 - (pC + iPc2);

					if (this._highlightedWord && _utils.contains.call(currentParticle.foodWords, this._highlightedWord)) {

						highlightedDrawnParticles.push(this._particles[i].position[0]);
						highlightedDrawnParticles.push(this._particles[i].position[1]);
						highlightedDrawnParticles.push(this._particles[i].position[2]);

						highlightedDrawnColors.push(this._particles[i].color.r * colorPercent + 0.9 * (1 - colorPercent));
						highlightedDrawnColors.push(this._particles[i].color.g * colorPercent + 0.9 * (1 - colorPercent));
						highlightedDrawnColors.push(this._particles[i].color.b * colorPercent + 0.9 * (1 - colorPercent));
						highlightedDrawnColors.push(colorPercent);

						highlightedDrawnNormals.push(this._particles[i].size[0] / window.innerWidth * this._renderer.realWidth * (colorPercent * 0.5 + 0.5));
						highlightedDrawnNormals.push(this._particles[i].size[1]);
						highlightedDrawnNormals.push(this._particles[i].size[2]);
					}

					if (!this._highlightedWord) {

						drawnColors.push(this._particles[i].color.r * colorPercent + 0.9 * (1 - colorPercent));
						drawnColors.push(this._particles[i].color.g * colorPercent + 0.9 * (1 - colorPercent));
						drawnColors.push(this._particles[i].color.b * colorPercent + 0.9 * (1 - colorPercent));
						drawnColors.push(colorPercent);
					} else {

						var greyValue = this._particles[i].color.r * this._particles[i].color.g * this._particles[i].color.b + 0.6;

						drawnColors.push(greyValue * colorPercent + 0.9 * (1 - colorPercent));
						drawnColors.push(greyValue * colorPercent + 0.9 * (1 - colorPercent));
						drawnColors.push(greyValue * colorPercent + 0.9 * (1 - colorPercent));
						drawnColors.push(colorPercent);
					}

					drawnNormals.push(this._particles[i].size[0] / window.innerWidth * this._renderer.realWidth * (colorPercent * 0.5 + 0.5));
					drawnNormals.push(this._particles[i].size[1]);
					drawnNormals.push(this._particles[i].size[2]);

					numCurrentTweets++;
				}
			}

			if (!hoverParticle) {

				document.querySelector('#info').innerHTML = '';

				this._hoverTime = this._time;

				// Update time

				var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
				var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

				if (this._time >= this._minDate && this._time <= this._maxDate) {

					if (this._play && !this._cursorLocked) this._time += _delta * 60 * 60;
					var newTime = new Date(this._time);
					this._epochContainer.innerHTML = newTime.getHours() + ':' + newTime.getMinutes();
					this._timeContainer.innerHTML = newTime.getDate() + ' ' + months[newTime.getMonth()] + ' ' + newTime.getFullYear();
					this._cursor.style.left = (this._time - this._minDate) / (this._maxDate - this._minDate) * 100 + '%';
				}
			} else {}

			// Update the buffer that holds vertices positions.

			particlesGeometry.bufferAttributes.position.setData(new Float32Array(drawnParticles), this._gl.DYNAMIC_DRAW);
			particlesGeometry.bufferAttributes.normal.setData(new Float32Array(drawnNormals), this._gl.DYNAMIC_DRAW);
			particlesGeometry.bufferAttributes.color.setData(new Float32Array(drawnColors), this._gl.DYNAMIC_DRAW);

			if (this._mainScene.getChildByName('highlightedParticles')) {

				highlightedParticlesGeometry.bufferAttributes.position.setData(new Float32Array(highlightedDrawnParticles), this._gl.DYNAMIC_DRAW);
				highlightedParticlesGeometry.bufferAttributes.normal.setData(new Float32Array(highlightedDrawnNormals), this._gl.DYNAMIC_DRAW);
				highlightedParticlesGeometry.bufferAttributes.color.setData(new Float32Array(highlightedDrawnColors), this._gl.DYNAMIC_DRAW);
			}
		}
	}, {
		key: "render",
		value: function render() {

			if (!this._enableRendering) return;

			this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
			this._mainScene.render(this._mainCamera);
		}
	}, {
		key: "enableUpdating",
		set: function set(_enableUpdating) {

			this._enableUpdating = _enableUpdating;
		},
		get: function get() {

			return this._enableUpdating;
		}
	}, {
		key: "enableRendering",
		set: function set(_enableRendering) {

			this._enableRendering = _enableRendering;
		},
		get: function get() {

			return this._enableRendering;
		}
	}, {
		key: "play",
		set: function set(_play) {

			this._play = _play;
		},
		get: function get() {

			return this._play;
		}
	}]);

	return VisualizationManager;
}();

},{"../utils":49,"./Particle":46,"C:/Users/Pietro Alberti/Documents/Code/P3D/P3D":13}],48:[function(require,module,exports){
"use strict";

var _utils = require("./utils");

var _VisualizationManager = require("./VisualizationElements/VisualizationManager");

// Utils

var workerTimer = require('worker-timers');

// Data visualization

(function () {

	function convertTimeSinceEpochToDays(_timeSinceEpoch) {

		return _timeSinceEpoch / 1000 / 60 / 60 / 24;
	}

	// Load and parse data.

	var data = [];
	var loadIndex = 0;
	var totalResources = 30;
	var loadingBar = document.querySelector('.loading-bar .bar');

	WorkerTimer.setInterval(function () {
		console.log("lsdhlkjhl");
	}, 1000);

	console.log('-------LOADING DATA-------');
	console.log('--------------------------');

	for (var i = 0; i < totalResources; i++) {

		(function (index) {

			if (index == 18 || index == 19 || index == 1) {

				loadIndex++;

				return;
			}

			(0, _utils.ajax)('./resources/data/emojiOutfile_' + index + '.json', function (error, response) {

				if (!error) {

					var tempData = JSON.parse(response.response);

					var count = 0;
					var minDate = Infinity;
					var maxDate = 0;

					for (var user in tempData) {

						tempData[user]['timeSinceEpoch'] *= 1000;
						if (minDate > tempData[user]['timeSinceEpoch']) minDate = tempData[user]['timeSinceEpoch'];
						if (maxDate < tempData[user]['timeSinceEpoch']) maxDate = tempData[user]['timeSinceEpoch'];
						count++;
						if (tempData[user]['timeSinceEpoch'] > 1476136798246 && tempData[user]['timeSinceEpoch'] < 1476679478473) data.push(tempData[user]);
						// if ( data.length < 200 ) data.push ( tempData[ user ] );
						// data.push ( tempData[ user ] );
					}

					var minDateObject = new Date(minDate);
					var maxDateObject = new Date(maxDate);

					// console.log('emojiOutfile_' + index + '.json');
					// console.log( minDateObject.getDate() + '.' + minDateObject.getMonth() + '.' + minDateObject.getFullYear() + ' -', maxDateObject.getDate() + '.' + maxDateObject.getMonth() + '.' + maxDateObject.getFullYear());
					// console.log( '   ' + count + ' tweets' );
					// console.log( '   ' + Math.floor( count / convertTimeSinceEpochToDays( maxDate - minDate ) ) + ' tweets per day' );
					// console.log('--------------------------');

					loadIndex++;

					loadingBar.style.width = '0%';

					// Finished loading.

					if (loadIndex == totalResources) {

						// Sort all that data by time since epoch field.

						data.sort(function (a, b) {

							return a['timeSinceEpoch'] - b['timeSinceEpoch'];
						});

						console.log('Data loaded successfully!');
						console.log('Tweets: ' + data.length);

						setupApp();

						var loadingScreen = document.querySelector('#loading-screen');
						loadingScreen.style.opacity = 0;

						(0, _utils.addEvent)(loadingScreen, 'transitionend', function () {

							loadingScreen.style.display = 'none';
						});
					}
				} else {

					loadIndex++;
					console.error(error);
				}
			});
		})(i);
	}

	function setupApp() {

		var run = true;
		var canvas = document.querySelector('#canvas');
		var visualizationManager = new _VisualizationManager.VisualizationManager(canvas, data);
		visualizationManager.setup();

		// Initialize user events.

		(0, _utils.addEvent)(window, 'mousedown', function (event) {

			visualizationManager.onMouseDown(vec2.fromValues(event.clientX, event.clientY));
		});

		(0, _utils.addEvent)(window, 'mouseup', function (event) {

			visualizationManager.onMouseUp(vec2.fromValues(event.clientX, event.clientY));
		});

		(0, _utils.addEvent)(window, 'mousemove', function (event) {

			visualizationManager.onMouseMove(vec2.fromValues(event.clientX, event.clientY));
		});

		(0, _utils.addEvent)(window, 'click', function (event) {

			visualizationManager.onClick(vec2.fromValues(event.clientX, event.clientY));
		});

		(0, _utils.addEvent)(window, 'resize', function () {

			visualizationManager.onResize();
		});

		//
		// Check if the window visibility has changed.
		//

		(0, _utils.addEvent)(window, 'focus', function () {

			run = true;
			visualizationManager.enableUpdating = true;
			visualizationManager.enableRendering = true;
			last = performance.now();

			setTimeout(function () {

				maxDelta = 1000 / 60;
				minDelta = 1000 / 60;
			}, 500);

			requestAnimationFrame(mainLoop);
		});

		(0, _utils.addEvent)(window, 'blur', function () {

			run = false;
			visualizationManager.enableUpdating = false;
			visualizationManager.enableRendering = false;
		});

		//
		// Cross browser performance now.
		//

		var performance = window.performance || {};

		performance.now = function () {

			var _now = Date.now();

			return performance.now || performance.webkitNow || performance.msNow || performance.oNow || performance.mozNow || function () {
				return Date.now() - _now;
			};
		}();

		//
		// Rendering performances.
		//

		var performanceContainer = document.querySelector('#performance');

		(0, _utils.addEvent)(performanceContainer, 'click', function (event) {

			visualizationManager.play = !visualizationManager.play;
		});

		var time = performance.now();
		var updateRate = 200; // ms
		var last = time;
		var targetDelta = 1000 / 60;
		var delta = 1000 / 60;
		var maxDelta = delta;
		var minDelta = delta;

		// Reset high and low frame rate after 500 ms to get rid off the first frames.

		setTimeout(function () {

			maxDelta = 1000 / 60;
			minDelta = 1000 / 60;
		}, 500);

		//
		// Setup the main loop.
		//

		function mainLoop() {

			var now = performance.now();
			delta = now - last;

			if (delta > maxDelta) {

				maxDelta = delta;
			}

			if (delta < minDelta) {

				minDelta = delta;
			}

			last = now;

			if (now > time + updateRate) {

				performanceContainer.innerHTML = 'fps: ' + Math.floor(1000 / delta) + '<br> low:' + Math.floor(1000 / maxDelta) + '<br> high:' + Math.floor(1000 / minDelta);
				time += updateRate;
			}

			visualizationManager.update(delta);
			visualizationManager.render(delta);

			if (run) requestAnimationFrame(mainLoop);
		}

		//
		// Start the main loop.
		//

		mainLoop();
	}
})();

},{"./VisualizationElements/VisualizationManager":47,"./utils":49,"worker-timers":44}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.ajax = ajax;
exports.guid = guid;
exports.hslToRgb = hslToRgb;
exports.map_range = map_range;
exports.contains = contains;
exports.clamp = clamp;
function addEvent(elem, event, fn) {

    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions

    function listenHandler(e) {

        var ret = fn.apply(this, arguments);

        if (ret === false) {

            e.stopPropagation();
            e.preventDefault();
        }

        return ret;
    }

    function attachHandler() {

        // set the this pointer same as addEventListener when fn is called
        // and make sure the event is passed to the fn also so that works the same too

        var ret = fn.call(elem, window.event);

        if (ret === false) {

            window.event.returnValue = false;
            window.event.cancelBubble = true;
        }

        return ret;
    }

    if (elem.addEventListener) {

        elem.addEventListener(event, listenHandler, false);
        return { elem: elem, handler: listenHandler, event: event };
    } else {

        elem.attachEvent("on" + event, attachHandler);
        return { elem: elem, handler: attachHandler, event: event };
    }
}

function removeEvent(token) {

    if (token.elem.removeEventListener) {

        token.elem.removeEventListener(token.event, token.handler);
    } else {

        token.elem.detachEvent("on" + token.event, token.handler);
    }
}

function ajax(_url, _callback) {

    var request = new XMLHttpRequest();
    request.open('GET', _url, true);

    request.onload = function () {

        if (request.status < 200 || request.status > 299) {

            _callback('Error: Http status' + request.status + ' on resource ' + _url);
        } else {

            _callback(null, request);
        }
    };

    request.send();
}

function guid() {

    function s4() {

        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function hslToRgb(h, s, l) {

    var r, g, b;

    if (s == 0) {

        r = g = b = l; // achromatic
    } else {

        var hue2rgb = function hue2rgb(p, q, t) {

            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r, g, b];
}

function map_range(value, low1, high1, low2, high2) {

    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function contains(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function indexOf(needle) {
            var i = -1,
                index = -1;

            for (i = 0; i < this.length; i++) {
                var item = this[i];

                if (findNaN && item !== item || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

function clamp(value, min, max) {

    return Math.min(Math.max(value, min), max);
};

},{}]},{},[48]);
