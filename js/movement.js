import { keys } from "./input.js";
import { CheckPoint } from "./Checkpoint.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, SPEED, imagew } from "./constants.js";
import { Stone } from "./Enemy/Stone.js";
import { Fire } from "./Enemy/Fire.js";
import { Snake } from "./Enemy/Snake.js";
import { Bird } from "./Enemy/Bird.js";
import { Fruit } from "./Fruit.js";
import { Spring } from "./powerup/Spring.js";
import { gameSound, fruitSound, jumpSound, deathSound } from "./sound.js";
import { endGame } from "./index.js";
import { Snail } from "./Enemy/Snail.js";
import { Spikes } from "./Enemy/Spikes.js";
import { Frog } from "./Enemy/Frog.js";

//as background image is repeated due to foreach loop while drawing platform
let bgMultiplier = 0.1;
let maxScrollOffset = 48400;

//fruits spawn
let fruits = [new Fruit(), new Fruit(), new Fruit(), new Fruit(), new Fruit()];
let fruitScore = 0;

//slown down frame change for player
let frameChangeCounter = 0;

//obstacles
let stones = [
	new Stone({ x: 500, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 2, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 3, y: CANVAS_HEIGHT - 130 }),
	new Stone({ x: CANVAS_WIDTH * 6, y: CANVAS_HEIGHT - 130 }),
];

let fires = [
	new Fire({ x: 800, y: CANVAS_HEIGHT - 150 }),
	new Fire({ x: CANVAS_WIDTH * 2 + 500, y: CANVAS_HEIGHT - 150 }),
	new Fire({ x: CANVAS_WIDTH * 5 + 200, y: CANVAS_HEIGHT - 150 }),
];
let snakes = [
	new Snake({ x: 1300, y: CANVAS_HEIGHT - 130 }),
	new Snake({ x: CANVAS_WIDTH * 5 - 200, y: CANVAS_HEIGHT - 130 }),
];

//spawn birds every 4 seconds
let birds = [];
let interval = setInterval(() => {
	birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
	//remove birds out of screen
	birds = birds.filter((bird) => !bird.isMarkedForDeletion);
}, 9000);
//checkpoints
let checkpoints = [
	new CheckPoint({ x: 0, y: CANVAS_HEIGHT - 140 }, 0),
	new CheckPoint({ x: imagew * 1.5, y: CANVAS_HEIGHT - 140 }, 1),
	new CheckPoint({ x: imagew * 3.8, y: CANVAS_HEIGHT - 140 }, 2),
	new CheckPoint({ x: imagew * 5, y: CANVAS_HEIGHT - 140 }, 3),
	new CheckPoint({ x: 5461, y: CANVAS_HEIGHT - 140 }, 4),
];
let springs = [];
let snails = [];
let frogs = [];
let spikes = [];

let scrollOffset = 0;

//reset game
export function initMove(gameLevel) {
	switch (gameLevel) {
		case 1:
			// Level 1
			bgMultiplier = 0.1;
			maxScrollOffset = 48400;
			//fruits spawn
			fruits = [
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
			];
			fruitScore = 0;

			//slown down frame change for player
			frameChangeCounter = 0;

			//obstacles
			stones = [
				new Stone({ x: 500, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 2, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 3, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 6, y: CANVAS_HEIGHT - 130 }),
			];

			fires = [
				new Fire({ x: 800, y: CANVAS_HEIGHT - 150 }),
				new Fire({ x: CANVAS_WIDTH * 2 + 500, y: CANVAS_HEIGHT - 150 }),
				new Fire({ x: CANVAS_WIDTH * 5 + 200, y: CANVAS_HEIGHT - 150 }),
			];
			snakes = [
				new Snake({ x: 1300, y: CANVAS_HEIGHT - 130 }),
				new Snake({ x: CANVAS_WIDTH * 5 - 200, y: CANVAS_HEIGHT - 130 }),
			];

			springs = [];
			snails = [];
			frogs = [];
			spikes = [];
			//spawn birds every 4 seconds
			birds = [];

			//checkpoints
			checkpoints = [
				new CheckPoint({ x: 0, y: CANVAS_HEIGHT - 140 }, 0),
				new CheckPoint({ x: imagew * 1.5, y: CANVAS_HEIGHT - 140 }, 1),
				new CheckPoint({ x: imagew * 3.8, y: CANVAS_HEIGHT - 140 }, 2),
				new CheckPoint({ x: imagew * 5, y: CANVAS_HEIGHT - 140 }, 3),
				new CheckPoint({ x: 5461, y: CANVAS_HEIGHT - 140 }, 4),
			];
			scrollOffset = 0;
			break;
		case 2:
			bgMultiplier = 0.1;
			maxScrollOffset = 48400;
			//fruits spawn
			fruits = [
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
			];
			fruitScore = 0;

			//slown down frame change for player
			frameChangeCounter = 0;

			//obstacles
			stones = [
				// new Stone({ x: 500, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 2, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 4, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 6, y: CANVAS_HEIGHT - 130 }),
			];

			fires = [
				new Fire({ x: 800, y: CANVAS_HEIGHT - 150 }),
				new Fire({ x: CANVAS_WIDTH * 4 + 500, y: CANVAS_HEIGHT - 150 }),
				new Fire({ x: CANVAS_WIDTH * 6 - 500, y: CANVAS_HEIGHT - 150 }),
			];
			snakes = [
				new Snake({ x: 1300, y: CANVAS_HEIGHT - 130 }),
				new Snake({ x: CANVAS_WIDTH * 5 - 200, y: CANVAS_HEIGHT - 130 }),
			];
			snails = [new Snail({ x: 500, y: CANVAS_HEIGHT - 130 })];
			frogs = [];

			springs = [
				new Spring({ x: 2078, y: CANVAS_HEIGHT - 110 }),
				new Spring({ x: CANVAS_WIDTH * 5 - 400, y: CANVAS_HEIGHT - 110 }),
			];

			//spawn birds every 4 seconds
			birds = [];

			//checkpoints
			checkpoints = [
				new CheckPoint({ x: 0, y: CANVAS_HEIGHT - 140 }, 0),
				new CheckPoint({ x: imagew * 1.5, y: CANVAS_HEIGHT - 140 }, 1),
				new CheckPoint({ x: imagew * 4, y: CANVAS_HEIGHT - 140 }, 2),
				new CheckPoint({ x: imagew * 5, y: CANVAS_HEIGHT - 140 }, 3),
				new CheckPoint({ x: 5461, y: CANVAS_HEIGHT - 140 }, 4),
			];
			scrollOffset = 0;
			break;
		case 3:
			bgMultiplier = 0.0909;
			maxScrollOffset = 53000;
			//fruits spawn
			console.log("moment2", gameLevel);
			fruits = [
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
				new Fruit(),
			];
			fruitScore = 0;

			//slown down frame change for player
			frameChangeCounter = 0;

			//obstacles
			stones = [
				new Stone({ x: CANVAS_WIDTH * 3 + 100, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 4, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 6 + 300, y: CANVAS_HEIGHT - 130 }),
			];

			fires = [
				new Fire({ x: 500, y: CANVAS_HEIGHT - 150 }),
				new Fire({ x: CANVAS_WIDTH * 4 - 300, y: CANVAS_HEIGHT - 150 }),
			];
			snakes = [
				new Snake({ x: CANVAS_WIDTH * 6 + 55, y: CANVAS_HEIGHT - 130 }),
			];
			snails = [new Snail({ x: 800, y: CANVAS_HEIGHT - 130 })];

			springs = [new Spring({ x: 4636, y: CANVAS_HEIGHT - 110 })];

			spikes = [new Spikes({ x: 1200, y: CANVAS_HEIGHT - 110 })];

			frogs = [
				new Frog({ x: 300, y: CANVAS_HEIGHT - 130 }),
				new Frog({ x: imagew * 3, y: CANVAS_HEIGHT - 130 }),
				new Frog({ x: CANVAS_WIDTH * 6, y: CANVAS_HEIGHT - 130 }),
			];

			//spawn birds every 4 seconds
			birds = [];

			//checkpoints
			checkpoints = [
				new CheckPoint({ x: 0, y: CANVAS_HEIGHT - 140 }, 0),
				new CheckPoint({ x: imagew * 2 - 40, y: CANVAS_HEIGHT - 140 }, 1),
				new CheckPoint({ x: imagew * 3, y: CANVAS_HEIGHT - 140 }, 2),
				new CheckPoint({ x: imagew * 5 - 100, y: CANVAS_HEIGHT - 140 }, 3),
				new CheckPoint({ x: 5461, y: CANVAS_HEIGHT - 140 }, 4),
			];
			scrollOffset = 0;
			break;
	}
}

export function movement(player, platform, background, ctx) {
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
	} else if (scrollOffset === maxScrollOffset) {
		//end point
		player.velocity.x = 3;
		changeFrame(player);
		if (player.position.x >= 650) {
			player.velocity.x = 0;
			player.frames = 0;
			endGame(true);
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
				background.position.x -= SPEED * bgMultiplier * 0.66;
				checkpoints.forEach((checkpoint) => {
					checkpoint.position.x -= SPEED * bgMultiplier;
				});
				stones.forEach((stone) => {
					stone.position.x -= SPEED * bgMultiplier;
				});
				fires.forEach((fire) => {
					fire.position.x -= SPEED * bgMultiplier;
				});
				snakes.forEach((snake) => {
					snake.position.x -= SPEED * bgMultiplier;
				});
				snails.forEach((snail) => {
					snail.position.x -= SPEED * bgMultiplier;
				});
				birds.forEach((bird) => {
					bird.position.x -= SPEED * bgMultiplier;
				});
				fruits.forEach((fruit) => {
					fruit.position.x -= SPEED * bgMultiplier;
				});
				springs.forEach((spring) => {
					spring.position.x -= SPEED * bgMultiplier;
				});
				spikes.forEach((spike) => {
					spike.position.x -= SPEED * bgMultiplier;
				});
				frogs.forEach((frog) => {
					frog.position.x -= SPEED * bgMultiplier;
				});
			}
		}
	}
	checkpoints.forEach((checkpoint) => {
		checkpoint.draw(ctx);
	});
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
			endGame(true);
		}
	});
	snakes.forEach((snake) => {
		snake.update(ctx);
		if (snake.collision(player)) {
			deathSound.play();
			endGame(true);
		}
	});
	snails.forEach((snail) => {
		snail.update(ctx);
		if (snail.collision(player)) {
			deathSound.play();
			endGame(true);
		}
	});
	birds.forEach((bird) => {
		bird.update(ctx);
		if (bird.collision(player)) {
			deathSound.play();
			endGame(true);
		}
	});
	fruits.forEach((fruit, i) => {
		fruit.draw(ctx);
		if (fruit.collision(player)) {
			fruitSound.play();
			fruitScore += 100;
			fruits.splice(i, 1);
		}
		if (fruit.collision(platform)) {
			fruits.splice(i, 1);
			fruits.push(new Fruit());
		}
	});

	springs.forEach((spring) => {
		spring.update(ctx);
		if (spring.collision(player)) {
			player.velocity.y = -15;
			player.frames = 5;
			jumpSound.play();
		}
	});
	spikes.forEach((spike) => {
		spike.update(ctx);
		if (spike.collision(player)) {
			deathSound.play();
			endGame(true);
		}
	});
	frogs.forEach((frog) => {
		frog.update(ctx);
		if (frog.collision(player)) {
			deathSound.play();
			endGame(true);
		}
	});

	player.score = Math.floor(scrollOffset * 0.02) + fruitScore;
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
