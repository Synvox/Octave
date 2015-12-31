riot = require('riot');
$ = require('jquery');

// Main event store
App = riot.observable()

// Pouch database

PouchDB.plugin(require('pouchdb-find'));
db = new PouchDB('OctaveDB',{adapter: 'websql'});

require('electron').ipcRenderer.on('trigger', function(event, message) {
  App.trigger(message);
});
