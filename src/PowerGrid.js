// Ryan's experimental grid system

var Power = {
  anim: {
    init: function(){
      var self = this,
          inClass = self.opts.in,
          outClass = self.opts.out;

      if (inClass) {
        inClass = inClass.split('|')
        var timeout = inClass[1]?parseFloat(inClass[1]):0;
        self.on('before-mount',function(){
          $(self.root).addClass(inClass[0]);
        });
        self.on('mount',function(){
          window.setTimeout(function(){
            $(self.root).removeClass(inClass[0]);
          },timeout);
        });
      }
    }
  },
  panel: {
    init: function() {
      var size = {
        cols: (this.opts.cols || 16) * 20,
        rows: (this.opts.rows || 16) * 20
      };
      var css = {
        position:'absolute',
        display: 'inline-block',
        overflow: 'hidden',
        'min-width': size.cols+'px',
        'min-height': size.rows+'px',
        float: 'left',
        width: this.opts.width,
        height: this.opts.height,
        'max-width': this.opts['maxwidth'],
        'max-height': this.opts['maxheight'],
        height: this.opts.height,
        top: this.opts.top,
        left: this.opts.left,
        bottom: this.opts.bottom,
        right: this.opts.right
      }
      if (this.opts.center !== undefined) {
        css['transform'] = "translate(-50%, -50%)";
      }
      $(this.root).css(css)
    }
  },
  cell: {
    init: function() {
      if (!this.opts.pos) return;

      var pos = {position: 'absolute', display: 'inline-block'};
      this.opts.pos.split(' ').map(function(e,i){
        var value = e.substring(1);
        switch (e[0]) {
          case 'c':
          case 'C':
            pos['transform'] = "translate(-50%, -50%)";
            break;

          case 'T':
            value = 20 * value + 'px'
            if (pos.top) {
              pos.top = 'calc('+pos.top+' + '+value+')'
            } else pos.top = value;
            break;
          case 'L':
            value = 20 * value + 'px'
            if (pos.left) {
              pos.left = 'calc('+pos.left+' + '+value+')'
              console.log(pos.left)
            } else pos.left = value;
            break;
          case 'R':
            value = 20 * value + 'px'
            if (pos.right) {
              pos.right = 'calc('+pos.right+' + '+value+')'
            } else pos.right = value;
            break;
          case 'B':
            value = 20 * value + 'px'
            if (pos.bottom) {
              pos.bottom = 'calc('+pos.bottom+' + '+value+')'
            } else pos.bottom = value;
            break;

          case 't':
            value = (value / 16 * 100) + '%';
            if (pos.top) {
              pos.top = 'calc('+pos.top+' + '+value+')'
            } else pos.top = value;
            break;
          case 'l':
            value = (value / 16 * 100) + '%';
            if (pos.left) {
              pos.left = 'calc('+pos.left+' + '+value+')'
            } else pos.left = value;
            break;
          case 'r':
            value = (value / 16 * 100) + '%';
            if (pos.right) {
              pos.right = 'calc('+pos.right+' + '+value+')'
            } else pos.right = value;
            break;
          case 'b':
            value = (value / 16 * 100) + '%';
            if (pos.bottom) {
              pos.bottom = 'calc('+pos.bottom+' + '+value+')'
            } else pos.bottom = value;
            break;

          case 'w':
            value = (value / 16 * 100) + '%';
            if (pos.width) {
              pos.width = 'calc('+pos.width+' + '+value+')'
            } else pos.width = value;
            break;
          case 'W':
            value = 20 * value + 'px'
            if (pos.width) {
              pos.width = 'calc('+pos.width+' + '+value+')'
            } else pos.width = value;
            break;

          case 'h':
            value = (value / 16 * 100) + '%';
            if (pos.height) {
              pos.height = 'calc('+pos.height+' + '+value+')'
            } else pos.height = value;
            break;
          case 'H':
            value = 20 * value + 'px'
            if (pos.height) {
              pos.height = 'calc('+pos.height+' + '+value+')'
            } else pos.height = value;
            break;
        }
      })
      $(this.root).css(pos);
    }
  }
}
