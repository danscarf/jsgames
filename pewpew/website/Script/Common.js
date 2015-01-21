var context;
var canvas;
var FPS = 30;
var setIntervalId;
var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;




var textX = 50;
var textY = 50;



$(document).ready(function () {
    console.log("ready!");


    $("#Start").click(
        function() {
            console.log("Game started");
            canvas = $("#Gamefield").get(0);
            context = canvas.getContext("2d");



            setIntervalId = setInterval(function () {
                update();
                draw();
            }, 1000 / FPS);



        });//$("#Start").click(


    $("#Reset").click(
        function () {
            console.log("Game reset");
            clearInterval(setIntervalId);
        });//$("#Reset").click(


});//$(document).ready(function () {


function update() {
    textX +=1;
    textY += 1;
}

function draw() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.fillStyle = "#000"; // Set color to black
    context.fillText("Sup Bro!", textX, textY);
    player.draw();
}



var player = {
    color: "#FF0000",
    x: 100,
    y: 130,
    width: 20,
    height: 20,
    draw: function () {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
};


$(function () {
    window.keydown = {};

    function keyName(event) {
        return jQuery.hotkeys.specialKeys[event.which] ||
          String.fromCharCode(event.which).toLowerCase();
    }

    $(document).bind("keydown", function (event) {
        keydown[keyName(event)] = true;
    });

    $(document).bind("keyup", function (event) {
        keydown[keyName(event)] = false;
    });
});
