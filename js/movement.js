import { keys } from "./input.js";
import { CheckPoint } from "./Checkpoint.js";
import {
	BGMULTIPLLIER,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	SPEED,
	imagew,
} from "./constants.js";
import { Stone } from "./Enemy/Stone.js";
import { Fire } from "./Enemy/Fire.js";
import { Snake } from "./Enemy/Snake.js";
import { Bird } from "./Enemy/Bird.js";
import { Fruit } from "./Fruit.js";

//fruits spawn
let fruits = [new Fruit(), new Fruit(), new Fruit(), new Fruit(), new Fruit()];

//obstacles
const stones = [
	new Stone({ x: 500, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 2, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 3, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 6, y: CANVAS_HEIGHT - 130 }),
];

const fires = [
	new Fire({ x: 800, y: CANVAS_HEIGHT - 150 }),
	new Fire({ x: CANVAS_WIDTH * 2 + 200, y: CANVAS_HEIGHT - 150 }),
	new Fire({ x: CANVAS_WIDTH * 5 + 200, y: CANVAS_HEIGHT - 150 }),
];
const snakes = [
	new Snake({ x: 1300, y: CANVAS_HEIGHT - 150 }),
	new Snake({ x: CANVAS_WIDTH * 5 - 200, y: CANVAS_HEIGHT - 150 }),
];

//spawn birds every 4 seconds
let birds = [];
setInterval(() => {
	birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
	//remove birds out of screen
	birds = birds.filter((bird) => !bird.isMarkedForDeletion);
}, 4000);
//checkpoints
const checkpoints = [
	new CheckPoint({ x: 0, y: CANVAS_HEIGHT - 140 }, 0),
	new CheckPoint({ x: imagew * 1.5, y: CANVAS_HEIGHT - 140 }, 1),
	new CheckPoint({ x: imagew * 3.8, y: CANVAS_HEIGHT - 140 }, 2),
	new CheckPoint({ x: imagew * 5, y: CANVAS_HEIGHT - 140 }, 3),
	new CheckPoint({ x: 5461, y: CANVAS_HEIGHT - 140 }, 4),
];

let scrollOffset = 0;

export function movement(player, platform, background, ctx) {
	if (
		((keys.a || keys.leftArrow) && player.position.x > 0) ||
		(keys.leftArrow && scrollOffset === 0 && player.position.x > 0)
	) {
		player.facing = "left";
		changeFrame(player);
		player.velocity.x = -SPEED;
	} else if ((keys.d || keys.rightArrow) && player.position.x < 400) {
		player.facing = "right";
		changeFrame(player);
		player.velocity.x = +SPEED;
	} else if (keys.w || keys.upArrow) {
		player.velocity.y = -SPEED;
	} else if (keys.space && player.isAtPlatform) {
		player.velocity.y = -12;
		player.frames = 5;
	} else if (scrollOffset === 48400) {
		//end point
		player.velocity.x = 3;
		changeFrame(player);
		if (player.position.x >= 650) {
			player.velocity.x = 0;
			player.frames = 0;
		}
	} else {
		player.velocity.x = 0;
		// if ((keys.a || keys.leftArrow) && scrollOffset > 0) {
		// 	background.lastMovement = "left";
		// 	player.facing = "left";
		// 	changeFrame(player);
		// 	scrollOffset -= SPEED;
		// 	platform.position.x += SPEED;
		// 	background.position.x += SPEED * BGMULTIPLLIER * 0.66;
		// 	checkpoints.forEach((checkpoint) => {
		// 		checkpoint.position.x += SPEED * BGMULTIPLLIER;
		// 	});
		// 	stones.forEach((stone) => {
		// 		stone.position.x += SPEED * BGMULTIPLLIER;
		// 	});
		// 	fires.forEach((fire) => {
		// 		fire.position.x += SPEED * BGMULTIPLLIER;
		// 	});
		// 	snakes.forEach((snake) => {
		// 		snake.position.x += SPEED * BGMULTIPLLIER;
		// 	});
		// 	birds.forEach((bird) => {
		// 		bird.position.x += SPEED * BGMULTIPLLIER;
		// 	});
		// 	fruits.forEach((fruit) => {
		// 		fruit.position.x += SPEED * BGMULTIPLLIER;
		// 	});
		// } else
		if (keys.d || keys.rightArrow) {
			background.lastMovement = "right";
			player.facing = "right";
			scrollOffset += SPEED;
			changeFrame(player);
			platform.position.x -= SPEED;
			background.position.x -= SPEED * BGMULTIPLLIER * 0.66;
			checkpoints.forEach((checkpoint) => {
				checkpoint.position.x -= SPEED * BGMULTIPLLIER;
			});
			stones.forEach((stone) => {
				stone.position.x -= SPEED * BGMULTIPLLIER;
			});
			fires.forEach((fire) => {
				fire.position.x -= SPEED * BGMULTIPLLIER;
			});
			snakes.forEach((snake) => {
				snake.position.x -= SPEED * BGMULTIPLLIER;
			});
			birds.forEach((bird) => {
				bird.position.x -= SPEED * BGMULTIPLLIER;
			});
			fruits.forEach((fruit) => {
				fruit.position.x -= SPEED * BGMULTIPLLIER;
			});
		}
	}
	checkpoints.forEach((checkpoint) => {
		checkpoint.draw(ctx);
	});
	stones.forEach((stone) => {
		stone.draw(ctx);
		if (stone.collision(player)) {
			console.log("stone collision");
		}
	});
	fires.forEach((fire) => {
		fire.update(ctx);
		if (fire.collision(player)) {
			console.log("fire collision");
		}
	});
	snakes.forEach((snake) => {
		snake.update(ctx);
		if (snake.collision(player)) {
			console.log("snake collision");
		}
	});
	birds.forEach((bird) => {
		bird.update(ctx);
		if (bird.collision(player)) {
			console.log("bird collision");
		}
	});
	fruits.forEach((fruit) => {
		fruit.draw(ctx);
		if (fruit.collision(player)) {
			console.log("fruit collision");
		}
	});
}

function changeFrame(player) {
	if (player.frames < 6) {
		player.frames++;
	} else {
		player.frames = 0;
	}
}
