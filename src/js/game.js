(function() {
    'use strict';

    function Game() {
        this.map = null;
        this.layer = null;
        this.player = null;

        this.gridsize = 32;

        this.speed = 150;
    }

    Game.prototype = {

        //INIT
        init: function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        },

        //CREATE
        create: function () {
            //Initialize Map
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('tiles', 'tiles');
            this.map.addTilesetImage('MarioCoin32','MarioCoin32');

            this.layer = this.map.createLayer('Tile Layer 1');
            this.map.setCollision(this.game.constants.WALL_TILE, true, this.layer);
            this.map.setCollision(20);

            this.map.setTileIndexCallback(this.game.constants.ROADBLOCK_TILE, this.handleScenario, this);

            //Add Player
            this.makePlayer();

            //Add Player Controls
            this.cursors = this.input.keyboard.createCursorKeys();

            //Add Rain
            this.addRain();
        },
        handleScenario: function() {
            this.map.replace(this.game.constants.ROADBLOCK_TILE, this.game.constants.ROAD_TILE, this.player.xCoord, this.player.yCoord, 1, 1, this.layer);
        },
        makePlayer: function() {
            this.player = this.add.sprite(this.gridsize, this.gridsize, 'player');
            this.player.anchor.set(0);
            this.player.xCoord = 1;
            this.player.yCoord = 1;

            this.player.animations.add('down', [0, 1, 2, 1], 3, true);
            this.player.animations.add('idle-down', [1], 1, true);
            this.player.animations.add('left', [3, 4, 5, 4], 3, true);
            this.player.animations.add('idle-left', [4], 1, true);
            this.player.animations.add('right', [6, 7, 8, 7], 3, true);
            this.player.animations.add('idle-right', [7], 1, true);
            this.player.animations.add('up', [9, 10, 11, 10], 3, true);
            this.player.animations.add('idle-up', [10], 1, true);

            //this.player.tint = this.game.global.playerTint;
            this.game.physics.enable(this.player);
        },
        addRain: function() {
            var rainEmitter = this.game.add.emitter(this.game.world.centerX, 0, 400);

            rainEmitter.width = this.game.world.width;
            //rainEmitter.angle = 30; // uncomment to set an angle for the rain.

            rainEmitter.makeParticles('rain');

            rainEmitter.minParticleScale = 0.1;
            rainEmitter.maxParticleScale = 0.5;

            rainEmitter.setYSpeed(300, 500);
            rainEmitter.setXSpeed(-5, 5);

            rainEmitter.minRotation = 0;
            rainEmitter.maxRotation = 0;

            rainEmitter.start(false, 1600, 5, 0);
        },

        //UPDATE
        update: function () {
            this.physics.arcade.collide(this.player, this.layer);

            this.checkKeys();
        },
        stopAnimation: function() {
            this.player.animations.stop(this.player.currentAnimation, true);

            if(this.player.currentAnimation == this.game.constants.LEFT.anim)
                this.player.animations.play(this.game.constants.LEFT.idle_anim);
            if(this.player.currentAnimation == this.game.constants.RIGHT.anim)
                this.player.animations.play(this.game.constants.RIGHT.idle_anim);
            if(this.player.currentAnimation == this.game.constants.UP.anim)
                this.player.animations.play(this.game.constants.UP.idle_anim);
            if(this.player.currentAnimation == this.game.constants.DOWN.anim)
                this.player.animations.play(this.game.constants.DOWN.idle_anim);

            this.player.currentAnimation = '';
            this.player.isMoving = false;
        },
        move: function(direction) {
            var tween = this.game.add.tween(this.player)
                .to({ x: this.player.x + direction.x * this.gridsize,
                    y: this.player.y + direction.y * this.gridsize },
                250, Phaser.Easing.Linear.None, true);

            this.player.xCoord += direction.x;
            this.player.yCoord += direction.y;

            this.player.isMoving = true;
            tween.onComplete.addOnce(this.stopAnimation, this);
            this.player.currentAnimation = direction.anim;
            this.player.animations.play(direction.anim, 12, true);
        },
        canMove: function(direction) {
            return this.map.getTile(this.player.xCoord + direction.x, this.player.yCoord + direction.y).index != WALL_TILE;
        },
        checkKeys: function () {

            if(!this.player.isMoving) {
                if (this.cursors.left.isDown && this.canMove(this.game.constants.LEFT)) {
                    this.move(this.game.constants.LEFT);
                }
                else if (this.cursors.right.isDown && this.canMove(this.game.constants.RIGHT)) {
                    this.move(this.game.constants.RIGHT);
                }
                else if (this.cursors.up.isDown && this.canMove(this.game.constants.UP)) {
                    this.move(UP);
                }
                else if (this.cursors.down.isDown && this.canMove(this.game.constants.DOWN)) {
                    this.move(this.game.constants.DOWN);
                }
                else {
                }
            }
        },

        onInputDown: function () {
            this.game.state.start('menu');
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Game = Game;
}());
