
'use strict';
function Menu() {
    this.music = null;
}

Menu.prototype = {
    preload: function () {

    },
    create: function () {
        var style = { font: '30px Arial', fill: '#ffffff', align: 'center' };
        this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.levelSelect, this);

        this.titleText = this.game.add.text(this.game.world.centerX, 300, 'Artillery - Blow some stuff up!', style);
        this.titleText.anchor.setTo(0.5, 0.5);

        this.sprite.angle = -20;
        this.game.add.tween(this.sprite).to({ angle: 20 }, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

        this.music = this.game.add.audio('menutheme');
        this.music.onDecoded.add(this.startMusic, this);
    },
    startMusic: function () {
        this.music.fadeIn(2000);
    },
    update: function () {
        //if (this.game.input.activePointer.justPressed()) {
        //    this.music.fadeIn(1000);
        //    this.game.state.start('play');
        //}
    },
    levelSelect: function () {
        this.game.state.start('levelselect');
    }

};
