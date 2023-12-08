import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { createImage } from "./utils.js";

export class Background {
	constructor({ x, y }) {
		this.position = {
			x,
			y,
		};
		this.image = createImage("./assets/images/background.jpg");
	}
	draw(ctx) {
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			CANVAS_WIDTH,
			CANVAS_HEIGHT
		);
	}
}
