'use strict';
function Play() {

    this.tank = null;
    this.turret = null;
    this.flame = null;
    this.bullet = null;

    this.background = null;
    this.targets = null;

    this.power = 300;
    this.powerText = null;

    this.cursors = null;
    this.fireButton = null;    
}
Play.prototype = {
    init: function () {
        // console.log('play.init() called.');
        game.renderer.renderSession.roundPixels = true;
        
        // game.world.setBounds(0, 0, 992, 480);
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // game.physics.arcade.gravity.y = 200;

    },
    create: function () {
        // console.log('play.create() called.');

        //  Simple but pretty background
        var bgHeight = game.cache.getImage('background', true).frame.sourceSizeH;
        
        var gameHeight = game.height;
        var backgroundYPos = gameHeight - bgHeight;
        this.background = this.add.sprite(0, backgroundYPos, 'background');


        this.background.x = 0;
        this.background.y = 0;
        this.background.height = game.height;
        this.background.width = game.width;

        //  Something to shoot at :)
        this.targets = this.add.group(this.game.world, 'targets', false, true, Phaser.Physics.ARCADE);
        var targetHeight = game.cache.getImage('target', true).frame.sourceSizeH;
        var targetYPos = gameHeight - targetHeight;
        this.targets.create(game.width * .2, targetYPos, 'target');
        this.targets.create(game.width * .4, targetYPos, 'target');
        this.targets.create(game.width * .6, targetYPos, 'target');
        this.targets.create(game.width * .8, targetYPos, 'target');

        //  Stop gravity from pulling them away
        this.targets.setAll('body.allowGravity', false);

        //  A single bullet that the tank will fire
        this.bullet = this.add.sprite(0, 0, 'bullet');
        this.bullet.exists = false;
        this.physics.arcade.enable(this.bullet);


        this.sprite = game.add.sprite(game.width / 2, game.height / 2, 'yeoman');
        this.sprite.inputEnabled = true;

        game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1, 1);
        this.sprite.body.velocity.x = game.rnd.integerInRange(-500, 500);
        this.sprite.body.velocity.y = game.rnd.integerInRange(-500, 500);

        this.sprite.events.onInputDown.add(this.clickListener, this);

    },

    update: function () {
    },
    clickListener: function () {

        // Clean up resizing world bounds after game is over.
        game.world.setBounds(0, 0, game.width, game.height);
        game.state.start('gameover');
    }
};
