export class Platform{
    constructor(){
        this.position={
            x:10,
            y:60
        }
        this.width = 200;
        this.height = 10;
    }
    draw(ctx){
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update(ctx){
        this.draw(ctx);
    }
}