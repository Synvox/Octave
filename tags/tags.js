riot.tag2('anim', '<yield></yield>', 'anim[in]{opacity:1;transform:scale(1) translate(0, 0);transition-duration:.4s}anim[in].fade{opacity:0}anim[in].scale{transform:scale(.5);opacity:0}anim[in].up{transform:translateY(50px)}anim[in].left{transform:translateX(50px)}anim[in].down{transform:translateY(-50px)}anim[in].right{transform:translateX(-50px)}', '', function(opts) {
this.mixin(Power.anim);
});

riot.tag2('app', '<table> <track each="{val, i in tracks}" index="{i}" data="{val}"></track> </table>', 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}html{background:#202020}app{font-family:sans-serif;color:#eee;display:block}app table{table-layout:fixed}', '', function(opts) {
var self = this;
var os = require('os');
var itunesDB = require("itunes-db").loadSync("/Users/ryan/Music/iTunes/iTunes Music Library.xml");

self.tracks = itunesDB.tracks;
self.tracks.sort(function (a, b) {
  var keyA = a.Name.trim(),
      keyB = b.Name.trim();
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
});

console.log(self.tracks[0]);

var track = null;
var interval = null;
App.on('select_track', function (index) {
  App.trigger('will_select_track');

  if (interval) window.clearInterval(track);

  if (track) track.pause();

  track = new Audio(self.tracks[index].Location);
  track.play();

  self.updateTime();
});

self.updateTime = () => {
  if (track.paused) return;

  App.trigger('track_time_update', track.currentTime);
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

riot.tag2('cell', '<yield></yield>', '', '', function(opts) {
this.mixin(Power.cell);
});

riot.tag2('panel', '<yield></yield>', '', '', function(opts) {
this.mixin(Power.panel);
});

riot.tag2('track', '<div if="{!active}"> <div class="data center">{data.Name}</div> <div class="data right"> <span if="{active && currentTimeStr}">{currentTimeStr} / </span> {timeStr} </div> </div> <div if="{active}"> <div class="circle playing" onclick="{playPause}"></div> <h2>{data.Name}</h2> <h3>{data.Artist}</h3> <div class="progress"> <div class="value"></div> </div> </div>', 'track{cursor:pointer;display:block;position:relative;overflow:hidden;color:#ccc}track:nth-child(even){background:rgba(0,0,0,0.01)}track:hover{color:white;background:rgba(0,0,0,0.1)}track.active{color:#444;background:#eee;height:160px;margin:20px;border-radius:3px;box-shadow:0 0 3px rgba(0,0,0,0.3),0 0 16px rgba(0,0,0,0.1)}track .data{display:inline-block;margin:0 20px;line-height:40px}track .data.left{width:30px;text-align:right}track .data.center{min-width:400px;width:80vw}track .data.right{position:absolute;right:0}track h2{color:white;background:black;border-radius:3px;position:absolute;top:20px;left:100px;line-height:40px;font-size:25px;display:inline-block;padding:0 32px}track h3{color:white;background:black;border-radius:3px;position:absolute;top:62px;left:100px;line-height:30px;font-size:15px;display:inline-block;padding:0 32px}track .circle{width:70px;height:70px;background:#ff8000;position:absolute;top:20px;left:20px;border:none;border-radius:1000px}track .circle:active,track .circle.playing{background:#0080ff}track .circle.playing:active{background:#ff8000}track .progress{position:absolute;left:20px;top:120px;right:20px;height:6px;background:#101010;border-radius:1000px;overflow:hidden}track .progress .value{background:#ff8000;border-radius:1000px;position:absolute;top:1px;left:1px;bottom:1px;width:100%;transform-origin:0}', 'onclick="{select}"', function(opts) {
var self = this;
self.data = self.opts.data;
self.index = self.opts.index;
self.time = new Date(self.data['Total Time']);

self.timeStr = self.time.getMinutes() + ':' + (self.time.getSeconds() < 10 ? '0' : '') + self.time.getSeconds();

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

self.updateTime = time => {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time - min * 60);
  self.currentTimeStr = min + ':' + (sec < 10 ? '0' : '') + sec;
  self.update();
  var percent = time * 1000 / self.data['Total Time'] * 100;
  $r.find('.progress .value').css({ 'transform': 'translateX(-' + (100 - percent) + '%)' });
};

self.playPause = () => {
  $r.find('.circle').toggleClass('playing');
  window.setTimeout(() => {
    App.trigger('play_pause');
  }, 1);
};
}, '{ }');
