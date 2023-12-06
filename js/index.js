import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants.js";
import { Player } from "./Player.js";
import { movement } from "./movement.js";
import {Platform} from "./Platform.js";
import { collisionBottom, collisionTop} from "./collision.js";
//setup canvas
const canvas=document.getElementById("canvas");
canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
const ctx=canvas.getContext("2d");

//creating a player
const player= new Player();
const platform = new Platform();
// player.draw(ctx);


//animation loop
function animate(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  player.update(ctx);
  platform.update(ctx);
  //collision detection
  if(collisionTop(player,platform)){
    player.velocity.y=0;
  }else if(collisionBottom(player,platform)){
    player.velocity.y=-player.velocity.y;
  }
  movement(player);
  requestAnimationFrame(animate);
}

animate();