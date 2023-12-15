import { areColliding } from "./collision.js";
import { CANVAS_HEIGHT } from "./constants.js";

export class CheckPoint {
	constructor({ x, y }, frame) {
		this.position = {
			x,
			y,
		};
		this.image = new Image();
		this.image.src = "./assets/images/checkPoint.png";
		this.width = 175;
		this.image.onload = () => {
			this.height = this.image.height;
		};
		this.frames = frame;
		this.drawn = true;
		this.velocity = {
			x: 0,
			y: 0
		};
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.frames * this.width,
			0,
			this.width,
			this.height,
			this.position.x,
			this.position.y,
			80,
			50
		);
	}
	collision(player) {
		return areColliding(this, player);
	}
}
