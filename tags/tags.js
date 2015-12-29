riot.tag2('anim', '<yield></yield>', 'anim[in]{opacity:1;transform:scale(1) translate(0, 0);transition-duration:.4s}anim[in].fade{opacity:0}anim[in].scale{transform:scale(.5);opacity:0}anim[in].up{transform:translateY(50px)}anim[in].left{transform:translateX(50px)}anim[in].down{transform:translateY(-50px)}anim[in].right{transform:translateX(-50px)}', '', function(opts) {
this.mixin(Power.anim);
});

riot.tag2('app', '<toolbar> </toolbar> <track-list></track-list>', 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}html{background:#fff;box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}app{display:block;padding-top:110px}', '', function(opts) {
});

riot.tag2('cell', '<yield></yield>', '', '', function(opts) {
this.mixin(Power.cell);
});

riot.tag2('crumbs', '', 'crumbs{background:#202020}', '', function(opts) {
});

riot.tag2('panel', '<yield></yield>', '', '', function(opts) {
this.mixin(Power.panel);
});

riot.tag2('toolbar', '<div class="inner"> <div class="left"> <svg viewbox="0 0 24 24"> <path d="M6,18.14V6.14H8V18.14H6M9.5,12.14L18,6.14V18.14L9.5,12.14Z"></path> </svg> <svg viewbox="0 0 24 24" onclick="{playPause}"> <path d="M14,19.14H18V5.14H14M6,19.14H10V5.14H6V19.14Z"></path> </svg> <svg viewbox="0 0 24 24"> <path d="M16,18.14H18V6.14H16M6,18.14L14.5,12.14L6,6.14V18.14Z"></path> </svg> </div> <div class="center"> </div> <div class="right"> <input> </div> </div> <crumbs></crumbs>', 'toolbar{display:block;height:110px;position:fixed;left:0;right:0;top:0;background:white;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1);overflow:hidden}toolbar .inner{position:absolute;top:60px;height:50px;left:0;right:0;overflow:hidden;z-index:10}toolbar crumbs{position:absolute;left:0;right:0;height:60px;top:0;z-index:9}toolbar .left{padding:4px 0;width:25vw;text-align:center;position:absolute;top:0;left:0;bottom:0;z-index:10;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1)}toolbar .left svg{width:40px}toolbar .left svg path{fill:#333}toolbar .center{padding:12px 0;text-align:center;position:absolute;top:0;right:25vw;left:25vw;bottom:0;z-index:9;border-left:1px solid #ccc;border-right:1px solid #ccc;background:rgba(0,0,0,0.03)}toolbar .right{width:25vw;text-align:center;position:absolute;top:0;right:0;bottom:0;z-index:10;box-shadow:0 0 2px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1)}toolbar .right input{border:1px solid #ccc;border-radius:3px;position:absolute;top:10px;right:10px;height:30px;width:calc(90%);padding:0 8px}toolbar .right input:focus{outline:none}', '', function(opts) {
var self = this;
self.playPause = function () {
  App.trigger('play_pause');
};
}, '{ }');

riot.tag2('track-list', '<track each="{val, i in tracks}" index="{i}" data="{val}"></track>', 'track-list{font-family:sans-serif;color:#333;display:block;width:100%;white-space:nowrap}track-list .cell{padding:8px;display:inline-block;float:left}track-list .cell:nth-child(1){width:45vw}track-list .cell:nth-child(2){width:30vw}', '', function(opts) {
var self = this;
self.tracks = [];

db.allDocs({
  include_docs: true,
  attachments: false,
  limit: 10000
}).then(function (result) {

  for (var i in result.rows) self.tracks.push(result.rows[i].doc);

  self.update();
}).catch(function (err) {
  console.log(err);
});

var track = null;
var interval = null;
App.on('select_track', function (index) {
  App.trigger('will_select_track');

  if (interval) window.clearInterval(track);

  if (track) track.pause();

  track = new Audio(self.tracks[index].location);
  track.play();

  self.updateTime();
});

self.updateTime = () => {
  if (track.paused) return;

  App.trigger('track_time_update', track.currentTime, track.duration);
  interval = window.setTimeout(self.updateTime, 1000);
};

App.on('play_pause', () => {
  if (track.paused) {
    track.play();
    App.trigger('track_playing');
    self.updateTime();
  } else {
    track.pause();
    App.trigger('track_pausing');
  }
});
}, '{ }');

riot.tag2('track', '<div class="cell">{data.name}</div> <div class="cell">{data.album}</div> <div class="cell">{data.artist}</div>', 'track{cursor:pointer;overflow:hidden;color:#000;display:block;width:100%}track:nth-child(even){background:rgba(0,0,0,0.01)}track:hover{color:black;background:rgba(0,0,0,0.1)}track.active{color:#eee;background:#0080ff}track .cell{text-overflow:ellipsis;overflow:hidden}', 'onclick="{select}"', function(opts) {
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
};

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
