import Level from '../Level.js';
import {createBackgroundLayer, createSpriteLayer} from '../layers.js';
import {loadJSON, loadSpriteSheet} from '../loaders.js';
import {Matrix} from '../math.js';	

export function loadLevel(name) {

	return loadJSON(`/levels/${name}.json`)
		.then(levelSpec => Promise.all([
			levelSpec,
			loadSpriteSheet(levelSpec.spriteSheet)
		]))
		.then(([levelSpec, backgroundSprites]) => {
			const level = new Level();

			const mergedTiles = levelSpec.layers.reduce((mergedTiles, layerSpec)=> {
				return mergedTiles.concat(layerSpec.tiles);
			}, []);

			const collissionGrid = createCollissionGrid(mergedTiles, levelSpec.patterns);
			level.setCollissionGrid(collissionGrid);

			levelSpec.layers.forEach(layer => {
				const backgroundGrid = createBackgroundGrid(layer.tiles, levelSpec.patterns);
				//define a callback which will be added to the layers array which will draw the background
				const backgroundLayer = createBackgroundLayer(level, backgroundGrid,  backgroundSprites);
				level.comp.layers.push(backgroundLayer);
			})

			//define a callback which will be added to the layers array which will draw the sprites(mario for now)
			const spriteLayer = createSpriteLayer(level.entities);
			level.comp.layers.push(spriteLayer);
			
			window.level = level;

			return level;
		});
}

function createCollissionGrid(tiles, patterns) {
	const grid = new Matrix();
	for (const {tile, x, y} of expandTiles(tiles, patterns)) {
		grid.set(x,y,{type:tile.type})
	};
	return grid;
}

function createBackgroundGrid(tiles, patterns) {
	const grid = new Matrix();
	for (const {tile, x, y} of expandTiles(tiles, patterns)) {
		grid.set(x,y,{name:tile.name})
	};
	return grid;
}

function* expandSpan(xStart, xLen, yStart, yLen) {
	const xEnd = xStart + xLen;
	const yEnd = yStart + yLen;
	for(let x=xStart; x < xEnd; ++x) {
		for(let y=yStart; y<yEnd; ++y) {
			yield {x, y};
		}
	}

}

function expandRange(range) {
	if(range.length == 4 ) {
		const [xStart, xLen, yStart, yLen] = range;
		return expandSpan(xStart, xLen, yStart, yLen);
	}else if(range.length == 3) {
		const [xStart, xLen, yStart] = range;
		return expandSpan(xStart, xLen, yStart, 1);
	}
	else if(range.length == 2) {
		const [xStart, yStart] = range;
		return expandSpan(xStart, 1, yStart, 1);
	}
}

function* expandRanges(ranges) {
	for (const range of ranges) {
		for (const item of expandRange(range)) {
			yield item;
		}
	}
}

export function expandTiles(tiles, patterns) {
	const expandedTiles = [];

	function walkTiles(tiles, offsetX, offsetY) {
		for (const tile of tiles){
			for (const {x, y} of expandRanges(tile.ranges)){
				const derivedX = x + offsetX;
				const derivedY = y + offsetY;
				if(tile.pattern) {
					const tiles = patterns[tile.pattern].tiles;
					walkTiles(tiles, derivedX, derivedY)
				}else {
					// level.tiles.set(derivedX, derivedY, {
					// 	name: tile.name,
					// 	type: tile.type
					// });

					expandedTiles.push({
						tile, 
						x: derivedX,
						y: derivedY
					});
				}
			}
		};
	}

	walkTiles(tiles, 0, 0);

	// console.log(expandedTiles);

	return expandedTiles;

}