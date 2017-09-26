/**
 * @author       David Watkins <djw2146@columbia.edu>
 * @author       Gina Roussos <gina@yale.edu>
 * @license      MIT License
 */
(function() {
    'use strict';

    /**
     * Constructing Player objects used in both the gameplay as well as the color choosing screen
     * @param {Phaser.Game} game A reference to the currently running instance of Phaser
     * @param {number} color - Color of the player in hexadecimal
     * @param {Phaser.Tilemap} map - A reference to the tilemap of the game. Optional if the player is immobile
     * @constructor
     */
    function Player(game, color, map) {
        this.animationSpeed = game.constants.ANIMATION_SPEED;
        // The super call to Phaser.Sprite
        Phaser.Sprite.call(this, game, game.gameState.xCoord * game.constants.GRID_SIZE, game.gameState.yCoord * game.constants.GRID_SIZE, 'player', 1);

        this.addAnimations();

        this.anchor.set(0);

        this.isMoving = false;
        this.map = map;
        this.tint = color;
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.addAnimations = function () {
        var DOWN = this.game.constants.Directions.DOWN,
            UP = this.game.constants.Directions.UP,
            LEFT = this.game.constants.Directions.LEFT,
            RIGHT = this.game.constants.Directions.RIGHT;


        this.animations.add(DOWN.anim, DOWN.animFrames, this.animationSpeed, true);
        this.animations.add(DOWN.idleAnim, DOWN.idleFrames, 20, true);
        this.animations.add(LEFT.anim, LEFT.animFrames, this.animationSpeed, true);
        this.animations.add(LEFT.idleAnim, LEFT.idleFrames, 20, true);
        this.animations.add(RIGHT.anim, RIGHT.animFrames, this.animationSpeed, true);
        this.animations.add(RIGHT.idleAnim, RIGHT.idleFrames, 20, true);
        this.animations.add(UP.anim, UP.animFrames, this.animationSpeed, true);
        this.animations.add(UP.idleAnim, UP.idleFrames, 20, true);

        this.currentDirection = DOWN;
        this.animations.play(DOWN.idleAnim, this.animationSpeed, true);
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

    Player.prototype.stopAnimation = function () {
        if (this.isMoving) {
            return;
        }

        this.animations.stop(this.currentDirection.anim, true);
        this.animations.play(this.currentDirection.idleAnim);
    };

    Player.prototype.stopMoving = function() {
      this.isMoving = false;
        if(!this.cursor.isDown) {
            this.stopAnimation();
        }
    };

    Player.prototype.move = function(direction, cursor) {
        this.game.add.tween(this)
            .to({ x: this.x + direction.x * this.game.constants.GRID_SIZE, y: this.y + direction.y * this.game.constants.GRID_SIZE },
            450, Phaser.Easing.Linear.None, true)
            .onComplete.addOnce(this.stopMoving, this);

        this.game.gameState.xCoord += direction.x;
        this.game.gameState.yCoord += direction.y;
        this.currentDirection = direction;

        this.isMoving = true;
        cursor.onUp.removeAll();
        cursor.onUp.addOnce(this.stopAnimation, this);
        this.animations.play(direction.anim, this.animationSpeed, true);

        this.cursor = cursor;
    };


    Player.prototype.canMove = function(directionName) {
        var currentTile = this.map.getTile(this.game.gameState.xCoord, this.game.gameState.yCoord).index;
        var tileType = this.game.constants.TileRules[currentTile];
        if(tileType) {
            for(var direction in tileType) {
                if(tileType[direction] === directionName) {
                    return true;
                }
            }
        }
        return false;
    };

    Player.prototype.hasHitRoadBlock = function(layer) {
        if(!this.game)
            return false;

        var tile = this.map.getTile(this.game.gameState.xCoord, this.game.gameState.yCoord, layer);
        if(tile)
            return tile.index === this.game.constants.Tiles.ROADBLOCK_TILE;
        return false;
    };

    window.Player = Player;
}());
