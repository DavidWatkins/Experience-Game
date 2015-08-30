(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.loadResources();

      //this.ready = true;
    },

    loadResources: function () {
      this.load.spritesheet('rain', 'assets/Spritesheets/rain.png', 17, 17);
      this.load.spritesheet('player', 'assets/Spritesheets/player.png', 32, 32, 16);

      this.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', 'assets/Spritesheets/tiles.png');

      this.load.image('playermove', 'assets/img/playermove.png');
      this.load.image('keys', 'assets/img/keys.jpg');

      this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

      this.load.audio('music', ['assets/audio/Music.ogg', 'assets/audio/Music.mp3', 'assets/audio/Music.m4a']);

      this.load.json('gameData', 'assets/data/gameData.json');
    },

    create: function () {

    },

    update: function () {
      if (!!this.ready) {
        this.game.gameState.scenarios = this.game.cache.getJSON('gameData').scenarios;
        this.game.bgMusic = this.game.add.audio('music');
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
  window['walking-in-their-shoes'].Preloader = Preloader;
}());
