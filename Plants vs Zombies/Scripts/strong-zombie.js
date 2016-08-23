game.entity.StrongZombie = function() {
    game.entity.Zombie.call(this);
    var self = this;
    this.health = 100;
    this.html.addClass("strong");
    this.tickDistance = 1;
    this.die = function () {
        self.html.removeClass("strong").addClass("strong-die").html("");
        setTimeout(function () { self.html.remove(); }, 800);
    }
};