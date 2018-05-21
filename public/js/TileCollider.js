import TileResolver from './TileResolver.js';
import {Sides} from './Entity.js';;

export default class TileCollider {
	constructor(tileMatrix) {
		this.tiles = new TileResolver(tileMatrix);
	}

	checkY(entity) {
		let y;

		if(entity.vel.y > 0) {
			y = entity.pos.y + entity.size.y;
		}else if(entity.vel.y < 0) {
			y = entity.pos.y;
		}else {

			return;
		}

		const matches = this.tiles.searchByRange(
			entity.pos.x, entity.pos.x + entity.size.x,
			y, y 
			);
		matches.forEach(match => {
			
			if(match.tile.type != 'ground') {
				return;
			}

			if(entity.vel.y > 0) {
				if(entity.pos.y + entity.size.y > match.y1) {
					entity.vel.y = 0;
					entity.pos.y = match.y1 - entity.size.y;

					entity.obstruct(Sides.BOTTOM);
				}
			}else if(entity.vel.y < 0) {
				if(entity.pos.y < match.y2) {
					entity.vel.y = 0;
					entity.pos.y = match.y2;

					entity.obstruct(Sides.TOP);
				}
			}	
		})
	}


	checkX(entity) {
		let x;
		if(entity.vel.x > 0) {
			x = entity.pos.x + entity.size.x;
		}else if(entity.vel.x < 0) {
			x = entity.pos.x;
		}else {
			return;
		}

		const matches = this.tiles.searchByRange(
			x, x,
			entity.pos.y, entity.pos.y + entity.size.y
			);
		matches.forEach(match => {
			
			if(match.tile.type != 'ground') {
				return;
			}

			if(entity.vel.x > 0) {
				if(entity.pos.x + entity.size.x > match.x1) {
					entity.vel.x = 0;
					entity.pos.x = match.x1 - entity.size.x;

					entity.obstruct(Sides.RIGHT);
				}
			}else if(entity.vel.x < 0) {
				if(entity.pos.x < match.x2) {
					entity.vel.x = 0;
					entity.pos.x = match.x2;

					entity.obstruct(Sides.LEFT);
				}
			}	
		})

		

	}

	test(entity) {
		this.checkY(entity);
		// const match = this.tiles.matchByPosition(entity.pos.x, entity.pos.y);
		// if(match) {
		// 	console.log('Matched tile', match, match.tile);
		// }
	}
}