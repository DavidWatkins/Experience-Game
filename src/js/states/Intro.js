/**
 * Created by David on 8/26/2015.
 */
(function() {
    'use strict';

    function Intro() {
        this.currentText = 0;
    }

    Intro.prototype = {
        create: function () {
            this.nextState();
        },

        nextState: function() {
            if(this.currentText >= this.game.information.introText.length) {
                this.game.state.start('color_chooser');
                return;
            }

            var text = this.game.information.introText[this.currentText++];
            var displayText = "";
            var footer = "";
            var continueText = text.continueText;

            if(text.footnotes) {
                for(var i = 0; i < text.footnotes.length; i++) {
                    footer += text.footnotes[i] + "\n";
                }
            }

            if(window.isAgency && !window.noStats && text.agencyText) {
                displayText = text.agencyText;
            } else if(!window.isAgency && !window.noStats && text.noAgencyText) {
                displayText = text.noAgencyText;
            } else if(window.isAgency && window.noStats && text.agencyNoStatsText) {
                displayText = text.agencyNoStatsText;
            } else if(!window.isAgency && window.noStats && text.noAgencyNoStatsText) {
                displayText = text.noAgencyNoStatsText;
            } else if(text.text) {
                displayText = text.text;
            } else {
                displayText = "";
            }

            ScreenText.displayTextWithFooter(
                this,
                this.game,
                displayText,
                footer,
                this.nextState,
                continueText
            );

        }

    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Intro = Intro;
}());
