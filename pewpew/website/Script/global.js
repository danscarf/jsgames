// Global objectList arrays to hold all game objects.
var objectList = null;
var missileList = null;

var context;
var canvas;
var FPS = 30;
var setIntervalId;
var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var PLAYER_MOVE_DISTANCE = 5;
var PLAYER_START_POSITION = 100;
var PLAYER_CURRENT_POSITION;

var PLAYER_WIDTH = 15;
var PLAYER_HEIGHT = 10;

var PLAYER_COLOR = "#FF0000";
var MISSILE_COLOR = "#00FF00";


var PLAYER_MISSILE_WIDTH = 1;
var pLAYER_MISSILE_HEIGHT =4;


var textX = 50;
var textY = 50;


var bulletJustFired = false;