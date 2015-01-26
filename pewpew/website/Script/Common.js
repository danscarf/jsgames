
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




$(document).ready(function () {
    $("#Start").click(
        function () {
            console.log("Game started");
            canvas = $("#Gamefield").get(0);
            context = canvas.getContext("2d");

            // Build the object list
            objectList = [];
            objectList.push(new Player(context));
            objectList.push(new Enemy(context));

            for (x in objectList) {
                if (objectList[x].init)
                    objectList[x].init();
            }

            // Build the missileList list
            missileList = [];

            // Build the bombList list
            bombList = [];

            setIntervalId = setInterval(function () {
                update();
                draw();
            }, 1000 / FPS);
        });//$("#Start").click(


    $("#Reset").click(
        function () {
            console.log("Game reset");
            clearInterval(setIntervalId);
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            for (x in objectList) {
                if (objectList[x].reset)
                    objectList[x].reset();
            }
            objectList = null;
            bulletJustFired = false;
        });//$("#Reset").click(

    console.log("ready!");
});//$(document).ready(function () {


function update() {
    //textX +=1;
    //textY += 1;
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
            missileList.shift();
            // console.log('Found out of bounds missile');
        }
        else if (missileList[m].update)
            missileList[m].update();
    }
    // End missile movement handling

    // Handle enemy bombs
    for (b in bombList) {
        if (bombList[b].y && bombList[b].y > CANVAS_HEIGHT) {
            if (bombList[b].reset)
                bombList[b].reset();
            bombList.shift();
        }
        else if (bombList[b].update)
            bombList[b].update();
    }
    // End handling enemy bombs

    // Handle collisions

    //Bombs and Player
    //for (b in bombList) {
    //    if (collides(b, pla))
    //}

    //Missiles and Enemy

    // are the Enemy and Player colliding?



    //playerBullets.forEach(function (bullet) {
    //    enemies.forEach(function (enemy) {
    //        if (collides(bullet, enemy)) {
    //            enemy.explode();
    //            bullet.active = false;
    //        }
    //    });
    //});

    //enemies.forEach(function (enemy) {
    //    if (collides(enemy, player)) {
    //        enemy.explode();
    //        player.explode();
    //    }
    //});
    // End handling collisions

}

function draw() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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

