/// <reference path="module-init.js" />

game.entity.OloloShooter = function() {
	game.entity.Shooter.call(this);
    var self = this;
    this.html.addClass("ololo");
    this.shoot = function () {
        var bullet = new game.entity.OloloBullet();
        self.html.append(bullet.html);
        return bullet;
    };
}