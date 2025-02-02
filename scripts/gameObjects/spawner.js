import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";
import { Collectable } from "./collectables.js";

class Spawner extends BaseGameObject {
    currentTime = 0;
    lastSpawnTime = 0;
    minSpawnInterval = 500;         
    currentSpawnInterval = 3000;
    reductionFactor = 0.99;
    spawnBorder = 30;
    collectableTypes = [{image: "cheesee", isBomb: false}, {image: "pizza", isBomb: false}, {image: "tuna", isBomb: false}, {image: "bacon", isBomb: false}, {image: "cheesebombb", isBomb: true}, {image: "pizzabomb", isBomb: true}, {image: "tunabomb", isBomb: true}, {image: "baconbomb", isBomb: true}];

    update = function () {
        this.currentTime += global.deltaTime * 1000;
        if (this.currentTime - this.lastSpawnTime > this.currentSpawnInterval) {
            this.spawnCollectable();
            this.lastSpawnTime = this.currentTime;
            this.currentSpawnInterval *= this.reductionFactor;
            if (this.currentSpawnInterval < this.minSpawnInterval) {
                this.currentSpawnInterval = this.minSpawnInterval;
            }
        }
    }

    draw = function () {}

    spawnCollectable = function () {
        let spawnWidth = 75;
        let spawnHeight = 75;
        let spawnX = global.canvas.width;
        let spawnY = global.getRandomNum(0, global.canvas.height - this.spawnBorder - spawnHeight);
        let spawnType = this.collectableTypes[global.getRandomNum(0, this.collectableTypes.length - 1)];
        let isBomb = spawnType.isBomb;
        new Collectable(spawnX, spawnY, spawnWidth, spawnHeight, `./images/collectables/${spawnType.image}.png`, isBomb);
    }

}
export {Spawner};