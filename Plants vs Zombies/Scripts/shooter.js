/// <reference path="module-init.js" />

game.entity.Shooter = function() {
    var self = this;
    this.shootInterval = 2000;
    this.isShooting = false;
    this.html = $(document.createElement("div")).addClass("shooter");
    this.shoot = function () {
        var bullet = new Bullet();
        self.html.append(bullet.html);
        return bullet;
    };

    this.zombieDetected = function () {
        var fieldLine = self.html.parent();
        return fieldLine.find(".zombie").length != 0;
    };
}