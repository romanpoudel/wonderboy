import { keys } from "./input.js";


let scrollOffset = 0;

export function movement(player, platform,background) {
	if (((keys.a || keys.leftArrow) && player.position.x > 100)|| keys.leftArrow && scrollOffset===0 && player.position.x>0) {
	
		player.velocity.x =- 5;
		
	} else if (((keys.d || keys.rightArrow) && player.position.x < 400) ) {
		changeFrame(player);
		player.velocity.x = +5;
		
	} else if (keys.w || keys.upArrow) {
		player.velocity.y =- 5;
	} else if (keys.space && player.isAtPlatform) {
		player.velocity.y = -20;
		player.frames=5;
	} else {
		player.velocity.x = 0;
		if ((keys.a || keys.leftArrow )&& scrollOffset>0) {
			scrollOffset -= 5;
			platform.position.x += 5;
			background.position.x-=3;
		} else if (keys.d || keys.rightArrow) {
			changeFrame(player);
			scrollOffset += 5;
			platform.position.x -= 5;
			background.position.x+=3;
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