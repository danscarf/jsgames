/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * <pre>
 * (x * 255).clamp(0, 255)
 * </pre>
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function (min, max) {
    return Math.min(Math.max(this, min), max);
};



function isReal(obj) {
    return obj && obj !== "null" && obj !== "undefined";
}


function collides(a, b) {
    if (typeof a === "undefined" || typeof b === "undefined")
        return false;
    else
        return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function gameOver() {
    console.log("Game reset");
    clearInterval(setIntervalId);
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (x in objectList) {
        if (objectList[x].reset)
            objectList[x].reset();
    }
    objectList = null;
    bulletJustFired = false;

    ENEMY_MOVE_DISTANCE = 5;

    // Enable start button
    $("#Start").removeClass("disabled");
    // disable reset button
    $("#Reset").addClass("disabled");
}

$(document).ready(function () {
    expImg = new Image();
    expImg.src = "/images/explosionspritesheet.gif";

    enemyImg = new Image();
    enemyImg.src = "/images/UFO.gif";

    playerImg = new Image();
    playerImg.src = "/images/tank_small.gif";


    $("#Reset").addClass("disabled");

    $("#Start").click(
        function () {
            console.log("Game started");
            canvas = $("#Gamefield").get(0);
            context = canvas.getContext("2d");

            // Build the object list
            objectList = [];
            // objectList.push(new Player(context));
            objectList.push(new Enemy(context));

            ThePlayer = new Player(context);
            ThePlayer.init();

            for (x in objectList) {
                if (objectList[x].init)
                    objectList[x].init();
            }

            // Build the missileList list
            missileList = [];

            // Build the bombList list
            bombList = [];

            // Build the explosionList list
            explosionList = [];

            // Main game loop
            setIntervalId = setInterval(function () {
                update();
                draw();
            }, 1000 / FPS);

            // Disable start button
            $("#Start").addClass("disabled");
            // Enable reset button
            $("#Reset").removeClass("disabled");

        });//$("#Start").click(


    $("#Reset").click(
        function () {
            gameOver();
        });//$("#Reset").click(

    console.log("ready!");
});//$(document).ready(function () {


function update() {
    //textX +=1;
    //textY += 1;

    if (isReal(ThePlayer) && ThePlayer.update)
        ThePlayer.update();

    for (x in objectList) {
        if (objectList[x].update)
            objectList[x].update();
    }

    // Handle player missile movement by checking to see if
    // the highest missile has reached the upper bounds and
    // needs to be removed.
    for (m in missileList) {
        if (missileList[m].y && missileList[m].y <= 0) {
            if (missileList[m].reset)
                missileList[m].reset();
            // console.log('Found out of bounds missile');
        }
        else if (missileList[m].update)
            missileList[m].update();
    }
    missileList = missileList.filter(checkShouldDelete);
    // End missile movement handling

    // Handle enemy bombs
    for (b in bombList) {
        if (bombList[b].y && bombList[b].y > CANVAS_HEIGHT) {
            if (bombList[b].reset)
                bombList[b].reset();
        }
        else if (bombList[b].update)
            bombList[b].update();
    }
    bombList = bombList.filter(checkShouldDelete);

    // End handling enemy bombs

    // Handle collisions

    /*
    //Bombs and Player
    //
    // Check to see if there is a bomb in flight
    if (bombList.length > 0) {
        objectList.forEach(function (o) {
            if (collides(o, bombList[0])) {
                // console.log('Bomb collision detected!');
                bombList[0].shouldDelete = true;
                if (objectList[0].explode)
                    objectList[0].explode(function () {
                        // Add new player after the old one is done exploding
                        var p = new Player();
                        p.init();
                        objectList.push(p);
                    });
            }
        });
    }
    */

    //Bombs and Player
    //
    // Check to see if there is a bomb in flight
    if (bombList.length > 0 && isReal(ThePlayer)) {
        if (collides(bombList[0], ThePlayer)) {
            bombList[0].shouldDelete = true;
            if (ThePlayer.explode)
                ThePlayer.explode(function () {
                    var p = new Player();
                    p.init();
                    ThePlayer = p;
                });
        }

    }

    bombList = bombList.filter(checkShouldDelete);
    // End bombs and Player

    // Missiles and Enemy
    //
    // Check to see if there is a missile in flight
    if (missileList.length > 0) {
        objectList.forEach(function (o) {
            missileList.forEach(function (m) {
                if (collides(o, m)) {
                    // console.log('Missile collision detected!');
                    m.shouldDelete = true;
                    if (o.explode)
                        o.explode(function () {
                            if (objectList.filter(checkIsEnemy).length < 1) {
                                ENEMY_MOVE_DISTANCE += 1;
                                // Add new enemy after the old one is done exploding
                                var e = new Enemy();
                                e.init();
                                objectList.push(e);
                            }
                        });
                    // console.log('Run me after explosion is complete.');

                }
                // Have we blown up the last enemy? If so,
                // add a new one.
                //if (objectList.filter(checkIsEnemy).length < 1) {
                //    ENEMY_MOVE_DISTANCE += 1;
                //    var e = new Enemy();
                //    e.init();
                //    objectList.push(e);
                //}
            });
        });
        missileList = missileList.filter(checkShouldDelete);
    }
    // End missiles and Enemy



    // are the Enemy and Player colliding?
    // HACK! HACK! This will only work because:
    // 1. Only using one enemy and
    // 2. Storing enemy and player in the same objectlist array
    if (collides(objectList[0], objectList[1])) {
        // console.log('Player/enemy collision detected!');
        if (objectList[0].explode)
            objectList[0].explode(function () {
                // Add new player after the old one is done exploding
                var p = new Player();
                p.init();
                objectList.push(p);
            });
        if (objectList[1].explode)
            objectList[1].explode(function () {
                // Add new enemy after the old one is done exploding
                var e = new Enemy();
                e.init();
                objectList.push(e);
            });
    }

    objectList = objectList.filter(checkShouldDelete);

    if (isReal(ThePlayer) && ThePlayer.shouldDelete)
        ThePlayer = null;

    // End handling collisions

    for (e in explosionList) {
        if (explosionList[e].update)
            explosionList[e].update();
    }
    explosionList = explosionList.filter(checkShouldDelete);
}

function draw() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (isReal(ThePlayer) && ThePlayer.draw)
        ThePlayer.draw();

    for (x in objectList) {
        if (objectList[x].draw)
            objectList[x].draw();
    }

    for (m in missileList) {
        if (missileList[m].draw)
            missileList[m].draw();
    }

    for (b in bombList) {
        if (bombList[b].draw)
            bombList[b].draw();
    }

    for (e in explosionList) {
        if (explosionList[e].draw)
            explosionList[e].draw();
    }

}

$(function () {
    window.keydown = {};
    function keyName(event) {
        return hotkeys.specialKeys[event.which] ||
          String.fromCharCode(event.which).toLowerCase();
    }

    $(document).bind("keydown", function (event) {
        keydown[keyName(event)] = true;
    });

    $(document).bind("keyup", function (event) {
        keydown[keyName(event)] = false;
    });
});
