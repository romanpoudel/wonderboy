import { areColliding } from "../collision.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants.js";

export class Enemy {
	constructor(position) {
		this.position=position;
		this.velocity={
			x:0,
			y:0
		}
	}

	collision(player){
		return areColliding(this,player);
	}
}
