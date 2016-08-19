$(function () {
    var playButton = $("#play-button");
    var stopGame = true;
    var RES_APPEAR_INTERVAL = 500;
    var RES_DELETE_INTERVAL = 700;
    var BOMB_APPEAR_INTERVAL = 5000;
    var BOMB_DELETE_INTERVAL = 2000;
    var resources = ["cheese.png", "orange.png", "cherry.png", "pumpkin.png"];

    var animationCoordinates = {}; // for animation when user clicks on resource
    animationCoordinates["cheese.png"] = { left: "-17%", top: "4%" };
    animationCoordinates["orange.png"] = { left: "-17%", top: "86%" };
    animationCoordinates["cherry.png"] = { left: "109%", top: "4%" };
    animationCoordinates["pumpkin.png"] = { left: "109%", top: "86%" };

    var counterCollection = {};
    counterCollection["cheese.png"] = 0;
    counterCollection["orange.png"] = 0;
    counterCollection["cherry.png"] = 0;
    counterCollection["pumpkin.png"] = 0;

    playButton.click(playGame);

    function playGame() {
        stopGame = !stopGame;
        if (!stopGame) {
            playButton.text("Stop");
            playButton.attr("class", "stop-button");
            restoreDefaults();
            setTimeout(appearResource, RES_APPEAR_INTERVAL, "resource", RES_APPEAR_INTERVAL, RES_DELETE_INTERVAL);
            setTimeout(appearResource, BOMB_APPEAR_INTERVAL, "bomb", BOMB_APPEAR_INTERVAL, BOMB_DELETE_INTERVAL);
        }
        else {
            playButton.text("Start");
            playButton.attr("class", "start-button");
        }
    };

    function restoreDefaults() {
        $("#playing-area").empty();
        $(".counter").text("-");
        for (var prop in counterCollection) {
            counterCollection[prop] = 0;
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
        playingArea.appendChild(gameItem);
        setTimeout(deleteResource, deleteInterval, gameItem);
        if (!stopGame) {
            setTimeout(appearResource, appearInterval, elementType, appearInterval, deleteInterval);
        }
    }

    // initializes new resource with given resource name, type and random position 
    function createResource(resourceName, className) {
        var gameItem = document.createElement("div");
        var left = getRandomIntInclusive(0, 92);
        var top = getRandomIntInclusive(0, 92);
        gameItem.className = className;
        gameItem.setAttribute("data-resource-type", resourceName);
        gameItem.style = "left:" + left + "%; top:" + top + "%; background-image: url(Images/" + resourceName + ");";
        gameItem.onclick = resourceClick;
        return gameItem;
    }

    function resourceClick(event) {
        var gameItem = $(event.target);
        if (!gameItem.hasClass("game-item-bomb")) {
            var resourceType = gameItem.attr("data-resource-type");
            updateCounterView("counter-" + resourceType, ++counterCollection[resourceType]);
            gameItem.attr("data-no-delete", "");
            gameItem.animate({
                left: animationCoordinates[resourceType].left,
                top: animationCoordinates[resourceType].top,
            }, 1000, function () {
                event.target.remove();
            });
        }
    }

    function deleteResource(resource) {
        if (!stopGame && !resource.hasAttribute("data-no-delete")) {
            if (resource.className == "game-item-bomb") {
                var resourceType = resources[getRandomIntInclusive(0, 3)];

                // Animate element that has been affected by the bomb
                var elem = $(document.getElementById("counter-" + resourceType)).parent();
                elem.addClass("blink");
                setTimeout(function () { elem.removeClass("blink"); }, 500);

                counterCollection[resourceType] = counterCollection[resourceType] - 10 < 0 ? 0 : counterCollection[resourceType] - 10;
                updateCounterView("counter-" + resourceType, counterCollection[resourceType]);
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
});