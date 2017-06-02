(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"worker-timers-broker":1}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./BaseElement":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.VisualizationManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Utils

// Visualization

var _utils = require("../utils");

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
		this._renderer = new P3D.WebGlRenderer({ canvas: _canvas, resolution: 0.5, width: window.innerWidth, height: window.innerHeight });

		// Get the webgl context out of the canvas.

		this._gl = this._renderer.createContext();
		this._gl.viewport(0, 0, this._gl.drawingBufferWidth, this._gl.drawingBufferHeight);
		this._gl.clearColor(0.9, 0.9, 0.9, 1.0);
		this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
		this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
		this._gl.enable(this._gl.BLEND);

		console.log(this._gl);

		//
		// Main variables.
		//

		this._mouse = vec3.create();
		this._particles = [];
		this._currentParticles = [];

		//
		// Scene initialization
		//

		this._mainScene = new P3D.Scene({ context: this._gl, name: 'Main scene' });

		//
		// Rendering cameras
		//

		this._mainCamera = new P3D.OrthoCamera({ context: this._gl, width: this._renderer.realWidth, height: this._renderer.realHeight, nearClipPlane: -400, farClipPlane: 400 });
		this._mainCamera.position[2] = -1;
		this._mainCamera.lookAt(vec3.fromValues(0, 0, 0));

		//
		// Custom object that facilitate material creation.
		//

		this._ml = new P3D.MaterialHelper({ context: this._gl });

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

			this.background = P3D.CreateMeshFromObj(this._gl, P3D.Quad([0, 0, 0], [1, 1, 1]));
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

			var particlesGeometry = new P3D.Geometry({ context: this._gl });
			particlesGeometry.addBufferAttribute(new P3D.BufferAttribute({ context: this._gl, name: 'position', data: new Float32Array([]) }));
			particlesGeometry.addBufferAttribute(new P3D.BufferAttribute({ context: this._gl, name: 'color', data: new Float32Array([]) }));
			particlesGeometry.addBufferAttribute(new P3D.BufferAttribute({ context: this._gl, name: 'normal', data: new Float32Array([]) }));

			var m = this._ml.vertexColorPointSprites();
			// m = this._ml.points();

			var particlesMesh = new P3D.Mesh({ context: this._gl, name: 'particles', geometry: particlesGeometry, material: m });
			particlesMesh.material.imageUrl = './resources/textures/sprite.png';
			particlesMesh.material.depthTest = false;

			this._mainScene.add(particlesMesh);

			var highlightedParticlesGeometry = new P3D.Geometry({ context: this._gl });
			highlightedParticlesGeometry.addBufferAttribute(new P3D.BufferAttribute({ context: this._gl, name: 'position', data: new Float32Array([]) }));
			highlightedParticlesGeometry.addBufferAttribute(new P3D.BufferAttribute({ context: this._gl, name: 'color', data: new Float32Array([]) }));
			highlightedParticlesGeometry.addBufferAttribute(new P3D.BufferAttribute({ context: this._gl, name: 'normal', data: new Float32Array([]) }));

			var highlightedParticlesMesh = new P3D.Mesh({ context: this._gl, name: 'highlightedParticles', geometry: highlightedParticlesGeometry, material: this._ml.vertexColorPointSprites() });
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

},{"../utils":7,"./Particle":4}],6:[function(require,module,exports){
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

},{"./VisualizationElements/VisualizationManager":5,"./utils":7,"worker-timers":2}],7:[function(require,module,exports){
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

},{}]},{},[6]);
