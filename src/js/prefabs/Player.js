/**
 * Created by David on 8/25/2015.
 */
(function() {
    'use strict';

    function Player(game, color, map) {
        this.animationSpeed = 8;
        // The super call to Phaser.Sprite
        Phaser.Sprite.call(this, game, game.gameState.xCoord * game.constants.GRID_SIZE, game.gameState.yCoord * game.constants.GRID_SIZE, 'player', 1);

        this.animations.add('down', [0, 1, 2, 3], this.animationSpeed, true);
        this.animations.add('idle-down', [0], 20, true);
        this.animations.add('left', [4, 5, 6, 7], this.animationSpeed, true);
        this.animations.add('idle-left', [4], 20, true);
        this.animations.add('right', [8, 9, 10, 11], this.animationSpeed, true);
        this.animations.add('idle-right', [8], 20, true);
        this.animations.add('up', [12, 13, 14, 15], this.animationSpeed, true);
        this.animations.add('idle-up', [12], 20, true);

        this.anchor.set(0);
        this.game.physics.enable(this);

        this.isMoving = false;
        this.map = map;
        this.tint = color;

        this.animations.play('idle-down', this.animationSpeed, true);
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
        if(this.isMoving)
            return;
        this.animations.stop(this.currentAnim, true);

        if(this.currentDirection === this.game.constants.LEFT) {
            this.animations.play(this.game.constants.LEFT.idleAnim);
        }
        if(this.currentDirection === this.game.constants.RIGHT) {
            this.animations.play(this.game.constants.RIGHT.idleAnim);
        }
        if(this.currentDirection === this.game.constants.UP) {
            this.animations.play(this.game.constants.UP.idleAnim);
        }
        if(this.currentDirection === this.game.constants.DOWN) {
            this.animations.play(this.game.constants.DOWN.idleAnim);
        }
    };

    Player.prototype.stopMoving = function() {
      this.isMoving = false;
        if(!this.cursor.isDown) {
            this.stopAnimation();
        }
    };

    Player.prototype.move = function(direction, cursor) {
        var tween = this.game.add.tween(this)
            .to({ x: this.x + direction.x * this.game.constants.GRID_SIZE,
                y: this.y + direction.y * this.game.constants.GRID_SIZE },
            450, Phaser.Easing.Linear.None, true);

        this.game.gameState.xCoord += direction.x;
        this.game.gameState.yCoord += direction.y;
        this.currentDirection = direction;

        this.isMoving = true;
        tween.onComplete.addOnce(this.stopMoving, this);
        cursor.onUp.removeAll();
        cursor.onUp.addOnce(this.stopAnimation, this);
        this.animations.play(direction.anim, this.animationSpeed, true);

        this.cursor = cursor;
    };

    Player.prototype.canMove = function(direction) {
        var currentTile = this.map.getTile(this.game.gameState.xCoord, this.game.gameState.yCoord).index;
        var tileType = this.game.constants.Tiles[currentTile]
        if(tileType)
            return tileType.contains(direction);
        return false;
    };

    Player.prototype.hasHitRoadBlock = function(layer) {
        var tile = this.map.getTile(this.game.gameState.xCoord, this.game.gameState.yCoord, layer);
        console.log(tile);
        if(tile)
            return tile.index === this.game.constants.ROADBLOCK_TILE;
        return false;
    };

    window.Player = Player;
}());
