import { keys } from "./input.js";


let scrollOffset = 0;

export function movement(player, platform) {
	if ((keys.a || keys.leftArrow) && player.position.x > 100) {
		player.velocity.x =- 5;
	} else if ((keys.d || keys.rightArrow) && player.position.x < 400) {
		player.velocity.x = +5;
	} else if (keys.w || keys.upArrow) {
		player.velocity.y =- 5;
	} else if (keys.space && player.isAtPlatform) {
		player.velocity.y = -20;
	} else {
		player.velocity.x = 0;
		if (keys.a || keys.leftArrow) {
			scrollOffset -= 5;
			platform.position.x += 5;
		} else if (keys.d || keys.rightArrow) {
			scrollOffset += 5;
			platform.position.x -= 5;
		}
	}
}
