'use strict';
function LevelSelect() { }

LevelSelect.prototype = {
    preload: function () {
        console.log(arguments[0]);
    },
    create: function () {
        var style = { font: '10px Arial', fill: '#ffffff', align: 'center' };
        var levels = {};
        var a = game.cache.getKeys();
        var l1Data = JSON.parse(game.cache.getText("l1"));
        var l2Data = JSON.parse(game.cache.getText("l2"));
        var l3Data = JSON.parse(game.cache.getText("l3"));
        var l4Data = JSON.parse(game.cache.getText("l4"));


        this.titleText = this.game.add.text(this.game.world.centerX, 50, 'Choose level to play', style);
        this.titleText.anchor.setTo(0.5, 0.5);
        this.titleText.inputEnabled = true;
        this.titleText.events.onInputDown.add(this.mainMenu, this);

        this.l1Text = this.game.add.text(this.game.world.centerX, 200, l1Data.name, style);
        this.l2Text = this.game.add.text(this.game.world.centerX, 300, l2Data.name, style);
        this.l3Text = this.game.add.text(this.game.world.centerX, 400, l3Data.name, style);
        this.l4Text = this.game.add.text(this.game.world.centerX, 500, l4Data.name, style);

        


    },
    update: function () {
    },

    mainMenu: function () {
        this.game.state.start('menu', true, false, "Starting main menu.");
    }
}