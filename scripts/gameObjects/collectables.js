import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { displayGameOverScreen } from "../modules/main.js";

class Collectable extends BaseGameObject {
    isBomb = false;
name = "";
    constructor(x, y, width, height, imageSrc, isBomb) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet(imageSrc, 1, 1);
        this.xVelocity = -200;
        this.isBomb = isBomb;
        this.name = isBomb ? "Bomb" : "Food";
    }

    update = function() {
         this.x += this.xVelocity * global.deltaTime;
     }

     reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "Cat") {
            if (this.isBomb) {
                global.gameRunning = false;
                displayGameOverScreen();
            }
            else {
                this.active = false;
               
            }
        }
    }
}

export {Collectable};