/**
 * Created by David on 8/25/2015.
 */
(function() {
    'use strict';

    function Player(game, color, map) {
        // The super call to Phaser.Sprite
        Phaser.Sprite.call(this, game, game.gameState.xCoord * game.constants.GRID_SIZE, game.gameState.yCoord * game.constants.GRID_SIZE, 'player', 1);

        this.animations.add('down', [0, 1, 2, 1], 3, true);
        this.animations.add('idle-down', [1], 1, true);
        this.animations.add('left', [3, 4, 5, 4], 3, true);
        this.animations.add('idle-left', [4], 1, true);
        this.animations.add('right', [6, 7, 8, 7], 3, true);
        this.animations.add('idle-right', [7], 1, true);
        this.animations.add('up', [9, 10, 11, 10], 3, true);
        this.animations.add('idle-up', [10], 1, true);

        this.anchor.set(0);
        this.game.physics.enable(this);

        this.isMoving = false;
        this.map = map;
        this.tint = color;

        this.animations.play('idle-down', 12, true);
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function() {

    };

    Player.prototype.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    Player.prototype.addInput = function(func) {
        var self = this;
        function onInputOver() {
            self.alpha = 0.5;
        }

        function onInputOut() {
            self.alpha = 1.0;
        }

        this.inputEnabled = true;
        this.events.onInputOver.add(onInputOver, this);
        this.events.onInputOut.add(onInputOut, this);
        this.events.onInputDown.add(func, this);
        this.scale.set(2, 2);
    };

    Player.prototype.stopAnimation = function() {
        this.animations.stop(this.currentAnim, true);

        if(this.currentAnim === this.game.constants.LEFT.anim) {
            this.animations.play(this.game.constants.LEFT.idleAnim);
        }
        if(this.currentAnim === this.game.constants.RIGHT.anim) {
            this.animations.play(this.game.constants.RIGHT.idleAnim);
        }
        if(this.currentAnim === this.game.constants.UP.anim) {
            this.animations.play(this.game.constants.UP.idleAnim);
        }
        if(this.currentAnim === this.game.constants.DOWN.anim) {
            this.animations.play(this.game.constants.DOWN.idleAnim);
        }

        this.isMoving = false;
    };

    Player.prototype.move = function(direction) {
        var tween = this.game.add.tween(this)
            .to({ x: this.x + direction.x * this.game.constants.GRID_SIZE,
                y: this.y + direction.y * this.game.constants.GRID_SIZE },
            250, Phaser.Easing.Linear.None, true);

        this.game.gameState.xCoord += direction.x;
        this.game.gameState.yCoord += direction.y;

        this.isMoving = true;
        tween.onComplete.addOnce(this.stopAnimation, this);
        this.animations.play(direction.anim, 12, true);
    };

    Player.prototype.canMove = function(direction) {
        return this.map.getTile(this.game.gameState.xCoord + direction.x, this.game.gameState.yCoord + direction.y).index !== this.game.constants.WALL_TILE;
    };

    window.Player = Player;
}());
