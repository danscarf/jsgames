// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var pixelRatio = window.devicePixelRatio || 1;
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
        gameOver();
        var scope = angular.element($("body")).scope();
        scope.$apply(function () {
            scope.uiState = 'splash';
        })
        console.log('onPause()');
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
        gameOver();
        var scope = angular.element($("body")).scope();
        scope.$apply(function () {
            scope.uiState = 'splash';
        })
        console.log('onResume()');
    };
})();

var pewpewApp = angular.module('pewpewApp', []);
pewpewApp.controller('PewPewCtrl', function ($scope) {
    $scope.uiState = 'splash';

    $scope.gameWidth = window.innerWidth;
    $scope.gameHeight = window.innerHeight;

    $scope.startGame = function () {
        $scope.uiState = 'game';
        // Start the game externally
        StartNewGame($scope.gameHeight, $scope.gameWidth);
    };
});

function StartNewGame(height, width) {

    CANVAS_WIDTH = width;
    CANVAS_HEIGHT = height;

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

    canvas.addEventListener('touchstart',
         function (e) {
             if (isTouchInProgress == 0) {
                 isTouchInProgress = 1;
                 // console.log('touchstart: isTouchInProgress = 1;');
             }
             if (playerTouchMove == 0 && e.targetTouches && e.targetTouches.length == 1) {
                 var touch = e.targetTouches[0];
                 if (isReal(ThePlayer)) {
                     fingerX = touch.pageX;
                     setPlayerMovement(fingerX);
                 }
             }
         }
        , false);


    canvas.addEventListener('touchmove',
         function (e) {
             // console.log('touchmove');
             if (isTouchInProgress == 0) {
                 isTouchInProgress = 1;
                 // console.log('touchmove: isTouchInProgress = 1;');
             }
             if (playerTouchMove == 0 && e.targetTouches && e.targetTouches.length == 1) {
                 var touch = e.targetTouches[0];
                 if (isReal(ThePlayer)) {
                     fingerX = touch.pageX;
                     setPlayerMovement(fingerX);
                 }
             }
         }
        , false);


    function setPlayerMovement(x) {
        // console.log('setPlayerMovement(x); ' + x);
        if (x > ThePlayer.x + PLAYER_WIDTH/2) {
            playerTouchMove = 1;
            // console.log('playerTouchMove = 1;');
        }
        if (x < ThePlayer.x + PLAYER_WIDTH/2) {
            playerTouchMove = -1;
            // console.log('playerTouchMove = -1;');
        }
    }
    canvas.addEventListener('touchend',
         function (e) {
             if (isTouchInProgress == 1) {
                 isTouchInProgress = 0;
                 playerTouchMove = 0;
                 // console.log('touchend: isTouchInProgress = 0;');
             }
         }
        , false);

    canvas.addEventListener('touchcancel',
     function (e) {
         if (isTouchInProgress == 1) {
             isTouchInProgress = 0;
             // console.log('touchcancel: isTouchInProgress = 0;');
         }
     }
    , false);
}
