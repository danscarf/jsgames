function regenerateGamepiece(x, y) {
    console.log('callback called: x is ' + this.x + ' and y is ' + this.y);
}

function checkShouldDelete(value) {
    return !value.shouldDelete;
}

function checkIsPlayer(value) {
    return value instanceof Player;
}

function checkIsEnemy(value) {
    return value instanceof Enemy;
}

function rndBetweenTwoNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomDropTime(min, max) {
    var interval = rndBetweenTwoNumbers(min, max);
    return Date.now() + interval;
}

function GamePiece(a) {
    this.varContext = a;
    this.shouldDelete = false;
}
GamePiece.prototype = {
    varContext: null,
    shouldDelete: null,
    init: function ()
    { },
    update: function ()
    { },
    draw: function ()
    { },
    reset: function () {
        this.shouldDelete = true;
    },
    explode: function (callback) {
        var explosion = new Explosion(this.varContext, this.x, this.y, callback);
        explosionList.push(explosion);
        this.shouldDelete = true;
    }
};

function extend(child, supertype) {
    child.prototype.__proto__ = supertype.prototype;
}
extend(Missile, GamePiece);
extend(Player, GamePiece);
extend(Enemy, GamePiece);
extend(Bomb, GamePiece);
extend(Explosion, GamePiece);
extend(PlayerLife, GamePiece);



function Missile(a, b) {
    GamePiece.call(this, a);
    this.varContext = b;
}

Missile.prototype = {
    varContext: null,
    width: PLAYER_MISSILE_WIDTH,
    height: pLAYER_MISSILE_HEIGHT,
    color: MISSILE_COLOR,
    x: null,
    y: null,
    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        this.x += (PLAYER_WIDTH / 2);
        this.y = CANVAS_HEIGHT - PLAYER_HEIGHT;
        playSound('laser');
        // console.log('Missile init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
        this.y -= MISSILE_MOVE_DISTANCE;
        // console.log('Missile update');
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // console.log('Missile draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        // console.log('Missile reset');
    },
    explode: function (callback) {
        GamePiece.prototype.explode.apply(this, arguments);
        // console.log('Missile explode');
    }
};

function Player(a, b) {
    GamePiece.call(this, a);
    this.varContext = b;
}

Player.prototype = {
    varContext: null,
    x: null,
    y: null,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,

    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        // X position of player gamepiece
        this.x = (CANVAS_WIDTH - PLAYER_WIDTH) / 2;
        this.y = CANVAS_HEIGHT - PLAYER_HEIGHT;
        // console.log('Player init');
        playSound('spawn');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
        if (keydown.left) {
            this.x -= PLAYER_MOVE_DISTANCE;
        }

        if (keydown.right) {
            this.x += PLAYER_MOVE_DISTANCE;
        }

        if (playerTouchMove == 1) {
            this.x += PLAYER_MOVE_DISTANCE;
            // Do we continue to move right?
            if (fingerX > ThePlayer.x + PLAYER_WIDTH) {
            }
            else {
                playerTouchMove = 0;
            }
        }

        if (playerTouchMove == -1) {
            this.x -= PLAYER_MOVE_DISTANCE;
            // Do we continue to move right?
            if (fingerX < ThePlayer.x) {
            }
            else {
                playerTouchMove = 0;
            }
        }

        this.x = this.x.clamp(0, CANVAS_WIDTH - PLAYER_WIDTH);

        // Handle missile firing
        // Need to ensure only one laser fire per space key. Otherwise
        // you'd get a continuous stream of lasers when you hold the space down.
        if (keydown.space && bulletJustFired == false) {

            // Limit the total number of missiles on
            // the board at any given time.
            if (missileList.length < MAX_MISSILES) {
                // console.log('Pew!');
                var missile = new Missile(context);
                missile.x = this.x;
                if (missile.init)
                    missile.init();
                missileList.push(missile);
                bulletJustFired = true;
            }
        }
        if (!keydown.space && bulletJustFired == true) {
            bulletJustFired = false;
        }
        // End handle laser firing
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.drawImage(playerImg, this.x, this.y);
        // console.log('Player draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        // console.log('Player reset');
    },
    explode: function () {
        GamePiece.prototype.explode.apply(this, arguments);
        // console.log('Player explode');
    }
};


function Enemy(a, b) {
    GamePiece.call(this, a);
    this.varContext = b;
}

Enemy.prototype = {
    varContext: null,
    y: null,
    x: null,
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    direction: 1,
    bombDropTime: 0,

    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        // X position of Enemy gamepiece
        this.x = ENEMY_WIDTH;
        this.y = 10;

        this.bombDropTime = randomDropTime(500, 1500);
        playSound('spawn');
        // console.log('Enemy init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);

        // Do we need to reverse direction?
        if (this.x + ENEMY_WIDTH > CANVAS_WIDTH
            || this.x < 0) {
            this.direction *= -1;
            this.y += ENEMY_HEIGHT;
        }
        this.x += ENEMY_MOVE_DISTANCE * this.direction;
        // Do all bomb dropping logic here.

        // If there's no room on the board for more bombs, don't
        // even bother.
        if (bombList.length < MAX_BOMBS) {

            // Determine if it's time to drop...
            var current = Date.now();
            if (current >= this.bombDropTime) {
                // console.log('Time to drop a bomb');

                var b = new Bomb(context, this.x, this.y);
                if (b.init)
                    b.init();
                // b.x = this.x;
                bombList.push(b);
                // Finally, set us up next bomb.
                this.bombDropTime = randomDropTime(250, 750);
            }
        }
        // End bomb dropping logic.

        // If enemy has run past the end of the canvas,
        // reset it's Y value to the top of the screen.
        if (this.y > CANVAS_HEIGHT) {
            this.y = 10;
        }
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.drawImage(enemyImg, this.x, this.y);
        // console.log('Enemy draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        // console.log('Enemy reset');
    },
    explode: function () {
        GamePiece.prototype.explode.apply(this, arguments);
        // console.log('Enemy explode');
    }
};


function Bomb(a, b, c) {
    GamePiece.call(this, a);
    this.x = b;
    this.y = c + ENEMY_HEIGHT;
}

Bomb.prototype = {
    varContext: null,
    y: null,
    x: null,
    color: BOMB_COLOR,
    width: BOMB_WIDTH,
    height: BOMB_HEIGHT,

    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        // X position of Bomb gamepiece
        this.x += (ENEMY_WIDTH / 2);
        playSound('bomb');
        // console.log('Bomb init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
        this.y += BOMB_MOVE_DISTANCE;
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // console.log('Bomb draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        // console.log('Bomb reset');
    },
    explode: function () {
        GamePiece.prototype.explode.apply(this, arguments);
        // console.log('Bomb explode');
    }
};



function Explosion(a, b, c, callback) {
    GamePiece.call(this, a);
    this.x = b;
    this.y = c;
    playSound('explosion');
    this.callback = callback;
}

Explosion.prototype = {
    varContext: null,
    width: EXPLOSION_WIDTH,
    height: EXPLOSION_HEIGHT,
    x: null,
    y: null,
    frameInterval: 60,
    frameStartTime: Date.now(),
    frameCount: 17,
    frameIndex: 1,
    spriteWidth: 72,
    spriteIndex: 0,
    callback: null,
    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        this.y = CANVAS_HEIGHT - PLAYER_HEIGHT;
        console.log('Explosion init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);

        // Do explosion animation
        var now = Date.now();
        // Have we displayed the current frame long enouth?
        if (now >= this.frameStartTime + this.frameInterval) {

            // Test whether we're at the last frame.
            // If not, continue.
            if (this.frameIndex <= this.frameCount) {
                this.frameIndex++;
                this.frameStartTime = now;
                this.spriteIndex += this.spriteWidth;
                // console.log('Increment frame');
            } else {
                this.reset();
            }

        }
        // console.log('Explosion update');
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);

        context.drawImage(expImg, this.spriteIndex, 0, this.spriteWidth, 100, this.x, this.y - 25, this.width + 50, this.height + 50);
        // console.log('Explosion draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        this.shouldDelete = true;

        // Call callback here.
        if (typeof (this.callback) == "function") {
            // this.callback(this.x, this.y);
            this.callback();
        }
        // console.log('Explosion reset');
    },
    explode: function () {
        GamePiece.prototype.explode.apply(this, arguments);
        // console.log('Explosion explode');
    }
};


function PlayerLife(a, b, c) {
    GamePiece.call(this, a);
    this.x = b;
    this.y = c;
}

PlayerLife.prototype = {
    varContext: null,
    width: PLAYER_WIDTH / 2,
    height: PLAYER_HEIGHT / 2,
    x: null,
    y: null,

    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.drawImage(playerImg, this.x, this.y, this.width, this.height);
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
    },
    explode: function () {
        GamePiece.prototype.explode.apply(this, arguments);
    }

};


function Star(a, b, c) {
    GamePiece.call(this, a);
    this.x = b;
    this.y = c;;
}

Star.prototype = {
    varContext: null,
    y: null,
    x: null,
    color: STAR_COLOR,
    width: STAR_WIDTH,
    height: STAR_HEIGHT,

    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        // X position of Star gamepiece
        this.x += (ENEMY_WIDTH / 2);
        // console.log('Star init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
        this.y += STAR_MOVE_DISTANCE;
        if (this.y > CANVAS_HEIGHT) {
            this.reset();
        }
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // console.log('Star draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        this.shouldDelete = true;
        // console.log('Star reset');
    },
};

