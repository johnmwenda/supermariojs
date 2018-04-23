// function drawBackground(background, context, sprites) {
// 	let x1 = background.ranges[0];
// 	let x2 = background.ranges[1];
// 	let y1 = background.ranges[2];
// 	let y2 = background.ranges[3];
	
// 	for(let x=x1; x < x2; ++x) {	
// 		for(let y=y1; y<y2; ++y) {
// 			sprites.drawTile(background.tile,context, x, y);
// 		}
// 	}
// }

//the higher order function that will return another function
export function createBackgroundLayer(level, sprites) {
	const buffer = document.createElement("canvas");
	buffer.width = 256;
	buffer.height = 240;

	const context = buffer.getContext("2d");

	level.tiles.forEach((tile, x, y)=> {
		sprites.drawTile(tile.name, context, x, y);
	})

	return function drawBackgroundLayer(context) {
		context.drawImage(buffer, 0, 0);
	}
}


export function createSpriteLayer(entities) {
	return function drawSpriteLayer(context) {
		entities.forEach(entity => {
			entity.draw(context);	
		});
	}
}

export function createCollisionLayer(level) {
	const resolvedTiles = [];

	const tileResolver = level.tileCollider.tiles;
	const tileSize = tileResolver.tileSize;

	const getByIndexOriginal = tileResolver.getByIndex;
	tileResolver.getByIndex = function getByIndexFake(x, y) {
		resolvedTiles.push({x, y});
		return getByIndexOriginal.call(tileResolver, x, y);
	}

	return function drawCollision(context) {
		// context.strokeStyle = 'blue';
		// resolvedTiles.forEach(({x, y})=>{
		// 	context.beginPath();
		// 	context.rect(x * tileSize, y*tileSize, tileSize, tileSize);
		// 	context.stroke();
		// });

		// resolvedTiles.length = 0;

		resolvedTiles.forEach(({x, y})=> {
			console.log('Would draw', x, y);
		})
	}
}