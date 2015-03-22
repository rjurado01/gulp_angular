var gulp = require('gulp'),
    jade = require('gulp-jade'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass')
    gulpif = require('gulp-if');

var env = process.env.ENV || 'development';
var outputDir = 'builds/' + env;

gulp.task('jade', function() {
  return gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src('src/js/main.js')
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + '/js'));
});

gulp.task('sass', function() {
  var config = {};

  if(env === 'production') {
    config.outputStyle = 'compressed';
  }
  else {
    config.sourceComments = 'map';
  }

  return gulp.src('src/assets/sass/**/*.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir + '/css'));
});

gulp.task('watch', function () {
  gulp.watch('src/templates/**/*.jade', ['jade']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('default', ['jade', 'js', 'sass', 'watch', 'connect']);
