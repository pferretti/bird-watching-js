const Location = require('./Location');
const Chicken = require('./Chicken');

module.exports = class GameField {
  constructor(width, height, depth, fieldSize) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.fieldSize = fieldSize;
    this.birds = [];
		this.gameStarted = false;
  }

  addBird(bird) {
    this.birds.push(bird);
  }

  startGame(pm) {
		try {
			this.placeBirds(pm);
			this.gameStarted = (this.birds.length > 0 && this.isGameFieldValid());
		} catch (err) {
			this.gameStarted = false;
		}
		return this.gameStarted;
	}

  shot(x, y, h) {
		let hit = false;
		if (this.gameStarted)
		{
			for(var i = 0; i < this.birds.length; i ++) {
				var bird = this.birds[i];
				var height = bird.getHeight();
				var location = bird.getLocation();
				hit =  location.x == x && location.y == y && height == h;
				if (hit)
				{
					bird.sing();
					break;
				}
			}
		}
    return hit;
  }

	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

  placeBirds(type) {
		var self = this;
		//Random Distribution
		if (type == 'RANDOM') {
			for(var i = 0; i < this.birds.length; i ++) {
				var bird = this.birds[i];
				let location = new Location(self.getRandomInt(0, self.width), self.getRandomInt(0, self.height));
				bird.setLocation(location);
				if (!(bird instanceof Chicken))
					bird.setHeight(self.getRandomInt(0, self.depth));
			}
		}
		//Custom Distribution
		else if (type == 'CUSTOM') {

		}
	}

  isGameFieldValid()
	{
		let self = this;
		let isValid = true;
		this.birds.forEach(function (bird) {
			let h = bird.getHeight();
			let location = bird.getLocation();
			let x = location.x;
			let y = location.y;
			isValid =  self.fieldSize.isWithinField(h, x, y);
			if (!isValid)
				return;
		});
		return isValid;

	}
}
