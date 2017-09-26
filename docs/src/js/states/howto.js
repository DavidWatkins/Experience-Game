/**
 * Created by David on 8/26/2015.
 */
(function() {
    'use strict';

    function HowTo() {

    }

    HowTo.prototype = {
        create: function () {
            if (!this.game.bgMusic.isPlaying){  this.game.bgMusic.play('',0,1,true); }

            this.titleText = this.add.text(this.game.width * 0.5, this.game.height * 0.2,
                'How To', {font: '30px ' + this.game.constants.font, fill: '#ffffff', align: 'center'
                });
            this.titleText.anchor.set(0.5);

            this.keyImage = this.game.add.sprite(this.game.width * 0.3, this.game.height * 0.4, 'keys');
            this.keyImage.scale.setTo(0.15, 0.15);
            this.keyImage.anchor.set(0.5);
            this.howToMove = this.add.text(this.game.width * 0.7, this.game.height * 0.4,
                'Press the arrow keys to move your character', {font: '18px ' + this.game.constants.font, fill: '#ffffff', align: 'center', wordWrap: true, wordWrapWidth: this.game.width * 0.2});
            this.howToMove.anchor.set(0.5);

            this.playerImage = this.game.add.sprite(this.game.width * 0.7, this.game.height * 0.7, 'playermove');
            this.playerImage.anchor.set(0.5);
            this.howToPlay = this.add.text(this.game.width * 0.3, this.game.height * 0.7,
                'Hit the scenario boxes to progress through the game', {font: '18px ' + this.game.constants.font, fill: '#ffffff', align: 'center', wordWrap: true, wordWrapWidth: this.game.width * 0.2});
            this.howToPlay.anchor.set(0.5);

            this.continueText = this.add.text(this.game.width * 0.5, this.game.height * 0.9,
                'Click the screen to continue...', {font: '18px ' + this.game.constants.font, fill: '#ffffff', align: 'center'
                });
            this.continueText.anchor.set(0.5);
            this.input.onDown.add(this.onDown, this);
        },

        onDown: function () {
            this.game.state.start('game');
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].HowTo = HowTo;
}());
