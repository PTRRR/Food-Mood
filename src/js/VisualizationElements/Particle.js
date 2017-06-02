import { BaseElement } from "./BaseElement";

export class Particle extends BaseElement{

	constructor(){

		super();

		this._radius = 10.0;

		this.color = {

			r: 1.0,
			g: 1.0,
			b: 1.0,
			a: 1.0,

		}

		this._lifespan = 10.0;
		this._lifeLeft = this._lifespan;

		this._food = null;
		this._mood = null;
		this._timeStamp = null;
		this._offsetTime = 0;
		this._staticPosition = null;
		this._foodWords = null;

	}

	set radius( _radius ){

		this._radius = _radius;

	}

	get radius(){

		return this._radius;

	}

	set color( _color ){

		this._color = {

			r: _color.r,
			g: _color.g,
			b: _color.b,
			a: _color.a,

		}

	}

	get color(){

		return this._color;

	}

	set lifespan( _lifespan ){

		this._lifespan = _lifespan;
		this._lifeLeft = this._lifespan;

	}

	get lifespan(){

		return this._lifespan;

	}

	set offsetTime ( _offsetTime ) {

		this._offsetTime = _offsetTime;

	}

	get offsetTime () {

		return this._offsetTime;

	}

	set staticPosition ( _staticPosition ) {

		this._staticPosition = _staticPosition;

	}

	get staticPosition () {

		return this._staticPosition;

	}

	get lifeLeft(){

		return this._lifeLeft;

	}

	set food( _food ){

		this._food = _food;

	}

	get food(){

		return this._food;

	}

	set mood( _mood ){

		this._mood = _mood;

	}

	get mood(){

		return this._mood;

	}

	set foodWords ( _foodWords ) {

		this._foodWords = _foodWords;

	}
	
	get foodWords () {

		return this._foodWords;

	}

}