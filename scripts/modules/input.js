import { global } from "./global.js";

function move(event) {

    //Example Movement for the PacMan Game
    if (event.code === 'Space' || event.key === 'w') {
        global.playerObject.startJump();
    }
}

function stop(event) {
    if (event.code === 'Space' || event.key === 'w') {
        global.playerObject.doJump();
    }
}

/* function stop(event) {
    switch(event.key) {
        case "d":
            global.playerObject.xVelocity = 0;
            break;
        case "a":
            global.playerObject.xVelocity = 0;
            break;   
    }
}
 */
document.addEventListener("keydown", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);