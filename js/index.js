import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { Player } from "./Player.js";
import { movement } from "./movement.js";
import { Platform } from "./Platform.js";
import { collisionBottom, collisionSide, collisionTop } from "./collision.js";
import { Background } from "./Background.js";
import { createImage, isMouseInsideButton } from "./utils.js";
import { Enemy } from "./Enemy/Enemy.js";
import { gameSound } from "./sound.js";
import  "./level.js";
import { gameLevel } from "./level.js";
import { initMove } from "./movement.js";

const scoreValue = document.querySelector(".score__value");

//setup canvas
const canvas = document.getElementById("canvas");
const menu = document.querySelector(".menu");
menu.style.display = "none";
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
export const ctx = canvas.getContext("2d");
//create background
let background = new Background({ x: 0, y: 0 });

//images
let image = createImage("./assets/images/base.png");
let image1 = createImage("./assets/images/Plataforma.png");

//sound functionality
let sound = false;
let canToggle = true; // Flag to prevent multiple toggles in the same frame

//creating a player
let player = new Player();

let platforms = [
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

function init() {
	initMove(gameLevel);
	//this init should save score and reset the game
	switch (gameLevel) {
		case 1:
			// Level 1
			console.log("bg1",gameLevel);
			//create background
			background = new Background({ x: 0, y: 0 });

			//images
			image = createImage("./assets/images/base.png");
			image1 = createImage("./assets/images/Plataforma.png");

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
			break;
		case 2:
			// Level 2
			console.log("bg2",gameLevel);
			//create background
			background = new Background({ x: 0, y: 0 });

			//images
			image = createImage("./assets/images/base.png");
			image1 = createImage("./assets/images/Plataforma.png");

			player = new Player();
			platforms = [
				new Platform({ x: 0, y: CANVAS_HEIGHT - 90 }, image),
				new Platform({ x: image.width, y: CANVAS_HEIGHT - 90 }, image),
				new Platform({ x: image.width * 2, y: CANVAS_HEIGHT - 90 }, image),
				new Platform({ x: image.width * 3+100, y: 300 }, image1),
				new Platform({ x: image.width * 3 + 400, y: 300 }, image1),
				new Platform({ x: image.width * 4, y: CANVAS_HEIGHT - 90 }, image),
				new Platform({ x: image.width * 5, y: CANVAS_HEIGHT - 90 }, image),
				new Platform({ x: image.width * 6, y: CANVAS_HEIGHT - 90 }, image),
				new Platform({ x: image.width * 7 + 150, y: 300 }, image1),
				new Platform({ x: image.width * 8-200, y: CANVAS_HEIGHT - 90 }, image),
			];
			break;
		case 3:
			// Level 3
			console.log("level3");
			break;
		case 4:
			// Level 4
			console.log("level4");
			break;
		case 5:
			// Level 5
			console.log("level5");
			break;
	}
}

//game ending value
let hasGameEnded = false;
let isGamePaused = false;
let playBtn = false;

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
				if (isMouseInsideButton(mouseX, mouseY, buttonxS, buttonyS, size)) {
					sound = !sound;
					canToggle = false; // Disable further toggles in the current frame

					// Schedule the reset of the flag after a short delay
					setTimeout(() => {
						canToggle = true;
					}, 500);
				}
				//pause game
				const buttonxG = CANVAS_WIDTH - 100;
				const buttonyG = 5;
				if (isMouseInsideButton(mouseX, mouseY, buttonxG, buttonyG, size)) {
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
				}
			});

			platforms.forEach((platform) => {
				movement(player, platform, background, ctx);
			});
			player.update(ctx);

			// platform.update(ctx);
			platforms.forEach((platform) => {
				platform.update(ctx);
			});
			//collision detection
			platforms.forEach((platform) => {
				if (collisionTop(player, platform)) {
					player.velocity.y = 0;
					player.isAtPlatform = true;
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
		}
		requestAnimationFrame(animate);
	}

	animate();
});
