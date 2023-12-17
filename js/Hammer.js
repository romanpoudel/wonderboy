import { areColliding } from "./collision.js";
import { CANVAS_WIDTH, GRAVITY } from "./constants.js";
import { createImage } from "./utils.js";

export class Hammer {
	constructor(x, y) {
		this.position = {
			x,
			y,
		};
		this.velocity = {
			x: 8,
			y: 0,
		};
    this.gravity=0.3;
		this.image = createImage("./assets/images/hammer.png");
		this.image.onload = () => {
			this.width = 40;
			this.height = 40;
		};
		this.frame = 0;
		this.frameWidth = 71;
		this.timeInterval = 5;
		this.time = 0;
		// this.isAlive = true;
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
		this.velocity.y +=this.gravity;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		this.time++;
		if (this.time > this.timeInterval) {
			this.frame++;
			if (this.frame === 4) {
				this.frame = 0;
			}
			this.time = 0;
		}
	}

	isOutOfScreen() {
		return this.position.x > CANVAS_WIDTH;
	}

  collision(enemy){
    return areColliding(this,enemy);
  }
}
