//make a lift class which can help player move vertically to reach higher distance
//lift is a kind of platform

import { collisionTop } from "./collision.js";
import { CANVAS_HEIGHT } from "./constants.js";
import { Platform } from "./Platform.js";

export class Lift extends Platform {
	constructor(position, image) {
		super(position, image);
		this.speed = 2;
	}
	//lift moves vertically
	move() {
			this.position.y += this.speed;
		if (this.position.y < 200) {
			this.speed = -this.speed;
		}
		if (this.position.y > CANVAS_HEIGHT - 130) {
			this.speed = -this.speed;
		}
	}
	update(ctx) {
		this.draw(ctx);
		this.move();
	}
}
