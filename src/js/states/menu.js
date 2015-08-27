(function() {
    'use strict';

    function Menu() {}

    Menu.prototype = {
        create: function () {
            var style = {
                font: this.game.constants.font,
                fontSize: 30,
                fill: '#ffffff',
                align: 'center'
            };
            var text = this.add.text(this.game.width * 0.5, this.game.height * 0.3, this.game.constants._sTitle, style);
            text.anchor.set(0.5);

            var style2 = {
                font: this.game.constants.font,
                fontSize: 18,
                fill: '#ffffff',
                align: 'center'
            };
            this.game.add.existing(new TextInput(this.game, 0.5, 0.6, 'Agency Condition', 18, this.agency));
            this.game.add.existing(new TextInput(this.game, 0.5, 0.7, 'No Agency Condition', 18, this.noAgency));
        },

        update: function () {

        },

        noAgency: function() {
            this.game.gameState.isAgency = false;
            this.game.state.start('color_chooser');
        },
        agency: function() {
            this.game.gameState.isAgency = true;
            this.game.state.start('color_chooser');
        },
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Menu = Menu;
}());
