// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);



        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var pixelRatio = window.devicePixelRatio || 1;
        // alert(windowWidth * pixelRatio);// We know this works so comment it out.
        $("#gamecontainer").hide();
        $("#aboutcontainer").hide();

        $("#startbutton").click(function () {
            StartButtonClicked();
        });
        $("#resetbutton").click(function () {
            ResetButtonClicked();
        });
        $("#aboutbutton").click(function () {
            AboutButtonClicked();
        });

        $("#returnbutton").click(function () {
            ReturnButtonClicked();
        });

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();


function StartButtonClicked() {
    $("#startcontainer").hide();
    $("#gamecontainer").show();
}

function ResetButtonClicked() {
    $("#gamecontainer").hide();
    $("#startcontainer").show();
}

function AboutButtonClicked() {
    $("#startcontainer").hide();
    $("#aboutcontainer").show();
}

function ReturnButtonClicked() {
    $("#aboutcontainer").hide();
    $("#startcontainer").show();

}