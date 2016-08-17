var game = new Game();

function Game() {
    var playButton = document.getElementById("play-button");
    var stopGame = true;
    var resourceAppearInterval = 500;
    var resourceDeleteInterval = 3000;
    var bombAppearInterval = 5000;
    var bombDeleteInterval = 2000;
    var counters = [0, 0, 0, 0];
    var resources = ["cheese.png", "orange.png", "cherry.png", "pumpkin.png"];

    var startGameFunc = function() {
        stopGame = !stopGame;
        if (!stopGame) {
            playButton.innerHTML = "Stop";
            playButton.className = "stop-button";
            restoreDefaults();
            setTimeout(appearResource, resourceAppearInterval, "resource", resourceAppearInterval, resourceDeleteInterval);
            setTimeout(appearResource, bombAppearInterval, "bomb", bombAppearInterval, bombDeleteInterval);
        }
        else {
            playButton.innerHTML = "Start";
            playButton.className = "start-button";
        }
    };

    playButton.onclick = startGameFunc;

    function restoreDefaults() {
        $("#playing-area").empty();
        $(".counter").text("-");
        for (var i = 0; i < counters.length; i++) {
            counters[i] = 0;
        }
    }

    function appearResource(elementType, appearInterval, deleteInterval) {
        var playingArea = document.getElementById("playing-area");
        var gameItem = null;
        if (elementType == "bomb") {
            gameItem = createResource("bomb.png", "game-item-bomb");
        }
        else {
            var randResourceIndex = getRandomIntInclusive(0, 3);
            gameItem = createResource(resources[randResourceIndex], "game-item");
        }
        playingArea.appendChild(gameItem.html);
        setTimeout(deleteResource, deleteInterval, gameItem.html);
        if (!stopGame) {
            setTimeout(appearResource, appearInterval, elementType, appearInterval, deleteInterval);
        }
    }

    function createResource(resourceName, className) {
        var gameItem = {
            html: document.createElement("div"),
            name: resourceName
        };
        var left = getRandomIntInclusive(0, 92);
        var top = getRandomIntInclusive(0, 92);
        gameItem.html.className = className;
        gameItem.html.setAttribute("data-resource-type", resourceName);
        gameItem.html.style = "left:" + left + "%; top:" + top + "%; background-image: url(Images/" + resourceName + ");";
        gameItem.html.onclick = resourceClick;
        return gameItem;
    }

    function resourceClick(event) {
        var gameItem = $(event.target);
        if (!gameItem.hasClass("game-item-bomb")) {
            counters[0] += 1;
            updateCounterView("counter-" + gameItem.attr("data-resource-type"), counters[0]); /////////////////////////// need to fix
            gameItem.attr("data-no-delete", "");
            gameItem.animate({
                left: "0px",
                top: "0px",
            }, 1000, function () {
                event.target.remove();
            });
        }
    }

    function deleteResource(resource) {
        if (!stopGame && !resource.hasAttribute("data-no-delete")) {
            if (resource.className == "game-item-bomb") {
                var randomCounterIndex = getRandomIntInclusive(0, 3);
                counters[randomCounterIndex] -= counters[randomCounterIndex] - 10 < 0 ? 0 : counters[randomCounterIndex] - 10;
                //updateCounterView("counter-" + randomCounterIndex, counters[randomCounterIndex]);///// fix
            }
            resource.remove();
        }
    }

    function updateCounterView(counterId, value) {
        var counter = document.getElementById(counterId);
        var val = value > 0 ? value : "-";
        counter.innerHTML = val;
    }

    // Returns a random integer between min (included) and max (included)
    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}