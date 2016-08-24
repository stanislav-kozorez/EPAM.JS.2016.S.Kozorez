game.entity.Zombie = function() {
    var self = this;
    this.health = 50;
    this.right = 0;
    this.minTickDistance = 1
    this.tickDistance = 1;
    this.html = $(document.createElement("div")).addClass("zombie").html('<div class = "health-bar"><div class ="health-bar-value"></div></div>');

    this.move = function (useMinTickDistance) {
        if (useMinTickDistance) {
            self.right += self.minTickDistance;
        }
        else {
            self.right += self.tickDistance;
        }
        self.html.css("right", self.right + "px");
    }

    this.die = function () {
        self.html.remove();
    }
};