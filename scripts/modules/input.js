import { global } from "./global.js";

function move(event) {

    //Example Movement for the PacMan Game
    if (event.code === 'Space' || event.key === 'w' || event.key === 'ArrowUp') {
        global.playerObject.startJump();
    }
}

function stop(event) {
    if (event.code === 'Space' || event.key === 'w' || event.key === 'ArrowUp') {
        global.playerObject.doJump();
    }
}

document.addEventListener("keydown", move);


document.addEventListener("keyup", stop);