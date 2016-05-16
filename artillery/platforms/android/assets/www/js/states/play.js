'use strict';
function Play() {

    this.tank = null;
    this.turret = null;
    this.flame = null;
    this.bullet = null;
    this.exit = null;

    this.background = null;
    this.targets = null;

    this.textStyle = new Object({ font: "18px Arial", fill: "#ffffff" });

    this.power = null;
    this.powerText = null;

    this.cursors = null;
    this.fireButton = null;

    this.score = 0;
    this.scoreText = null;
}
Play.prototype = {
    init: function () {

        // console.log('play.init() called.');
        game.renderer.renderSession.roundPixels = true;

        // game.world.setBounds(0, 0, 992, 480);

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

        //  Used to display the power of the shot
        this.power = 300;
        this.powerText = this.add.text(8, 8, 'Power: 300', this.textStyle);
        this.powerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.powerText.fixedToCamera = true;

        // Display the score
        this.score = 0;
        this.scoreText = this.add.text(0, 8, 'Score: ' + this.score, this.textStyle);
        this.scoreText.x = game.width - this.scoreText.width - 42;
        this.powerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.powerText.fixedToCamera = true;

        // Fire button
        var fbSize = 50;
        var fbXPos = (game.width * .95) - fbSize;
        var fbYPos = (gameHeight * .95) - fbSize;
        this.fireButton = this.add.sprite(fbXPos, fbYPos, 'firebutton');
        this.fireButton.height = fbSize;
        this.fireButton.width = fbSize;
        this.fireButton.inputEnabled = true;
        this.fireButton.events.onInputDown.add(this.fire, this);

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
            //  Allow them to set the power between 100 and 600
            if (this.cursors.left.isDown && this.power > 100) {
                this.power -= 2;
            }
            else if (this.cursors.right.isDown && this.power < 600) {
                this.power += 2;
            }

            //  Allow them to set the angle, between -90 (straight up) and 0 (facing to the right)
            if (this.cursors.up.isDown && this.turret.angle > -90) {
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
    }
};
