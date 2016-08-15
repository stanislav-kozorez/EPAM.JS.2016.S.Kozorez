var taskInfo = {
    filledWithColor: false,
    BLOCK_COUNT: 50
}

taskInfo.generateButton = $("#generate-btn");
taskInfo.setColorButton = $("#set-color-btn");
taskInfo.resetButton = $("#reset-btn");
taskInfo.playingArea = $("#playing-area");

// Checks if generateButton should be desabled
taskInfo.generateButton.mouseenter(function () {
    taskInfo.generateButton.removeClass("disabled");
    if (taskInfo.playingArea.children().length != 0) {
        taskInfo.generateButton.addClass("disabled");
    }
});

// Checks if setColorButton should be desabled
taskInfo.setColorButton.mouseenter(function () {
    taskInfo.setColorButton.removeClass("disabled");
    if (taskInfo.playingArea.children().length == 0 || taskInfo.filledWithColor) {
        taskInfo.setColorButton.addClass("disabled");
    }
});

// Checks if resetButton should be desabled
taskInfo.resetButton.mouseenter(function() {
    taskInfo.resetButton.removeClass("disabled");
    if (taskInfo.playingArea.children().length == 0) {
        taskInfo.resetButton.addClass("disabled");
    }
});


// Generates blocks
taskInfo.generateButton.click(function () {
    if (taskInfo.playingArea.children().length == 0) {
        for (var i = 0; i < taskInfo.BLOCK_COUNT; i++) {
            var number = getRandomIntInclusive(1, 100);
            taskInfo.playingArea.append("<div class='block'>" + number + "</div>");
        }
    }
});

// Sets block color
taskInfo.setColorButton.click(function (index) {
    var blocks = $(".block");
    blocks.each(function () {
        var number = +$(this).text();
        if (number > 75) {
            $(this).addClass("red");
        }
        else if (number > 50) {
            $(this).addClass("orange");
        }
        else if (number > 25) {
            $(this).addClass("green");
        }
    });
    taskInfo.filledWithColor = true;
});

// Clears playing area
taskInfo.resetButton.click(function () {
    if (taskInfo.playingArea.children.length != 0) {
        taskInfo.playingArea.empty();
        taskInfo.filledWithColor = false;
    }
});

// Returns a random integer between min (included) and max (included)
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}