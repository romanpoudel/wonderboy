import { keys } from "./input.js";


let scrollOffset = 0;

export function movement(player, platform) {
	if ((keys.a || keys.leftArrow) && player.position.x > 100) {
	
		player.velocity.x =- 5;
	} else if ((keys.d || keys.rightArrow) && player.position.x < 400) {
		changeFrame(player);
		player.velocity.x = +5;
	} else if (keys.w || keys.upArrow) {
		player.velocity.y =- 5;
	} else if (keys.space && player.isAtPlatform) {
		player.velocity.y = -20;
		player.frames=5;
	} else {
		player.velocity.x = 0;
		if (keys.a || keys.leftArrow) {
			scrollOffset -= 5;
			platform.position.x += 5;
			changeFrame(player);
		} else if (keys.d || keys.rightArrow) {
			scrollOffset += 5;
			platform.position.x -= 5;
		}
	}
}


function changeFrame(player){
	if(player.frames<6){
		player.frames++;
	}else{
		player.frames=0;
	}
}