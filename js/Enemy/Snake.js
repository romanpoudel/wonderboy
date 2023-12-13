import { Enemy } from "./Enemy.js";
import { createImage } from "../utils.js";

export class Snake extends Enemy {
	constructor(position) {
		super(position);
		this.image = createImage("./assets/images/obstacles/snakeSprite.png");
		this.width = 60;
		this.height = 60;
		this.frame = 0;
		this.frameWidth = 95;
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
			if (this.frame > 3) {
				this.frame = 0;
			}
			this.time = 0;
		}
	}
}
