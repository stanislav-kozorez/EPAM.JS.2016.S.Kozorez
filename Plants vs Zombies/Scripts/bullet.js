/// <reference path="module-init.js" />

game.entity.Bullet = function() {
    var self = this;
    this.html = $(document.createElement("div")).addClass("bullet");
    this.tickDistance = 10;
    this.left = 0;
    this.damage = 10;
    this.fly = function () {
        self.left += self.tickDistance;
        self.html.css("left", self.left + "px");
    }

    this.explode = function () {
        setTimeout(function () { self.html.remove(); }, 800);
    }
}