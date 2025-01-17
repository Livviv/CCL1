import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Cat extends BaseGameObject {
    name = "Cat";
    xVelocity = 0;
    yVelocity = 0;
    jumpLoading = false;
    jumpForce = 0;
    jumpForceIncrement = 1;
    minJumpForce = 10;
    maxJumpForce = 100;
    useGravityForces = true;
    x = 40;

    getBoxBounds = function () { 
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    update = function() {
        console.log(this.x, this.y);
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }

        if (this.jumpLoading) {
            this.loadJump();
        }
    }

    startJump = function() {
        if (this.jumpLoading == false) {
            console.log("jump started");
            this.jumpLoading = true;
        }
    }

    loadJump = function() {
        console.log("loading jump");
        this.jumpForce += this.jumpForceIncrement;
        if (this.jumpForce > this.maxJumpForce) {
            this.jumpForce = this.maxJumpForce;
        }
    }

    doJump = function() {
        console.log("jumping");
        console.log(this.jumpForce);
        // this.yVelocity = -this.jumpForce;
        this.setJumpForce(this.jumpForce);
        this.jumpForce = 0;
        this.jumpLoading = false;
    }

    // draw = function () {
    //     global.ctx.fillStyle = "#000000";
    //     global.ctx.fillRect(0, 0, 100, 100);
    // }

    constructor(x, y, width, height) {
        super(x, y, width, height);
    
        this.loadImagesFromSpritesheet("./images/spritesheet_running.png", 4, 1);
    }
}

export {Cat}