import { global } from "./global.js";
import { Cat } from "../gameObjects/cat.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
//import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";
import { collectables } from "../gameObjects/collectables.js";

function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }

    // if (global.playerObject.jumpLoading) {
    //     global.playerObject.loadJump();
    // }

    //console.log(global.playerObject.x, global.playerObject.y);
    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.playerObject = new Cat(300, 100, 100, 100);
    global.leftMoveTrigger = new MoveTrigger(100, 100, 20, 900, 100);
    global.rightMoveTrigger = new MoveTrigger(800, 100, 20, 900, -100);
    new Floor(0, 695, 9000, 40);
    //new BlockObject(200, 280, 50, 50);
    //new BlockObject(300, 400, 50, 50);
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 
    /*    
                global.playerObject = new PacMan(200, 300, 60, 60);
                new Wall(0, 0, 100, 100);
                new Candy(100, 100, 100, 100);
    }*/
   
}

setupGame();
requestAnimationFrame(gameLoop);



