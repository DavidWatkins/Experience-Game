(function () {
    'use strict';

    function Boot() {}

    Boot.prototype = {
        preload: function () {
            this.load.image('preloader', 'assets/preloader.gif');
        },

        create: function () {
            // configure game
            this.game.input.maxPointers = 1;
            this.game.constants = {
                _WIDTH: 960,
                _HEIGHT: 896,

                _sTitle: 'Walking in Their Shoes: Poverty in America',

                AGENCY: 1,
                NO_AGENCY: 2,

                ROAD_TILE: 1,
                WALL_TILE: 20,
                ROADBLOCK_TILE: 141,

                UP: {x: 0, y: -1, anim: 'up', idleAnim: 'idle-up'},
                DOWN: {x: 0, y: 1, anim: 'down', idleAnim: 'idle-down'},
                LEFT: {x: -1, y: 0, anim: 'left', idleAnim: 'idle-left'},
                RIGHT: {x: 1, y: 0, anim: 'right', idleAnim: 'idle-right'}
            };

            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            } else {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.minWidth =  this.game.constants._WIDTH;
                this.game.scale.minHeight = this.game.constants._HEIGHT;
                //this.game.scale.maxWidth = 640;
                //this.game.scale.maxHeight = 480;
                this.game.scale.forceOrientation(true);
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.setScreenSize(true);
            }
            this.game.state.start('preloader');
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Boot = Boot;
}());

