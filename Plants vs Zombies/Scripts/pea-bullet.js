/// <reference path="module-init.js" />

game.entity.PeaBullet = function () {
    game.entity.Bullet.call(this);
    var self = this;
    this.left = 64;
    this.html.addClass("bullet-pea");
    this.tickDistance = 15;

    this.explode = function () {
        self.html.removeClass("bullet-pea").addClass("bullet-pea-explode");
        setTimeout(function () { self.html.remove(); }, 800);
    }
}