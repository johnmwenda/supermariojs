import Camera from './Camera.js';
import Timer from './Timer.js';
import Entity from './Entity.js';
import {createMario} from './entities.js';
import {loadLevel} from './loaders.js';
import {createCollisionLayer, createCameraLayer} from './layers.js';

import {setupKeyboard} from './input.js';
// import {setupMouseControl} from './debug.js';


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

	const camera = new Camera();

	window.camera = camera;
	
	mario.pos.set(64, 64);

	level.comp.layers.push(
		// createCollisionLayer(level),
		createCameraLayer(camera)
		);
	
	level.entities.add(mario);

	const input = setupKeyboard(mario);

	input.listenTo(window);

	// setupMouseControl(canvas, mario, camera);


	const timer = new Timer(1/60);
	timer.update = function update(delaTime) {
		level.update(delaTime); //update all the entities
		if(mario.pos.x > 100) {
			camera.pos.x = mario.pos.x - 100;
		}
		level.comp.draw(context, camera);	//draw everything at its current position
	}

	timer.start();

	
});

