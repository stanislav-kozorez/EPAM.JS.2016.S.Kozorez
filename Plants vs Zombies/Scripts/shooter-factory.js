game.ShooterFactory = function() {
    var shooterConstructors = [game.entity.OloloShooter, game.entity.PeaShooter];

    this.getRandomShooter = function () {
        return new shooterConstructors[Math.getRandomIntInclusive(0, shooterConstructors.length - 1)]();
    };
}