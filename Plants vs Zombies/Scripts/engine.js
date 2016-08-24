/// <reference path="jquery.js" />
/// <reference path="module-init.js" />

game.engine = {
    gameOver: false,
    moveSlower: false,
    growOld: false,
    zombies: [],
    fieldLines: null,
    zombieFactory: new game.ZombieFactory()
};

game.engine.initialize = function () {
    this.fieldLines = $(".field-line");
};

game.engine.killZombieAtIndex = function(index) {
    this.zombies[index].die();
    this.zombies.splice(index, 1);
}

game.engine.mainLoop = function () {
    for (var i = 0; i < this.zombies.length; i++) {
        this.zombies[i].move(this.moveSlower);
        if (this.zombies[i].right > 850) {
            this.gameOver = true;
        }
    }
    if (this.gameOver) {
        this.zombies = [];
        this.fieldLines.html("");
        $(".game-over").fadeIn(1000);
    }
    else {
        setTimeout(this.mainLoop, 100);
    }
}.bind(game.engine);

game.engine.createRandomZombie = function () {
    var line = Math.getRandomIntInclusive(0, this.fieldLines.length - 1);
    var zombie = this.zombieFactory.getRandomZombie();
    this.zombies.push(zombie);
    this.fieldLines.eq(line).append(zombie.html);
}.bind(game.engine);

game.engine.killRandomZombie = function () {
    if (this.zombies.length != 0) {
        var index = Math.getRandomIntInclusive(0, this.zombies.length - 1);
        this.zombies[index].die();
        this.zombies.splice(index, 1);
    }
}.bind(game.engine);

game.engine.slowDownZombies = function () {
    this.moveSlower = true;
    setTimeout(function () { game.engine.moveSlower = false; }, 10000);
}.bind(game.engine);

game.engine.growOld = function () {

    var reduceHealth = function () {
        for (var i = 0; i < this.zombies.length; i++) {
            var health = this.zombies[i].health() - 1;
            this.zombies[i].health(health);
            if (health <= 0) {
                this.killZombieAtIndex(i);
            }
        }
        if (this.growOld) {
            setTimeout(reduceHealth, 1000);
        }
    }.bind(this);

    this.growOld = true;
    reduceHealth();
    setTimeout(function () { game.engine.growOld = false; }, 10000);
}.bind(game.engine);

game.engine.explode = function () {
    for (var i = 0; i < this.zombies.length; i++) {
        var health = this.zombies[i].health() - 15;
        this.zombies[i].health(health);
    }
}.bind(game.engine);