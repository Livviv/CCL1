import { global, resetGlobals } from "./global.js";
import { Cat } from "../gameObjects/cat.js";

import { Floor } from "../gameObjects/floor.js";
import { Spawner } from "../gameObjects/spawner.js";
import { Background } from "../gameObjects/background.js";

let startGameScreen = document.getElementById("startScreen");
let startGameScreenButton = document.getElementById("startScreenButton");
let gameOverScreen = document.getElementById("gameOverScreen");
let gameOverScreenButton = document.getElementById("gameOverScreenButton");

startGameScreenButton.addEventListener("click", function () {
    setupGame();
});

gameOverScreenButton.addEventListener("click", function () {
    setupGame();
});

function displayGameOverScreen() {
    gameOverScreen.style.display = "block";
}


function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
    global.deltaTime /= 1000;
    global.prevTotalRunningTime = totalRunningTime;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
    
    if (global.gameRunning) {
        global.updateScoreDisplay();
        for (var i = 0; i < global.allGameObjects.length; i++) { 
            if (global.allGameObjects[i].active == true) {
                global.allGameObjects[i].storePositionOfPreviousFrame();
                global.allGameObjects[i].update();
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                global.allGameObjects[i].applyGravity();
                global.allGameObjects[i].draw();
            }
        }
    }
    
    requestAnimationFrame(gameLoop);
}

function setupGame() {
    startGameScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    resetGlobals();
    global.gameRunning = true;
    global.prevTotalRunningTime	= performance.now();

    new Background(0, 0, global.canvas.width, global.canvas.height);
    global.playerObject = new Cat(300, 100, 100, 100);
    new Floor(0, 510, 1920, 40);

    new Spawner();
}

requestAnimationFrame(gameLoop);

export { displayGameOverScreen }

