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
// const platform = new Platform();
const platforms = [new Platform({x:200,y:100}),new Platform({x:400,y:200})];
// player.draw(ctx);


//animation loop
function animate(){
  ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
  player.update(ctx);
  // platform.update(ctx);
  platforms.forEach((platform)=>{
    platform.update(ctx);
  })
  //collision detection
  platforms.forEach((platform)=>{
    if(collisionTop(player,platform)){
      player.velocity.y=0;
      player.isAtPlatform=true;
    }else if(collisionBottom(player,platform)){
      player.velocity.y=-player.velocity.y;
    }
  })
  // if(collisionTop(player,platform)){
  //   player.velocity.y=0;
  //   player.isAtPlatform=true;
  // }else if(collisionBottom(player,platform)){
  //   player.velocity.y=-player.velocity.y;
  // }
  //movement
  platforms.forEach((platform)=>{
    movement(player,platform);
  })
  // movement(player,platform);
  requestAnimationFrame(animate);
}

animate();