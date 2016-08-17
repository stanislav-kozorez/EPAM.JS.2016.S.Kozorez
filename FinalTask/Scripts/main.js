var playButton = document.getElementById("play-button");
playButton.onclick = startGame;
var stopGame = true;

function startGame() {
    playButton.innerText = "Stop";
    playButton.className = "stop-button";
    playButton.onclick = stop;

    stopGame = false;
    setTimeout(f, 500);
}

function stop() {
    playButton.innerText = "Start";
    playButton.className = "start-button";
    playButton.onclick = startGame;
    stopGame = true;
}

function f() {
    var playingArea = document.getElementById("playing-area");
    var elem = document.createElement("div");
    elem.className = "game-item";
    var left = getRandomIntInclusive(0, 92);
    var top = getRandomIntInclusive(0, 92);
    var randResource = getRandomIntInclusive(0, 3);
    elem.style = "left:" + left + "%; top:" + top + "%; background-image: url(Images/" + obj.resources[randResource] + ");";
    playingArea.appendChild(elem);
    setTimeout(deleteResource, 2000, elem);
    if (!stopGame) {
        setTimeout(f, 500);
    }
}

function deleteResource(resource) {
    if (!stopGame) {
        resource.remove();
    }
}

var obj = {
    cherryCounter: 0,
    orangeCounter: 0,
    pumpkinCounter: 0,
    cheeseCounter: 0,
    resources : ["cheese.png", "orange.png", "cherry.png", "pumpkin.png"]
};

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}