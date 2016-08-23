game.ZombieFactory = function() {
    var zombieConstructors = [game.entity.StrongZombie, game.entity.MichaelZombie];

    this.getRandomZombie = function () {
        return new zombieConstructors[Math.getRandomIntInclusive(0, zombieConstructors.length - 1)]();
    };
}