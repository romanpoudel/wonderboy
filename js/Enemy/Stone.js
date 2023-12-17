import { CANVAS_HEIGHT, CANVAS_WIDTH, SPEED } from "../constants.js";
import { createImage } from "../utils.js";
import { Enemy } from "./Enemy.js";

export class Stone extends Enemy {
	constructor(position) {
    super(position);
		this.image = createImage("./assets/images/obstacles/stone.png");
		this.image.onload = () => {
			this.width = 50;
			this.height = 50;
		};
	}
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}
