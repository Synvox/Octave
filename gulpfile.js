var gulp = require("gulp");

var fs = require("fs");
var browserify = require("browserify");
var babel = require('gulp-babel');

var riot = require('gulp-riot');
var concat = require('gulp-concat');

var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

gulp.task('default', ['riot']);

gulp.task('riot', function() {
  watch('tags/*.html',function(){
    gulp.src('tags/*.html')
      .pipe(plumber())
      .pipe(riot({
        type: 'babel',
        parsers: {
          css: 'less'
        }
      }))
      .pipe(concat('tags.js'))
      .on("error", function (err) { console.log("Error: " + err.message); })
      .pipe(gulp.dest('tags'));
  });
});

gulp.task('build',function(){
  var opts = {
    version: '0.36.2',
    name: 'Octave',
    arch: 'x64',
    platform: 'darwin',
    dir: '.',
    out: './bundle/',
    overwrite: true,
    icon: './Octave.icns'
  };
  var packager = require('electron-packager')
  packager(opts, function done (err, appPath) {
    console.log(err, appPath)
  })
})
