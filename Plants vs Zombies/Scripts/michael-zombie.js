game.entity.MichaelZombie = function() {
    game.entity.Zombie.call(this);
    var self = this;
    this.health = 80;
    this.html.addClass("michael");
    this.tickDistance = 2;
    this.die = function () {
        self.html.removeClass("michael").addClass("michael-die").html("");
        setTimeout(function () { self.html.remove(); }, 800);
    }
};