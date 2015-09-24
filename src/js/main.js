'use strict';

window.addEventListener('load', function () {
    function loadGame() {
        var ns = window['walking-in-their-shoes'];
        var game = new Phaser.Game(960, 896, Phaser.CANVAS, 'walking-in-their-shoes-game');
        game.state.add('boot', ns.Boot);
        game.state.add('preloader', ns.Preloader);
        game.state.add('menu', ns.Menu);
        game.state.add('game', ns.Game);
        game.state.add('color_chooser', ns.Color_Chooser);
        game.state.add('how_to', ns.HowTo);
        game.state.add('scenario', ns.Scenario);
        game.state.add('endgame', ns.EndGame);
        game.state.add('intro', ns.Intro);
        game.state.start('boot');
    }

    crossroads.addRoute('#NA', function(){
        window["isAgency"] = false;
        loadGame();
    });
    crossroads.addRoute('#AG', function() {
        window["isAgency"] = true;
        loadGame();
    });

    crossroads.parse(window.location.hash); /*This is where the parser function is called to match against the routes defined*/
}, false);
