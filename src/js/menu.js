(function() {
    'use strict';

    function Menu() {}

    Menu.prototype = {
        create: function () {
            var text = this.add.text(this.game.width * 0.4, this.game.height * 0.5,
                this.game.constants.S_Title, {font: '42px Arial', fill: '#ffffff', align: 'center'
                });
            text.anchor.set(0.5);

            this.agencyButton = this.add.button(this.game.constants._WIDTH*0.5, this.game.constants._HEIGHT*0.7, 'agency-start', this.agency, this, 2, 0, 1);
            this.agencyButton.anchor.set(0.5,0);
            this.noAgencyButton = this.add.button(this.game.constants._WIDTH*0.5, this.game.constants._HEIGHT*0.6, 'no-agency-start', this.noAgency, this, 2, 0, 1);
            this.noAgencyButton.anchor.set(0.5,0);

            //this.input.onDown.add(this.onDown, this);
        },

        update: function () {

        },

        onDown: function () {
            this.game.state.start('game');
        },

        noAgency: function() {
            this.game.global.gameType = NO_AGENCY;
            this.game.state.start('Game');
        },
        agency: function() {
            this.game.global.gameType = AGENCY;
            this.game.state.start('Game');
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Menu = Menu;
}());
