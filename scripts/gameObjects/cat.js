import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { displayGameOverScreen } from "../modules/main.js";

class Cat extends BaseGameObject {
    name = "Cat";
    xVelocity = 50;
    yVelocity = 0;
    jumpLoading = false;
    jumpForce = 0;
    jumpForceIncrement = 1;
    minJumpForce = 1;
    maxJumpForce = 12.4;
    useGravityForces = true;
    x = 40;
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 11,
        "currentSpriteIndex": 0
    };

    hungerData = {
        "previousHunger": 100,
        "currentHunger": 100,
        "maxHunger": 100,
        "hungerDecrease": 6,
        "hungerIncreasePerCollectables": 40,
        "starve1threshold": 50,
        "starve2threshold": 20,
    }

    updateHungerBar = function () {
        let hungerBar = document.getElementById("hungerDisplay");
        hungerBar.style.width = `${this.hungerData.currentHunger}%`;
        if (this.hungerData.currentHunger < 20) {
            hungerBar.style.backgroundColor = "red";
        } else if (this.hungerData.currentHunger > 20  && this.hungerData.currentHunger < 50) {
            hungerBar.style.backgroundColor = "orange";
        } else {
            hungerBar.style.backgroundColor = "green";
        }
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Food") {
            console.log("current Score");
            global.currentScore++;
            this.hungerData.currentHunger += this.hungerData.hungerIncreasePerCollectables;
            if (this.hungerData.currentHunger > this.hungerData.maxHunger) {
                this.hungerData.currentHunger = this.hungerData.maxHunger;
            }

        }
        if (collidingObject.name == "Bomb") {
            console.log("minus Score");
            global.currentScore--;
        }
    }

    getBoxBounds = function () { 
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    update = function () {
        /*  console.log(this.x, this.y); */
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
    /* global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
         */}

        if (this.jumpLoading) {
            this.loadJump();
        }

        

        this.hungerData.currentHunger -= this.hungerData.hungerDecrease * global.deltaTime;
        console.log(this.hungerData.currentHunger);
        if (this.hungerData.currentHunger <= 0) {
            global.gameRunning = false;
            displayGameOverScreen();
        }
        this.updateHungerBar();

        if (this.hungerData.currentHunger <= this.hungerData.starve2threshold ) {
            if (this.hungerData.previousHunger > this.hungerData.starve2threshold) {
                this.switchCurrentSprites(8, 11);
            }
        }
        else if (this.hungerData.currentHunger <= this.hungerData.starve1threshold) {
            if (this.hungerData.previousHunger > this.hungerData.starve1threshold || this.hungerData.previousHunger <= this.hungerData.starve2threshold) {
                this.switchCurrentSprites(4, 7);
            }
        }
        else {
            if (this.hungerData.previousHunger <= this.hungerData.starve1threshold) {
                this.switchCurrentSprites(0, 3);
            }
        }
        this.hungerData.previousHunger = this.hungerData.currentHunger;
    }

    startJump = function () {
        if (this.jumpLoading == false) {
            console.log("jump started");
            this.jumpLoading = true;
        }

        if (this.jumpLoading) {
            this.loadJump();
        }
    }

    loadJump = function () {
        console.log("loading jump");
        this.jumpForce += this.jumpForceIncrement;
        if (this.jumpForce < this.minJumpForce) {
            this.jumpForce = this.minJumpForce;
        }
        if (this.jumpForce > this.maxJumpForce) {
            this.jumpForce = this.maxJumpForce;
        }
        /*   if (this.jumpForce > this.maxJumpForce) {
          this.jumpForce = this.maxJumpForce;
      } */
    }

    doJump = function () {
        console.log("jumping");
        console.log(this.jumpForce);
        //this.yVelocity = -this.jumpForce;
        this.setJumpForce(this.jumpForce);
        this.jumpForce = 0;
        this.jumpLoading = false;

    }

    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.loadImagesFromSpritesheet("./images/spritesheet_all.png", 4, 3);
        this.switchCurrentSprites(0, 3);
    }
}

export { Cat }