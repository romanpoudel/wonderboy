import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { Player } from "./Player.js";
import { movement } from "./movement.js";
import { Platform } from "./Platform.js";
import { collisionBottom, collisionSide, collisionTop } from "./collision.js";
import { Background } from "./Background.js";
import { createImage } from "./utils.js";
import { Enemy } from "./Enemy.js";

//setup canvas
const canvas = document.getElementById("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d");
//create background
const background = new Background({ x: 0, y: 0 });

//images
const image = createImage("./assets/images/base.png");
const image1 = createImage("./assets/images/Plataforma.png");

//event listener to load inages first
window.addEventListener("load", () => {
	//creating a player
	const player = new Player();
	//creating enemy
	const enemy = new Enemy();
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
		player.update(ctx);

		//enemy
		enemy.update(ctx);
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
				if(player.facing === "right"){
					player.position.x = platform.position.x - player.width;
				}else if(player.facing === "left"){
					player.position.x = platform.position.x + platform.width;
				}
			}
		});
		platforms.forEach((platform) => {
			movement(player, platform, background);
		});
		requestAnimationFrame(animate);
	}

	animate();
});
