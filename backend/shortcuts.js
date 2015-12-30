var ipcMain = require('electron').ipcMain;
var globalShortcut = require('global-shortcut');

module.exports.start = function(contents){
  // Clean Slate
  globalShortcut.unregisterAll();

  var ret = globalShortcut.register('MediaPlayPause', function() {
    contents.send('trigger', 'play_pause');
  })
  var ret = globalShortcut.register('MediaNextTrack', function() {
    contents.send('trigger', 'play_next');
  })
  var ret = globalShortcut.register('MediaPreviousTrack', function() {
    contents.send('trigger', 'play_prev');
  })
  if (!ret)
    console.log('registerion fails');
}
module.exports.stop = function(){
  globalShortcut.unregisterAll();
}
