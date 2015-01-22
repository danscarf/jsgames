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

function Missile(a, b) {
    GamePiece.call(this, a);
    this.varMissile = b;

    //var inFlight;
    //var hPosition;
    //var vPosition;
    //var ceiling;
}
Missile.prototype = {
    varMissile: null,
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
