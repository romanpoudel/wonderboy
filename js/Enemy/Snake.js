import { Enemy } from "./Enemy.js";
import { createImage } from "../utils.js";

export class Snake extends Enemy {
	constructor({ x, y }) {
		super();
		this.position = {
			x,
			y,
		};
		this.image = createImage("./assets/images/obstacles/snakeSprite.png");
    this.frameWidth = 95;
		this.width = 80;
		this.height = 80;
    this.frame=0;
    this.timeInterval = 400;
		this.time = 0;
	}
	draw(ctx) {
		ctx.drawImage(this.image,this.frame*this.frameWidth,0,this.frameWidth,this.height, this.position.x,this.position.y, this.width, this.height);
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
