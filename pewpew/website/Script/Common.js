
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

            for (x in objectList) {
                if (objectList[x].init)
                    objectList[x].init();
            }

            // Build the missileList list
            missileList = [];



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

    for (m in missileList) {
        if (missileList[m].missileY && missileList[m].missileY <= 0) {
            if (missileList[m].reset)
                missileList[m].reset();
            missileList.shift();
            // console.log('Found out of bounds missile');
        }
        else if (missileList[m].update)
            missileList[m].update();
    }


    // Handle laser firing
    // Need to ensure only one laser fire per space key. Otherwise
    // you'd get a continuous stream of lasers when you hold the space down.
    if (keydown.space && bulletJustFired == false) {

        // Limit the total number of missiles on
        // the board at any given time.
        if (missileList.length < 2) {
            // console.log('Pew!');
            var missile = new Missile(context);
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

