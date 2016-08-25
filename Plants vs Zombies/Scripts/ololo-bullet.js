/// <reference path="module-init.js" />

game.entity.OloloBullet = function () {
    game.entity.Bullet.call(this);
    var self = this;
    this.html.addClass("bullet-ololo");
    this.left = 42;
    this.damage = 20;

    this.explode = function () {
        self.html.removeClass("bullet-ololo").addClass("bullet-ololo-explode").css("left", self.left + 15 + "px");
        setTimeout(function () { self.html.remove(); }, 800);
    }
}