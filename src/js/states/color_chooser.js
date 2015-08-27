/**
 * Created by David on 8/26/2015.
 */
(function() {
    'use strict';

    function Color_Chooser() {

    }

    Color_Chooser.prototype = {
        create: function () {
            if (!this.game.bgMusic.isPlaying){  this.game.bgMusic.play('',0,1,true); }
            var text = this.add.text(this.game.width * 0.5, this.game.height * 0.2,
                'Choose character color', {font: '30px ' + this.game.constants.font, fill: '#ffffff', align: 'center'
                });
            text.anchor.set(0.5);

            var players = [
                new Player(this.game, 0x00ffff),
                new Player(this.game, 0xff00ff),
                new Player(this.game, 0xffff00),
                new Player(this.game, 0xff0000),
                new Player(this.game, 0x00ff00),
                new Player(this.game, 0x0000ff)
            ];

            for(var x = 0; x < players.length; x++) {
                players[x].setPosition(this.game.width * (0.24 * (x % 3 + 1)), this.game.height * ((x > 2) ? 0.4 : 0.7));
                players[x].addInput(this.onClick);
                this.game.add.existing(players[x]);
            }
        },

        onClick: function () {
            this.game.gameState.color = this.tint;
            this.game.state.start('how_to');
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Color_Chooser = Color_Chooser;
}());
