(function() {
    'use strict';

    function Game() {
        this.map = null;
        this.player = null;
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

            this.GroundLayer = this.map.createLayer('Tile Layer 1');
            this.ObjectLayer = this.map.createLayer('Objects');
            this.updateTiles();

            this.player = new Player(this.game, this.game.gameState.color, this.map);
            this.game.gameState.player = this.player;
            this.game.add.existing(this.player);

            //Add Player Controls
            this.cursors = this.input.keyboard.createCursorKeys();

            this.addRain();
            this.updateHealthbars();
        },
        updateTiles: function() {
            for(var tileI in this.game.gameState.tiles) {
                var tile = this.game.gameState.tiles[tileI];
                this.map.removeTile(tile.x, tile.y, this.ObjectLayer);
            }
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
            if(this.player.hasHitRoadBlock(this.ObjectLayer)) {
                this.switchToScenario();
            }
            this.checkKeys();
        },
        switchToScenario: function() {
            this.game.gameState.tiles.push({x: this.game.gameState.xCoord, y: this.game.gameState.yCoord});
            this.game.state.start('scenario');
        },

        checkKeys: function () {

            if(!this.player.isMoving) {
                if (this.cursors.left.isDown && this.player.canMove(this.game.constants.LEFT)) {
                    this.player.move(this.game.constants.LEFT, this.cursors.left);
                }
                else if (this.cursors.right.isDown && this.player.canMove(this.game.constants.RIGHT)) {
                    this.player.move(this.game.constants.RIGHT, this.cursors.right);
                }
                else if (this.cursors.up.isDown && this.player.canMove(this.game.constants.UP)) {
                    this.player.move(this.game.constants.UP, this.cursors.up);
                }
                else if (this.cursors.down.isDown && this.player.canMove(this.game.constants.DOWN)) {
                    this.player.move(this.game.constants.DOWN, this.cursors.down);
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
