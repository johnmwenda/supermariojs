export default class SpriteSheet{
	constructor(image, width, height) {
		this.image = image;
		this.width = width;
		this.height = height;
		this.tiles = new Map(); // an array that contains different tiles
	}

	//name of the sprite
	//x - its position on tiles.png
	//y - its position on tiles.png
	define(name, x, y, width, height) {
		const buffer = document.createElement('canvas');
		buffer.width = width;
		buffer.height = height;
		// buffer.setAttribute("style", "border: 29px solid blue;");

		buffer
			.getContext('2d')
			.drawImage(
				this.image,
				x,
				y,
				width,
				height,
				0,
				0,
				width,
				height
				);

		this.tiles.set(name, buffer);
	}

	defineTile(name, x, y) {
		this.define(name, x*this.width, y*this.height, this.width, this.height);
	}

	draw(name,context, x, y) {
		const  buffer = this.tiles.get(name);
		context.drawImage(buffer, x, y); //overloading
	}

	drawTile(name, context, x, y) {
		this.draw(name, context, x*this.width,y*this.height);
	}
}