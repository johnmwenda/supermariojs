import Keyboard from './KeyboardState.js';
export function setupKeyboard(entity) {

	const input = new Keyboard();

	input.addMapping('KeyP', keystate => {
		if(keystate) {
			entity.jump.start();
		}else {
			entity.jump.cancel();
		}
	});

	input.addMapping('KeyO', keystate => {
		entity.turbo(keystate);
	});


	input.addMapping('KeyD', keystate => {
		entity.go.dir += keystate ? 1:-1;
	});

	input.addMapping('KeyA', keystate => {
		entity.go.dir += keystate ? -1:1;
	});

	return input;
}