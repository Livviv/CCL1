const global = {};

function resetGlobals() {
    global.deltaTime = 0;
    global.allGameObjects = [];
    global.playerObject = {};
    global.backgroundShift = 0;
    global.backgroundMaxShift = -1000;
    global.gravityForce = 9.81;
    global.pixelToMeter = 100;
    global.gameRunning = false;
    global.currentScore = 0;
}

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.background = document.querySelector("#background"); 
resetGlobals();

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.updateScoreDisplay = function () {
    let scoreDisplay = document.getElementById("scoreDisplay");
    scoreDisplay.innerHTML = "Score: " +global.currentScore;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}

global.getRandomNum = function (min, max) {
    return Math.floor(Math.random() * max) + min;
}


export { global, resetGlobals }
