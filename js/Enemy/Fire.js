import { createImage } from "../utils.js";
import { Enemy } from "./Enemy.js";

export class Fire extends Enemy {
	constructor(position) {
		super(position);
		this.image = createImage("./assets/images/obstacles/fireSprite.png");
		this.width = 60;
		this.height = 60;
		this.frame = 0;
		this.frameWidth = 124;
		this.timeInterval = 400;
		this.time = 0;
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.frame * this.frameWidth,
			0,
			this.frameWidth-25,
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
			if (this.frame > 2) {
				this.frame = 0;
			}
			this.time = 0;
		}
	}
}
