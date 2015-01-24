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
    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        console.log('Missile init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
        // console.log('Missile update');
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        // console.log('Missile draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        console.log('Missile reset');
    }
};

function Player(a, b) {
    GamePiece.call(this, a);
    this.varContext = b;
}

Player.prototype = {
    varContext: null,

    // X position of player gamepiece
    x : PLAYER_START_POSITION,
    color : "#FF0000",
    y : 139,
    width : 15,
    height : 10,


    init: function () {
        GamePiece.prototype.init.apply(this, arguments);
        console.log('Player init');
    },
    update: function () {
        GamePiece.prototype.update.apply(this, arguments);
        if (keydown.left) {
            this.x -= PLAYER_MOVE_DISTANCE;
        }

        if (keydown.right) {
            this.x += PLAYER_MOVE_DISTANCE;
        }
    },
    draw: function () {
        GamePiece.prototype.draw.apply(this, arguments);
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        // console.log('Player draw');
    },
    reset: function () {
        GamePiece.prototype.reset.apply(this, arguments);
        console.log('Player reset');
    }
};
