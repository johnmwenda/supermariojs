export class Matrix {
	constructor() {
		this.grid = [];
	}

	// makes it more robust, coz now we are saying the Matrix class has a method that can loop over the matrix, get the value, x, y and pass them to a callback, the advantage here is that the callback can now do anything with the passed values
	forEach(callback) {
		this.grid.forEach((column, x) => {
			column.forEach((value, y)=> {
				callback(value, x, y);
			});
		});
	}
	
	get(x, y) {
		const col = this.grid[x];
		if (col) {
			return col[y];
		}
		return undefined;
	}

	set(x, y, value) {
		if (!this.grid[x]) {
			this.grid[x] = [];
		}

		this.grid[x][y] = value;
	}

}


export class Vec2 {
	constructor(x, y) {
		this.set(x, y);
	}

	set(x, y) {
		this.x = x;
		this.y = y;
	}
}