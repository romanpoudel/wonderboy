import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { Player } from "./Player.js";
import { movement } from "./movement.js";
import { Platform } from "./Platform.js";
import { collisionBottom, collisionSide, collisionTop } from "./collision.js";
import { Background } from "./Background.js";
import { createImage, isMouseInsideButton } from "./utils.js";
import { Enemy } from "./Enemy/Enemy.js";
import { gameSound } from "./sound.js";

//setup canvas
const canvas = document.getElementById("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
export const ctx = canvas.getContext("2d");
//create background
const background = new Background({ x: 0, y: 0 });

//images
const image = createImage("./assets/images/base.png");
const image1 = createImage("./assets/images/Plataforma.png");

//sound functionality
let sound = false;
let canToggle = true; // Flag to prevent multiple toggles in the same frame
//play before dom loads
// gameSound.play();

//event listener to load inages first
window.addEventListener("load", () => {
	//creating a player
	const player = new Player();

	const platforms = [
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

	//animation loop
	function animate() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		background.draw(ctx);
		background.update();
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

		// Handle mouse click event
		canvas.addEventListener("click", function (event) {
			if (!canToggle) {
				return; // Exit the function if the button can't be toggled
			}
			var mouseX = event.offsetX;
			var mouseY = event.offsetY;

			const buttonx = CANVAS_WIDTH - 50;
			const buttony = 5;
			const size = 40;
			if (isMouseInsideButton(mouseX, mouseY, buttonx, buttony, size)) {
				sound = !sound;

				canToggle = false; // Disable further toggles in the current frame

				// Schedule the reset of the flag after a short delay (e.g., 500ms)
				setTimeout(() => {
					canToggle = true;
				}, 500);
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

		requestAnimationFrame(animate);
	}

	animate();
});
