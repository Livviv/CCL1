import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Background extends BaseGameObject {
    name = "Background";
    htmlElement = null;
    xVelocity = 200;
    yVelocity = 0;
    
    update = function() {
      
        this.x += this.xVelocity * global.deltaTime;
        this.htmlElement.style.backgroundPositionX = -this.x + "px";
       
    }

    draw = function () {}

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.htmlElement = document.querySelector("#background");
      
    }
}

export {Background}