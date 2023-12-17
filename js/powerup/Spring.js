import { areColliding, collisionBottom, collisionTop } from "../collision.js";
import { createImage } from "../utils.js";

export class Spring {
	constructor(position) {
		this.position = position;
		this.image = createImage("./assets/images/powerups/springPlatform.png");
		this.image.onload = () => {
			this.width = 40;
			this.height = 20;
		};
    this.velocity = {
      x: 0,
      y: 0
    }
	}

	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
	}

	update(ctx) {
		this.draw(ctx);
	}
	collision(player) {
		return collisionTop(player, this);
	}
}
