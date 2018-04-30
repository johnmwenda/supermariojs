export default class Compositor {
	constructor() {
		this.layers = []; //contains array of closures/callback functions
	}

	draw(context, camera) {
		this.layers.forEach(layer => {
			layer(context, camera);
		})
	}
}