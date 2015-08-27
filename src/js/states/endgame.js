(function () {
    'use strict';

    function EndGame(game) {}

    EndGame.prototype = {

        create: function () {
            this.style = {
                font: this.game.constants.font,
                fontSize: 30,
                fill: '#ffffff',
                align: 'center'
            };
            var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Thanks for playing!', this.style);
            text.anchor.set(0.5);
        },

        onClick: function() {

        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].EndGame = EndGame;
}());

