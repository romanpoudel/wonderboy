import { keys } from "./input.js";

let scrollOffset = 0;

export function movement(player, platform, background) {
	if (
		((keys.a || keys.leftArrow) && player.position.x > 100) ||
		(keys.leftArrow && scrollOffset === 0 && player.position.x > 0)
	) {
		player.facing = "left";
		changeFrame(player);
		player.velocity.x = -5;
	} else if ((keys.d || keys.rightArrow) && player.position.x < 400) {
		player.facing = "right";
		changeFrame(player);
		player.velocity.x = +5;
	} else if (keys.w || keys.upArrow) {
		player.velocity.y = -5;
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
			background.lastMovement="left";
			player.facing = "left";	
			changeFrame(player);
			scrollOffset -= 5;
			platform.position.x += 5;
			background.position.x += 3;
		} else if ((keys.d || keys.rightArrow) && scrollOffset < 40000) {
			background.lastMovement="right";
			player.facing = "right";
			scrollOffset += 5;
			changeFrame(player);
			console.log("offset:", scrollOffset);
			platform.position.x -= 5;
			background.position.x -= 3;
		}
	}
}

function changeFrame(player) {
	if (player.frames < 6) {
		player.frames++;
	} else {
		player.frames = 0;
	}
}