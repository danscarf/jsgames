'use strict';
function Play() {

    this.tank = null;
    this.turret = null;
    this.flame = null;
    this.bullet = null;
    this.exit = null;

    this.background = null;
    this.targets = null;

    this.textStyle = { font: "18px Arial", fill: "#ffffff" };

    this.power = null;
    this.powerText = null;

    this.cursors = null;

    
    this.buttonSize = 35;
    this.buttonAlpha = 0.75;
    this.fireButton = null;
    this.upButton = null;
    this.up = false;

    this.downButton = null;
    this.down = false;

    this.leftButton = null;
    this.left = false;

    this.rightButton = null;
    this.right = false;

    this.score = 0;
    this.scoreText = null;
}
Play.prototype = {
    init: function () {

        // console.log('play.init() called.');
        game.renderer.renderSession.roundPixels = true;

        game.world.setBounds(0, 0, game.width * 2, game.height);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;

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
        this.background.width = game.world.width;

        //  Something to shoot at :)
        this.targets = this.add.group(this.game.world, 'targets', false, true, Phaser.Physics.ARCADE);
        var targetHeight = game.cache.getImage('target', true).frame.sourceSizeH;
        var targetYPos = gameHeight - targetHeight;
        this.targets.create(game.world.width * .2, targetYPos, 'target');
        this.targets.create(game.world.width * .4, targetYPos, 'target');
        this.targets.create(game.world.width * .6, targetYPos, 'target');
        this.targets.create(game.world.width * .8, targetYPos, 'target');

        //  Stop gravity from pulling them away
        this.targets.setAll('body.allowGravity', false);

        //  A single bullet that the tank will fire
        this.bullet = this.add.sprite(0, 0, 'bullet');
        this.bullet.exists = false;
        this.physics.arcade.enable(this.bullet);

        //  The body of the tank
        var tankHeight = game.cache.getImage('tank', true).frame.sourceSizeH;
        var tankYPos = gameHeight - tankHeight;
        this.tank = this.add.sprite(24, tankYPos, 'tank');

        //  The turret which we rotate (offset 30x14 from the tank)
        this.turret = this.add.sprite(this.tank.x + 30, this.tank.y + 14, 'turret');

        //  When we shoot this little flame sprite will appear briefly at the end of the turret
        this.flame = this.add.sprite(0, 0, 'flame');
        this.flame.anchor.set(0.5);
        this.flame.visible = false;

        //  Display the power of the shot
        this.power = 300;
        this.powerText = this.add.text(8, 8, 'Power: 300', this.textStyle);
        this.powerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.powerText.fixedToCamera = true;
        //  End Display the power of the shot

        // Display the score
        this.score = 0;
        this.scoreText = this.add.text(0, 8, 'Score: ' + this.score, this.textStyle);
        this.scoreText.x = game.width - this.scoreText.width - 42;
        this.scoreText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.scoreText.fixedToCamera = true;
        // End Display the score

        // Fire button
        var fbXPos = (game.width * .95) - this.buttonSize;
        var fbYPos = (gameHeight * .95) - this.buttonSize;
        this.fireButton = this.add.sprite(fbXPos, fbYPos, 'firebutton');
        this.fireButton.height = this.buttonSize;
        this.fireButton.width = this.buttonSize;
        this.fireButton.alpha = this.buttonAlpha;
        this.fireButton.inputEnabled = true;
        this.fireButton.fixedToCamera = true;
        this.fireButton.events.onInputDown.add(this.fire, this);
        // End fire button

        // Up button
        var upXPos = (game.width * .15) - this.buttonSize;
        var upYPos = (gameHeight * .5) - this.buttonSize;
        this.upButton = this.add.sprite(upXPos, upYPos, 'upbutton');
        this.upButton.height = this.buttonSize;
        this.upButton.width = this.buttonSize;
        this.upButton.alpha = this.buttonAlpha;
        this.upButton.inputEnabled = true;
        this.upButton.fixedToCamera = true;
        this.upButton.events.onInputDown.add(function () { this.up = true; }, this);
        this.upButton.events.onInputUp.add(function () { this.up = false; }, this);
        // End Up button


        //  Some basic controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Exit stuff. Delete when ready
        var exitW = 40;
        var exitH = 28
        var exitXPos = (game.width / 2) - exitW / 2;
        var exitYPos = (gameHeight / 2) - exitH / 2;

        this.exit = this.add.sprite(exitXPos, exitYPos, 'exit');
        this.exit.width = exitW;
        this.exit.height = exitH;
        this.exit.inputEnabled = true;
        this.exit.events.onInputDown.add(this.gameOver, this);
        // End exit stuff
    },
    /**
 * Called by fireButton.onDown
 *
 * @method fire
 */
    fire: function () {

        if (this.bullet.exists) {
            return;
        }

        //  Re-position the bullet where the turret is
        this.bullet.reset(this.turret.x, this.turret.y);

        //  Now work out where the END of the turret is
        var p = new Phaser.Point(this.turret.x, this.turret.y);
        p.rotate(p.x, p.y, this.turret.rotation, false, 34);

        //  And position the flame sprite there
        this.flame.x = p.x;
        this.flame.y = p.y;
        this.flame.alpha = 1;
        this.flame.visible = true;

        //  Boom
        this.add.tween(this.flame).to({ alpha: 0 }, 100, "Linear", true);

        //  So we can see what's going on when the bullet leaves the screen
        this.camera.follow(this.bullet);

        //  Our launch trajectory is based on the angle of the turret and the power
        this.physics.arcade.velocityFromRotation(this.turret.rotation, this.power, this.bullet.body.velocity);

    },

    /**
 * Called by physics.arcade.overlap if the bullet and a target overlap
 *
 * @method hitTarget
 * @param {Phaser.Sprite} bullet - A reference to the bullet (same as this.bullet)
 * @param {Phaser.Sprite} target - The target the bullet hit
 */
    hitTarget: function (bullet, target) {

        target.kill();
        this.removeBullet();

        // Handle score
        this.score += 10;
        this.scoreText.text = 'Score: ' + this.score;
    },

    /**
     * Removes the bullet, stops the camera following and tweens the camera back to the tank.
     * Have put this into its own method as it's called from several places.
     *
     * @method removeBullet
     */
    removeBullet: function () {

        this.bullet.kill();
        this.camera.follow();
        this.add.tween(this.camera).to({ x: 0 }, 1000, "Quint", true, 1000);
    },

    update: function () {

        //  If the bullet is in flight we don't let them control anything
        if (this.bullet.exists) {
            if (this.bullet.y > game.height) {
                //  Simple check to see if it's fallen too low
                this.removeBullet();
            }
            else {
                //  Bullet vs. the Targets
                this.physics.arcade.overlap(this.bullet, this.targets, this.hitTarget, null, this);
            }
        }
        else {
            //  Allow them to set the power between 100 and 500
            if (this.cursors.left.isDown && this.power > 100) {
                this.power -= 2;
            }
            else if (this.cursors.right.isDown && this.power < 500) {
                this.power += 2;
            }

            //  Allow them to set the angle, between -90 (straight up) and 0 (facing to the right)
            if ((this.cursors.up.isDown || this.up == true) && this.turret.angle > -90) {
                this.turret.angle--;
            }
            else if (this.cursors.down.isDown && this.turret.angle < 0) {
                this.turret.angle++;
            }

            //  Update the text
            this.powerText.text = 'Power: ' + this.power;
        }
    },

    gameOver: function () {

        // Clean up resizing world bounds after game is over.
        game.world.setBounds(0, 0, game.width, game.height);
        game.state.start('gameover');
    },
    upClicked: function () {
        this.up = true;
    }
};
