/**
 * @author David Watkins <djw2146@columbia.edu>
 * @license MIT
 */
(function () {
    'use strict';

    /**
     * Initial game state to initialize game state and scale the game
     * @constructor
     */
     function Boot() {}

    Boot.prototype = {

        /**
         * Load the preloader gif for the preload state
         * Load the config file for the game
         */
        preload: function () {
            this.load.image('preloader', 'assets/preloader.gif');
            this.load.json('config', 'assets/data/config.json');
        },

        /**
         * Run by phaser upon ininitalization of the game state
         */
        create: function () {
            this.initializeGameState();
            this.scaleGame();
            // this.addTransition();
            this.game.state.start('preloader');
        },

        /**
         * The game state will allow states to share information between each other
         * xCoord, yCoord are used for player location
         * scenarios are loaded in preloader (see assets/data/gameData.json)
         * The data to be recorded will be pushed to a web server at the end of the game
         * The player statuses have no impact on the game and are used for drawing health bars
         */
        initializeGameState: function () {
            this.game.input.maxPointers = 1;
            this.game.constants = this.game.cache.getJSON('config');

            this.game.gameState = {
                //Player location
                xCoord: 1,
                yCoord: 1,
                scenarios: [],

                //Data to be recorded
                usedScenarios: 0,
                startTime: new Date(),
                tiles: [],

                //Player status
                health: 1,
                mentalHealth: 1,
                childHealth: 1
            };
        },

        /**
         * Sets the game width and height to the values loaded in config.json
         */
        scaleGame: function () {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth =  this.game.constants.WIDTH;
            this.game.scale.minHeight = this.game.constants.HEIGHT;
            this.game.scale.maxWidth = this.game.constants.WIDTH;
            this.game.scale.maxHeight = this.game.constants.HEIGHT;
            this.game.scale.pageAlignHorizontally = true;
        },

        /**
         * Uses the phaser transition plugin to add transition animations
         */
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
