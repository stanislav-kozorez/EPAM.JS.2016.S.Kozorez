/// <reference path="jquery.js" />
/// <reference path="module-init.js" />
/// <reference path="engine.js" />

$(function () {
    //Returns a random integer between min (included) and max (included)
    Math.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    game.engine.initialize();

    $("#btn-generate").click(game.engine.createRandomZombie);
    $("#btn-kill").click(game.engine.killRandomZombie);
    $("#btn-slow-down").click(game.engine.slowDownZombies);

    game.engine.mainLoop();
});