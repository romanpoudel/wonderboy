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
import { createImage, randomNum } from "./utils.js";
import { Lava } from "./Enemy/Lava.js";
import { Spider } from "./Enemy/Spider.js";
import { DangerHead } from "./Enemy/DangerHead.js";
import { hammers } from "./index.js";

const gameResult=document.querySelector(".result");

function result(final){
	if(final){
		gameResult.innerHTML="Complete"
	}else{
		gameResult.innerHTML="You Failed"
	}
}

//as background image is repeated due to foreach loop while drawing platform
let bgMultiplier = 0.1;
let maxScrollOffset = 48400;

//fruits spawn
let fruits = [new Fruit(), new Fruit(), new Fruit(), new Fruit(), new Fruit()];
// Check for collisions and reposition fruits if necessary
fruits.forEach((fruit, i) => {
	for (let j = 0; j < i; j++) {
		// Check collision with previous fruits
		while (fruit.fruitCollision(fruits[j])) {
			fruit.position.x = randomNum(40, 5000);
		}
	}
});
let fruitScore = 0;
let enemyScore = 0;

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
let birdTiming = 9000;

let interval = setInterval(() => {
	birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
	//remove birds out of screen
	birds = birds.filter((bird) => !bird.isMarkedForDeletion);
	lavas = lavas.filter((lava) => !lava.isMarkedForDeletion);
}, birdTiming);
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
let lavas = [];
let spiders = [];
let dangers = [];

let scrollOffset = 0;

//reset game
export function initMove(gameLevel) {
	switch (gameLevel) {
		case 1:
			// Level 1
			birdTiming = 9000;
			bgMultiplier = 0.1;
			maxScrollOffset = 48400;
			//fruits spawn
			fruits = [];
			for (let i = 0; i < 5; i++) {
				fruits.push(new Fruit());
			}
			fruits.forEach((fruit, i) => {
				for (let j = 0; j < i; j++) {
					// Check collision with previous fruits
					while (fruit.fruitCollision(fruits[j])) {
						fruit.position.x = randomNum(40, 5000);
					}
				}
			});
			fruitScore = 0;
			enemyScore = 0;

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
			lavas = [];
			spiders = [];
			dangers = [];
			//spawn birds 
			birds = [];
			clearInterval(interval);
			interval = setInterval(() => {
				birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
				//remove birds out of screen
				birds = birds.filter((bird) => !bird.isMarkedForDeletion);
				lavas = lavas.filter((lava) => !lava.isMarkedForDeletion);
			}, birdTiming);

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
			birdTiming = 8000;
			bgMultiplier = 0.1;
			maxScrollOffset = 48400;
			//fruits spawn
			fruits = [];
			for (let i = 0; i < 15; i++) {
				fruits.push(new Fruit());
			}
			fruits.forEach((fruit, i) => {
				for (let j = 0; j < i; j++) {
					// Check collision with previous fruits
					while (fruit.fruitCollision(fruits[j])) {
						fruit.position.x = randomNum(40, 5000);
					}
				}
			});
			fruitScore = 0;
			enemyScore = 0;

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
			lavas = [];
			spiders = [];
			dangers = [];

			//spawn birds  
			birds = [];
			clearInterval(interval);
			interval = setInterval(() => {
				birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
				//remove birds out of screen
				birds = birds.filter((bird) => !bird.isMarkedForDeletion);
				lavas = lavas.filter((lava) => !lava.isMarkedForDeletion);
			}, birdTiming);

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
			birdTiming = 7000;
			bgMultiplier = 0.0909;
			maxScrollOffset = 53000;
			//fruits spawn
			fruits = [];
			for (let i = 0; i < 15; i++) {
				fruits.push(new Fruit());
			}
			fruits.forEach((fruit, i) => {
				for (let j = 0; j < i; j++) {
					// Check collision with previous fruits
					while (fruit.fruitCollision(fruits[j])) {
						fruit.position.x = randomNum(40, 5000);
					}
				}
			});
			fruitScore = 0;
			enemyScore = 0;

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
			let whitespikeImg = createImage(
				"./assets/images/obstacles/spikesWhite.png"
			);
			whitespikeImg.onload = () => {
				spikes = [
					new Spikes({ x: 1200, y: CANVAS_HEIGHT - 110 }, whitespikeImg),
				];
			};

			frogs = [
				new Frog({ x: 300, y: CANVAS_HEIGHT - 130 }),
				new Frog({ x: imagew * 3, y: CANVAS_HEIGHT - 130 }),
				new Frog({ x: CANVAS_WIDTH * 6, y: CANVAS_HEIGHT - 130 }),
			];
			lavas = [];
			spiders = [];
			dangers = [];

			//spawn birds 
			birds = [];
			clearInterval(interval);
			interval = setInterval(() => {
				birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
				//remove birds out of screen
				birds = birds.filter((bird) => !bird.isMarkedForDeletion);
				lavas = lavas.filter((lava) => !lava.isMarkedForDeletion);
			}, birdTiming);

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
		case 4:
			birdTiming = 6000;
			bgMultiplier = 0.0833333333333333;
			maxScrollOffset = 58000;
			//fruits spawn
			fruits = [];
			for (let i = 0; i < 20; i++) {
				fruits.push(new Fruit());
			}
			fruits.forEach((fruit, i) => {
				for (let j = 0; j < i; j++) {
					// Check collision with previous fruits
					while (fruit.fruitCollision(fruits[j])) {
						fruit.position.x = randomNum(40, 5000);
					}
				}
			});
			fruitScore = 0;
			enemyScore = 0;

			//slown down frame change for player
			frameChangeCounter = 0;

			//obstacles
			stones = [
				new Stone({ x: CANVAS_WIDTH * 3 + 100, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 4, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 6 + 300, y: CANVAS_HEIGHT - 130 }),
			];

			fires = [
				new Fire({ x: 700, y: CANVAS_HEIGHT - 150 }),
				new Fire({ x: CANVAS_WIDTH * 4 - 300, y: CANVAS_HEIGHT - 150 }),
			];
			snakes = [
				new Snake({ x: CANVAS_WIDTH * 6 + 55, y: CANVAS_HEIGHT - 130 }),
			];
			snails = [new Snail({ x: imagew + 500, y: CANVAS_HEIGHT - 130 })];

			springs = [new Spring({ x: imagew * 6 - 20, y: 350 })];
			let redspikeImg = createImage("./assets/images/obstacles/spikesRed.png");
			redspikeImg.onload = () => {
				spikes = [
					new Spikes({ x: 300, y: CANVAS_HEIGHT - 110 }, redspikeImg),
					new Spikes({ x: 360, y: CANVAS_HEIGHT - 110 }, redspikeImg),
				];
			};

			frogs = [new Frog({ x: imagew * 3, y: CANVAS_HEIGHT - 130 })];

			lavas = [];
			for (let i = 0; i < 30; i++) {
				lavas.push(new Lava({ x: imagew * 2 + i * 25, y: CANVAS_HEIGHT - 30 }));
			}
			for (let i = 0; i < 43; i++) {
				lavas.push(new Lava({ x: imagew * 5 + i * 25, y: CANVAS_HEIGHT - 30 }));
			}

			spiders = [
				new Spider({ x: imagew * 5 - 150, y: 180 }),
				new Spider({ x: imagew * 5 - 110, y: 200 }),
				new Spider({ x: CANVAS_WIDTH * 6, y: 220 }),
			];
			//spawn birds 
			birds = [];
			clearInterval(interval);
			interval = setInterval(() => {
				birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
				//remove birds out of screen
				birds = birds.filter((bird) => !bird.isMarkedForDeletion);
				lavas = lavas.filter((lava) => !lava.isMarkedForDeletion);
			}, birdTiming);

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
		case 5:
			birdTiming = 5000;
			bgMultiplier = 0.0833333333333333;
			maxScrollOffset = 58000;
			//fruits spawn
			fruits = [];
			for (let i = 0; i < 30; i++) {
				fruits.push(new Fruit());
			}
			fruits.forEach((fruit, i) => {
				for (let j = 0; j < i; j++) {
					// Check collision with previous fruits
					while (fruit.fruitCollision(fruits[j])) {
						fruit.position.x = randomNum(40, 5000);
					}
				}
			});
			fruitScore = 0;
			enemyScore = 0;

			//slown down frame change for player
			frameChangeCounter = 0;

			//obstacles
			stones = [
				new Stone({ x: CANVAS_WIDTH * 3 + 100, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 4, y: CANVAS_HEIGHT - 130 }),
				new Stone({ x: CANVAS_WIDTH * 6 + 300, y: CANVAS_HEIGHT - 130 }),
			];

			fires = [
				new Fire({ x: 700, y: CANVAS_HEIGHT - 150 }),
				new Fire({ x: CANVAS_WIDTH * 4 - 300, y: CANVAS_HEIGHT - 150 }),
			];
			snakes = [
				new Snake({ x: CANVAS_WIDTH * 6 + 55, y: CANVAS_HEIGHT - 130 }),
			];
			snails = [new Snail({ x: imagew + 500, y: CANVAS_HEIGHT - 130 })];

			springs = [new Spring({ x: imagew * 6 - 20, y: 350 })];
			let redspikeImg1 = createImage("./assets/images/obstacles/spikesRed.png");
			redspikeImg1.onload = () => {
				spikes = [
					new Spikes({ x: 300, y: CANVAS_HEIGHT - 110 }, redspikeImg1),
					new Spikes({ x: 360, y: CANVAS_HEIGHT - 110 }, redspikeImg1),
				];
			};

			frogs = [new Frog({ x: imagew * 3, y: CANVAS_HEIGHT - 130 })];

			lavas = [];

			for (let i = 0; i < 30; i++) {
				lavas.push(new Lava({ x: imagew * 2 + i * 25, y: CANVAS_HEIGHT - 30 }));
			}
			for (let i = 0; i < 43; i++) {
				lavas.push(new Lava({ x: imagew * 5 + i * 25, y: CANVAS_HEIGHT - 30 }));
			}

			spiders = [
				new Spider({ x: imagew * 5 - 150, y: 180 }),
				new Spider({ x: imagew * 5 - 110, y: 200 }),
				new Spider({ x: CANVAS_WIDTH * 6, y: 220 }),
			];

			dangers = [new DangerHead({ x: 800, y: CANVAS_HEIGHT - 150 })];
			//spawn birds
			birds = [];
			clearInterval(interval);
			interval = setInterval(() => {
				birds.push(new Bird({ x: CANVAS_WIDTH, y: CANVAS_HEIGHT - 260 }));
				//remove birds out of screen
				birds = birds.filter((bird) => !bird.isMarkedForDeletion);
				lavas = lavas.filter((lava) => !lava.isMarkedForDeletion);
			}, birdTiming);

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
			result(true)
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
				lavas.forEach((lava) => {
					lava.position.x -= SPEED * bgMultiplier;
				});
				spiders.forEach((spider) => {
					spider.position.x -= SPEED * bgMultiplier;
				});
				dangers.forEach((danger) => {
					danger.position.x -= SPEED * bgMultiplier;
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
			result(false);
		}
	});
	snakes.forEach((snake) => {
		snake.update(ctx);
		if (snake.collision(player)) {
			deathSound.play();
			endGame(true);
			result(false);
		}
	});
	snails.forEach((snail) => {
		snail.update(ctx);
		if (snail.collision(player)) {
			deathSound.play();
			endGame(true);
			result(false);
		}
	});
	birds.forEach((bird) => {
		bird.update(ctx);
		if (bird.collision(player)) {
			deathSound.play();
			endGame(true);
			result(false);
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
			jumpSound.play().catch((err) => {
				console.log(err);
			});
		}
	});
	spikes.forEach((spike) => {
		spike.update(ctx);
		if (spike.collision(player)) {
			deathSound.play().catch((err) => {
				console.log(err);
			});
			endGame(true);
			result(false);
		}
	});
	frogs.forEach((frog) => {
		frog.update(ctx);
		if (frog.collision(player)) {
			deathSound.play().catch((err) => {
				console.log(err);
			});
			endGame(true);
			result(false);
		}
	});
	lavas.forEach((lava) => {
		lava.update(ctx);
		if (lava.collision(player)) {
			deathSound.play().catch((err) => {
				console.log(err);
			});
			endGame(true);
			result(false);
		}
	});
	spiders.forEach((spider) => {
		spider.update(ctx);
		if (spider.collision(player)) {
			deathSound.play().catch((err) => {
				console.log(err);
			});
			endGame(true);
			result(false);
		}
	});
	dangers.forEach((danger) => {
		danger.update(ctx);
		if (danger.collision(player)) {
			deathSound.play().catch((err) => {
				console.log(err);
			});
			endGame(true);
			result(false);
		}
	});

	//hammer collision with enemies
	hammers.forEach((hammer) => {
		//bird
		birds.forEach((bird, i) => {
			if (hammer.collision(bird)) {
				birds.splice(i, 1);
				enemyScore += 150;
				fruitSound.play().catch((err) => {
					console.log(err);
				});
			}
		});
		//dangerHead
		dangers.forEach((danger, i) => {
			if (hammer.collision(danger)) {
				dangers.splice(i, 1);
				enemyScore += 150;
				fruitSound.play().catch((err) => {
					console.log(err);
				});
			}
		});
		//frog
		frogs.forEach((frog, i) => {
			if (hammer.collision(frog)) {
				frogs.splice(i, 1);
				enemyScore += 150;
				fruitSound.play().catch((err) => {
					console.log(err);
				});
			}
		});
		// snail
		snails.forEach((snail, i) => {
			if (hammer.collision(snail)) {
				snails.splice(i, 1);
				enemyScore += 150;
				fruitSound.play().catch((err) => {
					console.log(err);
				});
			}
		});
		// snake
		snakes.forEach((snake, i) => {
			if (hammer.collision(snake)) {
				snakes.splice(i, 1);
				enemyScore += 150;
				fruitSound.play().catch((err) => {
					console.log(err);
				});
			}
		});
		// spider
		spiders.forEach((spider, i) => {
			if (hammer.collision(spider)) {
				spiders.splice(i, 1);
				enemyScore += 150;
				fruitSound.play().catch((err) => {
					console.log(err);
				});
			}
		});
	});

	player.score = Math.floor(scrollOffset * 0.02) + fruitScore + enemyScore;
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
