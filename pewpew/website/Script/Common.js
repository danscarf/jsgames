
// Global objectList array to hold all game objects.
var objectList = null;

$(document).ready(function () {
    console.log("ready!");


    $("#Start").click(
        function () {
            console.log("Game started");
            canvas = $("#Gamefield").get(0);
            context = canvas.getContext("2d");

            // Build the object list
            objectList = [];
            objectList.push(new Missile(context));
            objectList.push(new Player(context));

            for (x in objectList) {
                if (objectList[x].init)
                    objectList[x].init();
            }


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
});//$(document).ready(function () {


function update() {
    //textX +=1;
    //textY += 1;
    for (x in objectList) {
        if (objectList[x].update)
            objectList[x].update();
    }


    // Handle laser firing
    // Need to ensure only one laser fire per space key. Otherwise
    // you'd get a continuous stream of lasers when you hold the space down.
    if (keydown.space && bulletJustFired == false) {
        console.log('Pew!');

        bulletJustFired = true;
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
