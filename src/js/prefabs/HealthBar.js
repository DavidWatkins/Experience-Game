/**
 * Created by David on 8/25/2015.
 */
(function() {
    'use strict';

    function HealthBar(game, percentFilled, x, y) {
        // The super call to Phaser.Sprite
        Phaser.Sprite.call(this, game, game.gameState.xCoord * game.constants.GRID_SIZE, game.gameState.yCoord * game.constants.GRID_SIZE, 'player', 1);
        // just a property we can tween so the bar has a progress to show
        this.barProgress = 128;

        // the bar itself
        this.bar = this.add.bitmapData(128, 8);

        game.add.sprite(game.world.centerX - (this.bar.width * 0.5), game.world.centerY, this.bar);

        game.add.tween(this).to({barProgress: 0}, 2000, null, true, 0, Infinity);
    }

    HealthBar.prototype = Object.create(Phaser.Sprite.prototype);
    HealthBar.prototype.constructor = HealthBar;

    HealthBar.prototype.update = function() {
        // ensure you clear the context each time you update it or the bar will draw on top of itself
        this.bar.context.clearRect(0, 0, this.bar.width, this.bar.height);

        // some simple colour changing to make it look like a health bar
        if (this.barProgress < 32) {
            this.bar.context.fillStyle = '#f00';
        }
        else if (this.barProgress < 64) {
            this.bar.context.fillStyle = '#ff0';
        }
        else {
            this.bar.context.fillStyle = '#0f0';
        }

        // draw the bar
        this.bar.context.fillRect(0, 0, this.barProgress, 8);

        // important - without this line, the context will never be updated on the GPU when using webGL
        this.bar.dirty = true;
    };

    window.HealthBar = HealthBar;
}());
