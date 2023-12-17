import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { createImage, isMouseInsideButton } from "./utils.js";
import { Player } from "./Player.js";
import { movement } from "./movement.js";
import { Platform } from "./Platform.js";
import { collisionBottom, collisionSide, collisionTop } from "./collision.js";
import { Background } from "./Background.js";
import { Enemy } from "./Enemy/Enemy.js";
import { gameSound } from "./sound.js";
import "./level.js";
import { gameLevel } from "./level.js";
import { initMove } from "./movement.js";
import { Lift } from "./Lift.js";

const scoreValue = document.querySelector(".score__value");

export let hammers = [];

//setup canvas
const canvas = document.getElementById("canvas");
const menu = document.querySelector(".menu");
menu.style.display = "none";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
export const ctx = canvas.getContext("2d");

//creating a player
let player = new Player();

//create background
let bgImage = createImage("./assets/images/backgrounds/background2.jpg");
let background = new Background({ x: 0, y: 0 }, bgImage);

//images
let image = createImage("./assets/images/platforms/base.png");
let image1 = createImage("./assets/images/platforms/Plataforma.png");

//sound functionality
let sound = false;
let canToggle = true; // Flag to prevent multiple toggles in the same frame

//game ending value
let hasGameEnded = false;
let isGamePaused = false;
let playBtn = false;

// Handle mouse click event
canvas.addEventListener("click", function (event) {
	if (!canToggle) {
		return; // Exit the function if the button can't be toggled
	}
	var mouseX = event.offsetX;
	var mouseY = event.offsetY;

	const buttonxS = CANVAS_WIDTH - 50;
	const buttonyS = 5;
	const size = 40;
	//pause game
	const buttonxG = CANVAS_WIDTH - 100;
	const buttonyG = 5;
	if (isMouseInsideButton(mouseX, mouseY, buttonxS, buttonyS, size)) {
		sound = !sound;
		canToggle = false; // Disable further toggles in the current frame

		// Schedule the reset of the flag after a short delay
		setTimeout(() => {
			canToggle = true;
		}, 500);
	} else if (isMouseInsideButton(mouseX, mouseY, buttonxG, buttonyG, size)) {
		playBtn = !playBtn;
		// isGamePaused = !isGamePaused;
		canToggle = false; // Disable further toggles in the current frame
		setTimeout(() => {
			isGamePaused = !isGamePaused;
		}, 200);
		// Schedule the reset of the flag after a short delay
		setTimeout(() => {
			canToggle = true;
		}, 300);
	} else {
		let hammer = player.shoot();
		hammers.push(hammer);
	}
});


let platforms = [];
image.onload = function () {
	image1.onload = function () {
		player = new Player();
		platforms = [
			new Platform({ x: 0, y: CANVAS_HEIGHT - 90 }, image),
			new Platform({ x: image.width, y: CANVAS_HEIGHT - 90 }, image),
			new Platform({ x: image.width * 2, y: CANVAS_HEIGHT - 90 }, image),
			new Platform({ x: image.width * 3, y: CANVAS_HEIGHT - 90 }, image),
			new Platform({ x: image.width * 4, y: 300 }, image1),
			new Platform({ x: image.width * 4 + 200, y: 200 }, image1),
			new Platform({ x: image.width * 4 + 450, y: 300 }, image1),
			new Platform({ x: image.width * 5, y: CANVAS_HEIGHT - 90 }, image),
			new Platform({ x: image.width * 6, y: CANVAS_HEIGHT - 90 }, image),
			new Platform({ x: image.width * 7, y: CANVAS_HEIGHT - 90 }, image),
		];
	};
};

function init() {
	initMove(gameLevel);
	//this init should save score and reset the game
	switch (gameLevel) {
		case 1:
			// Level 1
			//create background
			bgImage = createImage("./assets/images/backgrounds/background2.jpg");
			background = new Background({ x: 0, y: 0 }, bgImage);

			//images
			image = createImage("./assets/images/platforms/base.png");
			image1 = createImage("./assets/images/platforms/Plataforma.png");

			player = new Player();
			image.onload = function () {
				image1.onload = function () {
					platforms = [
						new Platform({ x: 0, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 2, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 3, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 4, y: 300 }, image1),
						new Platform({ x: image.width * 4 + 200, y: 200 }, image1),
						new Platform({ x: image.width * 4 + 450, y: 300 }, image1),
						new Platform({ x: image.width * 5, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 6, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 7, y: CANVAS_HEIGHT - 90 }, image),
					];
				};
			};
			break;
		case 2:
			//create background
			bgImage = createImage("./assets/images/backgrounds/background2.jpg");
			background = new Background({ x: 0, y: 0 }, bgImage);

			//images
			image = createImage("./assets/images/platforms/base.png");
			image1 = createImage("./assets/images/platforms/Plataforma.png");
			player = new Player();

			image.onload = function () {
				image1.onload = function () {
					platforms = [
						new Platform({ x: 0, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 2, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 3 + 100, y: 300 }, image1),
						new Platform({ x: image.width * 3 + 400, y: 300 }, image1),
						new Platform({ x: image.width * 4, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 5, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 6, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 7 + 150, y: 300 }, image1),
						new Platform(
							{ x: image.width * 8 - 200, y: CANVAS_HEIGHT - 90 },
							image
						),
					];
				};
			};
			break;
		case 3:
			//create background
			bgImage = createImage("./assets/images/backgrounds/lvl3Bg.jpg");
			background = new Background({ x: 0, y: 0 }, bgImage);

			//images
			image = createImage("./assets/images/platforms/lvl3Base.jpg");
			image1 = createImage("./assets/images/platforms/cloud.png");

			player = new Player();

			image.onload = function () {
				image1.onload = function () {
					platforms = [
						new Platform({ x: 0, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 2 + 120, y: 300 }, image1), //movable platform
						new Platform({ x: image.width * 2 + 400, y: 300 }, image1), //movable platform
						new Platform({ x: image.width * 3, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 4, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 5 + 150, y: 300 }, image1),
						new Platform({ x: image.width * 6 - 200, y: 200 }, image1),
						new Platform({ x: image.width * 6 + 100, y: 100 }, image1),
						new Platform(
							{ x: image.width * 6 + 400, y: CANVAS_HEIGHT - 90 },
							image
						),
						new Platform({ x: image.width * 7, y: CANVAS_HEIGHT - 90 }, image),
					];
				};
			};
			break;
		case 4:
			//create background
			bgImage = createImage("./assets/images/backgrounds/lvl4Bg.jpeg");
			background = new Background({ x: 0, y: 0 }, bgImage);

			//images
			image = createImage("./assets/images/platforms/lvl4Base.jpg");
			image1 = createImage("./assets/images/platforms/lvl4Platform.jpg");

			player = new Player();

			image.onload = function () {
				image1.onload = function () {
					platforms = [
						new Platform({ x: 0, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 2 + 120, y: 300 }, image1), //movable platform
						new Platform({ x: image.width * 2 + 400, y: 300 }, image1), //movable platform
						new Platform({ x: image.width * 3, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 4, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 5 + 150, y: 330 }, image1),
						new Platform({ x: image.width * 6 - 80, y: 370 }, image1),
						new Platform({ x: image.width * 6 - 260, y: 220 }, image1),
						new Platform({ x: image.width * 6 + 150, y: 150 }, image1),
						new Platform(
							{ x: image.width * 6 + 400, y: CANVAS_HEIGHT - 90 },
							image
						),
						new Platform({ x: image.width * 7, y: CANVAS_HEIGHT - 90 }, image),
					];
				};
			};
			break;
		case 5:
			//create background
			bgImage = createImage("./assets/images/backgrounds/lvl5Bg.png");
			background = new Background({ x: 0, y: 0 }, bgImage);

			//images
			image = createImage("./assets/images/platforms/lvl5Base.jpg");
			image1 = createImage("./assets/images/platforms/lvl5Platform.jpg");

			player = new Player();

			image.onload = function () {
				image1.onload = function () {
					platforms = [
						new Platform({ x: 0, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width, y: CANVAS_HEIGHT - 90 }, image),
						new Lift({ x: image.width * 2 + 140, y: 300 }, image1, "vertical"), //movable platform
						new Lift({ x: image.width * 2 + 400, y: 300 }, image1, "vertical"), //movable platform
						new Platform({ x: image.width * 3, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 4, y: CANVAS_HEIGHT - 90 }, image),
						new Platform({ x: image.width * 5 + 150, y: 330 }, image1),
						new Platform({ x: image.width * 6 - 80, y: 370 }, image1),
						new Platform({ x: image.width * 6 - 260, y: 220 }, image1),
						new Platform({ x: image.width * 6 + 150, y: 150 }, image1),
						new Platform(
							{ x: image.width * 6 + 400, y: CANVAS_HEIGHT - 90 },
							image
						),
						new Platform({ x: image.width * 7, y: CANVAS_HEIGHT - 90 }, image),
					];
				};
			};
			break;
	}
}

export function endGame(state) {
	if (state) {
		hasGameEnded = true;
		menu.style.display = "flex";
		scoreValue.innerHTML = player.score;
	} else {
		hasGameEnded = false;
		menu.style.display = "none";
		init();
	}
}
//event listener to load images first
window.addEventListener("load", () => {
	//animation loop
	function animate() {
		if (!hasGameEnded && !isGamePaused) {
			ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
			background.draw(ctx);
			background.update();
			//play pause
			const pause = playBtn
				? createImage("./assets/images/play.png")
				: createImage("./assets/images/pause.png");
			ctx.drawImage(pause, CANVAS_WIDTH - 100, 5, 40, 40);
			const speaker = sound
				? createImage("./assets/images/unmute.png")
				: createImage("./assets/images/mute.png");
			//start game sound
			if (sound) {
				gameSound.play().catch((err) => {
					console.log(err);
				});
			} else {
				gameSound.pause();
			}
			ctx.drawImage(speaker, CANVAS_WIDTH - 50, 5, 40, 40);

			//score
			ctx.font = "bold 18px Arial ";
			ctx.fillStyle = "black";
			ctx.fillText("Score: " + player.score, 20, 30);
			ctx.fillText("Level: " + gameLevel, 150, 30);

			platforms.forEach((platform) => {
				movement(player, platform, background, ctx);
				platform.update(ctx);
			});
			player.update(ctx);

			//collision detection
			platforms.forEach((platform) => {
				if (collisionTop(player, platform)) {
					player.velocity.y = 0;
					player.isAtPlatform = true;
					///update the code
					if (platform instanceof Lift) {
						console.log(platform.speed);
						console.log(platform.position.y, platform.position.x);
						player.position.y += platform.speed;
					}
				}
				if (collisionBottom(player, platform)) {
					player.velocity.y = -player.velocity.y;
				}
				if (collisionSide(player, platform)) {
					if (player.facing === "right") {
						player.position.x = platform.position.x - player.width;
					} else if (player.facing === "left") {
						player.position.x = platform.position.x + platform.width;
					}
				}
			});
			//update hammer
			hammers.forEach((hammer,i) => {
				hammer.update(ctx);
				if (hammer.isOutOfScreen()) {
					hammers.splice(i, 1);
				}
			});
		}
		requestAnimationFrame(animate);
	}

	animate();
});
