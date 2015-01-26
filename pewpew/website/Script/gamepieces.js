function randomDropTime(min, max) {
    var interval = Math.floor(Math.random() * (max - min + 1) + min);
    return Date.now() + interval;
}

function collides(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function GamePiece(a) {
    this.varContext = a;
}
GamePiece.prototype = {
    varContext: null,
    init: function ()
    { },
    update: function ()
    { },
    draw: function ()
    { },
    reset: function ()
    { },
};

function extend(child, supertype) {
    child.prototype.__proto__ = supertype.prototype;
}
extend(Missile, GamePiece);
extend(Player, GamePiece);
extend(Enemy, GamePiece);


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
        this.x = PLAYER_CURRENT_POSITION + (PLAYER_WIDTH / 2);
        this.y = CANVAS_HEIGHT - PLAYER_HEIGHT;
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
    color: PLAYER_COLOR,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,


    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        // X position of player gamepiece
        PLAYER_CURRENT_POSITION = (CANVAS_WIDTH - PLAYER_WIDTH) / 2;
        this.x = PLAYER_CURRENT_POSITION;
        this.y = CANVAS_HEIGHT - PLAYER_HEIGHT;

        console.log('Player init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
        if (keydown.left) {
            PLAYER_CURRENT_POSITION -= PLAYER_MOVE_DISTANCE;
        }

        if (keydown.right) {
            PLAYER_CURRENT_POSITION += PLAYER_MOVE_DISTANCE;
        }

        PLAYER_CURRENT_POSITION = PLAYER_CURRENT_POSITION.clamp(0, CANVAS_WIDTH - PLAYER_WIDTH);
        this.x = PLAYER_CURRENT_POSITION;
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // console.log('Player draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        // console.log('Player reset');
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
    color: ENEMY_COLOR,
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    direction: 1,
    bombDropTime: 0,

    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        // X position of Enemy gamepiece
        ENEMY_CURRENT_POSITION = (CANVAS_WIDTH - ENEMY_WIDTH) / 2;
        this.x = ENEMY_CURRENT_POSITION;
        this.y = 10;

        this.bombDropTime = randomDropTime(500, 1500);

        console.log('Enemy init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);

        // Do we need to reverse direction?
        if (ENEMY_CURRENT_POSITION + ENEMY_WIDTH > CANVAS_WIDTH
            || ENEMY_CURRENT_POSITION < 0) {
            this.direction *= -1;
            this.y += ENEMY_HEIGHT;
        }
        ENEMY_CURRENT_POSITION += ENEMY_MOVE_DISTANCE * this.direction;
        this.x = ENEMY_CURRENT_POSITION;
        // Do all bomb dropping logic here.

        // If there's no room on the board for more bombs, don't
        // even bother.
        if (bombList.length < MAX_BOMBS) {

            // Determine if it's time to drop...
            var current = Date.now();
            if (current >= this.bombDropTime) {
                // console.log('Time to drop a bomb');

                var b = new Bomb(context, this.y);
                if (b.init)
                    b.init();
                b.x = this.x;
                bombList.push(b);
                // Finally, set up for the next bomb.
                this.bombDropTime = randomDropTime(250, 750);
            }
        }
        // End bomb dropping logic.
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // console.log('Enemy draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        // console.log('Enemy reset');
    }
};









function Bomb(a, b) {
    GamePiece.call(this, a);
    // this.varContext = b;
    this.y = b + ENEMY_HEIGHT;
}

Bomb.prototype = {
    varContext: null,
    y: null,
    x: null,
    color: BOMB_COLOR,
    width: BOMB_WIDTH,
    height: BOMB_HEIGHT,
    direction: 1,

    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        // X position of Bomb gamepiece
        this.x = ENEMY_CURRENT_POSITION + (ENEMY_WIDTH / 2);
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
    }
};

