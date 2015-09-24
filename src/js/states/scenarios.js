/**
 * Created by David on 8/26/2015.
 */
(function() {
    'use strict';

    var outcome = null;

    function Scenario(game) {
        this.scenario = null;
        this.scenarios = null;

        this.states = [
            //Display Intro
            function(self) {
                ScreenText.displayText(self, self.game, self.scenario.Intro, self.nextState);
            },

            //Display Choices
            function(self) {
                self.game.input.onDown.removeAll();

                function onDown1() {
                    self["outcome"] = 1;
                    console.log(self);
                    self.nextState();
                }
                function onDown2() {
                    self["outcome"] = 2;
                    console.log(self);

                    self.nextState();
                }

                if(window.isAgency) {
                    ScreenText.displayChoiceText(self.game, self.scenario.Choices.msg, self.scenario.Choices.opt1, onDown1, self.scenario.Choices.opt2, onDown2, self.scenario.Choices.final);
                } else {
                    self.outcome = self.getRandomInt(1, 3);
                    ScreenText.displayText(self, self.game, self.scenario.Choices, self.nextState);
                }
            },

            //Display Outcome
            function(self) {
                var outcomeKey = (self.outcome === 1) ? 'Outcome1' : 'Outcome2';

                self.updateHealth(outcomeKey, ['health', 'mentalHealth', 'childHealth']);
                ScreenText.displayText(self, self.game, self.scenario[outcomeKey].msg, self.nextState);

                self.game.gameState.usedScenarios++;
                self.game.gameState.returnData["Scenario" + self.game.gameState.usedScenarios] = self.id;
                self.game.gameState.returnData["Scenario" + self.game.gameState.usedScenarios + "Choice"] = self.outcome;
            },

            //Display Stats
            function(self) {
                ScreenText.displayTextWithFooter(self, self.game, self.scenario.Stats.text, self.scenario.Stats.footnotes, self.nextState);
            },

            //Done
            function (self) {
                self.game.state.start('game');
            }
        ];
        this.currentState = 0;
    }

    Scenario.prototype = {
        create: function () {
            this.currentState = 0;

            this.scenarios = this.game.information.scenarios;
            var index = this.getRandomInt(0, this.scenarios.length);

            //Get the next scenario and remove it from the remaining scenarios
            this.scenario = this.scenarios[index];
            this.scenarios.splice(index, 1);
            this.id = this.scenario.id;

            if(window.isAgency) {
                this.scenario = this.scenario['agency'];
            } else {
                this.scenario = this.scenario['no-agency'];
            }

            this.nextState();
        },

        nextState: function() {
            this.states[this.currentState++](this);
        },

        updateHealth: function(outcomeKey, healthTypeKeys) {
            for(var index in healthTypeKeys) {
                if(healthTypeKeys.hasOwnProperty(index)) {
                    var healthTypeKey = healthTypeKeys[index];
                    if (this.scenario[outcomeKey][healthTypeKey] > 0)
                        this.game.gameState[healthTypeKey] = Math.min(this.game.gameState[healthTypeKey] * 1.4, 1);
                    else if (this.scenario[outcomeKey][healthTypeKey] < 0)
                        this.game.gameState[healthTypeKey] = Math.max(this.game.gameState[healthTypeKey] * 0.6, 0);
                }
            }
        },


        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    };

    window['walking-in-their-shoes'] = window['walking-in-their-shoes'] || {};
    window['walking-in-their-shoes'].Scenario = Scenario;
}());
