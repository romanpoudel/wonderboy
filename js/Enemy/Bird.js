import { Enemy } from "./Enemy.js";
import { createImage } from "../utils.js";

export class Bird extends Enemy {
	constructor({ x, y }) {
		super();
		this.position = {
			x,
			y,
		};
		this.image = createImage("./assets/images/obstacles/birdSprite.png");
    this.frameWidth = 240;
    this.sy=942;
		this.width = 80;
		this.height = 80;
    this.frame=0;
    this.timeInterval = 100;
		this.time = 0;
	}
	draw(ctx) {
    ctx.drawImage(this.image,this.frame*this.frameWidth,this.sy,this.frameWidth,this.image.height-this.sy, this.position.x,this.position.y, this.width, this.height);
	}
	update(ctx) {
		this.draw(ctx);
    this.position.x=this.position.x-0.5;
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
