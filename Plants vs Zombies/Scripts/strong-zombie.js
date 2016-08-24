/// <reference path="zombie.js" />

game.entity.StrongZombie = function () {
    game.entity.Zombie.call(this);
    var self = this;
    this.initialHealth = 80;
    this._currentHealth = this.initialHealth;
    this.html.addClass("strong");
    this.tickDistance = 2;
    this.die = function () {
        self.html.removeClass("strong").addClass("strong-die").html("");
        setTimeout(function () { self.html.remove(); }, 800);
    }
};