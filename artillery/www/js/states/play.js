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

        game.renderer.renderSession.roundPixels = true;

        game.world.setBounds(0, 0, game.width * 2, game.height);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 200;

    },
    create: function () {

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
        var fbYPos = (gameHeight * .6) - this.buttonSize;
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

        // Down button
        var downXPos = (game.width * .15) - this.buttonSize;
        var downYPos = (gameHeight * .7) - this.buttonSize;
        this.downButton = this.add.sprite(downXPos, downYPos, 'downbutton');
        this.downButton.height = this.buttonSize;
        this.downButton.width = this.buttonSize;
        this.downButton.alpha = this.buttonAlpha;
        this.downButton.inputEnabled = true;
        this.downButton.fixedToCamera = true;
        this.downButton.events.onInputDown.add(function () { this.down = true; }, this);
        this.downButton.events.onInputUp.add(function () { this.down = false; }, this);
        // End Down button

        // Left button
        var leftXPos = (game.width * .1) - this.buttonSize;
        var leftYPos = (gameHeight * .6) - this.buttonSize;
        this.leftButton = this.add.sprite(leftXPos, leftYPos, 'leftbutton');
        this.leftButton.height = this.buttonSize;
        this.leftButton.width = this.buttonSize;
        this.leftButton.alpha = this.buttonAlpha;
        this.leftButton.inputEnabled = true;
        this.leftButton.fixedToCamera = true;
        this.leftButton.events.onInputDown.add(function () { this.left = true; }, this);
        this.leftButton.events.onInputUp.add(function () { this.left = false; }, this);
        // End Left button

        // Right button
        var rightXPos = (game.width * .2) - this.buttonSize;
        var rightYPos = (gameHeight * .6) - this.buttonSize;
        this.rightButton = this.add.sprite(rightXPos, rightYPos, 'rightbutton');
        this.rightButton.height = this.buttonSize;
        this.rightButton.width = this.buttonSize;
        this.rightButton.alpha = this.buttonAlpha;
        this.rightButton.inputEnabled = true;
        this.rightButton.fixedToCamera = true;
        this.rightButton.events.onInputDown.add(function () { this.right = true; }, this);
        this.rightButton.events.onInputUp.add(function () { this.right = false; }, this);
        // Right Left button

        // Exit stuff. Delete when ready
        var exitW = 40;
        var exitH = 28
        var exitXPos = game.width - exitW - (game.width * .05);
        var exitYPos = (gameHeight * .3) - exitH;

        this.exit = this.add.sprite(exitXPos, exitYPos, 'exit');
        this.exit.width = exitW;
        this.exit.height = exitH;
        this.exit.inputEnabled = true;
        this.exit.fixedToCamera = true;
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
            if (this.left == true && this.power > 100) {
                this.power -= 2;
            }
            else if (this.right == true && this.power < 500) {
                this.power += 2;
            }

            //  Allow them to set the angle, between -90 (straight up) and 0 (facing to the right)
            if (this.up == true && this.turret.angle > -90) {
                this.turret.angle--;
            }
            else if (this.down == true && this.turret.angle < 0) {
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
