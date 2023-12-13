import { BGMULTIPLLIER, CANVAS_HEIGHT, CANVAS_WIDTH, SPEED } from "../constants.js";
import { createImage } from "../utils.js";
import { Enemy } from "./Enemy.js";

export class Stone extends Enemy {
	constructor({ x, y}) {
    super();
    this.position={
      x,
      y
    }
		this.image = createImage("./assets/images/obstacles/stone.png");
		this.image.onload = () => {
			this.image.width = 50;
			this.image.height = 50;
		};
	}
  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.image.width, this.image.height);
  }
}
