game.engine = {
    gameOver: false,
    moveSlower: false,
    zombies: [],
    fieldLines: null,
    zombieFactory: new game.ZombieFactory()
};

game.engine.initialize = function () {
    this.fieldLines = $(".field-line");
};

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
        var zombie = this.zombies[index];
        this.zombies.splice(index, 1);
        zombie.die();
    }
}.bind(game.engine);

game.engine.slowDownZombies = function () {
    this.moveSlower = true;
    setTimeout(function () { game.engine.moveSlower = false; }, 10000);
}.bind(game.engine);