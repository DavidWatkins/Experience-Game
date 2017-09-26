(function () {
    'use strict';

    function EndGame() {}

    EndGame.prototype = {

        create: function () {

            ScreenText.displayText(this, this.game, this.game.information.exitText, null, " ");
            this.sendDataToServer();

        },

        sendDataToServer: function() {
            var time = this.game.gameState.returnData.timeSpent;
            this.game.gameState.returnData.timeSpent = (Date.now() - time);
            var self = this;

            console.log(this.game.gameState.returnData);
            console.log(JSON.stringify( this.game.gameState.returnData ));

            // $.ajax({
            //     url: this.game.constants.POST_URL,
            //     data: this.game.gameState.returnData,
            //     error: function(jqXhr, textStatus, errorThrown) {
            //         console.log(errorThrown);
            //     },
            //     dataType: 'text',
            //     success: function(data) {
            //         console.log(data);
            //         //self.sendDataToServer();
            //     },
            //     type: 'POST'
            // });

        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].EndGame = EndGame;
}());

