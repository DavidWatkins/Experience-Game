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
      this.load.spritesheet('rain', 'assets/rain.png', 17, 17);
      this.load.spritesheet('player', 'assets/player.png', 31, 32, 12);

      this.load.image('panel', 'img/panel.png');

      this.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tiles', 'assets/tiles.png');
      this.load.image('MarioCoin32', 'assets/MarioCoin32.png');

      this.load.spritesheet('agency-start', 'img/agency-start.png', 146, 51);
      this.load.spritesheet('no-agency-start', 'img/no-agency-start.png', 146, 51);

      this.load.audio('audio-bounce', ['audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);
    },

    create: function () {

    },

    update: function () {
      if (!!this.ready) {
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
