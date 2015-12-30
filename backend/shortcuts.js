const ipcMain = require('electron').ipcMain;

module.exports = function(contents){
  var globalShortcut = require('global-shortcut');

  // Register a 'ctrl+x' shortcut listener.
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
