/// <reference path="jquery.js" />

$(function () {
    // Returns a random integer between min (included) and max (included)
    Math.getRandomIntInclusive = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var gameOver = false;
    var zombies = [];
    var fieldLines = $(".field-line");
    zombieFactory = new ZombieFactory();

    $("#btn-generate").click(function () {
        line = Math.getRandomIntInclusive(0, fieldLines.length - 1);
        var zombie = zombieFactory.getRandomZombie();
        zombies.push(zombie);
        fieldLines.eq(line).append(zombie.html);
    });

    mainLoop();

    function mainLoop() {
        for (var i = 0; i < zombies.length; i++) {
            zombies[i].move();
            if (zombies[i].right > 850) {
                gameOver = true;
            }
        }
        if (gameOver) {
            $(".game-over").fadeIn(1000);
        }
        else {
            setTimeout(mainLoop, 100);
        }
    }
});

function Zombie() {
    var self = this;
    this.health = 0;
    this.right = 0;
    this.tickDistance = 0;
    this.html = $(document.createElement("div")).addClass("zombie");

    this.move = function(){
        self.right += self.tickDistance;
        self.html.css("right", self.right + "px");
    }
}

function StrongZombie() {
    Zombie.call(this);

    this.health = 100;
    this.html.addClass("strong");
    this.tickDistance = 1
}

function MichaelZombie() {
    Zombie.call(this);

    this.health = 80;
    this.html.addClass("michael");
    this.tickDistance = 2;
}

function ZombieFactory() {
    var zombieConstructors = [StrongZombie, MichaelZombie];

    this.getRandomZombie = function () {
        return new zombieConstructors[Math.getRandomIntInclusive(0, zombieConstructors.length - 1)]();
    };
}