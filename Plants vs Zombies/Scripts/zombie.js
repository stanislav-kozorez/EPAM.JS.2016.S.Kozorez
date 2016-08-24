/// <reference path="jquery.js" />

game.entity.Zombie = function () {
    var self = this;
    this.initialHealth = 50;
    this._currentHealth = this.initialHealth;
    this.right = 0;
    this.minTickDistance = 1
    this.tickDistance = 1;
    this.html = $(document.createElement("div")).addClass("zombie").html('<div class = "health-bar"><div id ="test" class ="health-bar-value"></div></div>');

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

    this.health = function (value) {
        if (value !== undefined) {
            self._currentHealth = value <= 0 ? 0 : value;
            self.html.find(".health-bar-value").animate({
                "width": self._currentHealth / self.initialHealth * 100 + "%"
            }, 500);
        }
        else {
            return self._currentHealth;
        }
    }
};