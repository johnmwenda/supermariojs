import Timer from './Timer.js';
import Entity from './Entity.js';
import {createMario} from './entities.js';
import {loadLevel} from './loaders.js';
import {createCollisionLayer} from './layers.js';


import Keyboard from './KeyboardState.js';

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

	const gravity = 2000;	
	mario.pos.set(64, 64);

	level.comp.layers.push(createCollisionLayer(level));
	
	level.entities.add(mario);

	const SPACE = 32;
	const input = new Keyboard();

	input.addMapping(SPACE, keystate => {
		if(keystate) {
			mario.jump.start();
		}else {
			mario.jump.cancel();
		}
	});
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
		level.comp.draw(context);			
		mario.vel.y += gravity * delaTime;
	}

	timer.start();

	
});

