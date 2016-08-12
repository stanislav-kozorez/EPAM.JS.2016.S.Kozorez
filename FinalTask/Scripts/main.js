var playButton = document.getElementById("play-button");
playButton.onclick = startGame;

function startGame() {
    playButton.innerText = "Stop";
    playButton.className = "stop-button";
    playButton.onclick = stopGame;
}

function stopGame() {
    playButton.innerText = "Start";
    playButton.className = "start-button";
    playButton.onclick = startGame;
}