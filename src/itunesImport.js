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

App.on('import_from_itunes',function(path){

  'use strict';
  console.log('importing', path)

  var itunesDB = require("itunes-db").loadSync(path)
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

})
