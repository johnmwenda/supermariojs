import Compositor from './Compositor.js';
import TileCollider from './TileCollider.js';

export default class Level {
	constructor() {
		this.gravity = 1500;	
		this.totalTime = 0;		
		
		this.comp = new Compositor();
		this.entities = new Set(); //unique

		this.tileCollider = null;
	}

	setCollissionGrid(matrix) {
		this.tileCollider = new TileCollider(matrix);
	}

	update(deltaTime) {
		this.entities.forEach(entity => {
			entity.update(deltaTime);

			entity.pos.x += entity.vel.x * deltaTime; //vel.x is constant
			this.tileCollider.checkX(entity);

			entity.pos.y += entity.vel.y * deltaTime; //vel.y changes with every call
			this.tileCollider.checkY(entity);

			entity.vel.y += this.gravity * deltaTime;
			
		})

		this.totalTime += deltaTime; 
	}
}