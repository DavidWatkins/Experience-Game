(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
    }

    Preloader.prototype = {
        preload: function () {
            this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
            this.load.setPreloadSprite(this.asset);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.loadResources();
        },

        loadResources: function () {
            this.load.spritesheet('rain', 'assets/Spritesheets/rain.png', 17, 17);
            this.load.spritesheet('player', 'assets/Spritesheets/player.png', 32, 32, 16);

            this.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('tiles', 'assets/Spritesheets/tiles.png');

            this.load.image('playermove', 'assets/img/playermove.png');
            this.load.image('keys', 'assets/img/keys.jpg');
            this.load.image('heartbar', 'assets/img/heartbar.png');
            this.load.image('smilebar', 'assets/img/smilebar.png');
            this.load.image('bearbar', 'assets/img/bearbar.png');

            this.load.script('webfont', 'http://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

            this.load.audio('music', ['assets/audio/Music.ogg', 'assets/audio/Music.mp3', 'assets/audio/Music.m4a']);

            this.load.json('gameData', 'assets/data/gameData.json');
        },

        onLoadComplete: function () {
            this.readJSON();
            this.game.bgMusic = this.game.add.audio('music');
            this.game.bgMusic.play('', 0, 1, true);
            this.game.state.start('menu');
        },

        readJSON: function () {
            var gameData = this.game.cache.getJSON('gameData');
            this.game.information = {};
            this.game.information.scenarios = gameData.scenarios;
            this.game.information.introText = gameData.Intro;
            this.game.information.exitText = gameData.Final.text;

            this.game.gameState.returnData = {
                qualtricsID: 0,
                agencyType: (window.isAgency) ? "Agency" : "No Agency",
                timeSpent: Date.now()
            };

            for(var i = 1; i <= this.game.constants.NUM_SCENARIOS; i++) {
                this.game.gameState.returnData["Scenario" + i] = "";
                this.game.gameState.returnData["Scenario" + i + "Choice"] = "";
            }
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Preloader = Preloader;
}());
