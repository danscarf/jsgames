var context;
var canvas;
var FPS = 30;
var setIntervalId;
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var PLAYER_MOVE_DISTANCE = 3;
var PLAYER_START_POSITION = 100;


var textX = 50;
var textY = 50;

// Global objectList array to hold all game objects.
var objectList = null;

$(document).ready(function () {
    console.log("ready!");


    $("#Start").click(
        function() {
            console.log("Game started");
            canvas = $("#Gamefield").get(0);
            context = canvas.getContext("2d");

            // Build the object list
            objectList = [];
            objectList.push(new Missile(context));

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
        });//$("#Reset").click(


});//$(document).ready(function () {


function update() {
    textX +=1;
    textY += 1;

    if (keydown.left) {
        player.x -= PLAYER_MOVE_DISTANCE;
    }

    if (keydown.right) {
        player.x += PLAYER_MOVE_DISTANCE;
    }
}

function draw() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //context.fillStyle = "#000"; // Set color to black
    //context.fillText("Sup Bro!", textX, textY);
    player.draw();
}



var player = {
    color: "#FF0000",
    x: PLAYER_START_POSITION,
    y: 139,
    width: 15,
    height: 10,
    draw: function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};


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
