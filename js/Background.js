import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { createImage } from "./utils.js";
import { keys } from "./input.js";

export class Background {
	constructor({ x, y }) {
		this.position = {
			x,
			y,
		};
		this.image = createImage("./assets/images/background2.jpg");
		this._lastMovement = "right";
	}

	set lastMovement(value) {
		this._lastMovement = value;
	}
	draw(ctx) {
		// Draw the current image
		ctx.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			CANVAS_WIDTH,
			CANVAS_HEIGHT
		);

		// Draw the image to the right
		ctx.drawImage(
			this.image,
			this.position.x + CANVAS_WIDTH,
			this.position.y,
			CANVAS_WIDTH,
			CANVAS_HEIGHT
		);

		// Draw the image to the left
		ctx.drawImage(
			this.image,
			this.position.x - CANVAS_WIDTH,
			this.position.y,
			CANVAS_WIDTH,
			CANVAS_HEIGHT
		);
	}
	update() {
		// console.log("background",this.position.x)
		if (this._lastMovement === "right") {
			if (this.position.x <= -CANVAS_WIDTH) {
				this.position.x = 0;
			}
		} else if (this._lastMovement === "left") {
			if (this.position.x >= CANVAS_WIDTH) {
				this.position.x = 0;
			}
		}
	}
}
