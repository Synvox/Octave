riot.tag2('anim', '<yield></yield>', 'anim[in]{opacity:1;transform:scale(1) translate(0, 0);transition-duration:.4s}anim[in].fade{opacity:0}anim[in].scale{transform:scale(.5);opacity:0}anim[in].up{transform:translateY(50px)}anim[in].left{transform:translateX(50px)}anim[in].down{transform:translateY(-50px)}anim[in].right{transform:translateX(-50px)}', '', function(opts) {
this.mixin(Power.anim);
});

riot.tag2('app', '<toolbar></toolbar> <track-list></track-list> <trackexplorer></trackexplorer>', 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}html{background:#fff;box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}app{font-family:sans-serif;display:block;padding-top:110px}', '', function(opts) {
});

riot.tag2('cell', '<yield></yield>', '', '', function(opts) {
this.mixin(Power.cell);
});

riot.tag2('crumbs', '<ul if="{data}"> <li onclick="{reset}">Library</li> <li class="chevron" if="{data.artist}">›</li> <li if="{data.artist}" onclick="{search}" name="artist">{data.artist}</li> <li class="chevron" if="{data.album}">›</li> <li if="{data.album}" onclick="{search}" name="album">{data.album}</li> <li class="chevron" if="{data.name}">›</li> <li onclick="{search}" name="name">{data.name}</li> </ul>', 'body{background:#202020}crumbs{background:#202020}crumbs ul{height:40px;font-size:16px;color:#ddd;line-height:30px;position:absolute;bottom:0;left:20px;-webkit-user-select:none}crumbs ul li{display:inline-block;cursor:pointer}crumbs ul li.chevron{font-size:2.5em;position:relative;top:6px;opacity:.5}crumbs ul li:hover{color:#fff}', '', function(opts) {

var self = this;
self.data = null;

App.on('selected_track', function (data) {
  self.update({ data: data });
});

self.search = function (e) {
  var query = $(e.target).text();
  var field = $(e.target).attr('name');
  App.trigger('filter_tracks_by', field + ':' + query);
};

self.reset = function (e) {
  App.trigger('filter_tracks_by', '');
};

var changes = db.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function (change) {
  var doc = change.doc;
  if (doc._id === self.data._id) {
    self.data = doc;
    self.update();
  }
});
}, '{ }');

riot.tag2('panel', '<yield></yield>', '', '', function(opts) {
this.mixin(Power.panel);
});

riot.tag2('toolbar', '<div class="inner"> <div class="left"> <svg viewbox="0 0 24 24" onclick="{playPrev}"> <path d="M11.5,12L20,18V6M11,18V6L2.5,12L11,18Z"></path> </svg> <svg viewbox="0 0 24 24" onclick="{playPause}"> <path if="{playing}" d="M14,19.14H18V5.14H14M6,19.14H10V5.14H6V19.14Z"></path> <path if="{!playing}" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path> </svg> <svg viewbox="0 0 24 24" onclick="{playNext}"> <path d="M13,6V18L21.5,12M4,18L12.5,12L4,6V18Z"></path> </svg> </div> <div class="center"> <span class="time-left">{time.left}</span> <span class="time-right">{time.right}</span> <div id="waveform"></div> </div> <div class="right"> <form onsubmit="{search}" class="search"> <input type="submit" hidden> <input onkeyup="{search}" class="query"> <svg viewbox="0 0 24 24" class="exit" if="{hasQuery}" onclick="{resetSearch}"> <path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z"></path> </svg> </form> </div> </div> <crumbs></crumbs>', 'toolbar{display:block;height:110px;position:fixed;left:0;right:0;top:0;background:white;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1);overflow:hidden;z-index:10}toolbar .inner{position:absolute;top:60px;height:50px;left:0;right:0;overflow:hidden;z-index:10}toolbar crumbs{position:absolute;left:0;right:0;height:60px;top:0;z-index:9}toolbar .left{padding:4px 0;width:25vw;text-align:center;position:absolute;top:0;left:0;bottom:0;z-index:10;-webkit-user-select:none;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1)}toolbar .left svg{width:40px}toolbar .left svg path{fill:#555}toolbar .left svg:active path{fill:#000}toolbar .center{text-align:center;position:absolute;top:0;right:25vw;left:25vw;bottom:0;z-index:9;border-left:1px solid #ccc;border-right:1px solid #ccc;background:rgba(0,0,0,0.03)}toolbar .center #waveform{position:absolute;left:0;right:0;bottom:0;top:0}toolbar .center canvas{width:100%}toolbar .center .time-left{position:absolute;left:0px top: 8px}toolbar .center .time-right{position:absolute;right:0px top: 8px}toolbar .right{width:25vw;text-align:center;position:absolute;top:0;right:0;bottom:0;z-index:10;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1)}toolbar .right form.search{border:1px solid #ccc;border-radius:3px;position:absolute;top:10px;right:10px;bottom:10px;height:30px;width:calc(100% - 22px)}toolbar .right form.search input.query{position:absolute;left:0;top:0;bottom:0;border:none;padding:0 12px;width:calc(100% - 30px)}toolbar .right form.search input.query:focus{outline:none}toolbar .right form.search .exit{position:absolute;right:5px;top:5px;height:18px;cursor:pointer}toolbar .right form.search .exit path{fill:#444}toolbar .right form.search .exit:active path{fill:#000}', '', function(opts) {
var self = this;
self.playing = false;

self.playPause = function () {
  App.trigger('play_pause');
};

self.playNext = function () {
  App.trigger('play_next');
};

self.playPrev = function () {
  App.trigger('play_prev');
};

App.on('track_playing', function () {
  self.update({ playing: true });
});

App.on('track_pausing', function () {
  self.update({ playing: false });
});

// function timeToString(time) {
//   var min, sec;
//   min = Math.floor(time / 60)
//   sec = time - min * 60
//
//   return min + ':' + sec
// }
//
// App.on('track_time_update',function(cur,total){
//   self.update({time:
//     {
//       left: timeToString(cur),
//       right: timeToString(total)
//     }
//   });
// })

var timeout = null;
self.search = function () {
  var query = $(self.root).find('input.query').val();

  if (timeout) window.clearTimeout(timeout);

  timeout = window.setTimeout(function () {
    App.trigger('filter_tracks_by', query);
  }, 100);
};

self.resetSearch = function () {
  App.trigger('filter_tracks_by', '');
};

self.hasQuery = false;
App.on('filter_tracks_by', function (query) {
  var input = $(self.root).find('input.query');

  if (!input.is(":focus")) {
    input.val(query);
  }

  self.hasQuery = !!query.length;
  self.update();
});
}, '{ }');

riot.tag2('track-list', '<track each="{val, i in renderedTracks}" index="{i}" data="{val}"></track>', 'track-list{color:#333;background:white;display:block;width:100%;white-space:nowrap;position:absolute;top:110px;left:0;right:0;bottom:0;overflow:auto}track-list .cell{padding:8px;display:inline-block;float:left}track-list .cell:nth-child(1){width:30vw}track-list .cell:nth-child(2){width:20vw}', '', function(opts) {
var self = this;
var $r = $(self.root);

self.tracks = [];
self.renderedTracks = [];

db.allDocs({
  include_docs: true,
  attachments: false
}).then(function (result) {
  for (var i in result.rows) add(result.rows[i].doc);

  sort();
}).catch(function (err) {
  console.log(err);
});

var changeDebounce = null;
var changes = db.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function (change) {
  var index = -1;

  for (var i in self.tracks) {
    if (self.tracks[i]._id === change.doc._id) {
      index = i;
      continue;
    }
  }

  if (index !== -1) {
    // Change
    self.tracks[index] = change.doc;
  } else {
    // Add
    add(change.doc);
  }
  if (changeDebounce) window.clearTimeout(changeDebounce);

  changeDebounce = window.setTimeout(function () {
    sort(true); // true = rerun last limit
  }, 500);
}).on('complete', function (info) {
  // changes() was canceled
}).on('error', function (err) {
  console.log(err);
});

var add = function (doc) {
  self.tracks.push(doc);
};

var sort = function (limit) {
  var get = function (item, key) {
    if (typeof item[key] === 'number') return item[key];else return (item[key] ? ('' + item[key]).trim() : '').toLowerCase();
  };

  self.tracks.sort(function (a, b) {
    var keyA, keyB;
    keyA = get(a, 'artist') + get(a, 'album'), keyB = get(b, 'artist') + get(b, 'album');
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;

    // Numeric
    var numA, numB;
    numA = get(a, 'trackNumber');
    numB = get(b, 'trackNumber');
    if (numA < numB) return -1;
    if (numA > numB) return 1;

    keyA = get(a, 'name');
    keyB = get(b, 'name');
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  fastRender(limit);
};

var fastRenderTimeout = null;
var lastLimit = null;
function fastRender(limit) {
  if (limit === true) {
    // Rerun last render
    limit = lastLimit;
  } else if (limit) {
    lastLimit = limit;
  }

  if (fastRenderTimeout) window.clearTimeout(fastRenderTimeout);

  self.renderedTracks = [];

  var targetLength = self.tracks.length,
      start = 0,
      pageSize = 80,
      ms = 50;

  function addTracks() {

    var end = start + pageSize;

    if (end > targetLength) {
      end = targetLength;
    } else if (!limit || end <= limit) {
      fastRenderTimeout = window.setTimeout(function () {
        addTracks();
      }, ms);
    }

    self.renderedTracks = self.renderedTracks.concat(self.tracks.slice(start, end));

    start += pageSize;
    pageSize *= 2;

    self.update();
  }

  addTracks();
}

var wavesurfer = Object.create(WaveSurfer);
self.on('mount', function () {
  wavesurfer.init({
    container: '#waveform',
    height: 50,
    progressColor: "#704FDC"
  });

  wavesurfer.on('ready', function () {
    wavesurfer.play();
    App.trigger('track_playing');
  });

  wavesurfer.on('finish', function () {
    App.trigger('play_next');
  });
});

self.track = null;
var trackIndex = null;
App.on('select_track', function (index) {
  try {
    if (typeof index !== "number") {
      index = self.tracks.indexOf(index);
    }

    if (index < 0) index = self.tracks.length - 1;
    if (index >= self.tracks.length) index = 0;

    trackIndex = index;

    if (!wavesurfer.isPlaying()) wavesurfer.pause();

    var newData = self.tracks[trackIndex];

    App.trigger('selected_track', newData);
    self.track = newData;

    wavesurfer.load(newData.location);
  } catch (e) {
    console.error(e);
  }
});

App.on('play_pause', () => {
  if (!wavesurfer.isPlaying()) {
    wavesurfer.play();
    App.trigger('track_playing');
    self.updateTime();
  } else {
    wavesurfer.pause();
    App.trigger('track_pausing');
  }
});

App.on('play_next', () => {
  App.trigger('select_track', trackIndex + 1);
});

App.on('play_prev', () => {
  App.trigger('select_track', trackIndex - 1);
});

App.on('filter_tracks_by', function (str) {
  var cols = str.split(':'),
      col,
      arr;
  if (cols.length === 2) {
    arr = cols[1].toLowerCase().split(' ');
    col = cols[0];
  } else {
    arr = str.toLowerCase().split(' ');
    cols = ['artist', 'album', 'name'];
  }

  self.allTracks = self.allTracks || self.tracks.slice(); // Copy
  self.tracks = [];

  self.allTracks.forEach(function (track, index) {
    var str = '';
    for (var i in cols) if (cols[i]) str += track[cols[i]];

    var str = str.toLowerCase();

    var found = true;
    for (var i in arr) {
      var word = arr[i];
      if (str.indexOf(word) === -1) {
        found = false;
        continue;
      }
    }

    if (found) {
      self.tracks.push(track);
    }
  });

  fastRender(100);

  $r.one('scroll', function () {
    fastRender();
  });
});
}, '{ }');

riot.tag2('track', '<div class="cell">{data.name}</div> <div class="cell">{data.album}</div> <div class="cell">{data.artist}</div>', 'track{cursor:pointer;overflow:hidden;color:#444;display:block;width:100%;font-size:14px}track:nth-child(even){background:rgba(0,0,0,0.01)}track .cell{text-overflow:ellipsis;overflow:hidden}track .cell:first-child{color:black}track.active{color:rgba(255,255,255,0.95);background:#704FDC;text-shadow:0 1px 1px #5f3ad8;box-shadow:0 .5px 0 1px #5f3ad8 inset}track.active .cell:first-child{color:white}', '', function(opts) {
var self = this;
self.data = self.opts.data;
self.index = self.opts.index;
// self.time = new Date(self.data['Total Time'])
// self.timeStr = self.time.getMinutes() + ':' + ((self.time.getSeconds()<10)? '0':'') + self.time.getSeconds()

var $r = $(self.root);

self.active = false;
self.select = () => {
  if (self.active) return;
  App.trigger('select_track', self.data);
};
$r.click(self.select);

App.on('selected_track', function (data) {
  if (data !== self.data) return;

  self.active = true;
  $r.addClass('active');

  App.one('select_track', function () {
    self.active = false;
    $r.removeClass('active');
    self.update();
  });

  self.update();
});

self.playPause = () => {
  $r.find('.circle').toggleClass('playing');
  window.setTimeout(() => {
    App.trigger('play_pause');
  }, 1);
};
}, '{ }');

riot.tag2('trackexplorer', '<img class="artwork" if="{artUrl}" riot-src="{artUrl}"> <svg class="artwork" if="{!artUrl}" viewbox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg"> <path id="clef" d="m955.64978,2286.263916c-150.866272,-8.768799 -304.898865,-103.396484 -397.021301,-212.004883c-106.805817,-125.923706 -150.840027,-297.129028 -139.560638,-437.725464c33.135376,-413.110596 482.383636,-657.278381 648.68399,-837.728271c111.314575,-120.786133 134.650146,-179.667542 159.51355,-241.789001c48.135864,-120.247131 55.890015,-261.134308 -39.541504,-271.652649c-91.112793,-10.042603 -166.073059,133.244293 -199.55188,231.170349c-30.106689,88.078979 -50.117859,176.448669 -32.004333,309.190796c8.139893,59.637268 232.19574,1724.347961 235.975037,1750.152161c37.734009,257.873047 -109.739258,364.578613 -260.283203,383.55957c-325.089905,40.984375 -429.400909,-289.380859 -283.698425,-414.850342c112.170532,-96.604492 275.362976,-13.668457 266.546631,145.152832c-7.806641,140.670898 -145.739197,144.814697 -180.983765,141.60083c54.103394,97.032715 461.981384,147.727051 399.352234,-290.664551c-8.800415,-61.604004 -215.841919,-1625.99408 -220.916016,-1661.000427c-37.982178,-262.069885 -43.769836,-469.507965 92.772583,-711.582489c50.408447,-89.363411 130.072754,-147.055498 169.180908,-139.502464c8.59436,1.659588 17.156982,4.815323 23.954224,11.829124c104.739258,107.921097 136.870361,347.241821 125.395386,484.720001c-11.75,140.765625 -18.298706,286.489197 -158.266357,456.426025c-54.166626,65.763306 -219.457581,210.635864 -314.228088,293.867798c-133.159668,116.943726 -229.743164,219.082275 -282.001648,342.299927c-58.72818,138.4823 -68.67038,312.806152 63.976746,467.483521c76.302612,87.391846 202.903015,149.4021 309.449768,150.723877c296.256958,3.678467 382.771362,-142.356934 385.535767,-307.737671c4.550781,-272.318359 -324.207214,-375.276245 -459.370117,-188.034424c-78.369324,108.571045 -43.923401,222.845459 8.710632,277.212891c18.066162,18.658203 38.24646,32.870972 57.338013,40.794067c6.918762,2.869873 23.193176,10.438965 18.573547,21.517822c-3.842712,9.217773 -11.305908,9.736084 -18.103149,8.921875c-85.235352,-10.222412 -179.614868,-91.694214 -202.823608,-231.830933c-33.817261,-204.250854 146.426392,-446.541992 403.712769,-406.916016c168.44104,25.941772 324.831177,170.877686 311.11499,440.765137c-11.760376,231.307251 -203.521606,412.365356 -491.432739,395.630981z" fill="#eee" transform="rotate(-0.027732 932.637 1495.43)"></path> </svg> <div if="{data}" class="metadata"> <textarea rows="1" class="h1" contenteditable onblur="{change(\'name\')}">{data.name}</textarea> <span class="label">By:</span> <textarea rows="1" class="h2" contenteditable onblur="{change(\'artist\')}">{data.artist}</textarea> <span class="label">From:</span> <textarea rows="1" class="h2" contenteditable onblur="{change(\'album\')}">{data.album}</textarea> </div>', 'trackexplorer{position:absolute;top:110px;bottom:0;right:0;width:25vw;z-index:11;transition-duration:.1s;background:#fff;box-shadow:-1px 0 0 #ccc;transform:translateX(100%);opacity:0}trackexplorer.show{transform:translate(0);opacity:1}trackexplorer .artwork{width:calc(100% - 20px);margin:10px;margin-top:0}trackexplorer .metadata{padding:0 20px}trackexplorer .metadata .label{color:#888;font-size:.7em}trackexplorer .metadata textarea.h1,trackexplorer .metadata textarea.h2{font-size:16px;padding:4px 8px;border:none;width:100%;margin-bottom:4px;color:#555}trackexplorer .metadata textarea.h1:hover,trackexplorer .metadata textarea.h2:hover{background:#f8f8f8}trackexplorer .metadata textarea.h1:focus,trackexplorer .metadata textarea.h2:focus{background:#f8f8f8;outline:none}trackexplorer .metadata textarea.h1{font-size:1.5em;color:#333}trackexplorer .metadata input.name{font-size:18px;font-weight:bold}', '', function(opts) {
var self = this;
var $r = $(self.root);
var id3 = require('id3js');
self.artUrl = "";

self.change = function (field) {
  return function (e) {
    var val = $(e.target).val();
    if (self.data[field] === val) return;

    self.data[field] = val;
    db.put(self.data).then(res => {
      console.log('Saved Changes', self.data);
      self.data._rev = res.rev;
    });
  };
};

self.on('update', () => {
  window.setTimeout(function () {
    $r.find('textarea').each(function (i, element) {
      element.style.height = "5px";
      element.style.height = element.scrollHeight + "px";
    });
  }, 200);
});

var previousTrack = null;
App.on('selected_track', function (track) {
  if ($r.find('textarea:focus').length) return;
  self.data = track;
  self.update();

  var location = track.location.substring(track.location.indexOf('/Users'));
  location = unescape(location);
  var fs = require('fs');
  var mm = require('musicmetadata');

  // create a new parser from a node ReadStream
  var parser = mm(fs.createReadStream(location), function (err, result) {
    $r.addClass('show');

    if (result.picture.length > 0) {
      var picture = result.picture[0];
      var url = URL.createObjectURL(new Blob([picture.data], { 'type': 'image/' + picture.format }));
      self.update({ artUrl: url });
    } else {
      self.update({ artUrl: '' });
    }
  });
});
}, '{ }');
