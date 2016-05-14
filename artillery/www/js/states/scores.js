'use strict';

function Scores() { }

Scores.prototype = {
    create: function () {

        var style = { font: '32px Arial', fill: '#ffffff', align: 'center' };
        this.GameOverText = this.game.add.text(this.game.world.centerX, 100, 'View some high scores!', style);
        this.GameOverText.anchor.setTo(0.5, 0.5);

        this.mainMenuText = this.game.add.text(this.game.world.centerX, 200, 'Main Menu', { font: '32px Arial', fill: '#ffffff', align: 'center' });
        this.mainMenuText.anchor.setTo(0.5, 0.5);
        this.mainMenuText.inputEnabled = true;
        this.mainMenuText.events.onInputDown.add(this.mainMenu, this);
    },

    update: function () {
    },
    mainMenu: function () {
        this.game.state.start('menu');
    }
}