riot.tag2('anim', '<yield></yield>', 'anim[in]{opacity:1;transform:scale(1) translate(0, 0);transition-duration:.4s}anim[in].fade{opacity:0}anim[in].scale{transform:scale(.5);opacity:0}anim[in].up{transform:translateY(50px)}anim[in].left{transform:translateX(50px)}anim[in].down{transform:translateY(-50px)}anim[in].right{transform:translateX(-50px)}', '', function(opts) {
this.mixin(Power.anim);
});

riot.tag2('app', '<toolbar></toolbar> <tracklist></tracklist> <trackexplorer></trackexplorer> <blankstate if="{blank}"></blankstate>', 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\'\';content:none}table{border-collapse:collapse;border-spacing:0}html{background:#fff;box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}app{font-family:sans-serif;display:block;padding-top:110px}body{position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden}', '', function(opts) {
var self = this;
self.blank = false;
db.allDocs({
  include_docs: false,
  attachments: false
}).then(function (e) {
  console.log(e, e.total_rows === 0);
  if (e.total_rows === 0) {
    self.update({ blank: true });
  }
});
}, '{ }');

riot.tag2('blankstate', '<panel style="width: 100%; height: 100%; background: #eee;overflow: hidden;"></panel> <anim in="fade|50"> <panel left="80%" top="80%" center> <svg width="1200px" class="artwork" if="{!artUrl}" viewbox="0 0 213 213" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <path d="M133.359375,25.890625 C134.015628,32.3594073 133.781256,38.3359101 132.65625,43.8203125 C131.531244,49.3047149 129.820324,54.3202898 127.523438,58.8671875 C125.226551,63.4140852 122.507828,67.4687322 119.367188,71.03125 C116.226547,74.5937678 112.968767,77.6874869 109.59375,80.3125 C109.968752,84.2500197 110.460934,87.9531077 111.070312,91.421875 C111.679691,94.8906423 112.359371,98.4062322 113.109375,101.96875 C117.984399,101.593748 122.390605,102.132805 126.328125,103.585938 C130.265645,105.03907 133.617174,107.148424 136.382812,109.914063 C139.148451,112.679701 141.234368,116.007793 142.640625,119.898438 C144.046882,123.789082 144.656251,128.031227 144.46875,132.625 C144.281249,136.468769 143.531257,139.89061 142.21875,142.890625 C140.906243,145.89064 139.265635,148.585926 137.296875,150.976562 C135.328115,153.367199 133.101575,155.499991 130.617188,157.375 C128.1328,159.250009 125.578138,160.984367 122.953125,162.578125 C122.765624,166.046892 122.999997,169.304672 123.65625,172.351562 C124.312503,175.398453 124.945309,178.351548 125.554688,181.210938 C126.164066,184.070327 126.585936,186.929673 126.820312,189.789062 C127.054689,192.648452 126.656255,195.671859 125.625,198.859375 C124.781246,201.390638 123.398447,203.593741 121.476562,205.46875 C119.554678,207.343759 117.328138,208.867182 114.796875,210.039062 C112.265612,211.210943 109.523452,212.00781 106.570312,212.429688 C103.617173,212.851565 100.734389,212.851565 97.921875,212.429688 C95.1093609,212.00781 92.4609499,211.210943 89.9765625,210.039062 C87.4921751,208.867182 85.4062584,207.203136 83.71875,205.046875 C81.8437406,202.609363 80.8125009,199.937515 80.625,197.03125 C80.4374991,194.124985 80.8828071,191.4297 81.9609375,188.945312 C83.0390679,186.460925 84.6562392,184.421883 86.8125,182.828125 C88.9687608,181.234367 91.4531109,180.531249 94.265625,180.71875 C96.7968877,180.8125 98.859367,181.468744 100.453125,182.6875 C102.046883,183.906256 103.218746,185.406241 103.96875,187.1875 C104.718754,188.968759 105.000001,190.890615 104.8125,192.953125 C104.624999,195.015635 104.062505,196.914054 103.125,198.648438 C102.187495,200.382821 100.851571,201.859369 99.1171875,203.078125 C97.3828038,204.296881 95.2968872,204.953125 92.859375,205.046875 C95.1093863,207.484387 97.7109227,208.984372 100.664062,209.546875 C103.617202,210.109378 106.523423,210.015629 109.382812,209.265625 C112.242202,208.515621 114.820301,207.203134 117.117188,205.328125 C119.414074,203.453116 121.07812,201.296887 122.109375,198.859375 C123.14063,196.234362 123.609375,193.468765 123.515625,190.5625 C123.421875,187.656235 123.11719,184.679703 122.601562,181.632812 C122.085935,178.585922 121.523441,175.492203 120.914062,172.351562 C120.304684,169.210922 120,166.187515 120,163.28125 C112.218711,164.125004 104.882847,163.56251 97.9921875,161.59375 C91.101528,159.62499 85.1718998,156.460959 80.203125,152.101562 C75.2343502,147.742166 71.4843877,142.30472 68.953125,135.789062 C66.4218623,129.273405 65.5781208,121.937541 66.421875,113.78125 C66.9843778,107.968721 68.6015491,102.625024 71.2734375,97.75 C73.9453259,92.8749756 77.1093567,88.3515834 80.765625,84.1796875 C84.4218933,80.0077916 88.2656048,76.2343919 92.296875,72.859375 C96.3281452,69.4843581 100.031233,66.3906391 103.40625,63.578125 C101.999993,57.7655959 101.273438,51.6953441 101.226562,45.3671875 C101.179687,39.0390309 101.765619,33.0156536 102.984375,27.296875 C104.203131,21.5780964 106.031238,16.421898 108.46875,11.828125 C110.906262,7.23435203 113.859358,3.81251125 117.328125,1.5625 C119.203134,0.343743906 121.078116,0.554679297 122.953125,2.1953125 C124.828134,3.8359457 126.49218,6.10936047 127.945313,9.015625 C129.398445,11.9218895 130.617183,14.9921713 131.601562,18.2265625 C132.585942,21.4609537 133.171874,24.0156156 133.359375,25.890625 Z M106.078125,60.765625 C107.765633,59.8281203 109.687489,58.4687589 111.84375,56.6875 C114.000011,54.9062411 116.156239,52.8437617 118.3125,50.5 C120.468761,48.1562383 122.437491,45.6250136 124.21875,42.90625 C126.000009,40.1874864 127.312496,37.3984518 128.15625,34.5390625 C129.000004,31.6796732 129.234377,28.8672013 128.859375,26.1015625 C128.484373,23.3359237 127.171886,20.7343872 124.921875,18.296875 C121.92186,17.9218731 119.320324,18.3906184 117.117188,19.703125 C114.914051,21.0156316 113.085945,22.8671755 111.632812,25.2578125 C110.17968,27.6484495 109.031254,30.4140468 108.1875,33.5546875 C107.343746,36.6953282 106.71094,39.8827963 106.289062,43.1171875 C105.867185,46.3515787 105.679687,49.5156095 105.726562,52.609375 C105.773438,55.7031405 105.890624,58.4218633 106.078125,60.765625 Z M83.71875,149.921875 C85.5000089,151.515633 87.7265491,153.08593 90.3984375,154.632812 C93.0703259,156.179695 95.9999841,157.445308 99.1875,158.429688 C102.375016,159.414067 105.703108,159.976562 109.171875,160.117188 C112.640642,160.257813 116.015609,159.718756 119.296875,158.5 C117.984368,152.124968 116.765631,145.562534 115.640625,138.8125 C114.515619,132.062466 113.437505,125.359408 112.40625,118.703125 C106.781222,118.703125 102.562514,120.390608 99.75,123.765625 C96.9374859,127.140642 96.0468698,131.499973 97.078125,136.84375 C97.2656259,138.250007 97.7343712,139.492182 98.484375,140.570312 C99.2343788,141.648443 100.054683,142.656245 100.945312,143.59375 C101.835942,144.531255 102.703121,145.445308 103.546875,146.335938 C104.390629,147.226567 104.999998,148.187495 105.375,149.21875 C102.937488,148.187495 100.68751,146.851571 98.625,145.210938 C96.5624897,143.570304 94.8046948,141.671886 93.3515625,139.515625 C91.8984302,137.359364 90.8671905,134.945326 90.2578125,132.273438 C89.6484345,129.601549 89.5781227,126.718765 90.046875,123.625 C90.4218769,120.999987 91.2656184,118.585949 92.578125,116.382812 C93.8906316,114.179676 95.4843656,112.210946 97.359375,110.476562 C99.2343844,108.742179 101.296864,107.218757 103.546875,105.90625 C105.796886,104.593743 108.046864,103.515629 110.296875,102.671875 C109.828123,101.078117 109.453126,99.3906339 109.171875,97.609375 L108.328125,92.265625 C108.046874,90.4843661 107.742189,88.7500084 107.414062,87.0625 C107.085936,85.3749916 106.640628,83.828132 106.078125,82.421875 C102.703108,84.3906348 99.2812673,86.9452968 95.8125,90.0859375 C92.3437327,93.2265782 89.1328273,96.6952935 86.1796875,100.492188 C83.2265477,104.289081 80.7187603,108.320291 78.65625,112.585938 C76.5937397,116.851584 75.3046901,121.164041 74.7890625,125.523438 C74.2734349,129.882834 74.6718684,134.148417 75.984375,138.320312 C77.2968816,142.492208 79.8749808,146.359357 83.71875,149.921875 Z M121.40625,157.65625 C124.781267,157.281248 127.523427,155.921887 129.632812,153.578125 C131.742198,151.234363 133.218746,148.445329 134.0625,145.210937 C134.906254,141.976546 135.140627,138.578143 134.765625,135.015625 C134.390623,131.453107 133.406258,128.289076 131.8125,125.523437 C130.218742,122.757799 128.039076,120.671882 125.273437,119.265625 C122.507799,117.859368 119.15627,117.67187 115.21875,118.703125 C116.625007,124.984406 117.820308,131.406217 118.804687,137.96875 C119.789067,144.531283 120.656246,151.093717 121.40625,157.65625 Z" fill="#dddddd"></path> </svg> </panel> </anim> <anim in="up fade|100"> <panel maxwidth="450px" cols="14" rows="10" top="50%" left="50%" width="40vw" height="28vh" center style="background: white; box-shadow: 0px 0px 128px rgba(0,0,0,.3), 0px 0px 8px -2px rgba(0,0,0,.5);min-width: 640px"> <anim in="down fade|150"> <cell pos="T0 L0 R0 H3" style="background: rgba(0,0,0,.8)"></cell> </anim> <anim in="fade|100"> <cell pos="T3 L3 W4 H4 C" style="border-radius: 1000px; background: white; box-shadow: 0px 0px 0px 5px rgba(0,0,0,.4);"> <anim in="fade scale|200"> <svg style="width:48px;height:48px;top: 50%; left: 50%;position: relative;transform: translate(-50%,-50%)" viewbox="0 0 24 24"> <path fill="#4946E6" d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M9,16A2,2 0 0,0 7,18A2,2 0 0,0 9,20A2,2 0 0,0 11,18V13H14V11H10V16.27C9.71,16.1 9.36,16 9,16Z"></path> </svg> </anim> </cell> </anim> <anim in="fade right|300"> <cell pos="T1.4 L6" style="font-size: 30px;text-shadow: 0px 2px rgba(0,0,0,.2);border-radius: 1px; background: black; color: white; padding: 2px 8px;"> Import Music Library </cell> </anim> <anim in="fade left1350"> <cell pos="T3.2 L6" style="font-size: 16px;text-shadow: 0px 2px rgba(0,0,0,.2);border-radius: 1px; background: black; color: white; padding: 2px 8px;"> Select your iTunes library </cell> </anim> <textbox name="file" pos="B4 L1 R1 H2"></textbox> <btn pos="B1 W6 R1 H2" id="import-btn">Import</btn> <btn type="clear" pos="B1 R8 H2 W4" hidden>Help</btn> </panel> </anim> <input type="file" hidden id="file-asm-path">', '', '', function(opts) {
var self = this;
var $r = $(this.root);

var os = require('os');
var getuser = function () {
  var username = require('child_process').execSync("whoami", { encoding: 'utf8', timeout: 1000 });
  return String(username).trim();
};

self.on('mount', function () {
  var input = $r.find('input[name="file"]');
  var fileInput = $r.find('input[type="file"]');

  self.xmllocation = "/Users/" + getuser() + "/Music/iTunes/iTunes Music Library.xml";
  input.attr('placeholder', self.xmllocation);
  input.val(self.xmllocation);

  input.focus(function () {
    fileInput.click();
  });

  fileInput.change(function () {
    if (this.value) input.val(this.files[0].path);
  });
  $('#import-btn').click(function () {
    App.trigger('import_from_itunes', input.val());
    self.unmount();
  });
});
}, '{ }');

riot.tag2('btn', '<button><yield></yield></button>', 'btn{text-align:center;background:#4946E6;border:none;color:white;border-radius:1px;opacity:1;transition-duration:.5s;cursor:pointer;box-shadow:0 0 0 1px rgba(0,0,0,0.2) inset}btn button{border-radius:3px;width:100%;height:100%;background:transparent;border:none;color:inherit;font-size:14px;transition-duration:.5s}btn button:focus{outline:none;box-shadow:0 0 0 2px rgba(0,0,0,0.4) inset;text-shadow:0 1px 1px #141182}btn button:hover{background:rgba(255,255,255,0.1)}btn button:active{transition-duration:0s;background:rgba(0,0,0,0.3)}btn.fade{transition-duration:.5s;opacity:0}btn[type="clear"]{background:transparent;color:#333;box-shadow:none}btn[type="clear"]:active{transition-duration:0s;background:rgba(0,0,0,0.1)}btn[type="clear"]:active button{background:transparent}btn[type="clear"]:hover button{background:rgba(0,0,0,0.2)}btn[type="clear"] button:focus{box-shadow:none;text-shadow:none}', '', function(opts) {
this.mixin(Power.cell);
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

riot.tag2('textbox', '<yield></yield> <input name="{opts.name}" placeholder="{opts.placeholder}" type="{opts.type}">', 'textbox{background:#f8f8f8;border:none;display:inline-block}textbox input{width:100%;height:100%;background:transparent;padding:0 16px;border:none;box-shadow:0 0 0 1px rgba(0,0,0,0.02) inset;font-size:14px}textbox input:focus{outline:none;background:rgba(0,0,0,0.02)}textbox[error]:before{content:attr(error);position:absolute;top:0;right:0;background:white;padding:2px 16px;box-shadow:0 0 1px rgba(0,0,0,0.38);color:red}', '', function(opts) {
this.mixin(Power.cell);
}, '{ }');

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

  if (query.length < 3) return;

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

riot.tag2('trackexplorer', '<img class="artwork" if="{artUrl}" riot-src="{artUrl}"> <svg class="artwork" if="{!artUrl}" viewbox="0 0 213 213" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <path d="M133.359375,25.890625 C134.015628,32.3594073 133.781256,38.3359101 132.65625,43.8203125 C131.531244,49.3047149 129.820324,54.3202898 127.523438,58.8671875 C125.226551,63.4140852 122.507828,67.4687322 119.367188,71.03125 C116.226547,74.5937678 112.968767,77.6874869 109.59375,80.3125 C109.968752,84.2500197 110.460934,87.9531077 111.070312,91.421875 C111.679691,94.8906423 112.359371,98.4062322 113.109375,101.96875 C117.984399,101.593748 122.390605,102.132805 126.328125,103.585938 C130.265645,105.03907 133.617174,107.148424 136.382812,109.914063 C139.148451,112.679701 141.234368,116.007793 142.640625,119.898438 C144.046882,123.789082 144.656251,128.031227 144.46875,132.625 C144.281249,136.468769 143.531257,139.89061 142.21875,142.890625 C140.906243,145.89064 139.265635,148.585926 137.296875,150.976562 C135.328115,153.367199 133.101575,155.499991 130.617188,157.375 C128.1328,159.250009 125.578138,160.984367 122.953125,162.578125 C122.765624,166.046892 122.999997,169.304672 123.65625,172.351562 C124.312503,175.398453 124.945309,178.351548 125.554688,181.210938 C126.164066,184.070327 126.585936,186.929673 126.820312,189.789062 C127.054689,192.648452 126.656255,195.671859 125.625,198.859375 C124.781246,201.390638 123.398447,203.593741 121.476562,205.46875 C119.554678,207.343759 117.328138,208.867182 114.796875,210.039062 C112.265612,211.210943 109.523452,212.00781 106.570312,212.429688 C103.617173,212.851565 100.734389,212.851565 97.921875,212.429688 C95.1093609,212.00781 92.4609499,211.210943 89.9765625,210.039062 C87.4921751,208.867182 85.4062584,207.203136 83.71875,205.046875 C81.8437406,202.609363 80.8125009,199.937515 80.625,197.03125 C80.4374991,194.124985 80.8828071,191.4297 81.9609375,188.945312 C83.0390679,186.460925 84.6562392,184.421883 86.8125,182.828125 C88.9687608,181.234367 91.4531109,180.531249 94.265625,180.71875 C96.7968877,180.8125 98.859367,181.468744 100.453125,182.6875 C102.046883,183.906256 103.218746,185.406241 103.96875,187.1875 C104.718754,188.968759 105.000001,190.890615 104.8125,192.953125 C104.624999,195.015635 104.062505,196.914054 103.125,198.648438 C102.187495,200.382821 100.851571,201.859369 99.1171875,203.078125 C97.3828038,204.296881 95.2968872,204.953125 92.859375,205.046875 C95.1093863,207.484387 97.7109227,208.984372 100.664062,209.546875 C103.617202,210.109378 106.523423,210.015629 109.382812,209.265625 C112.242202,208.515621 114.820301,207.203134 117.117188,205.328125 C119.414074,203.453116 121.07812,201.296887 122.109375,198.859375 C123.14063,196.234362 123.609375,193.468765 123.515625,190.5625 C123.421875,187.656235 123.11719,184.679703 122.601562,181.632812 C122.085935,178.585922 121.523441,175.492203 120.914062,172.351562 C120.304684,169.210922 120,166.187515 120,163.28125 C112.218711,164.125004 104.882847,163.56251 97.9921875,161.59375 C91.101528,159.62499 85.1718998,156.460959 80.203125,152.101562 C75.2343502,147.742166 71.4843877,142.30472 68.953125,135.789062 C66.4218623,129.273405 65.5781208,121.937541 66.421875,113.78125 C66.9843778,107.968721 68.6015491,102.625024 71.2734375,97.75 C73.9453259,92.8749756 77.1093567,88.3515834 80.765625,84.1796875 C84.4218933,80.0077916 88.2656048,76.2343919 92.296875,72.859375 C96.3281452,69.4843581 100.031233,66.3906391 103.40625,63.578125 C101.999993,57.7655959 101.273438,51.6953441 101.226562,45.3671875 C101.179687,39.0390309 101.765619,33.0156536 102.984375,27.296875 C104.203131,21.5780964 106.031238,16.421898 108.46875,11.828125 C110.906262,7.23435203 113.859358,3.81251125 117.328125,1.5625 C119.203134,0.343743906 121.078116,0.554679297 122.953125,2.1953125 C124.828134,3.8359457 126.49218,6.10936047 127.945313,9.015625 C129.398445,11.9218895 130.617183,14.9921713 131.601562,18.2265625 C132.585942,21.4609537 133.171874,24.0156156 133.359375,25.890625 Z M106.078125,60.765625 C107.765633,59.8281203 109.687489,58.4687589 111.84375,56.6875 C114.000011,54.9062411 116.156239,52.8437617 118.3125,50.5 C120.468761,48.1562383 122.437491,45.6250136 124.21875,42.90625 C126.000009,40.1874864 127.312496,37.3984518 128.15625,34.5390625 C129.000004,31.6796732 129.234377,28.8672013 128.859375,26.1015625 C128.484373,23.3359237 127.171886,20.7343872 124.921875,18.296875 C121.92186,17.9218731 119.320324,18.3906184 117.117188,19.703125 C114.914051,21.0156316 113.085945,22.8671755 111.632812,25.2578125 C110.17968,27.6484495 109.031254,30.4140468 108.1875,33.5546875 C107.343746,36.6953282 106.71094,39.8827963 106.289062,43.1171875 C105.867185,46.3515787 105.679687,49.5156095 105.726562,52.609375 C105.773438,55.7031405 105.890624,58.4218633 106.078125,60.765625 Z M83.71875,149.921875 C85.5000089,151.515633 87.7265491,153.08593 90.3984375,154.632812 C93.0703259,156.179695 95.9999841,157.445308 99.1875,158.429688 C102.375016,159.414067 105.703108,159.976562 109.171875,160.117188 C112.640642,160.257813 116.015609,159.718756 119.296875,158.5 C117.984368,152.124968 116.765631,145.562534 115.640625,138.8125 C114.515619,132.062466 113.437505,125.359408 112.40625,118.703125 C106.781222,118.703125 102.562514,120.390608 99.75,123.765625 C96.9374859,127.140642 96.0468698,131.499973 97.078125,136.84375 C97.2656259,138.250007 97.7343712,139.492182 98.484375,140.570312 C99.2343788,141.648443 100.054683,142.656245 100.945312,143.59375 C101.835942,144.531255 102.703121,145.445308 103.546875,146.335938 C104.390629,147.226567 104.999998,148.187495 105.375,149.21875 C102.937488,148.187495 100.68751,146.851571 98.625,145.210938 C96.5624897,143.570304 94.8046948,141.671886 93.3515625,139.515625 C91.8984302,137.359364 90.8671905,134.945326 90.2578125,132.273438 C89.6484345,129.601549 89.5781227,126.718765 90.046875,123.625 C90.4218769,120.999987 91.2656184,118.585949 92.578125,116.382812 C93.8906316,114.179676 95.4843656,112.210946 97.359375,110.476562 C99.2343844,108.742179 101.296864,107.218757 103.546875,105.90625 C105.796886,104.593743 108.046864,103.515629 110.296875,102.671875 C109.828123,101.078117 109.453126,99.3906339 109.171875,97.609375 L108.328125,92.265625 C108.046874,90.4843661 107.742189,88.7500084 107.414062,87.0625 C107.085936,85.3749916 106.640628,83.828132 106.078125,82.421875 C102.703108,84.3906348 99.2812673,86.9452968 95.8125,90.0859375 C92.3437327,93.2265782 89.1328273,96.6952935 86.1796875,100.492188 C83.2265477,104.289081 80.7187603,108.320291 78.65625,112.585938 C76.5937397,116.851584 75.3046901,121.164041 74.7890625,125.523438 C74.2734349,129.882834 74.6718684,134.148417 75.984375,138.320312 C77.2968816,142.492208 79.8749808,146.359357 83.71875,149.921875 Z M121.40625,157.65625 C124.781267,157.281248 127.523427,155.921887 129.632812,153.578125 C131.742198,151.234363 133.218746,148.445329 134.0625,145.210937 C134.906254,141.976546 135.140627,138.578143 134.765625,135.015625 C134.390623,131.453107 133.406258,128.289076 131.8125,125.523437 C130.218742,122.757799 128.039076,120.671882 125.273437,119.265625 C122.507799,117.859368 119.15627,117.67187 115.21875,118.703125 C116.625007,124.984406 117.820308,131.406217 118.804687,137.96875 C119.789067,144.531283 120.656246,151.093717 121.40625,157.65625 Z" fill="#dddddd"></path> </svg> <div if="{data}" class="metadata"> <textarea rows="1" class="h1" contenteditable onblur="{change(\'name\')}">{data.name}</textarea> <span class="label">By:</span> <textarea rows="1" class="h2" contenteditable onblur="{change(\'artist\')}">{data.artist}</textarea> <span class="label">From:</span> <textarea rows="1" class="h2" contenteditable onblur="{change(\'album\')}">{data.album}</textarea> </div>', 'trackexplorer{position:absolute;bottom:0;right:0;top:110px;width:25vw;z-index:9;transition-duration:.1s;background:#fff;box-shadow:0 0 5px rgba(0,0,0,0.3);transform:translateX(100%);opacity:0}trackexplorer.show{transform:translate(0);opacity:1}trackexplorer .artwork{width:100%;max-height:50%}trackexplorer .metadata{padding:0 20px}trackexplorer .metadata .label{color:#888;font-size:.7em}trackexplorer .metadata textarea.h1,trackexplorer .metadata textarea.h2{font-size:16px;padding:4px 8px;border:none;width:100%;margin-bottom:4px;color:#555}trackexplorer .metadata textarea.h1:hover,trackexplorer .metadata textarea.h2:hover{background:#f8f8f8}trackexplorer .metadata textarea.h1:focus,trackexplorer .metadata textarea.h2:focus{background:#f8f8f8;outline:none}trackexplorer .metadata textarea.h1{font-size:1.5em;color:#333}trackexplorer .metadata input.name{font-size:18px;font-weight:bold}', '', function(opts) {
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

riot.tag2('tracklist', '<track each="{val, i in renderedTracks}" index="{i}" data="{val}"></track>', 'tracklist{color:#333;background:white;display:block;width:100%;white-space:nowrap;position:absolute;top:110px;left:0;right:0;bottom:0;overflow:auto}tracklist .cell{padding:8px;display:inline-block;float:left}tracklist .cell:nth-child(1){width:30vw}tracklist .cell:nth-child(2){width:20vw}', '', function(opts) {
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
    if (changeDebounce) window.clearTimeout(changeDebounce);

    changeDebounce = window.setTimeout(function () {
      sort(true);
    }, 2000);
  } else {
    // Add
    add(change.doc);
    if (changeDebounce) window.clearTimeout(changeDebounce);

    changeDebounce = window.setTimeout(function () {
      sort(true); // true = rerun last limit
    }, 200);
  }
}).on('complete', function (info) {
  // changes() was canceled
}).on('error', function (err) {
  console.log(err);
});

var add = function (doc) {
  self.tracks.push(doc);
};

var sort = function (limit) {
  var expression = /[A-Za-z ]+/g;
  var get = function (item, key) {
    if (typeof item[key] === 'number') return item[key];else {
      var returned = expression.exec((item[key] ? ('' + item[key]).trim() : '').toLowerCase());
      if (returned === null) return '';else return returned[0];
    }
  };

  self.tracks.sort(function (a, b) {
    var keyA, keyB;

    keyA = get(a, 'artist') + get(a, 'album');
    keyB = get(b, 'artist') + get(b, 'album');

    if (keyA.length === 0) return 1;
    if (keyB.length === 0) return -1;

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
