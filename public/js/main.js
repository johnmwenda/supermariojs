import Timer from './Timer.js';
import Entity from './Entity.js';
import {createMario} from './entities.js';
import {loadLevel} from './loaders.js';
import {createCollisionLayer} from './layers.js';

import {setupKeyboard} from './input.js';


const canvas = document.getElementById("screen");
const context =canvas.getContext("2d");

// BEFORE
// function createSpriteLayer(sprite, pos) {
// 	return function drawSpriteLayer(context) {
// 		sprite.draw('idle', context, pos.x, pos.y);
// 	}
// }

Promise.all([
	createMario(),
	loadLevel('1-1')
]).then(([ mario, level])=> {

	
	mario.pos.set(64, 64);

	level.comp.layers.push(createCollisionLayer(level));
	
	level.entities.add(mario);

	const input = setupKeyboard(mario);

	input.listenTo(window);

	['mousedown', 'mousemove'].forEach(eventName => {
		canvas.addEventListener(eventName, event => {
			if(event.buttons == 1) {
				mario.vel.set(0, 0);
				mario.pos.set(event.offsetX, event.offsetY);
			}
		})
	})


	const timer = new Timer(1/60);
	timer.update = function update(delaTime) {
		level.update(delaTime); //update all the entities
		level.comp.draw(context);	//draw everything at its current position
	}

	timer.start();

	
});

