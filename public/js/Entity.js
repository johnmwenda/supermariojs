import {Vec2} from './math.js';

export const Sides = {
	TOP: Symbol('top'),
	BOTTOM: Symbol('bottom'),
	LEFT: Symbol('left'),
	RIGHT: Symbol('right'),
};

//super class
export class Trait {
	constructor(name) {
		this.NAME = name;
	}

	upate() {		
		console.warn('Unhandled update call in Trait');
	}	

	obstruct() {

	}
}

export default class Entity {
	constructor() {
		this.pos = new Vec2(0,0);
		this.vel = new Vec2(0,0);
		this.size = new Vec2(0,0);
		this.offset = new Vec2(0,0);

		this.lifetime = 0; 

		this.traits = [];
	}

	addTrait(trait) {
		this.traits.push(trait);
		this[trait.NAME] = trait;
	}

	update(deltaTime) {
		this.traits.forEach(trait => {
			trait.update(this, deltaTime);
		})
		this.lifetime += deltaTime; 
	}

	obstruct(side) {
		this.traits.forEach(trait => {
			trait.obstruct(this, side);
		})
	}
}