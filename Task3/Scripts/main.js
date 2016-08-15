var taskInfo = {
    filledWithColor: false,
    BLOCK_COUNT: 50
}

taskInfo.generateButton = document.getElementById("generate-btn");
taskInfo.setColorButton = document.getElementById("set-color-btn");
taskInfo.resetButton = document.getElementById("reset-btn");
taskInfo.playingArea = document.getElementById("playing-area");

// Checks if generateButton should be desabled
taskInfo.generateButton.onmouseenter = function() {
    this.classList.remove("disabled");
    if (taskInfo.playingArea.childElementCount != 0) {
        this.classList.add("disabled");
    }
}

// Checks if setColorButton should be desabled
taskInfo.setColorButton.onmouseenter = function() {
    this.classList.remove("disabled");
    if (taskInfo.playingArea.childElementCount == 0 || taskInfo.filledWithColor) {
        this.classList.add("disabled");
    }
}

// Checks if resetButton should be desabled
taskInfo.resetButton.onmouseenter = function() {
    this.classList.remove("disabled");
    if (taskInfo.playingArea.childElementCount == 0) {
        this.classList.add("disabled");
    }
}


// Generates blocks
taskInfo.generateButton.onclick = function() {
    if (taskInfo.playingArea.childElementCount == 0) {
        for (var i = 0; i < taskInfo.BLOCK_COUNT; i++) {
            var number = getRandomIntInclusive(1, 100);
            taskInfo.playingArea.innerHTML += "<div class='block'>" + number + "</div>";
        }
    }
}

// Sets block color
taskInfo.setColorButton.onclick = function() {
    var blocks = document.getElementsByClassName("block");
    for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        var number = +block.innerHTML;
        if (number > 75) {
            block.classList.add("red");
        }
        else if (number > 50) {
            block.classList.add("orange");
        }
        else if (number > 25) {
            block.classList.add("green");
        }
    }
    taskInfo.filledWithColor = true;
}

// Clears playing area
taskInfo.resetButton.onclick = function() {
    if (taskInfo.playingArea.childElementCount != 0) {
        taskInfo.playingArea.innerHTML = "";
        taskInfo.filledWithColor = false;
    }
}

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}