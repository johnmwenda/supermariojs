import Entity, {Trait} from './Entity.js';
import {loadMarioSprite} from './sprites.js';
import Velocity from './traits/Velocity.js';
import Jump from './traits/Jump.js';

export function createMario() {
	return loadMarioSprite()
	.then(sprite => {
		const mario = new Entity();
		
		mario.addTrait(new Velocity());
		mario.addTrait(new Jump());

		//classic case of Inheritance, or using JS unique language construct efficiently
		mario.draw = function drawMario(context) {
			sprite.draw('idle', context, this.pos.x, this.pos.y);
		}

		return mario;
	});
	
}