// Global objectList arrays to hold all game objects.
var objectList = null;
var missileList = null;
var bombList = null;

var context;
var canvas;
var FPS = 30;
var setIntervalId;
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var PLAYER_MOVE_DISTANCE = 5;

// Used for missile launching.
// Figure out how to get rid
// of this variable.
// var PLAYER_CURRENT_POSITION;

var PLAYER_WIDTH = 30;
var PLAYER_HEIGHT = 20;

var PLAYER_COLOR = "#FF0000";
var MISSILE_COLOR = "#00FF00";
var ENEMY_COLOR = "#FFFF00";

var ENEMY_WIDTH = 30;
var ENEMY_HEIGHT = 20;
var ENEMY_MOVE_DISTANCE = 5;

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


