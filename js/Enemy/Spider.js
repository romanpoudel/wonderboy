import { Enemy } from "./Enemy.js";
import { createImage } from "../utils.js";

export class Spider extends Enemy {
	constructor(position) {
		super(position);
		this.image = createImage("./assets/images/obstacles/spiderSprite.png");
		this.width = 40;
		this.height = 40;
		this.frame = 0;
		this.frameHeight = 200;
		this.timeInterval = 400;
		this.time = 0;
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			0,
			this.frame * this.frameHeight,
			this.image.width,
			this.frameHeight,
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
      this.position.y += 10;
      if(this.position.y > 361) {
        this.position.y = 0;
      }
			if (this.frame === 5) {
				this.frame = 0;
			}
			this.time = 0;
		}
	}
}
