/**
 * Created by David on 8/25/2015.
 */
(function() {
    'use strict';

    var ScreenText = ScreenText || {};
    ScreenText.defaultContinueText = "Click anywhere to continue...";
    ScreenText.currentText = [];

    ScreenText.displayChoiceText = function(game, title, choice1, choice1Func, choice2, choice2Func, continueText) {
        this.removeAllText(game);

        var style = new Style(game.constants.FONT, 18);

        if(title) {
            var introText = game.add.text(game.width * 0.5, game.height * 0.1, title, style);
            introText.anchor.set(0.5);
            this.currentText.push(introText);
        }

        if(choice1) {
            var textInput1 = new TextInput(game, 0.25, 0.5, choice1, 18, choice1Func);
            game.add.existing(textInput1);
            textInput1.setWordWrap(game.world.width * 0.4);
            textInput1.anchor.set(0.5);
            this.currentText.push(textInput1);
        }

        if(choice2) {
            var textInput2 = new TextInput(game, 0.75, 0.5, choice2, 18, choice2Func);
            game.add.existing(textInput2);
            textInput2.setWordWrap(game.world.width * 0.4);
            textInput2.anchor.set(0.5);
            this.currentText.push(textInput2);
        }

        if(!continueText)
            continueText = this.defaultContinueText;
        var finalText = game.add.text(game.width * 0.5, game.height * 0.9, continueText, style);
        finalText.anchor.set(0.5);

        this.currentText.push(finalText);
    };

    ScreenText.displayText = function(self, game, centerText, onDown, footerText) {
        this.removeAllText(game);
        var style = new Style(game.constants.FONT, 18, game.width * 0.8);

        if(centerText !== undefined) {
            var introText = game.add.text(game.width * 0.5, game.height * 0.5, centerText, style);
            introText.anchor.set(0.5);
            this.currentText.push(introText);
        }

        if(!footerText)
            footerText = this.defaultContinueText;
        var continueText = game.add.text(game.width * 0.5, game.height * 0.95, footerText, style);
        continueText.anchor.set(0.5);

        if(onDown)
            self.input.onDown.add(onDown, self);


        this.currentText.push(continueText);
    };

    ScreenText.displayTextWithFooter = function(self, game, centerText, footer, onDown, footerText) {
        this.removeAllText(game);
        var style = new Style(game.constants.FONT, 18, game.width * 0.8);

        if(centerText) {
            var introText = game.add.text(game.width * 0.5, game.height * 0.4, centerText, style);
            introText.anchor.set(0.5);
        }

        if(footer) {
            var referenceText = game.add.text(game.width * 0.5, game.height * 0.85, footer, new Style(game.constants.FONT, 11, game.width * 0.8));
            referenceText.anchor.set(0.5);
        }

        if(!footerText)
            footerText = this.defaultContinueText;
        var continueText = game.add.text(game.width * 0.5, game.height * 0.95, footerText, style);
        continueText.anchor.set(0.5);

        self.input.onDown.add(onDown, self);

        this.currentText.push(introText);
        this.currentText.push(continueText);
        this.currentText.push(referenceText);
    };

    ScreenText.removeAllText = function(game) {
        for(var text in this.currentText) {
            if(this.currentText.hasOwnProperty(text))
                game.world.remove(this.currentText[text]);
        }
        this.currentText = [];
    };

    window.ScreenText = ScreenText;
}());
