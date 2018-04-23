import {Trait} from '../Entity.js';

export default class Velocity extends Trait{
	constructor(){
		super('velocity');
	}

	update(entity, deltaTime) {
			entity.pos.x += entity.vel.x * deltaTime; //vel.x is constant
			entity.pos.y += entity.vel.y * deltaTime; //vel.y changes with every call
	}
}