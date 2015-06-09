// Global enemyList arrays to hold all game objects.
var enemyList = null;
var missileList = null;
var bombList = null;
var explosionList = null;
var objectList = null;
var playerLivesList = null;


var score = 0;
var scoreIncrement = 50;

// Only one player at a time in the game.
// Store it in its own var.
var ThePlayer = null;

var expImg = null;
var enemyImg = null;
var playerImg = null;


var context;
var canvas;
var FPS = 30;
var setIntervalId;
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var PLAYER_MOVE_DISTANCE = 5;

// Used to slow movement based on touch/drag.
// This gets set to:
// 1 when a RIGHT touch/drag is detected.
// -1 when a LEFT touch/drag is detected.
// Then it's used by ThePlayer's update method to
// determine if it should move. Upon movement,
// the update method retrns the value to 0, allowing
// the touch detection code to fire again.
var playerTouchMove = 0;

// Used to keep general track of whether
// a touch or slide is in progress on the game canvas.
var isTouchInProgress = 0;

var fingerX = 0;


var NUM_PLAYERS = 3;

var PLAYER_WIDTH = 30;
var PLAYER_HEIGHT = 20;

var numPlayersRemaining = 0;

var MISSILE_COLOR = "#00FF00";// Green

var ENEMY_WIDTH = 30;
var ENEMY_HEIGHT = 20;
var ENEMY_MOVE_DISTANCE = 5;


var EXPLOSION_WIDTH = 30;
var EXPLOSION_HEIGHT = 20;



var PLAYER_MISSILE_WIDTH = 2;
var pLAYER_MISSILE_HEIGHT =6;
var MAX_MISSILES = 3;
var MISSILE_MOVE_DISTANCE = 7;


var textX = 50;
var textY = 50;


var bulletJustFired = false;

var BOMB_COLOR = "#FFFFFF";
var BOMB_WIDTH = 2;
var BOMB_HEIGHT = 6;
var MAX_BOMBS = 10;
var BOMB_MOVE_DISTANCE = 14;
