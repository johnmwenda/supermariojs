import Level from './Level.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadBackgroundSprites} from './sprites.js';

export function loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image);
		});
		image.src = url; //initializes the GET request
	});
}

export function createTiles(level, backgrounds) {
	backgrounds.forEach(background => {
		background.ranges.forEach(([x1, x2, y1, y2]) => {
			for(let x=x1; x < x2; ++x) {	
				for(let y=y1; y<y2; ++y) {
					// sprites.drawTile(background.tile,context, x, y);
					level.tiles.set(x, y, {name: background.tile});
				}
			}
		});
	});
	
}

export function loadLevel(name) {

	return Promise.all([
			fetch(`/levels/${name}.json`)
			.then(r => r.json()),

			loadBackgroundSprites()

		])
		.then(([levelSpec, backgroundSprites]) => {
			const level = new Level();

			//set the matrix indexes and tile names
			createTiles(level, levelSpec.backgrounds);

			//define a callback which will be added to the layers array which will draw the background
			const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
			level.comp.layers.push(backgroundLayer);

			//define a callback which will be added to the layers array which will draw the sprites(mario for now)
			const spriteLayer = createSpriteLayer(level.entities);
			level.comp.layers.push(spriteLayer);
			
			window.level = level;

			return level;
		});
}