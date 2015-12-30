riot.tag2('anim', '<yield></yield>', 'anim[in]{opacity:1;transform:scale(1) translate(0, 0);transition-duration:.4s}anim[in].fade{opacity:0}anim[in].scale{transform:scale(.5);opacity:0}anim[in].up{transform:translateY(50px)}anim[in].left{transform:translateX(50px)}anim[in].down{transform:translateY(-50px)}anim[in].right{transform:translateX(-50px)}', '', function(opts) {
this.mixin(Power.anim);
});

riot.tag2('app', '<toolbar> </toolbar> <track-list></track-list>', 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}html{background:#fff;box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}app{font-family:sans-serif;display:block;padding-top:110px}', '', function(opts) {
});

riot.tag2('cell', '<yield></yield>', '', '', function(opts) {
this.mixin(Power.cell);
});

riot.tag2('crumbs', '<ul if="{data}"> <li>Library</li> <li class="chevron">›</li> <li if="{data.artist}">{data.artist}</li> <li class="chevron" if="{data.artist}">›</li> <li if="{data.album}">{data.album}</li> <li class="chevron" if="{data.album}">›</li> <li>{data.name}</li> </ul>', 'body{background:#202020}crumbs{background:#202020}crumbs ul{height:40px;font-size:16px;color:white;line-height:30px;position:absolute;bottom:0;left:20px;-webkit-user-select:none}crumbs ul li{display:inline-block}crumbs ul li.chevron{font-size:2.5em;position:relative;top:6px;opacity:.5}', '', function(opts) {

var self = this;
self.data = null;

App.on('selected_track', function (data) {
  self.update({ data: data });
});
}, '{ }');

riot.tag2('panel', '<yield></yield>', '', '', function(opts) {
this.mixin(Power.panel);
});

riot.tag2('toolbar', '<div class="inner"> <div class="left"> <svg viewbox="0 0 24 24" onclick="{playPrev}"> <path d="M11.5,12L20,18V6M11,18V6L2.5,12L11,18Z"></path> </svg> <svg viewbox="0 0 24 24" onclick="{playPause}"> <path if="{playing}" d="M14,19.14H18V5.14H14M6,19.14H10V5.14H6V19.14Z"></path> <path if="{!playing}" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path> </svg> <svg viewbox="0 0 24 24" onclick="{playNext}"> <path d="M13,6V18L21.5,12M4,18L12.5,12L4,6V18Z"></path> </svg> </div> <div class="center" id="waveform"> </div> <div class="right"> <input> </div> </div> <crumbs></crumbs>', 'toolbar{display:block;height:110px;position:fixed;left:0;right:0;top:0;background:white;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1);overflow:hidden}toolbar .inner{position:absolute;top:60px;height:50px;left:0;right:0;overflow:hidden;z-index:10}toolbar crumbs{position:absolute;left:0;right:0;height:60px;top:0;z-index:9}toolbar .left{padding:4px 0;width:25vw;text-align:center;position:absolute;top:0;left:0;bottom:0;z-index:10;-webkit-user-select:none;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1)}toolbar .left svg{width:40px}toolbar .left svg path{fill:#555}toolbar .left svg:active path{fill:#000}toolbar .center{text-align:center;position:absolute;top:0;right:25vw;left:25vw;bottom:0;z-index:9;border-left:1px solid #ccc;border-right:1px solid #ccc;background:rgba(0,0,0,0.03)}toolbar .center canvas{width:100%}toolbar .right{width:25vw;text-align:center;position:absolute;top:0;right:0;bottom:0;z-index:10;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1)}toolbar .right input{border:1px solid #ccc;border-radius:3px;position:absolute;top:10px;right:10px;height:30px;width:calc(90%);padding:0 8px}toolbar .right input:focus{outline:none}', '', function(opts) {
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
}, '{ }');

riot.tag2('track-list', '<track each="{val, i in tracks}" index="{i}" data="{val}"></track>', 'track-list{color:#333;background:white;display:block;width:100%;white-space:nowrap}track-list .cell{padding:8px;display:inline-block;float:left}track-list .cell:nth-child(1){width:30vw}track-list .cell:nth-child(2){width:20vw}', '', function(opts) {
var self = this;
self.tracks = [];

db.allDocs({
  include_docs: true,
  attachments: false,
  limit: 10000
}).then(function (result) {
  for (var i in result.rows) {
    add(result.rows[i].doc);
  }

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
  add(change.doc);
  if (changeDebounce) window.clearTimeout(changeDebounce);
  changeDebounce = window.setTimeout(function () {
    sort();
  }, 100);
}).on('complete', function (info) {
  // changes() was canceled
}).on('error', function (err) {
  console.log(err);
});

var add = function (doc) {
  self.tracks.push(doc);
};
var sort = function () {
  self.tracks.sort(function (a, b) {
    var keyA = a.album ? a.album.trim() : '',
        keyB = b.album ? b.album.trim() : '';
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

  self.update();
};

var wavesurfer = Object.create(WaveSurfer);
self.on('mount', function () {
  wavesurfer.init({
    container: '#waveform',
    height: 50,
    barWidth: .5,
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

var track = null;
var trackIndex = null;
var updateInterval = null;
App.on('select_track', function (index) {
  trackIndex = index;

  if (updateInterval) window.clearInterval(updateInterval);

  if (!wavesurfer.isPlaying()) wavesurfer.pause();

  var newData = self.tracks[trackIndex];

  App.trigger('selected_track', newData);

  wavesurfer.load(newData.location);

  self.updateTime();
});

self.updateTime = () => {
  if (!wavesurfer.isPlaying()) return;

  App.trigger('track_time_update', wavesurfer.getCurrentTime(), wavesurfer.getDuration());
  updateInterval = window.setTimeout(self.updateTime, 1000);
};

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
}, '{ }');

riot.tag2('track', '<div class="cell">{data.name}</div> <div class="cell">{data.album}</div> <div class="cell">{data.artist}</div>', 'track{cursor:pointer;overflow:hidden;color:#000;display:block;width:100%}track:nth-child(even){background:rgba(0,0,0,0.01)}track:hover{color:black;background:rgba(0,0,0,0.1)}track.active{color:#fff;background:#704FDC;text-shadow:0 1px 1px #5f3ad8;box-shadow:0 .5px 0 1px #5f3ad8 inset}track .cell{text-overflow:ellipsis;overflow:hidden}', '', function(opts) {
var self = this;
self.data = self.opts.data;
self.index = self.opts.index;
// self.time = new Date(self.data['Total Time'])
// self.timeStr = self.time.getMinutes() + ':' + ((self.time.getSeconds()<10)? '0':'') + self.time.getSeconds()

var $r = $(self.root);

self.active = false;
self.select = () => {
  if (self.active) return;
  App.trigger('select_track', self.index);
};
$r.click(self.select);

App.on('select_track', function (index) {
  if (index !== self.index) return;

  self.active = true;
  $r.addClass('active');

  App.one('select_track', function () {
    self.active = false;
    $r.removeClass('active');
    $r.find('.progress .value').css({ 'width': '0%' });
    App.off('track_time_update', self.updateTime);
    self.update();
  });

  App.on('track_time_update', self.updateTime);

  self.update();
});

self.updateTime = (time, duration) => {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time - min * 60);
  self.currentTimeStr = min + ':' + (sec < 10 ? '0' : '') + sec;

  min = Math.floor(duration / 60);
  sec = Math.floor(duration - min * 60);
  self.timeStr = min + ':' + (sec < 10 ? '0' : '') + sec;

  self.update();

  var percent = time / duration * 100;
  $r.find('.progress .value').css({ 'transform': 'translateX(-' + (100 - percent) + '%)' });
};

self.playPause = () => {
  $r.find('.circle').toggleClass('playing');
  window.setTimeout(() => {
    App.trigger('play_pause');
  }, 1);
};
}, '{ }');
