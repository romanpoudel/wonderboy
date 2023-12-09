import { CANVAS_HEIGHT, GRAVITY } from "./constants.js";
import { createImage } from "./utils.js";

export class Player {
	constructor() {
		this.rightSprite = createImage("./assets/images/playerMoveRight1.png");
		this.leftSprite = createImage("./assets/images/playerMoveLeft.png");
		this.frames = 0;
		// this.image.src="./assets/images/playerMoveRight.png";
		this.position = {
			x: 0,
			y: 100,
		};
		this.width = 80;
		this.height = 90;
		this.velocity = {
			x: 0,
			y: 10,
		};
		this.isAtPlatform = false;
		this.facing = "right";
	}

	draw(ctx) {
		// ctx.strokeStyle = "green";
		// ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
		if (this.facing === "right") {
			ctx.drawImage(
				this.rightSprite,
				this.frames * 90,
				0,
				90,
				this.rightSprite.height,
				this.position.x,
				this.position.y,
				this.width,
				this.height
			);
		} else if (this.facing === "left") {
			ctx.drawImage(
				this.leftSprite,
				this.frames * 90,
				0,
				90,
				this.leftSprite.height,
				this.position.x,
				this.position.y,
				this.width,
				this.height
			);
		}
	}

	update(ctx) {
		//animate or change player image
		this.draw(ctx);
			this.position.x += this.velocity.x;		
		this.position.y += this.velocity.y;
		if (this.position.y + this.height + this.velocity.y < CANVAS_HEIGHT) {
			this.velocity.y += GRAVITY;
			this.isAtPlatform = false;
		} else {
			this.velocity.y = 0;
			console.log("fail");
			this.isAtPlatform = true;
		}
	}
}
