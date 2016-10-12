'use strict';
function LevelSelect() { }

LevelSelect.prototype = {
    preload: function () {

    },
    create: function () {
        var style = { font: '30px Arial', fill: '#ffffff', align: 'center' };
        this.titleText = this.game.add.text(this.game.world.centerX, 50, 'Level Select state!', style);
        this.titleText.anchor.setTo(0.5, 0.5);
        this.titleText.inputEnabled = true;
        this.titleText.events.onInputDown.add(this.mainMenu, this);


    },
    update: function () {
    },

    mainMenu: function () {
        this.game.state.start('menu');
    }
}