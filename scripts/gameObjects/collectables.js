import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Collectable {
    constructor(x, y, width, height, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class FoodItem extends Collectable { //dont forget some food items give little, medium and much "health" back, 
// dont know bout the bombitems, would be more interesting when the all cost the same hunger i think.
    health = 50;
    isBomb = false;
}

class BombItem extends Collectable{
    health = -50;
    isBomb = true;
}

const itemTypes = [
    { width: 233, height: 171, src: "./images/cheese.png" },
    { width: 231, height: 195, src: "./images/tuna.png" },
    { width: 354, height: 166, src: "./images/bacon.png" },
    { width: 334, height: 402, src: "./images/pizza.png" },
];

const bombTypes = [
    { width: 315, height: 172, src: "./images/cheesebomb.png" },
    { width: 231, height: 205, src: "./images/tunabomb.png" },
    { width: 421, height: 161, src: "./images/baconbomb.png" },
    { width: 333, height: 430, src: "./images/pizzabomb.png" },
];

function getRandomPosition(canvasWidth, canvasHeight, itemWidth, itemHeight) {
    let x = Math.floor(Math.random() * (canvasWidth - itemWidth));
    let y = Math.floor(Math.random() * (canvasHeight - itemHeight));
    return { x, y };
}

const collectables = [];

itemTypes.forEach(itemType => {
    let position = getRandomPosition(global.canvas.width, global.canvas.height, itemType.width, itemType.height);
    let foodItem = new FoodItem(position.x, position.y, itemType.width, itemType.height, itemType.src);
    collectables.push(foodItem);

});

bombTypes.forEach(bombType => {
    let position = getRandomPosition(global.canvas.width, global.canvas.height, bombType.width, bombType.height);
    let bombItem = new BombItem(position.x, position.y, bombType.width, bombType.height, bombType.src);
    collectables.push(bombItem);
});

export {collectables};