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
            if (!this.game.bgMusic.isPlaying){  this.game.bgMusic.play('',0,1,true); }

            //Initialize Map
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('tiles', 'tiles');
            this.map.addTilesetImage('MarioCoin32','MarioCoin32');

            this.layer = this.map.createLayer('Tile Layer 1');
            this.map.setCollision(this.game.constants.WALL_TILE, true, this.layer);
            this.map.setCollision(20);

            this.updateTiles();
            this.map.setTileIndexCallback(this.game.constants.ROADBLOCK_TILE, this.handleScenario, this);

            this.player = new Player(this.game, this.game.gameState.color, this.map);
            this.game.gameState.player = this.player;
            this.game.add.existing(this.player);

            //Add Player Controls
            this.cursors = this.input.keyboard.createCursorKeys();

            //Add Rain
            this.addRain();

            console.log('RAN THIS');
        },
        updateTiles: function() {
            for(var tileI in this.game.gameState.tiles) {
                var tile = this.game.gameState.tiles[tileI];
                console.log(tile);
                this.map.replace(this.game.constants.ROADBLOCK_TILE, this.game.constants.ROAD_TILE, tile.x, tile.y, 1, 1, this.layer);
            }
        },
        handleScenario: function() {
            this.game.gameState.tiles.push({x: this.game.gameState.xCoord, y: this.game.gameState.yCoord});
            this.map.replace(this.game.constants.ROADBLOCK_TILE, this.game.constants.ROAD_TILE, this.player.xCoord, this.player.yCoord, 1, 1, this.layer);
            this.game.state.start('scenario');
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

        addHealthBar: function() {
                // just a property we can tween so the bar has a progress to show
                this.barProgress = 128;

                // the bar itself
                this.bar = this.add.bitmapData(128, 8);

                game.add.sprite(game.world.centerX - (this.bar.width * 0.5), game.world.centerY, this.bar);

                game.add.tween(this).to({barProgress: 0}, 2000, null, true, 0, Infinity);


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
        },

        //UPDATE
        update: function () {
            this.physics.arcade.collide(this.player, this.layer);

            this.checkKeys();
        },

        checkKeys: function () {

            if(!this.player.isMoving) {
                if (this.cursors.left.isDown && this.player.canMove(this.game.constants.LEFT)) {
                    this.player.move(this.game.constants.LEFT);
                }
                else if (this.cursors.right.isDown && this.player.canMove(this.game.constants.RIGHT)) {
                    this.player.move(this.game.constants.RIGHT);
                }
                else if (this.cursors.up.isDown && this.player.canMove(this.game.constants.UP)) {
                    this.player.move(this.game.constants.UP);
                }
                else if (this.cursors.down.isDown && this.player.canMove(this.game.constants.DOWN)) {
                    this.player.move(this.game.constants.DOWN);
                }
                else {
                }
            }
        },

        updateHealthbars: function() {

        },

        onInputDown: function () {
            this.game.state.start('menu');
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Game = Game;
}());
