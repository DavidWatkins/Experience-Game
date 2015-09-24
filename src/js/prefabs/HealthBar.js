/**
 * Created by David on 8/25/2015.
 */
(function() {
    'use strict';

    /**
     *
     * @param game
     * @param percentFilled
     * @param x
     * @param y
     * @param sprite
     * @param text
     * @constructor
     */
    function HealthBar(game, percentFilled, x, y, sprite, text) {
        function getVal(val) {
            return val * game.constants.GRID_SIZE;
        }

        //Crop the healthbar depending on how much health the player has
        //this.cropEnabled = true;
        var bar = game.add.sprite(getVal(x+5), getVal(y), sprite, 0);
        bar.crop(new Phaser.Rectangle(0, 0, percentFilled * bar.width, game.constants.GRID_SIZE));

        var style = new Style(game.constants.FONT, 16);

        //Show healthbar title next to the healthbar itself
        var textHolder = game.add.text(getVal(x + 2.5), getVal(y + 0.5), text, style);
        textHolder.anchor.set(0.5);
    }

    window.HealthBar = HealthBar;
}());
