game.entity.Zombie = function() {
    var self = this;
    this.health = 0;
    this.right = 0;
    this.tickDistance = 0;
    this.html = $(document.createElement("div")).addClass("zombie").html('<div class = "health-bar"><div class ="health-bar-value"></div></div>');

    this.move = function(){
        self.right += self.tickDistance;
        self.html.css("right", self.right + "px");
    }

    this.die = function () {
        self.html.remove();
    }
};