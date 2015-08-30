(function () {
    'use strict';

    function List(list) {
        this.list = list;
    }
    List.prototype.contains = function(obj) {
        var i;
        for (i = 0; i < this.list.length; i++) {
            if (this.list[i] === obj) {
                return true;
            }
        }

        return false;
    };

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

                ROADBLOCK_TILE: 37,

                GRID_SIZE: 32,

                UP: {x: 0, y: -1, anim: 'up', idleAnim: 'idle-up'},
                DOWN: {x: 0, y: 1, anim: 'down', idleAnim: 'idle-down'},
                LEFT: {x: -1, y: 0, anim: 'left', idleAnim: 'idle-left'},
                RIGHT: {x: 1, y: 0, anim: 'right', idleAnim: 'idle-right'},

                font: 'Kingthings'
            };

            this.game.constants.Tiles = {
                5: new List([this.game.constants.LEFT, this.game.constants.RIGHT]),
                6: new List([this.game.constants.UP, this.game.constants.RIGHT]),
                7: new List([this.game.constants.UP, this.game.constants.LEFT, this.game.constants.RIGHT, this.game.constants.DOWN]),
                8: new List([this.game.constants.UP, this.game.constants.DOWN]),
                13: new List([this.game.constants.UP, this.game.constants.LEFT]),
                15: new List([this.game.constants.DOWN, this.game.constants.RIGHT]),
                16: new List([this.game.constants.LEFT, this.game.constants.DOWN]),
                21: new List([this.game.constants.UP, this.game.constants.RIGHT, this.game.constants.DOWN]),
                22: new List([this.game.constants.LEFT, this.game.constants.UP, this.game.constants.RIGHT]),
                23: new List([this.game.constants.LEFT, this.game.constants.DOWN, this.game.constants.RIGHT]),
                24: new List([this.game.constants.LEFT, this.game.constants.DOWN, this.game.constants.UP])
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

