import { CANVAS_HEIGHT, GRAVITY } from "./constants.js";


export class Player {
	constructor() {
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
    ctx.strokeStyle = "green";
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(ctx){
    this.draw(ctx);
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
