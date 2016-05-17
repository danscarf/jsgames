/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var height, width = 0;
var game;
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    //quitApp: function(){
    //    navigator.app.exitApp();
    //},

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        // app.receivedEvent('deviceready');
        // height = $(window).height();
        // width = $(window).width();
        //document.addEventListener('pause', this.quitApp, false);
        height = window.screen.height;
        width = window.screen.width;

        // var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
        game = new Phaser.Game(width, height, Phaser.AUTO, 'artillery');

        // Game States
        game.state.add('boot', Boot);
        game.state.add('gameover', GameOver);
        game.state.add('menu', Menu);
        game.state.add('play', Play);
        game.state.add('preload', Preload);
        game.state.add('scores', Scores);

        game.state.start('boot');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function preload() {
    console.log('preload');
}

function create() {
    console.log('create');
}

function update() {
}

app.initialize();