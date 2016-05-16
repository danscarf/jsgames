
'use strict';
function Preload() {
    this.asset = null;
    this.ready = false;
}

Preload.prototype = {
    preload: function () {
        this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        this.load.image('yeoman', 'assets/yeoman-logo.png');

        this.load.image('bullet', 'assets/bullets.png');
        this.load.image('ship', 'assets/ship.png');


        this.load.image('tank', 'assets/tank.png');
        this.load.image('turret', 'assets/turret.png');
        this.load.image('bullet', 'assets/bullet.png');
        this.load.image('background', 'assets/background.png');
        this.load.image('flame', 'assets/flame.png');
        this.load.image('target', 'assets/target.png');

        this.load.image('firebutton', 'assets/firebutton.png');
        this.load.image('exit', 'assets/exit.png');
        
        this.load.image('upbutton', 'assets/upbutton.png');
        this.load.image('downbutton', 'assets/downbutton.png');
        this.load.image('leftbutton', 'assets/leftbutton.png');
        this.load.image('rightbutton', 'assets/rightbutton.png');
    },
    create: function () {
        this.asset.cropEnabled = false;
    },
    update: function () {
        if (!!this.ready) {
            this.game.state.start('menu');
        }
    },
    onLoadComplete: function () {
        this.ready = true;
    }
};
