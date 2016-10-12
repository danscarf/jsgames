
'use strict';
function GameOver() { }

GameOver.prototype = {
    preload: function () {

    },
    create: function () {
        var style = { font: '35px Arial', fill: '#ffffff', align: 'center' };
        this.GameOverText = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', style);
        this.GameOverText.anchor.setTo(0.5, 0.5);

        this.leaderboardText = this.game.add.text(this.game.world.centerX, 200, 'Leaderboard', { font: '20px Arial', fill: '#ffffff', align: 'center' });
        this.leaderboardText.anchor.setTo(0.5, 0.5);
        this.leaderboardText.inputEnabled = true;
        this.leaderboardText.events.onInputDown.add(this.leaderboard, this);

        this.mainMenuText = this.game.add.text(this.game.world.centerX, 300, 'Main Menu', { font: '20px Arial', fill: '#ffffff', align: 'center' });
        this.mainMenuText.anchor.setTo(0.5, 0.5);
        this.mainMenuText.inputEnabled = true;
        this.mainMenuText.events.onInputDown.add(this.mainMenu, this);

        this.playAgainText = this.game.add.text(this.game.world.centerX, 400, 'Play Again', { font: '20px Arial', fill: '#ffffff', align: 'center' });
        this.playAgainText.anchor.setTo(0.5, 0.5);
        this.playAgainText.inputEnabled = true;
        this.playAgainText.events.onInputDown.add(this.playAgain, this);
    },
    update: function () {
        //if(this.game.input.activePointer.justPressed()) {
        //  this.game.state.start('play');
        //}
    },
    leaderboard: function () {
        this.game.state.start('leaderboard');
    },
    mainMenu: function () {
        this.game.state.start('menu');
    },
    playAgain: function () {
        this.game.state.start('play');
    }
};
