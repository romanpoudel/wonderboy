import { Enemy } from "./Enemy.js";
import { createImage } from "../utils.js";
import { CANVAS_WIDTH } from "../constants.js";

export class Bird extends Enemy {
	constructor(position) {
		super(position);
		this.image = createImage("./assets/images/obstacles/birdSprite.png");
		this.frameWidth = 240;
		this.sy = 942;
		this.width = 60;
		this.height = 60;
		this.frame = 0;
		this.timeInterval = 100;
		this.time = 0;
		this.isMarkedForDeletion = false;
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.frame * this.frameWidth,
			this.sy,
			this.frameWidth,
			this.image.height - this.sy,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}
	update(ctx) {
		this.draw(ctx);
		this.position.x = this.position.x - 0.5;
		if (this.position.x < 0 - CANVAS_WIDTH) {
			this.isMarkedForDeletion = true;
		}
		this.time++;
		if (this.time > this.timeInterval) {
			this.frame++;
			if (this.frame > 4) {
				this.frame = 0;
			}
			this.time = 0;
		}
	}
}
