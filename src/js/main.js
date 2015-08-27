window.addEventListener('load', function () {
  'use strict';

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
  /* yo phaser:state new-state-files-put-here */
  game.state.start('boot');
}, false);
