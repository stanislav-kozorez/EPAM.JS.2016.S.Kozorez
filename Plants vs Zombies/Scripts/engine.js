/// <reference path="jquery.js" />
/// <reference path="module-init.js" />
/// <reference path="shooter-factory.js" />

game.engine = {
    gameOver: false,
    moveSlower: false,
    growOld: false,
    zombies: [],
    shooters: [],
    bullets: [],
    fieldLines: null,
    field: null,
    lineSelector : 0,
    zombieFactory: new game.ZombieFactory(),
    shooterFactory: new game.ShooterFactory()
};

game.engine.initialize = function () {
    this.field = document.getElementById("field");
    this.fieldLines = $(".field-line");
};

game.engine.killZombieAtIndex = function(index) {
    this.zombies[index].die();
    this.zombies.splice(index, 1);
}

game.engine.intersection = function (el1, el2) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();

    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
};

game.engine.mainLoop = function () {
    var shoot = function (shooter) {
        shooter.isShooting = true;
        var bullet = shooter.shoot();
        this.bullets.push(bullet);
        if (shooter.zombieDetected()) {
            setTimeout(shoot, shooter.shootInterval, shooter);
        }
        else {
            shooter.isShooting = false;
        }
    }.bind(this);
    for (var i = 0; i < this.shooters.length; i++) {
        var shooter = this.shooters[i];
        if (shooter.zombieDetected() && !shooter.isShooting) {
            shoot(shooter);
        }
    }

    for (var i = 0; i < this.zombies.length; i++) {
        this.zombies[i].move(this.moveSlower);
        if (this.zombies[i].right > 850) {
            this.gameOver = true;
        }
        if (this.zombies[i].health() <= 0) {
            this.killZombieAtIndex(i);
        }
    }
    for (var i = 0; i < this.bullets.length; i++) {
        this.bullets[i].fly();
        var fieldRect = this.field.getBoundingClientRect();
        var bulletRect = this.bullets[i].html[0].getBoundingClientRect();
        if (bulletRect.right > fieldRect.right - 20) {
            this.bullets[i].explode();
            this.bullets.splice(i, 1);
        }

    }

    for (var i = 0; i < this.zombies.length; i++) {
        for (var j = 0; j < this.bullets.length; j++) {
            var zombie = this.zombies[i];
            var bullet = this.bullets[j];
            if (this.intersection(zombie.html[0], bullet.html[0])) {
                var health = zombie.health() - bullet.damage;
                zombie.health(health);
                bullet.explode();
                this.bullets.splice(j, 1);
            }
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

game.engine.addShooter = function () {
    var shooter = this.shooterFactory.getRandomShooter();
    this.shooters.push(shooter);
    this.fieldLines.eq(this.lineSelector).append(shooter.html);
    this.lineSelector = (this.lineSelector + 1) % this.fieldLines.length;
}.bind(game.engine);