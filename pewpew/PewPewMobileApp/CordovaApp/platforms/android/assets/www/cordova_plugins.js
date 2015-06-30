cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-nativeaudio/www/nativeaudio.js",
        "id": "cordova-plugin-nativeaudio.nativeaudio",
        "clobbers": [
            "window.plugins.NativeAudio"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-nativeaudio": "3.0.3"
}
// BOTTOM OF METADATA
});