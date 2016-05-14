
'use strict';
function GameOver() { }

GameOver.prototype = {
    preload: function () {

    },
    create: function () {
        var style = { font: '40px Arial', fill: '#ffffff', align: 'center' };
        this.GameOverText = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', style);
        this.GameOverText.anchor.setTo(0.5, 0.5);

        this.highScoresText = this.game.add.text(this.game.world.centerX, 200, 'View Scores', { font: '32px Arial', fill: '#ffffff', align: 'center' });
        this.highScoresText.anchor.setTo(0.5, 0.5);
        this.highScoresText.inputEnabled = true;
        this.highScoresText.events.onInputDown.add(this.highScores, this);

        this.mainMenuText = this.game.add.text(this.game.world.centerX, 300, 'Main Menu', { font: '32px Arial', fill: '#ffffff', align: 'center' });
        this.mainMenuText.anchor.setTo(0.5, 0.5);
        this.mainMenuText.inputEnabled = true;
        this.mainMenuText.events.onInputDown.add(this.mainMenu, this);

        this.playAgainText = this.game.add.text(this.game.world.centerX, 400, 'Play Again', { font: '32px Arial', fill: '#ffffff', align: 'center' });
        this.playAgainText.anchor.setTo(0.5, 0.5);
        this.playAgainText.inputEnabled = true;
        this.playAgainText.events.onInputDown.add(this.playAgain, this);
    },
    update: function () {
        //if(this.game.input.activePointer.justPressed()) {
        //  this.game.state.start('play');
        //}
    },
    highScores: function () {
        this.game.state.start('scores');
    },
    mainMenu: function () {
        this.game.state.start('menu');
    },
    playAgain: function () {
        this.game.state.start('play');
    }
};
