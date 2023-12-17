import { Enemy } from "./Enemy.js";
import { createImage } from "../utils.js";

export class Frog extends Enemy {
	constructor(position) {
		super(position);
		this.image = createImage("./assets/images/obstacles/frogSprites.png");
		this.width = 49;
		this.height = 49;
		this.frame = 0;
		this.frameWidth = 49;
		this.timeInterval = 400;
		this.time = 0;
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.frame * this.frameWidth,
			0,
			this.frameWidth,
			this.image.height,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
	update(ctx) {
		this.draw(ctx);
		this.time++;
		if (this.time > this.timeInterval) {
			this.frame++;
			if (this.frame > 5) {
				this.frame = 0;
			}
			this.time = 0;
		}
	}
}
