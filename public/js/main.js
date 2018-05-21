import Camera from './Camera.js';
import Timer from './Timer.js';
import Entity from './Entity.js';
import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadLevel} from './loaders/level.js';
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
	loadMario(),
	loadGoomba(),
	loadKoopa(),
	loadLevel('1-1')
]).then(([ createMario, createGoomba,  createKoopa,  level])=> {

	const camera = new Camera();

	window.camera = camera;

	const mario = createMario();
	mario.pos.set(64, 64);

	const goomba = createGoomba();
	goomba.pos.set(220, 64);

	const koopa = createKoopa();
	koopa.pos.set(260, 64);


	level.entities.add(mario);
	level.entities.add(goomba);
	level.entities.add(koopa);

	level.comp.layers.push(
		createCollisionLayer(level),
		createCameraLayer(camera)
		);
	
	

	const input = setupKeyboard(mario);

	input.listenTo(window);

	// setupMouseControl(canvas, mario, camera);


	const timer = new Timer(1/60);
	let counter = 0;
	timer.update = function update(deltaTime) {
		level.update(deltaTime); //update all the entities
		if(mario.pos.x > 100) {
			camera.pos.x = mario.pos.x - 100;
		}
		
		level.comp.draw(context, camera);	//draw everything at its current position
	}

	timer.start();

	
});

