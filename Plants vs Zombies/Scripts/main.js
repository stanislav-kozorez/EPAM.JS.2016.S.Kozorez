/// <reference path="jquery.js" />

$(function () {
    setTimeout(moveZombie, 25);

    function moveZombie() {
        var zombies = $(".zombie");
        var right = parseInt(zombies.css("right"));

        right +=2;
        if (right >= 840) {
            $(".game-over").fadeIn(1000).delay(100).fadeOut(1000);;
            right = 0;
        }
        zombies.css("right", right + "px");
        setTimeout(moveZombie, 25);
    }
});