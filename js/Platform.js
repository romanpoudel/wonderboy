import { createImage } from "./utils.js";

export class Platform {
	constructor(position, image) {
		this.position =position;
		this.image = image;
		this.width = image.width;
		this.height = image.height;
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
