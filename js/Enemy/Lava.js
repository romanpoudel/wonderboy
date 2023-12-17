import { Enemy } from "./Enemy.js";
import { createImage } from "../utils.js";
import { CANVAS_WIDTH } from "../constants.js";

export class Lava extends Enemy {
	constructor(position) {
		super(position);
		this.image = createImage("./assets/images/obstacles/lavaSprite.png");
		this.width = 60;
		this.height = 30;
    this.frame=0;
    this.frameWidth = 290;
    this.timeInterval = 400;
    this.time = 0;
		this.isMarkedForDeletion = false;
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
		if (this.position.x < 0 - CANVAS_WIDTH) {
			this.isMarkedForDeletion = true;
		}
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
