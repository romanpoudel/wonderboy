import { Enemy } from "./Enemy.js";
import { createImage } from "../utils.js";

export class Snail extends Enemy {
	constructor(position) {
		super(position);
		this.image = createImage("./assets/images/obstacles/snailSprite.png");
		this.width = 40;
		this.height = 40;
		this.frame = 2;
		this.frameWidth = 66;
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
			this.frame--;
			if (this.frame <0) {
				this.frame = 2;
			}
			this.time = 0;
		}
	}
}
