(function () {
    'use strict';

    function Game() {
        this.player = null;
        this.map = null;
        this.GroundLayer = null;
        this.player = null;
        this.ObjectLayer = null;
        this.cursors = null;
    }

    Game.prototype = {

        //CREATE
        create: function () {

            if(this.game.information.scenarios.length === 0 || this.game.gameState.usedScenarios >= this.game.constants.NUM_SCENARIOS) {
                this.game.state.start('endgame');
                return;
            }

            //Initialize Map
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('tiles', 'tiles');

            this.GroundLayer = this.map.createLayer('Tile Layer 1');
            this.ObjectLayer = this.map.createLayer('Objects');
            this.updateTiles();

            //Add a new player
            this.player = new Player(this.game, this.game.gameState.color, this.map);
            this.game.gameState.player = this.player;
            this.game.add.existing(this.player);

            //Add Player Controls
            this.cursors = this.input.keyboard.createCursorKeys();

            //Add Rain Emitter
            //Changed 5/26/16 - Due to bad feedback
            //addRainEmitter(this.game);

            this.addHealthBars();
        },

        updateTileSequentially: function() {
            for (var x = 0; x < this.game.constants.GRID_SIZE; x++) {
                for (var y = 0; y < this.game.constants.GRID_SIZE; y++) {
                    var tile = this.map.getTile(x, y, this.ObjectLayer);
                    if(tile && tile.index == this.game.constants.Tiles.ROADBLOCK_TILE) {
                        this.map.removeTile(x, y, this.ObjectLayer);
                        console.log(x, y);
                        return;
                    }
                }
            }
        },

        updateTiles: function () {
            var tileI,
                currentTile;

            var numToRemove = this.game.constants.NUM_SCENARIOS - (this.game.information.scenarios.length + this.game.gameState.usedScenarios);
            for(var index = 0; index < numToRemove; index++) {
                this.updateTileSequentially();
            }

            for (tileI in this.game.gameState.tiles) {
                if (this.game.gameState.tiles.hasOwnProperty(tileI)) {
                    currentTile = this.game.gameState.tiles[tileI];
                    this.map.removeTile(currentTile.x, currentTile.y, this.ObjectLayer);
                    console.log(currentTile);
                }
            }
        },

        addHealthBars: function () {
            HealthBar(this.game, this.game.gameState.health, 0, 0, 'heartbar', 'Physical Health:');
            HealthBar(this.game, this.game.gameState.mentalHealth, 10, 0, 'smilebar', 'Mental Health:');
            HealthBar(this.game, this.game.gameState.childHealth, 20, 0, 'bearbar', 'Child\'s Health:');
        },

        //UPDATE
        update: function () {
            if(this.player) {
                if(this.player.hasHitRoadBlock(this.ObjectLayer)) {
                    this.switchToScenario();
                }
                this.checkKeys();
            }
        },
        switchToScenario: function() {
            this.game.gameState.tiles.push({x: this.game.gameState.xCoord, y: this.game.gameState.yCoord});
            this.game.state.start('scenario');
        },

        checkKeys: function () {

            if(!this.player.isMoving) {
                if (this.cursors.left.isDown && this.player.canMove("LEFT")) {
                    this.player.move(this.game.constants.Directions.LEFT, this.cursors.left);
                }
                else if (this.cursors.right.isDown && this.player.canMove("RIGHT")) {
                    this.player.move(this.game.constants.Directions.RIGHT, this.cursors.right);
                }
                else if (this.cursors.up.isDown && this.player.canMove("UP")) {
                    this.player.move(this.game.constants.Directions.UP, this.cursors.up);
                }
                else if (this.cursors.down.isDown && this.player.canMove("DOWN")) {
                    this.player.move(this.game.constants.Directions.DOWN, this.cursors.down);
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
