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

                GRID_SIZE: 32,

                UP: {x: 0, y: -1, anim: 'up', idleAnim: 'idle-up'},
                DOWN: {x: 0, y: 1, anim: 'down', idleAnim: 'idle-down'},
                LEFT: {x: -1, y: 0, anim: 'left', idleAnim: 'idle-left'},
                RIGHT: {x: 1, y: 0, anim: 'right', idleAnim: 'idle-right'},

                font: 'Kingthings'
            };
            this.game.gameState = {
                xCoord: 1,
                yCoord: 1,
                scenarios: [],
                usedScenarios: [],
                startTime: null,
                isAgency: true,
                tiles: [],

                health: 100,
                mentalHealth: 100,
                childHealth: 100
            };

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth =  this.game.constants._WIDTH;
            this.game.scale.minHeight = this.game.constants._HEIGHT;
            this.game.scale.maxWidth = this.game.constants._WIDTH;
            this.game.scale.maxHeight = this.game.constants._HEIGHT;
            this.game.scale.pageAlignHorizontally = true;
            this.game.state.start('preloader');
        },

        addTransition: function() {
            this.game.transitionPlugin = this.game.plugins.add(Phaser.Plugin.StateTransition);

            this.game.transitionPlugin.settings({
                // how long the animation should take
                duration: 750,

                // ease property
                ease: Phaser.Easing.Quadratic.Out, /* default ease */

                // what property should be tweened
                properties: {
                    alpha: 0
                }
            });
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Boot = Boot;
}());

