import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { createImage, randomNum } from "./utils.js";
import { areColliding } from "./collision.js";

export class Fruit {
	constructor() {
		this.width = 63;
		this.height = 50;
		this.position = {
			x: randomNum(40, 5000),
			y: 200,
		};
		this.velocity = {
			x: 0,
			y: 0,
		};
		this.image = createImage("./assets/images/fruits.png");
		this.frame = randomNum(0, 4);
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.frame * 63,
			0,
			this.width,
			this.height,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
	update(ctx) {
		this.draw(ctx);
	}
	collision(player) {
		return areColliding(this, player);
	}
	fruitCollision(otherItem) {
		return (
			this.position.x <= otherItem.position.x + otherItem.width &&
			this.position.x + this.width >= otherItem.position.x &&
			this.position.y <= otherItem.position.y + otherItem.height &&
			this.position.y + this.height >= otherItem.position.y
		);
	}
}
