
'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
    this.load.image('bullet', 'assets/games/asteroids/bullets.png');
    this.load.image('ship', 'assets/games/asteroids/ship.png');

  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

