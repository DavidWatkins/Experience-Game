(function() {
    'use strict';

    function Menu() {}

    Menu.prototype = {
        create: function () {
            var style = new Style(this.game.constants.FONT, 30);
            var text = this.add.text(this.game.width * 0.5, this.game.height * 0.3, this.game.constants.Title, style);
            text.anchor.set(0.5);

            this.game.add.existing(new TextInput(this.game, 0.5, 0.9, 'Click here to continue...', 18, this.openModal));
        },

        openModal: function() {
            var self = this;
            window["CloseModalWindow"] = function() {
                var qualtricsID = document.getElementById("idInput").value;
                console.log(qualtricsID);
                if(!qualtricsID)
                    return;
                self.game.gameState.returnData.qualtricsID = qualtricsID;
                $('#idModal').modal('hide');
                self.game.state.start('intro');
            };
            $("#idModal").modal('show');
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Menu = Menu;
}());
