export class BaseElement {

	constructor(){

		this._position = vec3.create();
		this._velocity = vec3.create();
		this._acceleration = vec3.create();

		this._mass = 1.0;
		this._damping = 1.0;

	}

	set position( _position ){

		this._position = _position;

	}

	get position(){

		return this._position;

	}

	get velocity(){

		return this._velocity;

	}

	get acceleration(){

		return this._acceleration;

	}


	set mass( _mass ){

		this._mass = _mass;

	}

	get mass(){

		return this._mass;

	}

	set damping( _damping ){

		this._damping = Math.min( Math.max( 0.0, _damping ), 1.0 );

	}

	get damping(){

		return this._damping;

	}

	applyForce( _vec ){

		vec3.divide ( _vec, _vec, vec3.fromValues( this._mass, this._mass, this._mass ) );
		vec3.add ( this._acceleration, this._acceleration, _vec );


	}

	update( _deltaTime ){

		// if ( !_deltaTime ){

		// 	let _deltaTime = 10;

		// }

		// _deltaTime *= 60 / 1000

		vec3.multiply ( this._acceleration, this._acceleration, vec3.fromValues ( _deltaTime * 0.01, _deltaTime * 0.01, _deltaTime * 0.01 ) )
		vec3.add ( this._velocity, this._velocity, this._acceleration );
		vec3.multiply ( this._velocity, this._velocity, vec3.fromValues ( this._damping, this._damping, this._damping ) );
		// vec3.multiply ( this._velocity, this._velocity, vec3.fromValues ( _deltaTime * 0.01, _deltaTime * 0.01, _deltaTime * 0.01 ) )
		vec3.add ( this._position, this._position, this._velocity );

		vec3.multiply ( this._acceleration, this._acceleration, vec3.fromValues ( 0, 0, 0 ) );
	}

}