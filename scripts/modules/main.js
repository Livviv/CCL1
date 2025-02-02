import { global, resetGlobals } from "./global.js";
import { Cat } from "../gameObjects/cat.js";
//import { BlockObject } from "../gameObjects/blockObject.js";
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
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    if (global.gameRunning) {
        global.updateScoreDisplay();
        for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
            if (global.allGameObjects[i].active == true) {
                global.allGameObjects[i].storePositionOfPreviousFrame();
                global.allGameObjects[i].update();
                global.checkCollisionWithAnyOther(global.allGameObjects[i]);
                global.allGameObjects[i].applyGravity();
                global.allGameObjects[i].draw();
            }
        }
    }
    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
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

