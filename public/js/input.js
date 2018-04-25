import Keyboard from './KeyboardState.js';
export function setupKeyboard(entity) {

	const input = new Keyboard();

	input.addMapping('Space', keystate => {
		if(keystate) {
			entity.jump.start();
		}else {
			entity.jump.cancel();
		}
	});

	input.addMapping('ArrowRight', keystate => {
		entity.go.dir = keystate;
	});

	input.addMapping('ArrowLeft', keystate => {
		entity.go.dir = -keystate;
	});

	return input;
}