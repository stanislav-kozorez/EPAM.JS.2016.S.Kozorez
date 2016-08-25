/// <reference path="module-init.js" />

game.entity.PeaShooter = function() {
	game.entity.Shooter.call(this);
    var self = this;
    this.shootInterval = 1500;
    this.html.addClass("pea");
    this.shoot = function () {
        var bullet = new game.entity.PeaBullet();
        self.html.append(bullet.html);
        return bullet;
    };
}