// Utils

import { hslToRgb, addEvent, removeEvent, ajax } from "./utils";

// Data visualization

import { VisualizationManager } from "./VisualizationElements/VisualizationManager";
let THREE = require ( 'three' );
let workerTimer = require( 'worker-timers' );

( function(){

	window.getDevicePixelRatio = function () {
	    
	    var ratio = 1;
	    // To account for zoom, change to use deviceXDPI instead of systemXDPI
	    if (window.screen.systemXDPI !== undefined && window.screen.logicalXDPI       !== undefined && window.screen.systemXDPI > window.screen.logicalXDPI) {
	        // Only allow for values > 1
	        ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
	    }
	    else if (window.devicePixelRatio !== undefined) {
	        ratio = window.devicePixelRatio;
	    }
	    return ratio;
	    
	};

	function convertTimeSinceEpochToDays ( _timeSinceEpoch ) {

		return ( ( ( _timeSinceEpoch / 1000 ) / 60 ) / 60 ) / 24;

	}

	// Load and parse data.

	let data = [];
	let loadIndex = 0;
	let totalResources = 30;
	let loadingBar = document.querySelector('.loading-bar .bar');

	console.log('-------LOADING DATA-------');
	console.log('--------------------------');

	for ( let i = 0; i < totalResources; i ++ ) {

		( function ( index ) {

			if ( index == 18 || index == 19 || index == 1 ){

				loadIndex ++;

				return;

			}

			ajax ( './resources/data/emojiOutfile_' + index + '.json', function ( error, response ) {

				if ( !error ) {

					let tempData = JSON.parse ( response.response );

					let count = 0;
					let minDate = Infinity;
					let maxDate = 0;

					for ( let user in tempData ) {

						tempData[ user ][ 'timeSinceEpoch' ] *= 1000;
						if ( minDate > tempData[ user ][ 'timeSinceEpoch' ] ) minDate = tempData[ user ][ 'timeSinceEpoch' ];
						if ( maxDate < tempData[ user ][ 'timeSinceEpoch' ] ) maxDate = tempData[ user ][ 'timeSinceEpoch' ];
						count ++;
						if ( tempData[ user ][ 'timeSinceEpoch' ] > 1476136798246 && tempData[ user ][ 'timeSinceEpoch' ] < 1476679478473 ) data.push ( tempData[ user ] );
						// if ( data.length < 200 ) data.push ( tempData[ user ] );
						// data.push ( tempData[ user ] );

					}

					let minDateObject = new Date ( minDate );
					let maxDateObject = new Date ( maxDate );

					// console.log('emojiOutfile_' + index + '.json');
					// console.log( minDateObject.getDate() + '.' + minDateObject.getMonth() + '.' + minDateObject.getFullYear() + ' -', maxDateObject.getDate() + '.' + maxDateObject.getMonth() + '.' + maxDateObject.getFullYear());
					// console.log( '   ' + count + ' tweets' );
					// console.log( '   ' + Math.floor( count / convertTimeSinceEpochToDays( maxDate - minDate ) ) + ' tweets per day' );
					// console.log('--------------------------');

					loadIndex ++;

					loadingBar.style.width = '0%';

					// Finished loading.

					if ( loadIndex == totalResources ) {

						// Sort all that data by time since epoch field.

						data.sort ( function ( a, b ) {

							return a[ 'timeSinceEpoch' ] - b[ 'timeSinceEpoch' ];

						} );

						console.log ( 'Data loaded successfully!' );
						console.log ( 'Tweets: ' + data.length );

						setupApp();

						let loadingScreen = document.querySelector('#loading-screen');
						loadingScreen.style.opacity = 0;

						addEvent ( loadingScreen, 'transitionend', function () {

							loadingScreen.style.display = 'none';

						} );

					}

				} else {

					loadIndex ++;
					console.error( error );

				}

			} );

		} )( i );

	}

	function setupApp () {

		let run = true;
		let canvas = document.querySelector('#canvas');
		let visualizationManager = new VisualizationManager ( canvas, data );
		visualizationManager.setup();

		// Initialize user events.

		addEvent ( window, 'mousedown', function ( event ) {

			visualizationManager.onMouseDown ( vec2.fromValues ( event.clientX, event.clientY ) );

		} );

		addEvent ( window, 'mouseup', function ( event ) {

			visualizationManager.onMouseUp ( vec2.fromValues ( event.clientX, event.clientY ) );

		} );

		addEvent ( window, 'mousemove', function ( event ) {

			visualizationManager.onMouseMove ( vec2.fromValues ( event.clientX, event.clientY ) );

		} );

		addEvent ( window, 'click', function ( event ) {

			visualizationManager.onClick ( vec2.fromValues ( event.clientX, event.clientY ) );

		} );

		addEvent ( window, 'resize', function () {

			visualizationManager.onResize ();

		} );

		//
		// Check if the window visibility has changed.
		//

		addEvent ( window, 'focus', function () {

			run = true;
			visualizationManager.enableUpdating = true;
			visualizationManager.enableRendering = true;
			last = performance.now();

			setTimeout ( function () {

				maxDelta = 1000 / 60;
				minDelta = 1000 / 60;

			}, 500 );
			
			requestAnimationFrame ( mainLoop );

		} );

		addEvent ( window, 'blur', function () {

			run = false;
			visualizationManager.enableUpdating = false;
			visualizationManager.enableRendering = false;

		} );

		//
		// Cross browser performance now.
		//

		let performance = window.performance || {};

		performance.now = ( function() {

		  	let _now = Date.now();
	
		  	return performance.now    ||
		  	performance.webkitNow     ||
		  	performance.msNow         ||
		  	performance.oNow          ||
		  	performance.mozNow        ||
		  	function() { return Date.now() - _now; };

		})();

		//
		// Rendering performances.
		//

		let performanceContainer = document.querySelector('#performance');

		addEvent ( performanceContainer, 'click', function ( event ) {

			visualizationManager.play = !visualizationManager.play;

		} );

		let time = performance.now();
		let updateRate = 200; // ms
		let last = time;
		let targetDelta = 1000 / 60;
		let delta = 1000 / 60;
		let maxDelta = delta;
		let minDelta = delta;

		// Reset high and low frame rate after 500 ms to get rid off the first frames.

		setTimeout ( function () {

			maxDelta = 1000 / 60;
			minDelta = 1000 / 60;

		}, 500 );

		//
		// Setup the main loop.
		//

		function mainLoop () {

			let now = performance.now();
			delta = now - last;

			if ( delta > maxDelta ) {

				maxDelta = delta;

			}

			if ( delta < minDelta ) {

				minDelta = delta;

			}

			last = now;

			if ( now > time + updateRate ) {

				performanceContainer.innerHTML = 'fps: ' + Math.floor ( 1000 / delta ) + '<br> low:' + Math.floor ( 1000 / maxDelta ) + '<br> high:' + Math.floor ( 1000 / minDelta );
				time += updateRate;

			}

			visualizationManager.update( delta );
			visualizationManager.render( delta );

			if( run ) requestAnimationFrame ( mainLoop );

		}

		//
		// Start the main loop.
		//

		mainLoop();

	}

} )();