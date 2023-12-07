import { createImage } from "./utils.js";

export class Platform{
    constructor({x,y},image){
        this.position={
            x,
            y
        }
        this.image=image;
        // createImage("./assets/images/Plataforma.png");
        this.width =this.image.width;
        this.height = this.image.height;
    }
    draw(ctx){
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.image,this.position.x, this.position.y,this.width,this.height);
    }
    update(ctx){
        this.draw(ctx);
    }
}