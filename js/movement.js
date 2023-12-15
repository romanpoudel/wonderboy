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
import { gameSound, fruitSound, jumpSound, deathSound } from "./sound.js";
import { endGame } from "./index.js";

const scoreValue = document.querySelector(".score__value");

//fruits spawn
let fruits = [new Fruit(), new Fruit(), new Fruit(), new Fruit(), new Fruit()];
let fruitScore = 0;

//slown down frame change for player
let frameChangeCounter = 0;

//obstacles
const stones = [
	new Stone({ x: 500, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 2, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 3, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 6, y: CANVAS_HEIGHT - 130 }),
];

const fires = [
	new Fire({ x: 800, y: CANVAS_HEIGHT - 150 }),
	new Fire({ x: CANVAS_WIDTH * 2 + 500, y: CANVAS_HEIGHT - 150 }),
	new Fire({ x: CANVAS_WIDTH * 5 + 200, y: CANVAS_HEIGHT - 150 }),
];
const snakes = [
	new Snake({ x: 1300, y: CANVAS_HEIGHT - 130 }),
	new Snake({ x: CANVAS_WIDTH * 5 - 200, y: CANVAS_HEIGHT - 130 }),
];

//spawn birds every 4 seconds
let birds = [];
setInterval(() => {
	birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
	//remove birds out of screen
	birds = birds.filter((bird) => !bird.isMarkedForDeletion);
}, 9000);
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
	player.score = Math.floor(scrollOffset * 0.02) + fruitScore;
	scoreValue.textContent = player.score - 1;
	stones.forEach((stone) => {
		stone.draw(ctx);
		if (stone.collision(player)) {
			player.isCollidingWithStone = true;
			if (player.position.x < stone.position.x) {
				player.position.x = stone.position.x - player.width;
			} else if (player.position.x > stone.position.x) {
				player.position.x = stone.position.x + stone.width + 1; //added 1 as last stone was stoping player
			} else {
				player.position.x = stone.position.x + stone.width;
			}
		} else {
			player.isCollidingWithStone = false;
		}
	});
	fires.forEach((fire) => {
		fire.update(ctx);
		if (fire.collision(player)) {
			deathSound.play();
			endGame();
		}
	});
	snakes.forEach((snake) => {
		snake.update(ctx);
		if (snake.collision(player)) {
			deathSound.play();
			endGame();
		}
	});
	birds.forEach((bird) => {
		bird.update(ctx);
		if (bird.collision(player)) {
			deathSound.play();
			endGame();
		}
	});
	fruits.forEach((fruit, i) => {
		fruit.draw(ctx);
		if (fruit.collision(player)) {
			fruitSound.play();
			fruitScore += 100;
			fruits.splice(i, 1);
		}
	});
	if (keys.space && player.isAtPlatform) {
		player.velocity.y = -12;
		player.frames = 5;
		jumpSound.play();
	}
	if (
		((keys.a || keys.leftArrow) && player.position.x > 0) ||
		(keys.leftArrow && scrollOffset === 0 && player.position.x > 0)
	) {
		player.facing = "left";
		changeFrame(player);
		player.velocity.x = -SPEED;
	} else if ((keys.d || keys.rightArrow) && player.position.x < 430) {
		player.facing = "right";
		changeFrame(player);
		player.velocity.x = +SPEED;
	} else if (scrollOffset === 48400) {
		//end point
		player.velocity.x = 3;
		changeFrame(player);
		if (player.position.x >= 650) {
			player.velocity.x = 0;
			player.frames = 0;
			scoreValue.textContent = player.score;
			endGame();
		}
	} else {
		player.velocity.x = 0;
		if (keys.d || keys.rightArrow) {
			background.lastMovement = "right";
			player.facing = "right";
			changeFrame(player);
			if (!player.isCollidingWithStone) {
				scrollOffset += SPEED;
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
	}
	checkpoints.forEach((checkpoint) => {
		checkpoint.draw(ctx);
	});
}

function changeFrame(player) {
	if (frameChangeCounter < 40) {
		frameChangeCounter++;
		return;
	}
	if (player.frames < 5) {
		player.frames++;
	} else {
		player.frames = 0;
	}
	frameChangeCounter = 0;
}
