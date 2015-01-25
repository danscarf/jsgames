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

function Missile(a, b) {
    GamePiece.call(this, a);
    this.varContext = b;
}

Missile.prototype = {
    varContext: null,
    width: PLAYER_MISSILE_WIDTH,
    height: pLAYER_MISSILE_HEIGHT,
    color: MISSILE_COLOR,
    missileX: null,
    missileY: null,
    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        this.missileX = PLAYER_CURRENT_POSITION + (PLAYER_WIDTH / 2);
        this.missileY = CANVAS_HEIGHT - PLAYER_HEIGHT;
        // console.log('Missile init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
        this.missileY -= 7;
        // console.log('Missile update');
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.fillStyle = this.color;
        context.fillRect(this.missileX, this.missileY, this.width, this.height);
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
    y: null,
    color: PLAYER_COLOR,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,


    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        // X position of player gamepiece
        PLAYER_CURRENT_POSITION = PLAYER_START_POSITION;
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
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.fillStyle = this.color;
        context.fillRect(PLAYER_CURRENT_POSITION, this.y, this.width, this.height);
        // console.log('Player draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        // console.log('Player reset');
    }
};
