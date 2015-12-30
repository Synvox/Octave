riot = require('riot');
$ = require('jquery');

// Main event store
App = riot.observable()

// Pouch database
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
db = new PouchDB('OctaveDB');

// Import
// Artist: "O'Donnell/Salvatori TotalAudio"
// Bit Rate: 128
// Comments: " 00000236 00000000 00000754 00000000 00015FD5 00000000 00005ED0 00000000 00015FA7 00000000"
// Date Added: "2015-11-15T03:02:33Z"
// Date Modified: "2015-11-15T04:11:31Z"
// File Folder Count: 5
// Genre: "Soundtrack"
// Kind: "MPEG audio file"
// Library Folder Count: 1
// Location: "file:///Users/ryan/Music/iTunes/iTunes%20Media/Music/O'Donnell_Salvatori%20TotalAudio/Unknown%20Album/_Halo_.mp3"
// Name: ""Halo""
// Persistent ID: "7ADB397101A2FC4A"
// Sample Rate: 44100
// Size: 2912881
// Skip Count: 1
// Skip Date: "2015-12-11T07:35:28Z"
// Total Time: 181995
// Track ID: 9667
// Track Type: "File"
// Year: 1999
window.setTimeout(function(){
  'use strict';
  var getuser = function() {
  	var username = require('child_process').execSync( "whoami", { encoding: 'utf8', timeout: 1000 } );
  	return String(username).trim();
  }
  var os = require('os')
  var xmllocation = "/Users/"+(getuser())+"/Music/iTunes/iTunes Music Library.xml";
  console.log(xmllocation)
  var itunesDB = require("itunes-db").loadSync(xmllocation)
  var tracks = itunesDB.tracks

  db.allDocs({
    include_docs: true,
    attachments: false
  }).then(function (result) {
    App.initDocs = result;

    for(var i in tracks)
      if (tracks[i].Name && tracks[i].Location)
        add(result,tracks[i])

  }).catch(function (err) {
    console.log(err);
  });

  function add(docs,track) {
    for (let i in docs.rows)
      if (docs.rows[i].doc.location === track.Location)
        return; // Found and exit.

    db.post({
      name: track.Name,
      album: track.Album,
      artist: track.Artist,
      location: track.Location,
      trackNumber: track['Track Number']
    }).then(function(added){
      console.log('Added',added)
    }).catch(function(e){
      console.log(e)
    })
  }

},1000);

// var electron = require('electron');
// var globalShortcut = electron.globalShortcut;
// var ret = globalShortcut.register('mediaplaypause', function() {
//   App.trigger('play_pause');
// });


// shortcut = new Shortcut('mediaplaypause');
// shortcut.on('active', function() { App.trigger('play_pause') });
// shortcut.on('failed', function() { console.log("failed"); });
// shortcut.register();

require('electron').ipcRenderer.on('trigger', function(event, message) {
  App.trigger(message);
});
