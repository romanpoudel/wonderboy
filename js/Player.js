import { CANVAS_HEIGHT, GRAVITY } from "./constants.js";
import { createImage } from "./utils.js";

export class Player {
	constructor() {
    this.image=createImage("./assets/images/playerMoveRight1.png");
    this.frames=0;
    // this.image.src="./assets/images/playerMoveRight.png";
		this.position={
      x:100,
      y:100
    }
		this.width = 100;
		this.height = 100;
    this.velocity={
      x:0,
      y:10
    }
    this.isAtPlatform=false;
	}

	draw(ctx) {
    // ctx.strokeStyle = "green";
    // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(this.image,this.frames*90,0,90,this.image.height,this.position.x,this.position.y,this.width,this.height);
  }

  update(ctx){
    //animate or change player image
    this.draw(ctx);
    this.position.x+=this.velocity.x;
    this.position.y+=this.velocity.y;
    if(this.position.y+this.height+this.velocity.y<CANVAS_HEIGHT){
      this.velocity.y+=GRAVITY;
      this.isAtPlatform=false;
    }else{
      this.velocity.y=0;
      this.isAtPlatform=true;
    }
  }
}
