import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Cat extends BaseGameObject {
    name = "Cat";
    xVelocity = 0;
    yVelocity = 0;
    jumpLoading = false;
    jumpForce = 0;
    jumpForceIncrement = 10;
    minJumpForce = 10;
    maxJumpForce = 100;
    useGravityForces = true;

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
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
    }

    startJump = function() {
        console.log("jump started");
        this.jumpLoading = true;
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
        this.yVelocity = -this.jumpForce;
        this.physicsData.jumpForce = this.jumpForce;
        this.jumpForce = 0;
        this.jumpLoading = false;
    }

    /*draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
    
        this.loadImagesFromSpritesheet("./images/spritesheet_running.png", 9, 4);
    }
}

export {Cat}