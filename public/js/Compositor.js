export default class Compositor {
	constructor() {
		this.layers = []; //contains array of closures/callback functions
	}

	draw(context) {
		this.layers.forEach(layer => {
			layer(context);
		})
	}
}