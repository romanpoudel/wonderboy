import { keys } from "./input.js";

export function movement(player) {
	if (keys.a || keys.leftArrow) {
		player.position.x -= 5;
	} else if (keys.d || keys.rightArrow) {
		player.position.x += 5;
	} else if (keys.w || keys.upArrow) {
		player.position.y -= 5;
	} else if(keys.space && player.isAtPlatform){
    player.velocity.y=-30;
  }
}
