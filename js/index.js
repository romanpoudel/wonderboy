import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { Player } from "./Player.js";
import { movement } from "./movement.js";
import { Platform } from "./Platform.js";
import { collisionBottom, collisionSide, collisionTop } from "./collision.js";
import { Background } from "./Background.js";
import { createImage } from "./utils.js";
//setup canvas
const canvas = document.getElementById("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const ctx = canvas.getContext("2d");
//create background
const background = new Background({ x: 0, y: 0 });
// const backgrounds = [
// 	new Background({ x: 0, y: 0 }),
// 	new Background({ x: CANVAS_WIDTH, y: 0 }),
// 	new Background({ x: CANVAS_WIDTH * 2, y: 0 }),
// 	new Background({ x: CANVAS_WIDTH * 3, y: 0 }),
// 	new Background({ x: CANVAS_WIDTH * 4, y: 0 }),
// 	new Background({ x: CANVAS_WIDTH * 5, y: 0 })
// ];

//images
const image = createImage("./assets/images/base.png");
const image1 = createImage("./assets/images/Plataforma.png");

//event listener to load inages first
window.addEventListener("load",()=>{
//creating a player
const player = new Player();
// const platform = new Platform();
// const platforms = [new Platform({x:200,y:100},image1),new Platform({x:400,y:200},image1),new Platform({x:0,y:CANVAS_HEIGHT-90},image),new Platform({x:image.width,y:CANVAS_HEIGHT-90},image)];
const platforms = [
	new Platform({ x: 0, y: CANVAS_HEIGHT - 90 }, image),
	new Platform({ x: image.width, y: CANVAS_HEIGHT - 90 }, image),
	new Platform({ x: image.width * 2, y: CANVAS_HEIGHT - 90 }, image),
	new Platform({ x: image.width * 3, y: CANVAS_HEIGHT - 90 }, image),
	new Platform({x: image.width * 4  ,y:300},image1),
	new Platform({x: image.width * 4+200 ,y:200},image1),
	new Platform({x: image.width * 4+450 ,y:300},image1),
	new Platform({ x: image.width * 5 , y: CANVAS_HEIGHT - 90 }, image),
	new Platform({ x: image.width * 6 , y: CANVAS_HEIGHT - 90 }, image),
	new Platform({ x: image.width * 7 , y: CANVAS_HEIGHT - 90 }, image),
];
// player.draw(ctx);

//animation loop
function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	// backgrounds.forEach((background) => {
	// 	background.draw(ctx);
	// });
	background.draw(ctx);
	background.update();
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
			// player.frames=0;
		} else if (collisionBottom(player, platform)) {
			player.velocity.y = -player.velocity.y;
		}else if (collisionSide(player, platform)) {
      player.velocity.x = -player.velocity.x;
      console.log("side collision")
    }
	});
	// if(collisionTop(player,platform)){
	//   player.velocity.y=0;
	//   player.isAtPlatform=true;
	// }else if(collisionBottom(player,platform)){
	//   player.velocity.y=-player.velocity.y;
	// }
	//movement
	// backgrounds.forEach((background) => {
		platforms.forEach((platform) => {
			movement(player, platform, background);
		});
	// });
	// movement(player,platform);
	requestAnimationFrame(animate);
}

animate();

})
