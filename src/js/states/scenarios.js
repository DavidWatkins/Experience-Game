/**
 * Created by David on 8/26/2015.
 */
(function() {
    'use strict';

    function Scenario(game) {}

    Scenario.prototype = {
        create: function () {
            if (!this.game.bgMusic.isPlaying){  this.game.bgMusic.play('',0,1,true); }

            this.scenarios = this.game.gameState.scenarios;
            var index = this.getRandomInt(0, this.scenarios.length);
            if(this.scenarios.length === 0) {
                this.game.state.start('endgame');
                return;
            }

            this.scenario = this.scenarios[index];
            this.scenarios.splice(index, 1);
            this.choice = {id: this.scenario.id};

            if(this.game.gameState.isAgency) {
                this.scenario = this.scenario['agency'];
            } else {
                this.scenario = this.scenario['no-agency'];
            }

            this.textFont = {
                font: '18px ' + this.game.constants.font,
                fill: '#ffffff',
                align: 'center',
                wordWrap: true,
                wordWrapWidth: this.game.width * 0.9
            };

            this.displayIntro();
        },

        removeAllText: function() {
            if(this.introText) {
                this.game.world.remove(this.introText);
            }
            if(this.continueText) {
                this.game.world.remove(this.continueText);
            }
            if(this.textInput1) {
                this.game.world.remove(this.textInput1);
            }
            if(this.textInput2) {
                this.game.world.remove(this.textInput2);
            }
            if(this.finalText) {
                this.game.world.remove(this.finalText);
            }
        },

        displayIntro: function() {
            this.displayText(this.displayChoices, this.scenario.Intro);
        },
        displayChoices: function(self) {
            self.removeAllText();

            function onDown1() {
                self.choice.outcome = 1;
                self.displayOutcome1();
            }
            function onDown2() {
                self.choice.outcome = 2;
                self.displayOutcome2();
            }

            if(self.game.gameState.isAgency) {
                self.introText = self.game.add.text(self.game.width * 0.5, self.game.height * 0.1, self.scenario.Choices.msg, self.textFont);
                self.introText.anchor.set(0.5);

                self.textInput1 = new TextInput(self.game, 0.25, 0.5, self.scenario.Choices.opt1, 18, onDown1);
                self.game.add.existing(self.textInput1);
                self.textInput1.setWordWrap(self.game.world.width * 0.4);
                self.textInput1.anchor.set(0.5);

                self.textInput2 = new TextInput(self.game, 0.75, 0.5, self.scenario.Choices.opt2, 18, onDown2);
                self.game.add.existing(self.textInput2);
                self.textInput2.setWordWrap(self.game.world.width * 0.4);
                self.textInput2.anchor.set(0.5);

                self.finalText = self.game.add.text(self.game.width * 0.5, self.game.height * 0.9, self.scenario.Choices.final, self.textFont);
                self.finalText.anchor.set(0.5);
            } else {
                var outcome = self.getRandomInt(0, 1);
                if(outcome === 0) {
                    self.displayText(onDown1, self.scenario.Choices);
                } else {
                    self.displayText(onDown2, self.scenario.Choices);
                }
            }
        },
        displayOutcome1: function() {
            this.game.gameState.health += this.scenario.Outcome1.health;
            this.game.gameState.mental_health += this.scenario.Outcome1.mental_health;
            this.game.gameState.child_health += this.scenario.Outcome1.child_health;
            this.displayText(this.displayStats, this.scenario.Outcome1.msg);
        },
        displayOutcome2: function() {
            this.game.gameState.health += this.scenario.Outcome2.health;
            this.game.gameState.mental_health += this.scenario.Outcome2.mental_health;
            this.game.gameState.child_health += this.scenario.Outcome2.child_health;
            this.displayText(this.displayStats, this.scenario.Outcome2.msg);
        },
        displayStats: function(self) {
            self.game.gameState.usedScenarios.push(self.choice);
            self.displayText(self.done, self.scenario.Stats);
        },

        displayText: function(next, text) {
            this.removeAllText();

            function onDown() {
                next(this);
            }

            this.introText = this.add.text(this.game.width * 0.5, this.game.height * 0.5, text, this.textFont);
            this.introText.anchor.set(0.5);
            this.continueText = this.add.text(this.game.width * 0.5, this.game.height * 0.95, 'Click the screen to continue...', this.textFont);
            this.continueText.anchor.set(0.5);
            this.input.onDown.add(onDown, this);
        },

        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },

        done: function (self) {
            self.game.state.start('game');
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Scenario = Scenario;
}());
