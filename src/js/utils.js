export function addEvent( elem, event, fn ) {

    // avoid memory overhead of new anonymous functions for every event handler that's installed
    // by using local functions

    function listenHandler( e ) {

        var ret = fn.apply( this, arguments );

        if ( ret === false ) {

            e.stopPropagation();
            e.preventDefault();

        }

        return( ret );

    }

    function attachHandler() {

        // set the this pointer same as addEventListener when fn is called
        // and make sure the event is passed to the fn also so that works the same too

        var ret = fn.call( elem, window.event );   

        if ( ret === false ) {

            window.event.returnValue = false;
            window.event.cancelBubble = true;

        }

        return( ret );

    }

    if ( elem.addEventListener ) {

        elem.addEventListener( event, listenHandler, false );
        return {elem: elem, handler: listenHandler, event: event};

    } else {

        elem.attachEvent( "on" + event, attachHandler );
        return {elem: elem, handler: attachHandler, event: event};

    }

}

export function removeEvent( token ) {

    if ( token.elem.removeEventListener ) {

        token.elem.removeEventListener( token.event, token.handler );

    } else {

        token.elem.detachEvent( "on" + token.event, token.handler );

    }
    
}

export function ajax( _url, _callback ){

	let request = new XMLHttpRequest();
	request.open( 'GET', _url, true );

	request.onload = function(){

		if( request.status < 200 || request.status > 299 ){

			_callback( 'Error: Http status' + request.status + ' on resource ' + _url );

		} else {

			_callback( null, request );

		}

	}

    request.send();

}

export function guid() {

  	function s4() {

  	  	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

  	}

  	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +s4() + '-' + s4() + s4() + s4();
  	
}

export function hslToRgb(h, s, l){
    
    var r, g, b;

    if( s == 0 ){

        r = g = b = l; // achromatic

    }else{

        var hue2rgb = function hue2rgb( p, q, t ){

            if( t < 0 ) t += 1;
            if( t > 1 ) t -= 1;
            if( t < 1/6 ) return p + ( q - p ) * 6 * t;
            if( t < 1/2 ) return q;
            if( t < 2/3 ) return p + ( q - p ) * ( 2/3 - t ) * 6;
            return p;

        }

        var q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb( p, q, h + 1/3 );
        g = hue2rgb( p, q, h );
        b = hue2rgb( p, q, h - 1/3 );

    }

    return [  r,  g,  b ];

}

export function map_range( value, low1, high1, low2, high2 ) {

    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);

}

export function contains(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

export function clamp (value, min, max) {
  
  return Math.min(Math.max(value, min), max);

};