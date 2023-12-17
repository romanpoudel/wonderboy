import { createImage } from "../utils.js";
import { Enemy } from "./Enemy.js";

export class Spikes extends Enemy {
	constructor(position) {
		super(position);
		this.image = createImage("./assets/images/obstacles/spikes.png");
		this.width = 60;
		this.height = 20;
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
}
