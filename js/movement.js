import { keys } from "./input.js";
import { CheckPoint } from "./Checkpoint.js";
import {
	BGMULTIPLLIER,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	imagew,
} from "./constants.js";

//checkpoints
const checkpoints = [
	new CheckPoint({ x: 0, y: CANVAS_HEIGHT - 140 }, 0),
	new CheckPoint({ x: imagew * 1.5, y: CANVAS_HEIGHT - 140 }, 1),
	new CheckPoint({ x: imagew * 3.8, y: CANVAS_HEIGHT - 140 }, 2),
	new CheckPoint({ x: imagew * 5, y: CANVAS_HEIGHT - 140 }, 3),
	new CheckPoint({ x: imagew * 6 + 450, y: CANVAS_HEIGHT - 140 }, 4),
];

let scrollOffset = 0;

export function movement(player, platform, background, ctx) {
	console.log(scrollOffset);
	if (
		((keys.a || keys.leftArrow) && player.position.x > 100) ||
		(keys.leftArrow && scrollOffset === 0 && player.position.x > 0)
	) {
		player.facing = "left";
		changeFrame(player);
		player.velocity.x = -player.speed;
	} else if ((keys.d || keys.rightArrow) && player.position.x < 400) {
		player.facing = "right";
		changeFrame(player);
		player.velocity.x = +player.speed;
	} else if (keys.w || keys.upArrow) {
		player.velocity.y = -player.speed;
	} else if (keys.space && player.isAtPlatform) {
		player.velocity.y = -10;
		player.frames = 5;
	} else if (scrollOffset === 40000) {
		//end point
		player.velocity.x = 3;
		changeFrame(player);
		if (player.position.x >= 650) {
			player.velocity.x = 0;
			player.frames = 0;
		}
	} else {
		player.velocity.x = 0;
		if ((keys.a || keys.leftArrow) && scrollOffset > 0) {
			background.lastMovement = "left";
			player.facing = "left";
			changeFrame(player);
			scrollOffset -= player.speed;
			platform.position.x += player.speed;
			background.position.x += player.speed * BGMULTIPLLIER * 0.66;
			checkpoints.forEach((checkpoint) => {
				checkpoint.position.x += player.speed * BGMULTIPLLIER;
			});
		} else if ((keys.d || keys.rightArrow) && scrollOffset < 40000) {
			background.lastMovement = "right";
			player.facing = "right";
			scrollOffset += player.speed;
			changeFrame(player);
			platform.position.x -= player.speed;
			background.position.x -= player.speed * BGMULTIPLLIER * 0.66;
			checkpoints.forEach((checkpoint) => {
				checkpoint.position.x -= player.speed * BGMULTIPLLIER;
			});
		}
	}
	if (scrollOffset >= 0) {
		checkpoints[0].draw(ctx);
	}
	if (scrollOffset >= 500) {
		checkpoints[1].draw(ctx);
	}
	if (scrollOffset >= 1000) {
		checkpoints[2].draw(ctx);
	}
	if (scrollOffset >= 3000) {
		checkpoints[3].draw(ctx);
	}
	if (scrollOffset >= 30000) {
		checkpoints[4].draw(ctx);
	}
}

function changeFrame(player) {
	if (player.frames < 6) {
		player.frames++;
	} else {
		player.frames = 0;
	}
}
